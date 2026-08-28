import { useEffect, useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { musicLibrary } from "../../src/data/music";
import { searchOnlineSongs } from "../../src/services/musicApi";
import { addSongToPlaylist, getPlaylists, hydratePlaylists, removeSongFromPlaylist, subscribePlaylists } from "../../src/store/playlistStore";
import { cacheSongs, getSong, hydrateSongs } from "../../src/store/musicStore";

export default function PlaylistDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const playlistId = Array.isArray(id) ? id[0] : id;
    const [items, setItems] = useState(getPlaylists());
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState("");
    const playlist = items.find((item) => item.id === playlistId);

    useEffect(() => { Promise.all([hydratePlaylists(), hydrateSongs()]); return subscribePlaylists(setItems); }, []);
    useEffect(() => { setSongs((playlist?.tracks || []).map((track) => typeof track === "string" ? getSong(track) || musicLibrary.find((song) => song.id === track) : track).filter(Boolean)); }, [playlist]);

    const searchAndAdd = async () => {
        if (!query.trim()) return;
        try { const results = await searchOnlineSongs(query); await cacheSongs(results); if (results[0]) { await addSongToPlaylist(playlistId, results[0].id); setQuery(""); } }
        catch (error) { Alert.alert("No se pudo buscar", error.message); }
    };

    if (!playlist) return <View style={styles.container}><Text style={styles.title}>Playlist no encontrada</Text></View>;
    return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>← Playlists</Text></Pressable>
        <View style={[styles.hero, { backgroundColor: playlist.color }]}><Text style={styles.title}>{playlist.name}</Text><Text style={styles.description}>{playlist.description || "Sin descripción"}</Text><Text style={styles.count}>{songs.length} canciones</Text></View>
        <Text style={styles.sectionTitle}>Añadir desde internet</Text>
        <View style={styles.searchRow}><TextInput value={query} onChangeText={setQuery} onSubmitEditing={searchAndAdd} placeholder="Buscar una canción" placeholderTextColor="#777" style={styles.input} /><Pressable onPress={searchAndAdd} style={styles.searchButton}><Text style={styles.searchText}>Añadir primera</Text></Pressable></View>
        {songs.map((song) => <View key={song.id} style={styles.songRow}><View style={styles.songInfo}><Text style={styles.songTitle}>{song.title}</Text><Text style={styles.artist}>{song.artist}</Text></View><Pressable onPress={() => removeSongFromPlaylist(playlistId, song.id)}><Text style={styles.remove}>Quitar</Text></Pressable><Pressable onPress={() => song.onlineUrl ? Linking.openURL(song.onlineUrl) : router.push({ pathname: "/player", params: { songId: song.id } })}><Text style={styles.play}>▶</Text></Pressable></View>)}
    </ScrollView>;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#131313" }, content: { padding: 20, paddingTop: 54, paddingBottom: 100 }, back: { color: "#7dd3fc", fontSize: 15, fontWeight: "700", marginBottom: 22 },
    hero: { borderRadius: 22, padding: 22, marginBottom: 26 }, title: { color: "#fff", fontSize: 30, fontWeight: "800" }, description: { color: "#fff", opacity: 0.8, marginTop: 8 }, count: { color: "#fff", opacity: 0.7, marginTop: 18, fontSize: 12 },
    sectionTitle: { color: "#f5f5f5", fontSize: 18, fontWeight: "700", marginBottom: 12 }, searchRow: { flexDirection: "row", gap: 8, marginBottom: 24 }, input: { flex: 1, backgroundColor: "#242424", color: "#fff", borderRadius: 12, padding: 13 }, searchButton: { backgroundColor: "#7dd3fc", borderRadius: 12, justifyContent: "center", paddingHorizontal: 12 }, searchText: { color: "#082f49", fontSize: 12, fontWeight: "800" },
    songRow: { backgroundColor: "#242424", borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 14 }, songInfo: { flex: 1 }, songTitle: { color: "#fff", fontSize: 15, fontWeight: "700" }, artist: { color: "#aaa", fontSize: 12, marginTop: 3 }, remove: { color: "#fda4af", fontSize: 12, fontWeight: "700" }, play: { color: "#7dd3fc", fontSize: 16 },
});

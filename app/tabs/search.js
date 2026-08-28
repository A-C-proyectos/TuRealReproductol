import { useEffect, useMemo, useState } from "react";
import { Alert, Linking, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../../src/components/ui/SearchBar";
import SongList from "../../src/components/ui/SongList";
import { musicLibrary } from "../../src/data/music";
import { searchOnlineSongs } from "../../src/services/musicApi";
import { addSongToPlaylist, getPlaylists, hydratePlaylists, subscribePlaylists } from "../../src/store/playlistStore";
import { cacheSongs } from "../../src/store/musicStore";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [onlineSongs, setOnlineSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState(getPlaylists());

  useEffect(() => {
    hydratePlaylists();
    return subscribePlaylists(setPlaylists);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) { setOnlineSongs([]); return; }
      setLoading(true);
      try {
        const results = await searchOnlineSongs(query);
        setOnlineSongs(results);
        await cacheSongs(results);
      } catch (error) { Alert.alert("Búsqueda sin conexión", error.message); }
      finally { setLoading(false); }
    }, 450);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredSongs = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return musicLibrary;

    return musicLibrary.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.album?.toLowerCase().includes(term)
    );
  }, [query, onlineSongs]);

  const songs = query.trim() ? onlineSongs : filteredSongs;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar canciones, artistas o álbumes" />
      <Text style={styles.summary}>{loading ? "Buscando en YouTube..." : `${songs.length} resultados`}</Text>
      <SongList
        songs={songs}
        onSongPress={(song) => Linking.openURL(song.onlineUrl)}
        renderActions={(song) => <View style={styles.rowActions}><Pressable onPress={() => setSelectedSong(song)}><Text style={styles.toolText}>+ Playlist</Text></Pressable><Pressable onPress={() => Linking.openURL(song.onlineUrl)}><Text style={styles.downloadText}>Abrir YouTube</Text></Pressable></View>}
      />
      <Modal visible={!!selectedSong} transparent animationType="fade" onRequestClose={() => setSelectedSong(null)}><View style={styles.modalBackdrop}><View style={styles.modal}><Text style={styles.modalTitle}>Agregar a playlist</Text>{playlists.map((playlist) => <Pressable key={playlist.id} style={styles.playlistOption} onPress={async () => { await addSongToPlaylist(playlist.id, selectedSong.id); setSelectedSong(null); }}><Text style={styles.playlistName}>{playlist.name}</Text><Text style={styles.playlistCount}>{playlist.tracks.length} canciones</Text></Pressable>)}<Pressable onPress={() => setSelectedSong(null)}><Text style={styles.cancel}>Cancelar</Text></Pressable></View></View></Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
    paddingHorizontal: 18,
    paddingTop: 52,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 16,
  },
  summary: {
    color: "#adadad",
    fontSize: 13,
    marginBottom: 12,
  },
  rowActions: { alignItems: "flex-end", gap: 6 },
  toolText: { color: "#7dd3fc", fontSize: 12, fontWeight: "700" },
  downloadText: { color: "#fbbf24", fontSize: 12, fontWeight: "700" },
  modalBackdrop: { flex: 1, justifyContent: "center", padding: 22, backgroundColor: "rgba(0,0,0,0.7)" },
  modal: { backgroundColor: "#242424", borderRadius: 20, padding: 20 },
  modalTitle: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 12 },
  playlistOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#3a3a3a", flexDirection: "row", justifyContent: "space-between" },
  playlistName: { color: "#fff", fontSize: 16 },
  playlistCount: { color: "#999", fontSize: 12 },
  cancel: { color: "#bbb", textAlign: "right", marginTop: 18, fontWeight: "600" },
});
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../../src/components/ui/SearchBar";
import SongList from "../../src/components/ui/SongList";
import { musicLibrary } from "../../src/data/music";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredSongs = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return musicLibrary;

    return musicLibrary.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.album?.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar canciones, artistas o álbumes" />
      <Text style={styles.summary}>{filteredSongs.length} resultados</Text>
      <SongList
        songs={filteredSongs}
        onSongPress={(song) => router.push({ pathname: "/player", params: { songId: song.id } })}
      />
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
});
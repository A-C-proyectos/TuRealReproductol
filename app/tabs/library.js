import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { musicLibrary } from "../../src/data/music";

export default function LibraryScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Biblioteca</Text>
      <Text style={styles.subtitle}>Tus álbumes y favoritos</Text>

      {musicLibrary.map((song) => (
        <View key={song.id} style={styles.albumRow}>
          <Image source={{ uri: song.artwork }} style={styles.cover} />
          <View style={styles.albumInfo}>
            <Text style={styles.albumName}>{song.album}</Text>
            <Text style={styles.albumArtist}>{song.artist}</Text>
          </View>
          <Text style={styles.albumTag}>{song.downloaded ? "Offline" : "En línea"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 100,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#9f9f9f",
    fontSize: 14,
    marginBottom: 20,
  },
  albumRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
  },
  cover: {
    width: 58,
    height: 58,
    borderRadius: 12,
    marginRight: 12,
  },
  albumInfo: {
    flex: 1,
  },
  albumName: {
    color: "#f0f0f0",
    fontSize: 16,
    fontWeight: "600",
  },
  albumArtist: {
    color: "#a8a8a8",
    fontSize: 12,
    marginTop: 2,
  },
  albumTag: {
    color: "#7dd3fc",
    fontSize: 11,
    fontWeight: "600",
  },
});
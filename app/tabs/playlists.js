import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { playlists } from "../../src/data/music";

export default function PlaylistsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Playlists</Text>

      {playlists.map((playlist) => (
        <View key={playlist.id} style={[styles.card, { backgroundColor: playlist.color }]}>
          <Image source={{ uri: playlist.cover }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{playlist.name}</Text>
            <Text style={styles.description}>{playlist.description}</Text>
          </View>
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
    marginBottom: 18,
  },
  card: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 16,
  },
  name: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    color: "#f3f4f6",
    fontSize: 14,
  },
});
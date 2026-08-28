import { Link, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Pressable, Image } from "react-native";
import { musicLibrary, playlists } from "../../src/data/music";

export default function HomeScreen() {
  const router = useRouter();

  const featuredTracks = musicLibrary.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Buenos días</Text>
      <Text style={styles.title}>Tu Real Reproductor</Text>

      <View style={styles.heroCard}>
        <View style={styles.heroTextWrap}>
          <Text style={styles.heroTag}>Featured mix</Text>
          <Text style={styles.heroTitle}>{musicLibrary[0].title}</Text>
          <Text style={styles.heroMeta}>{musicLibrary[0].artist} • 4 canciones</Text>
        </View>
        <Image source={{ uri: musicLibrary[0].artwork }} style={styles.heroImage} />
      </View>

      <Text style={styles.sectionTitle}>Canciones recientes</Text>
      <View style={styles.trackList}>
        {featuredTracks.map((track) => (
          <Pressable
            key={track.id}
            style={styles.trackRow}
            onPress={() => router.push({ pathname: "/player", params: { songId: track.id } })}
          >
            <Image source={{ uri: track.artwork }} style={styles.trackImage} />
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle}>{track.title}</Text>
              <Text style={styles.trackArtist}>{track.artist}</Text>
            </View>
            <Text style={styles.trackTime}>{Math.floor((track.duration ?? 0) / 60)}:{String((track.duration ?? 0) % 60).padStart(2, "0")}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Playlists</Text>
      <View style={styles.playlistRow}>
        {playlists.map((playlist) => (
          <Link key={playlist.id} href={{ pathname: "/tabs/playlists" }} style={[styles.playlistCard, { backgroundColor: playlist.color }]}>
            <Image source={{ uri: playlist.cover }} style={styles.playlistImage} />
            <Text style={styles.playlistName}>{playlist.name}</Text>
          </Link>
        ))}
      </View>
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
  greeting: {
    color: "#b7b7b7",
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 18,
  },
  heroCard: {
    backgroundColor: "#242424",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  heroTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  heroTag: {
    color: "#5eead4",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  heroMeta: {
    color: "#c4c4c4",
    fontSize: 14,
  },
  heroImage: {
    width: 108,
    height: 108,
    borderRadius: 18,
  },
  sectionTitle: {
    color: "#f5f5f5",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  trackList: {
    marginBottom: 26,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#292929",
  },
  trackImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: "#f5f5f5",
    fontWeight: "600",
    fontSize: 16,
  },
  trackArtist: {
    color: "#acacac",
    fontSize: 12,
    marginTop: 3,
  },
  trackTime: {
    color: "#b9b9b9",
    fontSize: 12,
  },
  playlistRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  playlistCard: {
    width: "48%",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
  },
  playlistImage: {
    width: "100%",
    height: 120,
  },
  playlistName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    padding: 10,
  },
});
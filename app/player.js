import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { musicLibrary } from "../src/data/music";

function formatTime(totalSeconds) {
  const safeValue = Number.isFinite(totalSeconds) ? Math.max(0, totalSeconds) : 0;
  const minutes = Math.floor(safeValue / 60);
  const seconds = Math.floor(safeValue % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function PlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const songId = Array.isArray(params.songId) ? params.songId[0] : params.songId ?? musicLibrary[0].id;
  const song = musicLibrary.find((item) => item.id === songId) ?? musicLibrary[0];

  // Use bundled asset when available (require(...)) so web and native both work
  const source = song.audio ?? (song.audioUrl ? { uri: song.audioUrl } : null);
  const player = useAudioPlayer(source, { updateInterval: 250 });
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    // Prepare player with the new source (do not auto-play).
    if (!source) return;
    player.replace(source);

    return () => {
      player.pause();
    };
  }, [song.id, source, player]);

  const currentTime = status.currentTime;
  const duration = status.duration || song.duration || 0;
  const playing = status.playing;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlayback = () => {
    if (playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const skipBackward = () => {
    player.seekTo(Math.max(0, status.currentTime - 10));
  };

  const skipForward = () => {
    player.seekTo(Math.min(status.duration || song.duration || 0, status.currentTime + 10));
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/tabs")} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </Pressable>

      <Image source={{ uri: song.artwork }} style={styles.cover} resizeMode="cover" />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.controlButton} onPress={skipBackward}>
          <Text style={styles.controlText}>⏮</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={togglePlayback}>
          <Text style={styles.primaryText}>{playing ? "⏸" : "▶"}</Text>
        </Pressable>
        <Pressable style={styles.controlButton} onPress={skipForward}>
          <Text style={styles.controlText}>⏭</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
    paddingHorizontal: 22,
    paddingTop: 52,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1d1d1d",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  backText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  cover: {
    width: 300,
    height: 300,
    borderRadius: 30,
    marginBottom: 28,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 6,
  },
  artist: {
    color: "#b5b5b5",
    fontSize: 18,
    marginBottom: 24,
  },
  progressWrap: {
    width: "100%",
    maxWidth: 300,
  },
  progressTrack: {
    height: 5,
    backgroundColor: "#2c2c2c",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8b5cf6",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  time: {
    color: "#bdbdbd",
    fontSize: 12,
  },
  controls: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  controlButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  controlText: {
    color: "#fff",
    fontSize: 24,
  },
  primaryText: {
    color: "#fff",
    fontSize: 28,
  },
});
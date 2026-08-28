import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { ReactNode } from "react";
import { Song } from "../types/music";

type Props = {
  song: Song;
  onPress: () => void;
  actions?: ReactNode;
};

export default function SongItem({ song, onPress, actions }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: song.artwork ?? "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80" }}
        style={styles.artwork}
        resizeMode="cover"
      />

      <View style={styles.textWrap}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>
      {actions}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242424",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#343434",
  },
  artwork: {
    width: 64,
    height: 64,
    borderRadius: 14,
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 16,
    fontWeight: "600",
  },
  artist: {
    color: "#b3b3b3",
    fontSize: 13,
    marginTop: 2,
  },
});
import { FlatList, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { Song } from "../types/music";
import SongItem from "./SongItem";

type Props = {
  songs?: Song[];
  onSongPress?: (song: Song) => void;
  renderActions?: (song: Song) => ReactNode;
};

export default function SongList({ songs = [], onSongPress = () => undefined, renderActions }: Props) {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
      <SongItem song={item} onPress={() => onSongPress(item)} actions={renderActions?.(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 100,
  },
});
import { FlatList, StyleSheet } from "react-native";
import { Song } from "../types/music";
import SongItem from "./SongItem";

type Props = {
  songs?: Song[];
  onSongPress?: (song: Song) => void;
};

export default function SongList({ songs = [], onSongPress = () => undefined }: Props) {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
       <SongItem song={item} onPress={() => onSongPress(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 100,
  },
});
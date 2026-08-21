import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import {Song} from '../types/music'

type Props = {
    song: Song;
    onPress: () => void;
}

export default function SongItem({ song, onPress}: Props){
    return(
        <Pressable onPress={onPress}>
            <view>

                <Image
                    source={{uri: song.artwork}}
                />

                <View>
                    <Text>{song.title}</Text>
                    <Text>{song.artist}</Text>
                </View>

            </view>
        </Pressable>
    )
}
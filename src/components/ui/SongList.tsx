import {StyleSheet, Text, View, FlatList} from 'react-native';
import { Song } from '../types/music'
import SongItem from './SongItem';

type Props = {
    songs: Song[]
    onSongPress: (song: Song) => void
}

export default function SongList({ songs, onSongPress }: Props){
    return(

       <FlatList
            data = {songs}
            keyExtractor={(item) => item.id}
        
            renderItem={({ item }) => (

                <SongItem
                    song = {item}
                    onPress={()=> onSongPress(item)}    
                />
                
            )}

       />
        

    )

}
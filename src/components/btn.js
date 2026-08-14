import {StyleSheet, Text} from 'react-native'
import {Link} from 'expo-router'


export default function texto({ contenido, root }){
    return(
        <Link href={root} style={styles.btn}>{contenido}</Link>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 20,
        padding: 10,
    }
})
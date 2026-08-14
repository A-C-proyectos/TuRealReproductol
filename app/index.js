import {StyleSheet, Text, View} from 'react-native'
import {Link} from 'expo-router'
import Nav from "../src/components/btn"
import Foot from '../src/components/footer'

export default function HomeScreen() {
    return(
       <View>
            <Text style={styles.texto}>Hola</Text>
       </View>
    )
}



const styles = StyleSheet.create({
    texto: {
        fontSize: 95,
        marginTop: 195,
    }
})
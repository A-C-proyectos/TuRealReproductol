import {StyleSheet, Text, View} from 'react-native'
import {Link} from 'expo-router'

export default function Ruta() {
    return(
        <View>
            <Text>Funciona</Text>


            <Link href="/">
                volver al inicio
            </Link>

        </View>
    )
}


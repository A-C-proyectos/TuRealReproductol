import {StyleSheet, Text, View} from 'react-native'
import {Link} from 'expo-router'

import Modales from '../../src/components/common/modales'

export default function HomeScreen() {
    return(

        <Modales>
            <View style={styles.container}>
                <Text style={styles.texto}>Tu Real Reprodutol</Text>
                <Foot />
            </View>
        </Modales>

    )
}



const styles = StyleSheet.create({
    container: {
       
    },

    texto: {
        fontSize: 35,
        textAlign: 'center',
        marginTop: 65,
        fontWeight: 'bold',
        color: 'green',

    },

})
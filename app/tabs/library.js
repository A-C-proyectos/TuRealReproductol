import {StyleSheet, Text, View} from "react-native"

import Modales from '../../src/components/common/modales'

export default function library(){
    return(
        <Modales>
            <View>
                <Text style={styles.texto}>Biblioteca</Text>
                <Foot />
            </View>
        </Modales>
    )
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 35,
        color: 'green',
        textAlign: 'center',
        marginTop: 55,
        fontWeight: 'bold',
    }
})
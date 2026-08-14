import {StyleSheet, Text, View} from "react-native"

export default function library(){
    return(
        <Text style={styles.texto}>Hola</Text>
    )
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 95,
        marginTop: 195,
    }
})
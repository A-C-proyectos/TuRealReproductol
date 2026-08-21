import {StyleSheet, Text, View} from 'react-native'




export default function HomeScreen() {
    return(

        <View style={styles.container}>
            <Text style={styles.title}>Tu Real Reprodutol</Text>
        </View>

    )
}



const styles = StyleSheet.create({

    container:{
        paddingTop: 30,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#212121',
    },

    title:{
        fontSize: 35,
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
    },

})
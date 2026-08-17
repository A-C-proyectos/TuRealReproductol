import React from 'react'
import {StyleSheet, View} from 'react-native'


export default function Modales({ children }){
    return(
        <View style={styles.container}>
            {children}
        </View>

    )
}

const styles = StyleSheet.create({

    container:{
        flexDirection: 'column',
        backgroundColor: '#212121',
    },

})



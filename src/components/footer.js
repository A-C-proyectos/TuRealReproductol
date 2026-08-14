import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {useRouter} from 'expo-router'

export default function Footer(){
    const router = useRouter();

    return(
        <View style={styles.footerr}>
            {/* <Link href="/" style={styles.btn}>Inicio</Link>
            <Link href="/library" style={styles.btn}>Bliblioteca</Link>
            <Link href="/busqueda" style={styles.btn}>Buscar</Link>            */}


                <TouchableOpacity onPress={() => router.push('/')} style={styles.btn}>
                    <Text style={styles.btn}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/library')}>
                    <Text style={styles.btn}>Biblioteca</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/busqueda')} style={styles.btn}>
                    <Text style={styles.btn}>Buscar</Text>
                </TouchableOpacity>

        </View>    
        
    )
}

const styles = StyleSheet.create({
    btn: {
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 20,
        padding: 10,
    },
    footerr: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10, 
        padding: 20,
        marginTop:195,
    }
})
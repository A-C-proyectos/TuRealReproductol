import { Stack } from 'expo-router';
import Foot from '../src/components/footer'
import {StyleSheet, Text, View} from 'react-native'

export default function RootLayout() {
  return (

    <View>
      <Foot />
      
      <View>
        <Stack screenOptions={{ headerShown: false}} >
          <Stack.Screen name="index" options={{ title: 'Inicio' }} />
          <Stack.Screen name="library" options={{ title: 'Biblioteca' }} />
          <Stack.Screen name="busqueda" options={{ title: 'Buscar' }} />
        </Stack>
      </View>

    </View>
  );
}
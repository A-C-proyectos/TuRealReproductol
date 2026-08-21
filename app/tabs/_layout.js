import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
       <Tabs 
            screenOptions={{
                tabBarStyle: { color: '#ffffff',
                     backgroundColor: '#212121' },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#b1b1b',
                tabBarActiveBackgroundColor: 'green',}}      
        >

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='home' size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen
                name="library"
                options={{
                    title: 'Albumes',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='albums' size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: 'Buscar',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='search' size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen
                name="playlists"
                options={{
                    title: 'Playlists',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='musical-notes' size={size} color={color}/>
                    )
                }}
            />

       </Tabs>
    )
}
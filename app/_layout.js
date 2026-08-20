import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen 
        name='index' 
        options={{ 
          title: 'Inicio', 
          headerShown:false, 
        }}
        
      />

      <Stack.Screen 
        name='player' 
        options={{ 
          title: 'Reproductor',
          headerShown: false, 
        }}
      />

    </Stack>
  );
}

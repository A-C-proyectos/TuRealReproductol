import { Stack } from 'expo-router';

export default function PlaylistLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="create" options={{ title: 'Crear Playlist' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle de Playlist' }} />
    </Stack>
  );
}
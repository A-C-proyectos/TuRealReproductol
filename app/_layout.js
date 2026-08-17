// app/_layout.js
import { Stack } from 'expo-router'; // <-- Asegúrate de tener esto arriba del todo

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="player" options={{ presentation: 'modal' }} />
      <Stack.Screen name="playlist" />
      <Stack.Screen name="edit-track" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

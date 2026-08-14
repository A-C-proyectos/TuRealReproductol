import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Real Reprodutolaaaaaaaaaa</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f45',
  },

  title: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 700,
    fontWeight: 'bold', 
    color: 'green'
  }

});

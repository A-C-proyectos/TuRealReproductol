import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({ value, onChangeText, placeholder = "Buscar..." }) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7d7d7d"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#282828",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#3d3d3d",
  },
  input: {
    color: "#f5f5f5",
    fontSize: 16,
  },
});

import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { createPlaylist, deletePlaylist, getPlaylists, hydratePlaylists, subscribePlaylists, updatePlaylist } from "../../src/store/playlistStore";

export default function PlaylistsScreen() {
  const router = useRouter();
  const [items, setItems] = useState(getPlaylists());
  const [modal, setModal] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    hydratePlaylists();
    return subscribePlaylists(setItems);
  }, []);

  const openEditor = (playlist) => {
    setModal(playlist || { id: null });
    setName(playlist?.name || "");
    setDescription(playlist?.description || "");
  };

  const savePlaylist = async () => {
    try {
      if (modal.id) await updatePlaylist(modal.id, { name, description });
      else await createPlaylist({ name, description });
      setModal(null);
    } catch (error) {
      Alert.alert("No se pudo guardar", error.message);
    }
  };

  const confirmDelete = (playlist) => Alert.alert("Eliminar playlist", `¿Eliminar “${playlist.name}”?`, [
    { text: "Cancelar", style: "cancel" },
    { text: "Eliminar", style: "destructive", onPress: () => deletePlaylist(playlist.id) },
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Tu colección</Text>
          <Text style={styles.title}>Playlists</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => openEditor()}><Text style={styles.addText}>+</Text></Pressable>
      </View>

      {items.map((playlist) => (
        <Pressable key={playlist.id} onPress={() => router.push({ pathname: "/playlist/[id]", params: { id: playlist.id } })} style={[styles.card, { backgroundColor: playlist.color }]}>
          <Image source={{ uri: playlist.cover }} style={styles.image} />
          <View style={styles.info}>
            <View style={styles.cardTitleRow}><Text style={styles.name}>{playlist.name}</Text><Text style={styles.count}>{playlist.tracks.length} canciones</Text></View>
            <Text style={styles.description}>{playlist.description || "Sin descripción"}</Text>
            <View style={styles.actions}><Pressable onPress={() => openEditor(playlist)}><Text style={styles.actionText}>Editar</Text></Pressable><Pressable onPress={() => confirmDelete(playlist)}><Text style={styles.deleteText}>Eliminar</Text></Pressable></View>
          </View>
        </Pressable>
      ))}

      <Modal visible={!!modal} transparent animationType="slide" onRequestClose={() => setModal(null)}>
        <View style={styles.modalBackdrop}><View style={styles.modal}>
          <Text style={styles.modalTitle}>{modal?.id ? "Editar playlist" : "Nueva playlist"}</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Nombre" placeholderTextColor="#777" style={styles.input} autoFocus />
          <TextInput value={description} onChangeText={setDescription} placeholder="Descripción (opcional)" placeholderTextColor="#777" style={styles.input} />
          <View style={styles.modalActions}><Pressable onPress={() => setModal(null)}><Text style={styles.cancel}>Cancelar</Text></Pressable><Pressable style={styles.saveButton} onPress={savePlaylist}><Text style={styles.saveText}>Guardar</Text></Pressable></View>
        </View></View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 100,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 0,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  eyebrow: { color: "#7dd3fc", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  addButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#f5f5f5", alignItems: "center", justifyContent: "center" },
  addText: { color: "#131313", fontSize: 30, lineHeight: 32, fontWeight: "300" },
  cardTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  count: { color: "#ffffff", opacity: 0.75, fontSize: 11 },
  actions: { flexDirection: "row", gap: 18, marginTop: 14 },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  deleteText: { color: "#ffe4e6", fontWeight: "700", fontSize: 13 },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.65)" },
  modal: { backgroundColor: "#242424", padding: 22, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  modalTitle: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 18 },
  input: { backgroundColor: "#171717", color: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 16 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 20, marginTop: 8 },
  cancel: { color: "#bbb", fontWeight: "600" },
  saveButton: { backgroundColor: "#7dd3fc", borderRadius: 12, paddingHorizontal: 18, paddingVertical: 12 },
  saveText: { color: "#082f49", fontWeight: "800" },
  card: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 16,
  },
  name: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    color: "#f3f4f6",
    fontSize: 14,
  },
});
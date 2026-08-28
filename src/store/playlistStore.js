import Storage from "expo-sqlite/kv-store";
import { playlists as seedPlaylists } from "../data/music";

const STORAGE_KEY = "tureal-playlists-v1";
let currentPlaylists = seedPlaylists;
let hydrated = false;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener(currentPlaylists));
}

export async function hydratePlaylists() {
  if (hydrated) return currentPlaylists;
  const stored = await Storage.getItemAsync(STORAGE_KEY);
  if (stored) {
    try {
      currentPlaylists = JSON.parse(stored);
    } catch {
      currentPlaylists = seedPlaylists;
    }
  }
  hydrated = true;
  notify();
  return currentPlaylists;
}

async function persist(nextPlaylists) {
  currentPlaylists = nextPlaylists;
  hydrated = true;
  await Storage.setItemAsync(STORAGE_KEY, JSON.stringify(nextPlaylists));
  notify();
  return nextPlaylists;
}

export function getPlaylists() {
  return currentPlaylists;
}

export function subscribePlaylists(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function createPlaylist({ name, description = "", color = "#0ea5e9", cover }) {
  const cleanName = name.trim();
  if (!cleanName) throw new Error("El nombre es obligatorio");
  const playlist = {
    id: `playlist-${Date.now()}`,
    name: cleanName,
    description: description.trim(),
    color,
    cover: cover || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    tracks: [],
  };
  await persist([...currentPlaylists, playlist]);
  return playlist;
}

export async function updatePlaylist(id, changes) {
  const next = currentPlaylists.map((playlist) =>
    playlist.id === id ? { ...playlist, ...changes, name: changes.name?.trim() || playlist.name } : playlist
  );
  await persist(next);
  return next.find((playlist) => playlist.id === id);
}

export async function deletePlaylist(id) {
  await persist(currentPlaylists.filter((playlist) => playlist.id !== id));
}

export async function addSongToPlaylist(playlistId, songId) {
  const next = currentPlaylists.map((playlist) => {
    if (playlist.id !== playlistId || playlist.tracks.includes(songId)) return playlist;
    return { ...playlist, tracks: [...playlist.tracks, songId] };
  });
  await persist(next);
}

export async function removeSongFromPlaylist(playlistId, songId) {
  await persist(currentPlaylists.map((playlist) =>
    playlist.id === playlistId
      ? { ...playlist, tracks: playlist.tracks.filter((trackId) => trackId !== songId) }
      : playlist
  ));
}

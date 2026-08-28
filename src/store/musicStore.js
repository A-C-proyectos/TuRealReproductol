import Storage from "expo-sqlite/kv-store";
import { musicLibrary } from "../data/music";

const STORAGE_KEY = "tureal-online-songs-v1";
let songs = [...musicLibrary];
let loaded = false;

export async function hydrateSongs() {
  if (loaded) return songs;
  const stored = await Storage.getItemAsync(STORAGE_KEY);
  if (stored) {
    try { songs = [...musicLibrary, ...JSON.parse(stored)]; } catch { /* Ignore corrupt cache and use local songs. */ }
  }
  loaded = true;
  return songs;
}

export async function cacheSongs(nextSongs) {
  await hydrateSongs();
  const byId = new Map(songs.map((song) => [song.id, song]));
  nextSongs.forEach((song) => byId.set(song.id, song));
  songs = [...byId.values()];
  await Storage.setItemAsync(STORAGE_KEY, JSON.stringify(songs.filter((song) => song.id.startsWith("itunes-"))));
  return songs;
}

export function getSong(songId) {
  return songs.find((song) => song.id === songId);
}

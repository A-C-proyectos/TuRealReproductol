import { Song } from "../components/types/music";

export type Playlist = {
  id: string;
  name: string;
  description: string;
  cover: string;
  color: string;
  tracks: string[];
};

export const musicLibrary: Song[] = [
  {
    id: "night-drive",
    title: "Night Drive",
    artist: "Astra Bloom",
    album: "Midnight Echoes",
    artwork:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    audio: require("../../assets/sounds/sample-3s.mp3"),
    duration: 214,
    downloaded: true,
    isFavorite: true,
  },
  {
    id: "sunset-rhythm",
    title: "Sunset Rhythm",
    artist: "Velvet Echo",
    album: "Golden Hour",
    artwork:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    audio: require("../../assets/sounds/sample-3s.mp3"),
    duration: 196,
    downloaded: true,
  },
  {
    id: "city-lights",
    title: "City Lights",
    artist: "Nova Harbor",
    album: "Afterglow",
    artwork:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    audio: require("../../assets/sounds/sample-3s.mp3"),
    duration: 238,
    downloaded: false,
    isFavorite: true,
  },
  {
    id: "violet-skies",
    title: "Violet Skies",
    artist: "Luna Vale",
    album: "Dream State",
    artwork:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    audio: require("../../assets/sounds/sample-3s.mp3"),
    duration: 202,
    downloaded: true,
  },
  {
    id: "glass-tides",
    title: "Glass Tides",
    artist: "Sora Lane",
    album: "Blue Horizon",
    artwork:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    audio: require("../../assets/sounds/sample-3s.mp3"),
    duration: 220,
    downloaded: false,
  },
  {
    id: "electric-dreams",
    title: "Electric Dreams",
    artist: "Mirage Unit",
    album: "Neon Forest",
    artwork:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    audio: require("../../assets/sounds/sample-3s.mp3"),
    duration: 246,
    downloaded: true,
  },
];

export const playlists: Playlist[] = [
  {
    id: "focus-flow",
    name: "Focus Flow",
    description: "Instrumentales para estudiar y crear",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    color: "#7c3aed",
    tracks: ["night-drive", "electric-dreams", "violet-skies"],
  },
  {
    id: "late-night",
    name: "Late Night",
    description: "Para cerrar el día con buen ritmo",
    cover:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    color: "#f97316",
    tracks: ["sunset-rhythm", "glass-tides", "city-lights"],
  },
  {
    id: "road-trip",
    name: "Road Trip",
    description: "Suenos, viajes y mucha energía",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    color: "#10b981",
    tracks: ["city-lights", "night-drive", "sunset-rhythm"],
  },
];

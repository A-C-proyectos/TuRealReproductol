export type Song = {
    id: string;
    title: string;
    artist: string;
    album?: string;
    artwork?: string;
    // Use `audio` for a bundled asset (require('./path.mp3')) or `audioUrl` for remote URLs
    audio?: any;
    audioUrl?: string;
    onlineUrl?: string;
    localUrl?: string; 
    duration?: number;
    downloaded?: boolean;
    isFavorite?: boolean;
};
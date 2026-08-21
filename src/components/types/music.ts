export type Song = {
    id: string;
    title: string;
    artist: string;
    album?: string;
    artwork?: string;
    onlineUrl?: string;
    localUrl?: string; 
    duration?: number;
    downloaded?: boolean;
    isFavorite?: boolean;
};
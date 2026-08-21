export type Song = {
    id: string;
    title: string;
    artist: string;
    album?: string;
    artwork?: string;
    duration?: number;
    url: string;
};
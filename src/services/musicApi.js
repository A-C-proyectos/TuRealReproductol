const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

export async function searchOnlineSongs(term) {
  const query = term.trim();
  if (!query) return [];
  if (!API_KEY) throw new Error("Configura EXPO_PUBLIC_YOUTUBE_API_KEY para buscar en YouTube");
  const params = new URLSearchParams({ key: API_KEY, q: query, part: "snippet", type: "video", videoCategoryId: "10", maxResults: "25" });
  const response = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`);
  if (!response.ok) throw new Error("No se pudo consultar YouTube");
  const data = await response.json();
  return (data.items || []).map((item) => ({
    id: `youtube-${item.id.videoId}`,
    videoId: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    album: "YouTube",
    artwork: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    onlineUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    downloaded: false,
  }));
}

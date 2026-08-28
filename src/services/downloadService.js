import { Directory, File, Paths } from "expo-file-system";

export async function downloadSongPreview(song) {
  if (!song.audioUrl) throw new Error("Esta canción no tiene preview descargable");
  const directory = new Directory(Paths.document, "downloads");
  directory.create({ idempotent: true, intermediates: true });
  const destination = new File(directory, `${song.id}.m4a`);
  const file = await File.downloadFileAsync(song.audioUrl, destination, { idempotent: true });
  if (!file?.exists) throw new Error("La descarga no terminó correctamente");
  return file.uri;
}

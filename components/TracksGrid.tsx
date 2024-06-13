import { GetSavedTracks } from "@/hooks/GetSavedTracks";
import AlbumCard from "./AlbumCard";

export async function TracksGrid() {
  const tracks = await GetSavedTracks();
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {tracks.map((track, index) => (
        <AlbumCard
          key={track.albumId + index}
          track={track}
          index={index}
          albumId={track.albumId}
        />
      ))}
    </div>
  );
}

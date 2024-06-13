import { GetSavedTracks } from "@/app/lib/actions";
import AlbumCard from "./AlbumCard";

export async function TracksGrid() {
  const albums = await GetSavedTracks();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {albums.map((album, index) => (
        <AlbumCard
          key={album.albumId + index}
          album={album}
          index={index}
        />
      ))}
    </div>
  );
}

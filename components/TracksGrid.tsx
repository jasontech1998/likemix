import AlbumCard from "./AlbumCard";
import { TAlbum } from "@/app/lib/actions";

interface TracksGridProps {
  albums: TAlbum[];
}

export function TracksGrid({ albums }: TracksGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
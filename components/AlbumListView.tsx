import { TAlbum } from "@/app/lib/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

interface AlbumListViewProps {
  albums: TAlbum[];
}

export function AlbumListView({ albums }: AlbumListViewProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border">
      {albums.map((album, index) => (
        <Link
          key={album.albumId + index}
          href={`/album/${album.albumId}`}
          className="flex items-center space-x-4 p-4 hover:bg-accent rounded-md transition-colors"
        >
          <Image
            src={album.albumImageUrl}
            alt={`Picture of ${album.albumName}`}
            width={50}
            height={50}
            className="rounded-md"
            unoptimized
            key={album.albumId}
          />
          <div>
            <p className="font-semibold">{album.albumName}</p>
            <p className="text-sm text-muted-foreground">{album.artistName}</p>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
}
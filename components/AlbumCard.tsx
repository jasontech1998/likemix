"use client";

import Image from "next/image";
import { TAlbum } from "@/app/lib/actions";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface TAlbumCardProps {
  album: TAlbum;
  index: number;
}

export default function AlbumCard({ album, index }: TAlbumCardProps) {
  return (
    <Link href={`/album/${album.albumId}`} className="block">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={album.albumImageUrl}
              alt={`Picture of ${album.albumName}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
              unoptimized
              key={album.albumId}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold truncate">{album.albumName}</h3>
            <p className="text-sm text-muted-foreground truncate">{album.artistName}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
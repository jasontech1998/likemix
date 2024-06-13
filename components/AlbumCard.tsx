"use client";

import Image from "next/image";
import { TAlbum } from "@/app/lib/actions";

import Link from "next/link";

interface TAlbumCardProps {
  track: TAlbum;
  index: number;
  albumId: string;
}

export default function AlbumCard({ track, index, albumId }: TAlbumCardProps) {

  return (
    <Link key={track.albumId + index} href={`/album/${albumId}`}>
      <Image
        src={track.albumImageUrl}
        alt={track.albumId}
        width={300}
        height={300}
        className="w-full h-auto"
      />
      <p className="text-white font-bold">
        {track.albumName} - {track.artistName}
      </p>
    </Link>
  );
}

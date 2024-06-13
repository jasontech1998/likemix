"use client";

import Image from "next/image";
import { TAlbum } from "@/app/lib/actions";

import Link from "next/link";

interface TAlbumCardProps {
  album: TAlbum;
  index: number;
}

export default function AlbumCard({ album, index }: TAlbumCardProps) {
  return (
    <Link
      key={album.albumId + index}
      href={`/album/${album.albumId}`}
      className="relative group"
      style={{ width: "250px", height: "250px" }}
    >
      <div className="relative w-full h-full">
        <Image
          src={album.albumImageUrl}
          alt={`Picture of ${album.albumName}`}
          width={250}
          height={250}
          className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"></div>
      </div>
      <p className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        {album.albumName} - {album.artistName}
      </p>
    </Link>
  );
}

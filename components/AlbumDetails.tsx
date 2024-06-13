import { GetAlbum } from "@/hooks/GetAlbum";

import { Slash } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Image from "next/image";

export async function AlbumDetails({ albumId }: { albumId: string }) {
  const album = await GetAlbum(albumId);
  return (
    <div className="flex flex-col items-center justify-center">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mx-2">
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {album.albumName} - {album.artistName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center mt-6 w-full max-w-2xl">
        <div className="mb-4">
          {album.albumImageUrl ? (
            <Image
              src={album.albumImageUrl}
              alt={album.albumId}
              width={200}
              height={200}
              className="w-full h-auto rounded-lg"
            />
          ) : null}
        </div>
        <p className="text-xl font-semibold">
          Your liked songs from {album.artistName}
        </p>
      </div>
    </div>
  );
}

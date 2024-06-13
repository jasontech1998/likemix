import { GetAlbumTracks } from "@/hooks/GetAlbumTracks";

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
import { GetAlbum } from "@/hooks/GetAlbum";
import { GetProfile } from "@/hooks/GetProfile";

import PlaylistButton from "@/components/PlaylistButton";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id: albumId } = params;

  const profile = await GetProfile();
  const savedTracks = await GetAlbumTracks(albumId);
  const trackUris = savedTracks.map((track) => track.uri);
  const album = await GetAlbum(albumId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
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
      <h1 className="text-4xl font-bold mt-6">Album Likes</h1>
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
      <div className="w-full max-w-2xl mt-6 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          <h4 className="mb-4 text-lg font-medium">Liked songs</h4>
          <ul className="w-full mb-4">
            {savedTracks.map((albumTrack, index) => (
              <li key={albumTrack.id + index} className="mb-2 p-2 border-b">
                <div className="text-base">{albumTrack.name}</div>
              </li>
            ))}
          </ul>
          <PlaylistButton
            trackUris={trackUris}
            profileId={profile.id}
          ></PlaylistButton>
        </div>
      </div>
    </div>
  );
}

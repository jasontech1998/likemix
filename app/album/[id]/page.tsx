"use client";

import React, { useEffect, useState } from "react";
import { useGetAlbumTracks } from "@/hooks/useGetAlbumTracks";
import { useParams, useRouter } from "next/navigation";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import { useGetAlbum } from "@/hooks/useGetAlbum";
import { useGetProfile } from "@/hooks/useGetProfile";
import useCreatePlaylistLink from "@/hooks/useCreatePlaylistLink";
import { Button } from "@/components/ui/button";
import CopyUrl from "@/components/CopyUrl";

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playlistCreated, setIsPlaylistCreated] = useState(false);
  const params = useParams<{ id: string }>();
  const { id: albumId } = params;

  const { profile } = useGetProfile();
  const { savedTracks, error } = useGetAlbumTracks(albumId);
  const { createPlaylist, playlistId, playlistUrl } = useCreatePlaylistLink();
  const { album } = useGetAlbum(albumId);

  useEffect(() => {
    if (playlistId && playlistUrl) {
      setIsPlaylistCreated(true);
    }
  }, [playlistId, playlistUrl]);

  const handleCreatePlaylist = () => {
    const trackUris = savedTracks.map((track) => track.uri);
    if (profile.id) {
      createPlaylist(profile.id, "My New Playlist", trackUris);
    } else {
      console.error("User ID is undefined");
    }
  };

  const handleTriggerDialog = () => {
    setIsDialogOpen(true);
    handleCreatePlaylist();
  };

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
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="flex flex-col items-center">
            <h4 className="mb-4 text-lg font-medium">Liked songs</h4>
            <ul className="w-full mb-4">
              {savedTracks.map((albumTrack, index) => (
                <li key={albumTrack.id + index} className="mb-2 p-2 border-b">
                  <div className="text-base">{albumTrack.name}</div>
                </li>
              ))}
            </ul>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleTriggerDialog}>Create Playlist</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Copy and Share!
                  </DialogTitle>
                </DialogHeader>
                {playlistCreated ? (
                  <CopyUrl url={playlistUrl}></CopyUrl>
                ) : null}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

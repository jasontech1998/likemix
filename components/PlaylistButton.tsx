"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreatePlaylistLink } from "@/app/lib/actions";
import CopyUrl from "./CopyUrl";
import { useToast } from "./ui/use-toast";
import PlaylistNameForm from "./PlaylistNameForm";

const PlaylistButton: React.FC<{ trackUris: string[]; profileId: string; albumName: string; userName: string }> = 
  ({ trackUris, profileId, albumName, userName }) => {
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const defaultPlaylistName = `${albumName} - Liked songs by ${userName}`;

  const createPlaylist = async (playlistName: string = defaultPlaylistName) => {
    const url = await CreatePlaylistLink(playlistName, trackUris, profileId);
    setPlaylistUrl(url);
    setShowForm(false);
    toast({ description: "Created shared playlist" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild><Button onClick={() => setShowForm(true)}>Share Songs</Button></DialogTrigger>
      <DialogContent className="w-5/6">
        <DialogHeader className="mb-2">
          <DialogTitle>{showForm ? "Create Playlist" : "Copy and Share!"}</DialogTitle>
        </DialogHeader>
        {showForm ? (
          <PlaylistNameForm onSubmit={createPlaylist} defaultName={defaultPlaylistName} />
        ) : playlistUrl && <CopyUrl url={playlistUrl} />}
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistButton;
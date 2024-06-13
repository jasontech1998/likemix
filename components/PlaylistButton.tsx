"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import CreatePlaylistLink from "@/hooks/CreatePlaylistLink";
import CopyUrl from "./CopyUrl";

interface TPlaylistButtonProps {
  trackUris: string[];
  profileId: string;
}

const PlaylistButton: React.FC<TPlaylistButtonProps> = ({
  trackUris,
  profileId,
}) => {
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);

  const onClick = async () => {
    const playlistUrl = await CreatePlaylistLink(
      "Playlist Name",
      trackUris,
      profileId
    );
    setPlaylistUrl(playlistUrl);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={onClick}>Create Playlist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Copy and Share!</DialogTitle>
        </DialogHeader>
        {playlistUrl && (
          <CopyUrl url={playlistUrl}></CopyUrl>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistButton;

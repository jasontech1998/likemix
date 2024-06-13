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

import { CreatePlaylistLink } from "@/app/lib/actions";
import CopyUrl from "./CopyUrl";
import { useToast } from "./ui/use-toast";

interface TPlaylistButtonProps {
  trackUris: string[];
  profileId: string;
}

const PlaylistButton: React.FC<TPlaylistButtonProps> = ({
  trackUris,
  profileId,
}) => {
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const { toast } = useToast()

  const onClick = async () => {
    const playlistUrl = await CreatePlaylistLink(
      "Spotify Shared Album",
      trackUris,
      profileId
    );
    setPlaylistUrl(playlistUrl);
    toast({
      description: "Created saved songs playlist",
    })

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={onClick}>Share Songs</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Copy and Share!</DialogTitle>
        </DialogHeader>
        {playlistUrl && <CopyUrl url={playlistUrl}></CopyUrl>}
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistButton;

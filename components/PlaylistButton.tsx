"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreatePlaylistLink } from "@/app/lib/actions";
import CopyUrl from "./CopyUrl";
import { useToast } from "./ui/use-toast";
import PlaylistNameForm from "./PlaylistNameForm";
import { Share } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    toast({
      description: "Created shared playlist",
      duration: 3000,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowForm(true)}
          className="w-full"
          variant="default"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Songs
        </Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 p-0">
        <Card>
          <CardHeader>
            <CardTitle>{showForm ? "Create Playlist" : "Copy and Share!"}</CardTitle>
          </CardHeader>
          <CardContent>
            {showForm ? (
              <PlaylistNameForm onSubmit={createPlaylist} defaultName={defaultPlaylistName} />
            ) : playlistUrl && <CopyUrl url={playlistUrl} />}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistButton;
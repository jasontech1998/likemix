import React, { useEffect } from "react";
import useCreatePlaylistLink from "@/hooks/useCreatePlaylistLink";

import { SpotifyAlbumTrack } from "@/hooks/useGetAlbumTracks";
import { Button } from "./ui/button";

interface CreatePlaylistButtonProps {
  userId: string | undefined;
  savedTracks: SpotifyAlbumTrack[];
}

const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({
  userId,
  savedTracks,
}) => {
  const trackUris = savedTracks.map((track) => track.uri);
  const { createPlaylist, loading, error, playlistId, playlistUrl } =
    useCreatePlaylistLink();

  const handleCreatePlaylist = () => {
    if (userId) {
      createPlaylist(userId, "My New Playlist", trackUris);
    } else {
      console.error("User ID is undefined");
    }
  };

  useEffect(() => {
    if (playlistId) {
      console.log("Playlist created with ID:", playlistId);
      if (playlistUrl) {
        console.log("Playlist URL:", playlistUrl);
      }
    }
  }, [playlistId, playlistUrl]);

  return (
    <div>
      <Button onClick={handleCreatePlaylist} disabled={loading}>
        {loading ? "Creating..." : "Create Playlist"}
      </Button>
      {error && <p>Error: {error}</p>}
      {playlistUrl && <p>Playlist created! {playlistUrl}</p>}
    </div>
  );
};

export default CreatePlaylistButton;

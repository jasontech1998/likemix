// useGetAlbumTracks.ts
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface SpotifyAlbumTrack {
  id: string;
  name: string;
}

export function useGetAlbumTracks(albumId: string) {
  const { data: session } = useSession();
  const [albumTracks, setAlbumTracks] = useState<SpotifyAlbumTrack[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: {
              Authorization: "Bearer " + session.accessToken,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch album tracks");
          }

          const data = await response.json();
          const tracks = data.items;
          setAlbumTracks(tracks);
          setError(null);
        } catch (err) {
          console.error("An error occurred while fetching album tracks:", err);
          setError("Failed to load album tracks");
        }
      }
    };

    fetchAlbumTracks();
  }, [albumId, session]);

  return { albumTracks, error };
}

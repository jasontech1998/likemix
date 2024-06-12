import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { unstable_noStore as noStore } from 'next/cache';
import { TAlbum } from "./useGetSavedTracks";

const albumInitialState = {
    albumId: "",
    albumImageUrl: "",
    albumName: "",
    artistName: "",
  };

export function useGetAlbum(albumId: string) {
  const { data: session } = useSession();
  const [album, setAlbum] = useState<TAlbum>(albumInitialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      noStore();
      if (session?.accessToken) {
        try {
          const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
              Authorization: "Bearer " + session.accessToken,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }

          const data = await response.json();
          const albumData = {
            albumId: data.id,
            albumImageUrl: data.images[0].url,
            albumName: data.name,
            artistName: data.artists[0].name
          }
          setAlbum(albumData);
          setError(null);
        } catch (err) {
          console.error("An error occurred while fetchinchAlbum:", err);
          setError("Failed to loachAlbum");
        }
      }
    };

    fetchAlbum();
  }, [albumId, session]);

  return { album, error };
}

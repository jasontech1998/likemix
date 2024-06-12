import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { unstable_noStore as noStore } from "next/cache";

interface SpotifyTrack {
  album: {
    id: string;
    images: { url: string }[];
    name: string;
  };
  name: string;
  artists: { name: string }[];
}

export interface TAlbum {
  albumId: string;
  albumImageUrl: string;
  albumName: string;
  artistName: string;
}

const albumInitialState = {
  albumId: "",
  albumImageUrl: "",
  albumName: "",
  artistName: "",
};

export function useGetSavedTracks() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<TAlbum[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedTracks = async () => {
      noStore();
      if (session?.accessToken) {
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/tracks?limit=21",
            {
              headers: {
                Authorization: "Bearer " + session.accessToken,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch saved tracks");
          }

          const data = await response.json();
          const tracks = data.items.map((item: { track: SpotifyTrack }) => {
            const { album, artists } = item.track;
            const artistName = artists[0].name;
            return {
              albumId: album.id,
              albumImageUrl: album.images[0].url,
              albumName: album.name,
              artistName,
            };
          });
          setTracks(tracks);
          setError(null);
        } catch (err) {
          console.error("An error occurred while fetching saved tracks:", err);
          setError("Failed to load saved tracks");
        }
      }
    };

    fetchSavedTracks();
  }, [session]);

  return { tracks, error };
}

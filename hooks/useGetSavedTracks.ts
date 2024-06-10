import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    name: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
}

export function useGetSavedTracks() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedTracks = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
            headers: {
              Authorization: "Bearer " + session.accessToken,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch saved tracks");
          }

          const data = await response.json();
          setTracks(data.items.map((item: { track: SpotifyTrack }) => item.track));
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

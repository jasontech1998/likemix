import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { unstable_noStore as noStore } from 'next/cache';

export interface SpotifyAlbumTrack {
  id: string;
  name: string;
  uri: string;
}

type CheckUserSavedTracksResponse = boolean[];

export function useGetAlbumTracks(albumId: string) {
  const { data: session } = useSession();
  const [savedTracks, setSavedTracks] = useState<SpotifyAlbumTrack[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      noStore();
      if (session?.accessToken && albumId) {
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
          const tracks: SpotifyAlbumTrack[] = data.items;

          setError(null);

          const trackIds = tracks.map(track => track.id);
          await checkUserSavedTracks(trackIds, tracks, session.accessToken);
        } catch (err) {
          console.error("An error occurred while fetching album tracks:", err);
          setError("Failed to load album tracks");
        }
      }
    };

    const checkUserSavedTracks = async (trackIds: string[], tracks: SpotifyAlbumTrack[], accessToken: string) => {
      noStore();
      const ids = trackIds.join(',');
      const url = `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to check user saved tracks');
        }

        const data: CheckUserSavedTracksResponse = await response.json();

        const savedTracks = tracks.filter((track, index) => data[index]);
        console.log(savedTracks);
        setSavedTracks(savedTracks);
      } catch (error) {
        console.error('Error checking user saved tracks:', error);
        setSavedTracks([]);
      }
    };

    fetchAlbumTracks();
  }, [albumId, session]);

  return { savedTracks, error };
}

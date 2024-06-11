import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface SpotifyAlbumTrack {
  id: string;
  name: string;
}

type CheckUserSavedTracksResponse = boolean[];

export function useGetAlbumTracks(albumId: string) {
  const { data: session } = useSession();
  const [albumTracks, setAlbumTracks] = useState<SpotifyAlbumTrack[]>([]);
  const [savedStatus, setSavedStatus] = useState<CheckUserSavedTracksResponse>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
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

          console.log(tracks);
          setAlbumTracks(tracks);
          setError(null);

          // Fetch saved status of tracks
          const trackIds = tracks.map(track => track.id);
          checkUserSavedTracks(trackIds, session.accessToken);
        } catch (err) {
          console.error("An error occurred while fetching album tracks:", err);
          setError("Failed to load album tracks");
        }
      }
    };

    const checkUserSavedTracks = async (trackIds: string[], accessToken: string) => {
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
        console.log('saved tracks', data);
        setSavedStatus(data);
      } catch (error) {
        console.error('Error checking user saved tracks:', error);
        setSavedStatus(new Array(trackIds.length).fill(false));
      }
    };

    fetchAlbumTracks();
  }, [albumId, session]);

  return { albumTracks, savedStatus, error };
}

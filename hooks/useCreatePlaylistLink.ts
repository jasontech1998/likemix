import { useState } from 'react';
import { useSession } from 'next-auth/react';

const useCreatePlaylistLink = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);

  const createPlaylist = async (userId: string, playlistName: string, savedTracks: string[]) => {
    setLoading(true);
    setError(null);

    if (session?.accessToken) {
      try {
        // Create the playlist
        const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
            description: 'My playlist description',
            public: false,
          }),
        });

        if (!createPlaylistResponse.ok) {
          throw new Error('Failed to create playlist');
        }

        const playlistData = await createPlaylistResponse.json();
        const newPlaylistId = playlistData.id;
        const newPlaylistUrl = playlistData.external_urls.spotify;
        setPlaylistId(newPlaylistId);
        setPlaylistUrl(newPlaylistUrl);

        // Add tracks to the playlist
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: savedTracks,
          }),
        });

        if (!addTracksResponse.ok) {
          throw new Error('Failed to add tracks to the playlist');
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('Access token is missing');
    }
  };

  return { createPlaylist, loading, error, playlistId, playlistUrl };
};

export default useCreatePlaylistLink;

import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

export interface SpotifyAlbumTrack {
  id: string;
  name: string;
  uri: string;
}

const savedTracksInitialState = {
  id: '',
  name: '',
  uri: '',
}

type CheckUserSavedTracksResponse = boolean[];

export async function GetAlbumTracks(
  albumId: string
): Promise<SpotifyAlbumTrack[]> {
  const session = await auth();
  noStore();

  try {
    // Fetch album tracks
    const albumTracksResponse = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        headers: {
          Authorization: "Bearer " + session?.token,
        },
      }
    );

    if (!albumTracksResponse.ok) {
      throw new Error("Failed to fetch album tracks");
    }

    const albumTracksData = await albumTracksResponse.json();
    const tracks: SpotifyAlbumTrack[] = albumTracksData.items;

    if (!tracks || tracks.length === 0) {
      return [];
    }

    const trackIds = tracks.map((track) => track.id).join(",");
    const checkSavedTracksUrl = `https://api.spotify.com/v1/me/tracks/contains?ids=${trackIds}`;
    const checkSavedTracksResponse = await fetch(checkSavedTracksUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!checkSavedTracksResponse.ok) {
      throw new Error("Failed to check user saved tracks");
    }

    const checkSavedTracksData: CheckUserSavedTracksResponse =
      await checkSavedTracksResponse.json();

    const savedTracks: SpotifyAlbumTrack[] = tracks.filter(
      (track, index) => checkSavedTracksData[index]
    );

    return savedTracks;
  } catch (error) {
    console.error("An error occurred:", error);
    return [savedTracksInitialState];
  }
}

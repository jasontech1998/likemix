import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

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

export async function GetSavedTracks(): Promise<TAlbum[]> {
  const session = await auth();
  noStore();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks?limit=21",
      {
        headers: {
          Authorization: "Bearer " + session?.token,
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
    }) as TAlbum[];
    return tracks;
  } catch (err) {
    console.error("An error occurred while fetching saved tracks:", err);
    return [albumInitialState];
  }
}

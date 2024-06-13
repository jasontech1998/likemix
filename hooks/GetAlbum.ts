import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";


const albumInitialState = {
  albumId: "",
  albumImageUrl: "",
  albumName: "",
  artistName: "",
};

export async function GetAlbum(albumId: string) {
  const session = await auth();
  noStore();
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: "Bearer " + session?.token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    const albumData = {
      albumId: data.id,
      albumImageUrl: data.images[0].url,
      albumName: data.name,
      artistName: data.artists[0].name,
    };
    return albumData;
  } catch (err) {
    console.error("An error occurred while fetchinchAlbum:", err);
    return albumInitialState;
  }
}

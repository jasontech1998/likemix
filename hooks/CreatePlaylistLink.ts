"use server";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

export async function CreatePlaylistLink(
  playlistName: string,
  savedTracks: any,
  userId: string
) {
  const session = await auth();
  noStore();
  console.log("create playlist link");
  try {
    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: "My playlist description",
          public: false,
        }),
      }
    );

    if (!createPlaylistResponse.ok) {
      throw new Error("Failed to create playlist");
    }

    const playlistData = await createPlaylistResponse.json();

    const { id } = playlistData;
    const newPlaylistUrl = playlistData.external_urls.spotify;

    const playlistUrl = newPlaylistUrl;

    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: savedTracks,
        }),
      }
    );

    if (!addTracksResponse.ok) {
      throw new Error("Failed to add tracks to the playlist");
    }

    return playlistUrl;
  } catch (error) {
    console.log("error");
  }
}

export default CreatePlaylistLink;

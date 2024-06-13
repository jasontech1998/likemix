'use server';

import { unstable_noStore as noStore } from "next/cache";

import { auth } from "@/auth";

interface SpotifyUserProfile {
  display_name: string;
  email: string;
  images: { url: string }[];
  id: string;
}

const profileInitialState = {
  display_name: "",
  email: "",
  images: [{ url: "" }],
  id: "",
};

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

export interface SpotifyAlbumTrack {
  id: string;
  name: string;
  uri: string;
}

const savedTracksInitialState = {
  id: "",
  name: "",
  uri: "",
};

type CheckUserSavedTracksResponse = boolean[];

export async function CreatePlaylistLink(
  playlistName: string,
  savedTracks: any,
  userId: string
) {
  const session = await auth();
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

export async function GetAlbum(albumId: string) {
  const session = await auth();
  // noStore();
  // await new Promise((resolve) => setTimeout(resolve, 3000));
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

export async function GetSavedTracks(): Promise<TAlbum[]> {
  const session = await auth();
  noStore();
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks?limit=50",
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
    const albumIds = new Set<string>();
    const albums = data.items.map((item: { track: SpotifyTrack }) => {
      const { album, artists } = item.track;
      const artistName = artists[0].name;

      if (!albumIds.has(album.id)) {
        albumIds.add(album.id);
        return {
          albumId: album.id,
          albumImageUrl: album.images[0].url,
          albumName: album.name,
          artistName,
        };
      }
      return null;
    }).filter((track: TAlbum) => track !== null) as TAlbum[]; // filter out null values as TAlbum[];

    return albums;
  } catch (err) {
    console.error("An error occurred while fetching saved tracks:", err);
    return [albumInitialState];
  }
}

export async function GetProfile(): Promise<SpotifyUserProfile> {
  const session = await auth();
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + session?.token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    return data as SpotifyUserProfile;
  } catch (error) {
    console.error("An error occurred while fetching profile:", error);
    return profileInitialState;
  }
}

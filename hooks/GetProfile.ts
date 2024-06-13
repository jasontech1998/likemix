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

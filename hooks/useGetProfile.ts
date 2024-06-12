import { unstable_noStore as noStore } from "next/cache";

interface SpotifyUserProfile {
  display_name: string;
  email: string;
  images: { url: string }[];
  id: string;
}

export async function GetProfile(token: string | undefined): Promise<SpotifyUserProfile | null> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    noStore();
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    return data as SpotifyUserProfile;
  } catch (error) {
    console.error("An error occurred while fetching profile:", error);
    throw new Error("Failed to load profile");
  }
}

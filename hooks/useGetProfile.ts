import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { unstable_noStore as noStore } from "next/cache";

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

export function useGetProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<SpotifyUserProfile>(profileInitialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      noStore();
      if (session?.accessToken) {
        try {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + session.accessToken,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }

          const data = await response.json();
          setProfile(data);
          setError(null);
        } catch (err) {
          console.error("An error occurred while fetching profile:", err);
          setError("Failed to load profile");
        }
      }
    };

    fetchProfile();
  }, [session]);

  return { profile, error };
}

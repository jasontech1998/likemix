import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface SpotifyUserProfile {
  display_name: string;
  email: string;
  images: { url: string }[];
}

export function useGetProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<SpotifyUserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
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

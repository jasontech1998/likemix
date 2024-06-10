"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Logout from "@/components/logout";

interface SpotifyUserProfile {
    display_name: string;
    email: string;
    images: { url: string }[];
  }

export default function Page() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<SpotifyUserProfile | null>(null);


  useEffect(() => {
    async function fetchProfile() {
      if (session?.accessToken) {
        const profile = await getProfile(session.accessToken);
        setUserProfile(profile);
      }
    }

    fetchProfile();
  }, [session]);

  async function getProfile(accessToken: string) {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();
    return data;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
      {userProfile && (
        <div>
          <h2>Welcome, {userProfile.display_name}</h2>
        </div>
      )}
      <Logout />
    </main>
  );
}

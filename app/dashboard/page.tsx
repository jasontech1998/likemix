"use client";

import React, { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useGetSavedTracks } from "@/hooks/useGetSavedTracks";

import AlbumCard from "@/components/AlbumCard";
import Logout from "@/components/Logout";
import Loading from "./loading";

import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    const isUnAuthenticated = status === "unauthenticated";
    if (isUnAuthenticated) {
      router.push("/");
    }
  }, [status, router]);
  
  const { profile, error } = useGetProfile();
  const { tracks } = useGetSavedTracks();

  const albumCard__onClick = (albumId: string) => {
    router.push(`/album/${albumId}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
      {error && <p>Error: {error}</p>}
      {profile && (
        <div>
          <h2>Welcome, {profile.display_name}</h2>
        </div>
      )}
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {tracks.map((track, index) => (
            <AlbumCard
              key={track.albumId + index}
              track={track}
              index={index}
              userId={profile?.id}
              onClick={albumCard__onClick}
            />
          ))}
        </div>
      </Suspense>
      <Logout />
    </main>
  );
}

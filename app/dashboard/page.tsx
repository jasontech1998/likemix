"use client";

import React, { Suspense } from "react";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useGetSavedTracks } from "@/hooks/useGetSavedTracks";

import AlbumCard from "@/components/AlbumCard";
import Logout from "@/components/logout";
import Loading from "./loading";

export default function Page() {
  const { profile, error } = useGetProfile();
  const { tracks } = useGetSavedTracks();

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
            />
          ))}
        </div>
      </Suspense>
      <Logout />
    </main>
  );
}

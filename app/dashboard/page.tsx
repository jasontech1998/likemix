"use client";

import { useGetProfile } from "@/hooks/useGetProfile";
import { useGetSavedTracks } from "@/hooks/useGetSavedTracks";

import TrackCard from "@/components/TrackCard";
import Logout from "@/components/logout";

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
      <div className="grid grid-cols-3 gap-4 mt-8">
        {tracks.map((track, index) => (
          <TrackCard
            key={track.albumId + index}
            track={track}
            index={index}
          />
        ))}
      </div>
      <Logout />
    </main>
  );
}

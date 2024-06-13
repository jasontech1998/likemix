import React, { Suspense } from "react";
import { GetProfile } from "@/hooks/GetProfile";
import { GetSavedTracks, TAlbum } from "@/hooks/GetSavedTracks";
import AlbumCard from "@/components/AlbumCard";
import Logout from "@/components/Logout";
import Loading from "./loading";

export default async function Page() {
  const profile = await GetProfile();
  const tracks = await GetSavedTracks();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
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
              albumId={track.albumId}
            />
          ))}
        </div>
      </Suspense>
      <Logout />
    </main>
  );
}

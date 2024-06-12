import React, { Suspense } from "react";
import { GetProfile } from "@/hooks/useGetProfile";
import AlbumCard from "@/components/AlbumCard";
import Logout from "@/components/Logout";
import Loading from "./loading";

import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  console.log("jwt: ", session?.token);
  const profile = await GetProfile(session?.token);
  const albumCard__onClick = (albumId: string) => {
    // Handle click action
  };

  const tracks = [
    {
      albumId: "",
      albumImageUrl: "",
      albumName: "",
      artistName: "",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
      <Suspense fallback={<Loading />}>
        {profile && (
          <div>
            <h2>Welcome, {profile.display_name}</h2>
          </div>
        )}
      </Suspense>
      {/* <div className="grid grid-cols-3 gap-4 mt-8">
        {tracks.map((track, index) => (
          <AlbumCard
            key={track.albumId + index}
            track={track}
            index={index}
            userId={profile?.id}
            onClick={albumCard__onClick}
          />
        ))}
      </div> */}
      <Logout />
    </main>
  );
}

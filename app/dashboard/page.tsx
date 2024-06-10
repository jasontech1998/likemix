"use client";

import { useGetProfile } from "@/hooks/useGetProfile";
import { TransformedTrack, useGetSavedTracks } from "@/hooks/useGetSavedTracks";
import { useGetAlbumTracks } from "@/hooks/useGetAlbumTracks";

import Image from "next/image";
import Logout from "@/components/logout";

export default function Page() {
  const { profile, error } = useGetProfile();
  const { tracks } = useGetSavedTracks();

  const album__onClicked = (track: TransformedTrack) => {
    // const { albumTracks, error } = useGetAlbumTracks(track.albumId);

    // if (error) {
    //   console.error("An error occurred while fetching album tracks:", error);
    //   return;
    // }

    console.log(track);
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
      <div className="grid grid-cols-3 gap-4 mt-8">
        {tracks.map((track, index) => (
          <div
            key={track.albumId + index}
            className="relative"
            onClick={() => album__onClicked(track)}
          >
            <Image
              src={track.albumImageUrl}
              alt={track.albumId}
              width={300}
              height={300}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-bold">
                {track.albumName} - {track.artistName}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Logout />
    </main>
  );
}

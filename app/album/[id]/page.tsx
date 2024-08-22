import { AlbumDetailsSkeleton, LikedTracksSkeleton } from "@/components/skeletons";

import { Suspense } from "react";
import { AlbumDetails } from "@/components/AlbumDetails";
import { LikedTracks } from "@/components/LikedTracks";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id: albumId } = params;

  return (
    <div className="flex flex-col p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8">
        <div className="w-full lg:w-1/2">
          <Suspense fallback={<AlbumDetailsSkeleton />}>
            <AlbumDetails albumId={albumId} />
          </Suspense>
        </div>
        <div className="w-full lg:w-1/2 lg:pt-[45px]">
          <Suspense fallback={<LikedTracksSkeleton />}>
            <LikedTracks albumId={albumId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
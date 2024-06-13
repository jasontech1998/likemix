import {
  AlbumDetailsSkeleton,
  LikedTracksSkeleton,
} from "@/components/skeletons";

import { Suspense } from "react";
import { AlbumDetails } from "@/components/AlbumDetails";
import { LikedTracks } from "@/components/LikedTracks";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id: albumId } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Suspense fallback={<AlbumDetailsSkeleton />}>
        <AlbumDetails albumId={albumId}></AlbumDetails>
      </Suspense>
      <Suspense fallback={<LikedTracksSkeleton />}>
        <LikedTracks albumId={albumId}></LikedTracks>
      </Suspense>
    </div>
  );
}

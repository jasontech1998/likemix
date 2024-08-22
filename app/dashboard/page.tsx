"use client";

import React, { useState, useEffect } from "react";
import { TracksGrid } from "@/components/TracksGrid";
import { AlbumListView } from "@/components/AlbumListView";
import {
  AlbumListViewSkeleton,
  TracksGridSkeleton,
} from "@/components/skeletons";
import ListViewToggle from "@/components/ListViewToggle";
import { GetSavedTracks } from "@/app/lib/actions";
import { TAlbum } from "@/app/lib/actions";

export default function Page() {
  const [isGridView, setIsGridView] = useState(true);
  const [albums, setAlbums] = useState<TAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbums() {
      const fetchedAlbums = await GetSavedTracks();
      setAlbums(fetchedAlbums);
      setLoading(false);
    }
    fetchAlbums();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 sm:mb-0">
          Current Rotation
        </h1>
        <ListViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="w-full">
        {loading ? (
          isGridView ? (
            <TracksGridSkeleton />
          ) : (
            <AlbumListViewSkeleton />
          )
        ) : (
          <>
            {isGridView ? (
              <TracksGrid albums={albums} />
            ) : (
              <AlbumListView albums={albums} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

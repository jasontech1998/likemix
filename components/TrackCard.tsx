"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import { TransformedTrack } from "@/hooks/useGetSavedTracks";
import { useGetAlbumTracks } from "@/hooks/useGetAlbumTracks";
import { useState } from "react";

interface TrackCardProps {
  track: TransformedTrack;
  index: number;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, index }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { albumTracks, error } = useGetAlbumTracks(dialogOpen ? track.albumId : "");

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div
          key={track.albumId + index}
          className="relative"
          onClick={openDialog}
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center">
            <div className="basis-30%">
              <Image
                src={track.albumImageUrl}
                alt={track.albumId}
                width={150}
                height={150}
                className="w-full h-auto"
              />
            </div>
            <div className="basis-70% p-4">
              <DialogTitle className="text-xl font-bold">
                {track.albumName} - {track.artistName}
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {albumTracks.map((albumTrack) => (
                <li key={albumTrack.id} className="py-1">
                  {albumTrack.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={closeDialog}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default TrackCard;

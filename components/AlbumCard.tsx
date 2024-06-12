import Image from "next/image";
import { TAlbum } from "@/hooks/useGetSavedTracks";
import { useGetAlbumTracks } from "@/hooks/useGetAlbumTracks";
import { useState } from "react";

interface TrackCardProps {
  track: TAlbum;
  index: number;
  userId: string | undefined;
  onClick: (albumId: string) => void;
}

const AlbumCard: React.FC<TrackCardProps> = ({ track, index, userId, onClick }) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const { savedTracks, error } = useGetAlbumTracks(
    dialogOpen ? track.albumId : ""
  );

  const albumCard__onClick = () => {
    onClick(track.albumId);
  };

  return (
    <div key={track.albumId + index} onClick={albumCard__onClick}>
      <Image
        src={track.albumImageUrl}
        alt={track.albumId}
        width={300}
        height={300}
        className="w-full h-auto"
      />
      <p className="text-white font-bold">
        {track.albumName} - {track.artistName}
      </p>
    </div>
  );
};

export default AlbumCard;

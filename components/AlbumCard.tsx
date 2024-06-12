import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Separator } from "@/components/ui/separator";
  
  import Image from "next/image";
  import CreatePlaylistButton from "./CreatePlaylistButton";
  import { TransformedTrack } from "@/hooks/useGetSavedTracks";
  import { useGetAlbumTracks } from "@/hooks/useGetAlbumTracks";
  import { useState } from "react";
  
  interface TrackCardProps {
    track: TransformedTrack;
    index: number;
    userId: string | undefined;
  }
  
  const AlbumCard: React.FC<TrackCardProps> = ({ track, index, userId }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { savedTracks, error } = useGetAlbumTracks(
      dialogOpen ? track.albumId : ""
    );
  
    const openDialog = () => {
      setDialogOpen(true);
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
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <div className="basis-70% p-4">
                <DialogTitle className="text-xl font-bold">
                  {track.albumName} - {track.artistName}
                </DialogTitle>
                <DialogDescription>
                  Your liked songs from {track.albumName}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="m-auto">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                    Liked songs
                  </h4>
                  {savedTracks.map((albumTrack, index) => (
                    <div key={albumTrack.id + index}>
                      <div className="text-sm">
                        {albumTrack.name}
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          <DialogFooter>
            <CreatePlaylistButton userId={userId} savedTracks={savedTracks}></CreatePlaylistButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AlbumCard;
  
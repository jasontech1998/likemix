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
  import { Button } from "@/components/ui/button";
  
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
    const { albumTracks, savedStatus, error } = useGetAlbumTracks(
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
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
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
                  {albumTracks.map((albumTrack, index) => (
                    <div key={albumTrack.id}>
                      <div className="text-sm">
                        {albumTrack.name} {savedStatus[index] ? "(Liked)" : "(Not Liked)"}
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Send liked songs</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default TrackCard;
  
import { GetAlbumTracks, GetProfile } from "@/app/lib/actions";
import PlaylistButton from "./PlaylistButton";
import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export async function LikedTracks({ albumId }: { albumId: string }) {
  const profile = await GetProfile();
  const savedTracks = await GetAlbumTracks(albumId);
  const trackUris = savedTracks.map((track) => track.uri);

  return (
    <Card className="w-[380px] mt-4">
      <CardHeader>
        <CardTitle>Liked songs</CardTitle>
        <CardDescription>
          You have {savedTracks.length} liked songs.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {savedTracks.map((albumTrack, index) => (
          <>
            <div
              key={albumTrack.id + index}
              className="items-start last:mb-0 last:pb-0"
            >
              <p className="text-base">{albumTrack.name}</p>
            </div>
            <Separator />
          </>
        ))}
      </CardContent>
      <CardFooter className="justify-end">
        <PlaylistButton
          trackUris={trackUris}
          profileId={profile.id}
        ></PlaylistButton>
      </CardFooter>
    </Card>
  );
}

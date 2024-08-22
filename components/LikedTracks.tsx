import { GetAlbumTracks, GetProfile, GetAlbum } from "@/app/lib/actions";
import PlaylistButton from "./PlaylistButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export async function LikedTracks({ albumId }: { albumId: string }) {
  const profile = await GetProfile();
  const album = await GetAlbum(albumId);
  const savedTracks = await GetAlbumTracks(albumId);
  const trackUris = savedTracks.map((track) => track.uri);

  return (
    <div className="w-full">
      <div className="mb-6 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{album.albumName}</h2>
        <p className="text-xl md:text-2xl text-muted-foreground">{album.artistName}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Liked Songs ({savedTracks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {savedTracks.map((albumTrack, index) => (
              <div key={albumTrack.id + index} className="py-2">
                <p className="text-base">{albumTrack.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <PlaylistButton
            trackUris={trackUris}
            profileId={profile.id}
            albumName={album.albumName}
            userName={profile.display_name}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
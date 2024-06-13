import { GetAlbumTracks, GetProfile } from "@/app/lib/actions";
import PlaylistButton from "./PlaylistButton";

export async function LikedTracks({ albumId }: { albumId: string }) {
  const profile = await GetProfile();
  const savedTracks = await GetAlbumTracks(albumId);
  const trackUris = savedTracks.map((track) => track.uri);

  return (
    <div className="w-full max-w-lg mt-6 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <h4 className="mb-4 text-lg font-medium">Liked songs</h4>
        <ul className="w-full mb-4">
          {savedTracks.map((albumTrack, index) => (
            <li key={albumTrack.id + index} className="mb-2 p-2 border-b">
              <div className="text-base">{albumTrack.name}</div>
            </li>
          ))}
        </ul>
        <PlaylistButton
          trackUris={trackUris}
          profileId={profile.id}
        ></PlaylistButton>
      </div>
    </div>
  );
}

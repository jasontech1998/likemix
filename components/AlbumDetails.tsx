import { GetAlbum } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export async function AlbumDetails({ albumId }: { albumId: string }) {
  const album = await GetAlbum(albumId);
  return (
    <div className="flex flex-col w-full">
      <div className="mb-8">
        <Link href="/dashboard" passHref legacyBehavior>
          <Button variant="ghost" className="text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <div className="flex justify-center lg:justify-start">
        {album.albumImageUrl ? (
          <Image
            src={album.albumImageUrl}
            alt={album.albumId}
            width={500}
            height={500}
            className="w-full max-w-[500px] h-auto rounded-lg"
          />
        ) : null}
      </div>
    </div>
  );
}
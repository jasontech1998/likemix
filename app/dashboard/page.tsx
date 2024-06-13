import React, { Suspense } from "react";
import { GetProfile } from "@/app/lib/actions";
import Logout from "@/components/Logout";
import { TracksGrid } from "@/components/TracksGrid";
import { TracksGridSkeleton } from "@/components/skeletons";

export default async function Page() {
  const profile = await GetProfile();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
      {/* <Logout /> */}
      <Suspense fallback={<TracksGridSkeleton />}>
        <TracksGrid />
      </Suspense>
    </main>
  );
}

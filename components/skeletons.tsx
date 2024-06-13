const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function AlbumDetailsSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col items-center justify-center`}
    >
      <div className="h-10 bg-gray-200 rounded w-full"></div>
      <div className="flex flex-col items-center mt-6 w-full max-w-2xl animate-pulse">
        <div className="mb-4">
          <div className="w-72 h-72 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function LikedTracksSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden w-full max-w-lg mt-6 p-6 bg-white shadow-lg rounded-lg animate-pulse`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 w-32 h-4 bg-gray-200 rounded"></div>
        <ul className="w-full mb-4">
          <li className="mb-2 p-2 border-b">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
          <li className="mb-2 p-2 border-b">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
          <li className="mb-2 p-2 border-b">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
          <li className="mb-2 p-2 border-b">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
        </ul>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}

export function TrackSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden h-56 w-60 rounded-md bg-gray-200`}
    />
  );
}

export function TracksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
    </div>
  );
}

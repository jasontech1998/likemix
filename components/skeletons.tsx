const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function AlbumDetailsSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden flex flex-col items-center text-center w-full`}>
      <div className="w-full max-w-2xl mb-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      </div>
      <div className="flex flex-col items-center mt-6 w-full max-w-2xl">
        <div className="mb-4">
          <div className="w-[200px] h-[200px] bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function LikedTracksSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden w-[380px] mt-4 rounded-lg`}>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <ul className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <li key={index} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-px bg-gray-200 w-full"></div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export function TrackSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg`}>
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function TracksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(12)].map((_, index) => (
        <TrackSkeleton key={index} />
      ))}
    </div>
  );
}

export function AlbumListViewSkeleton() {
  return (
    <div className={`${shimmer} h-[calc(100vh-200px)] w-full rounded-md border`}>
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border-b last:border-b-0">
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-md"></div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-[150px]"></div>
            <div className="h-4 bg-gray-200 rounded w-[100px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
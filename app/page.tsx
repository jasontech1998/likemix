import Login from "@/components/Login";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="max-w-4xl w-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          Share Your Spotify Favorites
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
          Quickly share your saved songs from any album with friends. Connect your Spotify account and start sharing your music taste effortlessly.
        </p>
        <div className="mt-10">
          <Login />
        </div>
      </div>
    </div>
  );
}
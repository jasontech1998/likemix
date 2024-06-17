import Login from "@/components/Login";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 pb-0">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
        Spotify Shared
      </h1>
      <p className="leading-7 text-center [&:not(:first-child)]:mt-6">
        Quickly share your saved songs from any album
      </p>
      <Login />
    </main>
  );
}

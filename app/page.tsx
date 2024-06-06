import Login from "@/components/login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Spotify Shared
      </h1>
      <Login />
    </main>
  );
}

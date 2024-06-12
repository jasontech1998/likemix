"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Login from "@/components/login";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = status === "authenticated";
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Spotify Shared
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Quickly share your saved songs from any album
      </p>
      <Login />
    </main>
  );
}

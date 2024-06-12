"use client";

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="m-4 flex flex-col">
      <Button className="m-4" onClick={() => signIn("spotify", { callbackUrl: '/dashboard' })}>
        Sign in with Spotify
      </Button>
    </div>
  );
}

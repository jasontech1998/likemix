"use client";

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <Button
      className="px-8 py-3 text-lg font-semibold"
      onClick={() => signIn("spotify", { callbackUrl: '/dashboard' })}
    >
      Sign in with Spotify
    </Button>
  );
}

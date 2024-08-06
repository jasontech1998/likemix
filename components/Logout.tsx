"use client";

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";

export default function Logout() {
  return (
    <Button variant="ghost" onClick={() => signOut({callbackUrl: '/'})}>
      Sign Out
    </Button>
  );
}
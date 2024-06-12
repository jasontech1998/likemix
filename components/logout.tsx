"use client";

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button";

export default function Logout() {

  return (
    <div className="m-4 flex flex-col">
      <Button className="m-4" onClick={() => signOut({callbackUrl: '/'})}>
        Sign Out
      </Button>
    </div>
  );
}

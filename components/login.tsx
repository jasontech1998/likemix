"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TLoginProps {
  isAuthenticated: boolean;
}

export default function Login({ isAuthenticated }: TLoginProps) {
  const onClick = () => {
    console.log("Login button clicked");
  };

  return (
    <div className="m-4 flex flex-col">
      {isAuthenticated ? (
        <Button className="m-4">
          <Link href="/api/auth/signout">Logout</Link>
        </Button>
      ) : (
        <Button className="m-4">
          <Link href="/api/auth/signin">Login to Spotify</Link>
        </Button>
      )}
    </div>
  );
}

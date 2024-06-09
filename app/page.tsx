'use client';

import { useSession } from 'next-auth/react';
import Login from "@/components/login";
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);

  // const fetchUserData = async () => {
  //   const token = session ? session.access_token : '';
  //   const response = await fetch('https://api.spotify.com/v1/me', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch user data');
  //   }
  
  //   return response.json();
  // };

  const isAuthenticated = status === 'authenticated';
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Spotify Shared
      </h1>
      <p>{status}{' '}
        {status === 'authenticated' && session.user?.name}
      </p>
      <Login isAuthenticated={isAuthenticated}/>
      {/* <Button onClick={fetchUserData} */}
    </main>
  );
}

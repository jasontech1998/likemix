'use client';

import { useSession } from 'next-auth/react';
import Logout from '@/components/logout';

export default function Page() {

    const { data: session } = useSession();
    console.log(session);
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <Logout />
      </main>
    );
}
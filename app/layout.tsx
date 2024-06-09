'use client';

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Session } from "inspector";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <SessionProvider>
            {children}
          </SessionProvider>
          </body>
    </html>
  );
}

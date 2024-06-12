'use client';

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { SessionProvider } from 'next-auth/react';
import { cn } from '@/lib/utils';
import "./globals.css";

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

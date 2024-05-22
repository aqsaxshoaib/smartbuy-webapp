import React from 'react'; // Import React
import Header from '../components/Header';
import "./globals.css";
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'SmartBuy',
  description: 'Track products effortlessly and save money on your online shopping.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>   
    <html lang="en">
      <body className="bg-gray-100 h-screen">
        <main className="mx-auto">
          <Header />
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}

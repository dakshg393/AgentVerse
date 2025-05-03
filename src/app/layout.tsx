'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

import LodingPage from '@/components/LodingPage';
import useLoadingStore from '@/store/loadingStore';
import useUserStore from '@/store/userStore';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const getUser = useUserStore((state) => state.getUser);
  const user = useUserStore((state) => state.user);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/Logo.jpeg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
              fontWeight: 'bold',
              padding: '15px',
              borderRadius: '8px',
            },
          }}
        />
        {loading ? <LodingPage /> : children}
      </body>
    </html>
  );
}

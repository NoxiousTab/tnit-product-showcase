import '@/styles/globals.css';
import type React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'TNIT Product Showcase',
  description: 'Premium product grid with newsletter subscription.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-bg-900 dark:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PresmaChatbot from '@/components/PresmaChatbot';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <PresmaChatbot
          proxyUrl="https://school-chatbot.rajendraonc.workers.dev/"
          schoolName="SMK PRESTASI PRIMA"
          accentColor="#F96501"
          greeting="Halo! 👋 Saya PRESMA, asisten informasi SMK Prestasi Prima."
        />
      )}
    </>
  );
}

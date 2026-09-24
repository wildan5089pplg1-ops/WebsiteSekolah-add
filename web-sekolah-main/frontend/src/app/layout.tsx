import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import PresmaChatbot from "@/components/PresmaChatbot";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SMK Prestasi Prima | Website Resmi Sekolah',
  description: 'Website Resmi SMK Prestasi Prima - Portal Informasi Akademik, PPDB, Berita, & Fasilitas Sekolah.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

          <PresmaChatbot
            proxyUrl="https://school-chatbot.rajendraonc.workers.dev/"
            schoolName="SMK PRESTASI PRIMA"
            accentColor="#F96501"
            greeting="Halo! 👋 Saya PRESMA, asisten informasi SMK Prestasi Prima."
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

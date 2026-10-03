import React from 'react';
import { Metadata } from 'next';
import BintangLulusanSection from '@/components/BintangLulusanSection';

export const metadata: Metadata = {
  title: 'Bintang Lulusan PTN | SMK Prestasi Prima',
  description: 'Daftar bintang kelulusan SMK Prestasi Prima yang berhasil masuk ke Perguruan Tinggi Negeri (PTN) ternama di Indonesia.',
};

export default function AlumniPTNPage() {
  return (
    <main className="pt-20">
      <BintangLulusanSection />
    </main>
  );
}

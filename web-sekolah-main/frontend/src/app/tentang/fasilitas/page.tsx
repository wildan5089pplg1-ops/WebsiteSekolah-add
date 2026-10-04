import React from 'react';
import { Metadata } from 'next';
import FasilitasPage from '@/components/Fasilitas/FasilitasPage';

export const metadata: Metadata = {
  title: 'Fasilitas Sekolah | SMK Prestasi Prima',
  description: 'Infrastruktur modern dan fasilitas pembelajaran berstandar industri SMK Prestasi Prima, lengkap dengan laboratorium kejuruan canggih dan ruang kreasi.',
};

export default function TentangFasilitasPage() {
  return <FasilitasPage />;
}

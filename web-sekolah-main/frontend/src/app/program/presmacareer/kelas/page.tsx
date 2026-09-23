import PresmaCareerSection from '@/components/PresmaCareerSection';

export const metadata = {
  title: 'Kelas & Pelatihan - Presma Career | SMK Prestasi Prima',
  description: 'Program kelas & pelatihan keahlian industri siswa SMK Prestasi Prima',
};

export default function PresmaCareerKelasPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-100/70 dark:bg-slate-950">
      <PresmaCareerSection initialTab="kelas" />
    </div>
  );
}

import PresmaCareerSection from '@/components/PresmaCareerSection';

export const metadata = {
  title: 'CARASA - Presma Career | SMK Prestasi Prima',
  description: 'Asesmen Minat, Bakat, dan Kesiapan Karir Siswa SMK Prestasi Prima',
};

export default function PresmaCareerCarasaPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-100/70 dark:bg-slate-950">
      <PresmaCareerSection initialTab="carasa" />
    </div>
  );
}

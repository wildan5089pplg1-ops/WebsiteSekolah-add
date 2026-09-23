import PresmaCareerSection from '@/components/PresmaCareerSection';

export const metadata = {
  title: 'Dashboard - Presma Career | SMK Prestasi Prima',
  description: 'Dashboard siswa & informasi karir SMK Prestasi Prima',
};

export default function PresmaCareerDashboardPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-100/70 dark:bg-slate-950">
      <PresmaCareerSection initialTab="dashboard" />
    </div>
  );
}

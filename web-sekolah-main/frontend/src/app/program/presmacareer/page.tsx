import PresmaCareerSection from '@/components/PresmaCareerSection';

export const metadata = {
  title: 'Presma Career - SMK Prestasi Prima',
  description: 'Pusat bimbingan karir, tes minat bakat CARASA, dan kelas pelatihan industri SMK Prestasi Prima',
};

export default function PresmaCareerPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-100/70 dark:bg-slate-950">
      <PresmaCareerSection />
    </div>
  );
}

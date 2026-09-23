import PresmaLibSection from '@/components/PresmaLibSection';

export const metadata = {
  title: 'Presma Lib - SMK Prestasi Prima',
  description: 'Perpustakaan digital & riset SMK Prestasi Prima',
};

export default function PresmaLibPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <PresmaLibSection />
    </div>
  );
}

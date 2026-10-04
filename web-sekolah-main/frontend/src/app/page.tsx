import FullScreenHero from '@/components/FullScreenHero';
import InteractiveMajors from '@/components/InteractiveMajors';
import KerjaSamaIndustriSection from '@/components/KerjaSamaIndustriSection';
import TheChampionsSection from '@/components/TheChampionsSection';
import AlumniPTNSection from '@/components/AlumniPTNSection';
import SponsorshipSection from '@/components/SponsorshipSection';
import SchoolProfileNewsSection from '@/components/SchoolProfileNewsSection';
import { getNewsList } from '@/lib/api';

export default async function HomePage() {
  const newsList = await getNewsList();

  return (
    <div className="space-y-0 pb-0">
      
      {/* 1. Existing Landing Page / Hero — KEEP UNCHANGED */}
      <FullScreenHero />

      {/* Stats Ribbon (Connected to hero) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 z-30 mb-8 sm:mb-12">
        <div className="rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60 dark:divide-slate-800">
            {[
              { value: '2,550+', label: 'Peserta Didik' },
              { value: '200+', label: 'Guru Pendidik' },
              { value: '40', label: 'Ruang Kelas' },
              { value: '6', label: 'Lab Komputer' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col justify-center items-center text-center ${i === 2 || i === 3 ? 'pt-5 sm:pt-0' : ''}`}>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h4>
                <p className="text-[10px] sm:text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Jurusan Unggulan / Program Keahlian */}
      <InteractiveMajors />

      {/* 3. Kerja Sama Industri / Mitra Industri (Above The Champions & Lulusan PTN) */}
      <KerjaSamaIndustriSection />

      {/* 4. The Champions / Official Hall of Champions */}
      <TheChampionsSection />

      {/* 5. Lulusan PTN (Horizontal Continuous Logo Track) */}
      <AlumniPTNSection />

      {/* 6. Sponsorship / Sponsors */}
      <SponsorshipSection />

      {/* 7. School Profile / News & Activities */}
      <SchoolProfileNewsSection articles={newsList} />

    </div>
  );
}

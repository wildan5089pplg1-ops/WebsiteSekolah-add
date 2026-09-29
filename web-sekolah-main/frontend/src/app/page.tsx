import Link from 'next/link';
import { getSchoolInfo, getNewsList, getFacilities } from '@/lib/api';
import FullScreenHero from '@/components/FullScreenHero';
import InteractiveMajors from '@/components/InteractiveMajors';
import TimelineSection from '@/components/TimelineSection';
import PrestasiSection from '@/components/PrestasiSection';
import AlumniPTNSection from '@/components/AlumniPTNSection';
import MitraSection from '@/components/MitraSection';
import BlogSection from '@/components/BlogSection';


export default async function HomePage() {
  const school = await getSchoolInfo();
  const news = await getNewsList();
  const facilities = await getFacilities();

  return (
    <div className="space-y-20 pb-20">
      
      {/* 6 Full-Screen Sections Experience with Video and Navigation Buttons */}
      <FullScreenHero />

      {/* Stats Ribbon */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 z-30 mb-20">
        <div className="rounded-[3rem] bg-slate-50 border border-slate-100 p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            {[
              { value: '2,550+', label: 'Peserta Didik' },
              { value: '200+', label: 'Guru Pendidik' },
              { value: '40', label: 'Ruang Kelas' },
              { value: '6', label: 'Lab Komputer' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col justify-center items-center text-center ${i === 2 || i === 3 ? 'pt-5 sm:pt-0' : ''}`}>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{stat.value}</h4>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Keahlian Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        
        {/* Header Area moved inside InteractiveMajors */}

        {/* Interactive Canvas (Replaces 4 Cards Grid) */}
        <InteractiveMajors />
      </section>

      {/* (Cinematic Edge-to-Edge Banner removed to match Figma) */}

      <TimelineSection key="force-remount-1" />

      {/* Prestasi / Achievements Section */}
      <PrestasiSection />

      {/* Lulusan PTN Section */}
      <AlumniPTNSection />

      {/* Mitra & Sponsorship Section */}
      <MitraSection />

      {/* Blog & Artikel Section */}
      <BlogSection />

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-orange-600 via-rose-600 to-slate-800 dark:from-orange-900 dark:via-rose-900 dark:to-slate-900 border border-orange-500/50 dark:border-orange-700/50 shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Siap Menjadi Bagian dari SMK Prestasi Prima?
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 dark:text-orange-200">
              Daftarkan diri Anda atau putra-putri Anda sekarang juga dalam Penerimaan Peserta Didik Baru (PPDB) 2026.
            </p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap px-8 py-4 rounded-xl bg-white text-slate-900 font-extrabold text-sm hover:bg-amber-50 hover:shadow-xl transition-all"
          >
            Hubungi Panitia PPDB
          </Link>
        </div>
      </section>

    </div>
  );
}

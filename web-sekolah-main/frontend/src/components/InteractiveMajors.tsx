'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Major {
  id: string;
  acronym: string;
  title: string;
  subtitle: string;
  description: string;
  iconPath: string;
  image: string;
  stats: string;
}

const majors: Major[] = [
  {
    id: 'pplg',
    acronym: 'PPLG',
    title: 'Pengembangan Perangkat Lunak & Gim',
    subtitle: 'Software & Game Developer',
    description: 'Membangun aplikasi, gim, dan pengalaman digital yang menjawab kebutuhan nyata di sekitar kita dengan kurikulum berstandar industri modern.',
    stats: '18 PRODUK SISWA',
    iconPath: '/images/majors/pplg.png',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'tjkt',
    acronym: 'TJKT',
    title: 'Teknik Jaringan Komputer & Telekomunikasi',
    subtitle: 'Network & Telecommunication',
    description: 'Merancang infrastruktur digital, cloud networking, dan cybersecurity yang membuat dunia tetap terhubung dengan andal.',
    stats: '92% SERTIFIKASI',
    iconPath: '/images/majors/tjkt.png',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'bcf',
    acronym: 'BCF',
    title: 'Broadcasting & Perfilman',
    subtitle: 'Broadcasting & Film',
    description: 'Mengolah ide cerita menjadi karya visual sinematik, produksi studio televisi, dan live streaming profesional berdaya pikat.',
    stats: '34 FILM PENDEK',
    iconPath: '/images/majors/bcf.png',
    image: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'dkv',
    acronym: 'DKV',
    title: 'Desain Komunikasi Visual',
    subtitle: 'Visual Design & UI/UX',
    description: 'Mengubah gagasan menjadi identitas visual, UI/UX desain interaktif, dan karya multimedia kreatif berbobot estetika tinggi.',
    stats: '27 KAMPANYE',
    iconPath: '/images/majors/dkv.png',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function InteractiveMajors() {
  const [activeTab, setActiveTab] = useState<string>(majors[0].id);
  const activeMajor = majors.find((m) => m.id === activeTab) || majors[0];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Header & 4 Vertical Tabs */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          
          {/* Section Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#FF6B00] font-black text-xs sm:text-sm tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
              JURUSAN UNGGULAN
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Program <span className="text-[#FF6B00]">Keahlian</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Empat jurusan unggulan siap membentuk generasi kreatif dan kompeten: PPLG, TJKT, BCF, dan DKV. Lengkap dengan kurikulum praktik industri.
            </p>
          </div>

          {/* Vertical Tabs List */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {majors.map((major) => {
              const isActive = activeTab === major.id;

              return (
                <button
                  key={major.id}
                  onClick={() => setActiveTab(major.id)}
                  type="button"
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 cursor-pointer border ${
                    isActive
                      ? 'bg-[#fddbc2] dark:bg-orange-950/70 border-orange-300 dark:border-orange-500/50 shadow-md shadow-orange-500/10 scale-[1.01]'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 shadow-xs'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Major Icon Container */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center p-2.5 shrink-0 shadow-xs">
                    <img
                      src={major.iconPath}
                      alt={`${major.acronym} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Major Label & Subtitle */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                      {major.acronym}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium truncate">
                      {major.subtitle}
                    </p>
                  </div>

                  {/* Active Indicator Chevron */}
                  <div className={`transition-transform duration-300 pr-2 ${isActive ? 'text-[#FF6B00] translate-x-0.5' : 'text-slate-400 opacity-60'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Major Showcase Card with Code / Screen Image */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[4/4.8] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-950 border-4 border-white/60 dark:border-slate-800 group">
            
            {/* Background Images for Smooth Transition */}
            {majors.map((major) => (
              <div
                key={`img-${major.id}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeTab === major.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={major.image}
                  alt={major.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                {/* Refined Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/20"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/40 via-transparent to-transparent"></div>
              </div>
            ))}

            {/* Content Overlay at Center & Bottom */}
            <div className="relative z-20 w-full h-full flex flex-col justify-end p-6 sm:p-10 text-center items-center">
              
              {/* Badge Tag */}
              <div className="mb-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest border border-white/30">
                  {activeMajor.stats}
                </span>
              </div>

              {/* Title on Poster */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-snug drop-shadow-lg mb-6 max-w-md">
                {activeMajor.title}
              </h3>

              {/* Action Button: JELAJAHI KURIKULUM */}
              <Link
                href={`/program/${activeMajor.id}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-orange-50 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
              >
                JELAJAHI KURIKULUM {activeMajor.acronym}
                <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

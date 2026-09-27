'use client';

import { useState } from 'react';
import Link from 'next/link';

const majors = [
  {
    id: 'pplg',
    acronym: 'PPLG',
    title: 'Pengembangan Perangkat Lunak & Gim',
    description: 'Membangun aplikasi, gim, dan pengalaman digital yang menjawab kebutuhan nyata di sekitar kita.',
    stats: '18 PRODUK SISWA',
    iconPath: '/images/majors/pplg.png',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'tjkt',
    acronym: 'TJKT',
    title: 'Teknik Jaringan Komputer & Telekomunikasi',
    description: 'Merancang infrastruktur digital yang membuat sekolah, bisnis, dan komunitas tetap terhubung.',
    stats: '92% SERTIFIKASI',
    iconPath: '/images/majors/tjkt.png',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'bcf',
    acronym: 'BCF',
    title: 'Broadcasting & Perfilman',
    description: 'Mengolah cerita menjadi gambar, suara, dan karya sinema yang memindahkan cara pandang.',
    stats: '34 FILM PENDEK',
    iconPath: '/images/majors/bcf.png',
    image: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'dkv',
    acronym: 'DKV',
    title: 'Desain Komunikasi Visual',
    description: 'Mengubah gagasan menjadi identitas, kampanye, dan karya visual yang punya sikap.',
    stats: '27 KAMPANYE',
    iconPath: '/images/majors/dkv.png',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
  }
];

export default function InteractiveMajors() {
  const [activeTab, setActiveTab] = useState(majors[0].id);

  const activeMajor = majors.find(m => m.id === activeTab) || majors[0];

  return (
    <div className="w-full bg-[#fcf8f2] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Title & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between min-h-[600px] h-full">
            <div className="mb-12">
              <div className="flex items-center gap-3 text-[#e65c4f] font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e65c4f]"></span>
                01 / Program Keahlian
                <div className="h-px bg-[#e65c4f]/30 flex-1 ml-2"></div>
              </div>
              <h2 className="text-[3rem] sm:text-[4rem] lg:text-[4.5rem] font-black text-[#1a2b3c] leading-[1.05] tracking-tight mb-8">
                Empat pintu.<br/>
                Satu dunia<br/>
                yang luas.
              </h2>
              <p className="text-slate-500 text-[15px] sm:text-lg leading-relaxed max-w-md">
                Empat jurusan unggulan siap membentuk generasi kreatif dan kompeten: PPLG, TJKT, BCF, dan DKV. Lengkap dengan kurikulum praktik industri.
              </p>
            </div>

            {/* Mustard Yellow Box */}
            <div className="bg-[#d4a336] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between flex-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <svg className="w-7 h-7 text-[#1a2b3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-[#1a2b3c] font-black text-[10px] tracking-widest uppercase">Eksplorasi 2026</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#1a2b3c] text-[1.75rem] sm:text-[2rem] font-black leading-tight mb-8 tracking-tight">
                  Coba rasakan<br/>bidang yang paling<br/>memanggilmu.
                </h3>
                <Link href="/jadwal" className="inline-flex items-center gap-2 text-[#1a2b3c] font-bold text-sm border-b-[2.5px] border-[#1a2b3c] pb-1 hover:gap-4 transition-all">
                  Jadwalkan kunjungan
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Grid of Majors */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 min-h-[600px] h-full">
            {majors.map((major) => {
              const isActive = activeTab === major.id;
              
              return (
                <div 
                  key={major.id}
                  onClick={() => setActiveTab(major.id)}
                  className={`relative rounded-[2rem] p-7 sm:p-8 cursor-pointer transition-all duration-500 overflow-hidden flex flex-col h-[320px] sm:h-[auto] group isolate ${
                    isActive 
                      ? 'shadow-2xl scale-[1.02] z-20' 
                      : 'bg-[#f3efe6] hover:bg-[#ebe6db] border border-[#e8dfcd] hover:shadow-lg z-10'
                  }`}
                >
                  {/* Background Image for Active State */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img src={major.image} alt={major.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[15s]" />
                    {/* Orange Overlay */}
                    <div className="absolute inset-0 bg-[#e65c4f]/95 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#e65c4f]/80 to-[#e65c4f]/95"></div>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-auto">
                      <div className="flex items-center gap-4">
                        {/* Dynamic Logo Wrapper */}
                        <div className={`w-12 h-12 flex items-center justify-center rounded-[0.9rem] transition-all duration-500 ${isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-white shadow-sm group-hover:shadow-md'}`}>
                          <img 
                            src={major.iconPath} 
                            alt={`${major.acronym} Logo`} 
                            className={`w-7 h-7 object-contain transition-all duration-500 ${isActive ? 'brightness-0 invert' : ''}`} 
                          />
                        </div>
                        <h3 className={`text-3xl sm:text-[2rem] font-black tracking-tighter transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#e65c4f]'}`}>
                          {major.acronym}
                        </h3>
                      </div>
                      <svg className={`w-6 h-6 transition-all duration-500 ${isActive ? 'text-white translate-x-1' : 'text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    <div className="mt-8">
                      <h4 className={`text-lg sm:text-xl font-bold leading-snug mb-3 transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#1a2b3c]'}`}>
                        {major.title}
                      </h4>
                      <p className={`text-[13px] sm:text-sm leading-relaxed mb-6 transition-colors duration-500 ${isActive ? 'text-white/85' : 'text-slate-500'}`}>
                        {major.description}
                      </p>
                      <span className={`text-[10px] font-black tracking-[0.15em] uppercase transition-colors duration-500 ${isActive ? 'text-yellow-300' : 'text-slate-400'}`}>
                        {major.stats}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-8 bg-[#f3efe6] border border-[#e8dfcd] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all hover:bg-[#ebe6db]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e65c4f] animate-pulse"></span>
            <span className="text-[#1a2b3c] text-sm font-medium">
              <strong className="font-black">{activeMajor.acronym}</strong> sedang dipilih.
            </span>
          </div>
          
          <Link href={`/program/${activeMajor.id}`} className="text-[#1a2b3c] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all border-b border-[#1a2b3c]/30 hover:border-[#1a2b3c] pb-0.5">
            Tanya program
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

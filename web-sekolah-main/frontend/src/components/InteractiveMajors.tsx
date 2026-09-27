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
    <div className="w-full bg-[#fdfbf7] py-24 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: Title & Action Box */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div className="mb-10">
              <div className="flex items-center gap-3 text-[#e65c4f] font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#e65c4f]"></span>
                01 / Program Keahlian
              </div>
              <h2 className="text-[3rem] sm:text-[3.5rem] lg:text-[4rem] font-black text-[#1a2b3c] leading-[1.1] tracking-tight mb-6">
                Empat pintu.<br/>
                Satu dunia<br/>
                yang luas.
              </h2>
              <p className="text-slate-500 text-[15px] sm:text-lg leading-relaxed max-w-md">
                Empat jurusan unggulan siap membentuk generasi kreatif dan kompeten: PPLG, TJKT, BCF, dan DKV. Lengkap dengan kurikulum praktik industri.
              </p>
            </div>

            {/* Action Box */}
            <div className="bg-[#e2a836] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-lg mt-auto">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <svg className="w-7 h-7 text-[#1a2b3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-[#1a2b3c] font-black text-[10px] tracking-widest uppercase bg-white/30 px-3 py-1 rounded-full">
                  Eksplorasi 2026
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#1a2b3c] text-[1.75rem] sm:text-[2rem] font-black leading-tight mb-8">
                  Coba rasakan<br/>bidang yang paling<br/>memanggilmu.
                </h3>
                <Link href="/jadwal" className="inline-flex items-center gap-2 text-[#1a2b3c] font-bold text-sm border-b-2 border-[#1a2b3c] pb-1 hover:gap-4 transition-all">
                  Jadwalkan kunjungan
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Grid of Majors with Images always visible */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8 lg:mt-0">
            {majors.map((major) => {
              const isActive = activeTab === major.id;
              
              return (
                <div 
                  key={major.id}
                  onClick={() => setActiveTab(major.id)}
                  className={`group relative flex flex-col overflow-hidden rounded-[2rem] border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'border-[#e65c4f] shadow-[0_10px_40px_rgba(230,92,79,0.15)] bg-white scale-[1.02] z-20 ring-4 ring-[#e65c4f]/10' 
                      : 'border-[#e8dfcd] bg-white hover:border-[#d4a336] hover:shadow-xl shadow-sm z-10'
                  }`}
                >
                  {/* Image Section (Top half) - ALWAYS VISIBLE */}
                  <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={major.image} 
                      alt={major.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    
                    {/* Logo inside Image */}
                    <div className={`absolute bottom-3 left-4 w-11 h-11 backdrop-blur-md rounded-xl flex items-center justify-center border transition-colors duration-300 ${isActive ? 'bg-[#e65c4f]/90 border-white/20' : 'bg-white/20 border-white/30 group-hover:bg-white/40'}`}>
                      <img src={major.iconPath} alt={`${major.acronym} Logo`} className="w-6 h-6 object-contain brightness-0 invert drop-shadow-sm" />
                    </div>
                  </div>

                  {/* Content Section (Bottom half) */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className={`text-2xl sm:text-[1.75rem] font-black tracking-tighter ${isActive ? 'text-[#e65c4f]' : 'text-[#1a2b3c]'}`}>
                        {major.acronym}
                      </h3>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-[#e65c4f]/10 text-[#e65c4f]' : 'bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500'}`}>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <h4 className="text-[#1a2b3c] font-bold leading-snug mb-2 text-[15px] sm:text-base">
                      {major.title}
                    </h4>
                    
                    <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2 mb-4">
                      {major.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black tracking-widest uppercase text-[#e2a836]">
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
        <div className="mt-10 bg-white border border-[#e8dfcd] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e65c4f] animate-pulse"></span>
            <span className="text-[#1a2b3c] text-sm font-medium">
              Lihat detail kurikulum jurusan <strong className="font-black text-[#e65c4f]">{activeMajor.acronym}</strong> sekarang.
            </span>
          </div>
          
          <Link href={`/program/${activeMajor.id}`} className="px-5 py-2.5 bg-[#1a2b3c] text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-[#2c425c] transition-colors shadow-md">
            Pelajari Selengkapnya
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

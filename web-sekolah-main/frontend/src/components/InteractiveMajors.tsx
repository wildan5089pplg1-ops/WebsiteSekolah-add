'use client';

import { useState } from 'react';
import Link from 'next/link';

const majors = [
  {
    id: 'pplg',
    acronym: 'PPLG',
    title: 'Pengembangan Perangkat Lunak & Gim',
    shortTitle: 'Software & Game Developer',
    customHeroTitle: (
      <>
        <span className="text-white block mb-1 drop-shadow-md">PENGEMBANGAN</span>
        <span className="text-[#f87f22] block drop-shadow-md">PERANGKAT LUNAK</span>
        <span className="text-[#f87f22] block drop-shadow-md">& GIM</span>
      </>
    ),
    icon: (
      <img src="/images/majors/pplg.png" alt="PPLG Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'tjkt',
    acronym: 'TJKT',
    title: 'Teknik Jaringan Komputer & Telekomunikasi',
    shortTitle: 'Network & Telecommunication',
    customHeroTitle: (
      <>
        <span className="text-white block mb-1 drop-shadow-md">TEKNIK JARINGAN</span>
        <span className="text-[#f87f22] block drop-shadow-md">KOMPUTER &</span>
        <span className="text-[#f87f22] block drop-shadow-md">TELEKOMUNIKASI</span>
      </>
    ),
    icon: (
      <img src="/images/majors/tjkt.png" alt="TJKT Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'bcf',
    acronym: 'BCF',
    title: 'Broadcast & Perfilman',
    shortTitle: 'Broadcasting & Film',
    customHeroTitle: (
      <>
        <span className="text-white block mb-1 drop-shadow-md">BROADCASTING</span>
        <span className="text-[#f87f22] block drop-shadow-md">&</span>
        <span className="text-[#f87f22] block drop-shadow-md">PERFILMAN</span>
      </>
    ),
    icon: (
      <img src="/images/majors/bcf.png" alt="BCF Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'dkv',
    acronym: 'DKV',
    title: 'Desain Komunikasi Visual',
    shortTitle: 'Visual Design & UI\\UX',
    customHeroTitle: (
      <>
        <span className="text-white block mb-1 drop-shadow-md">DESAIN</span>
        <span className="text-[#f87f22] block drop-shadow-md">KOMUNIKASI</span>
        <span className="text-[#f87f22] block drop-shadow-md">VISUAL</span>
      </>
    ),
    icon: (
      <img src="/images/majors/dkv.png" alt="DKV Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
  }
];

export default function InteractiveMajors() {
  const [activeTab, setActiveTab] = useState(majors[0].id);

  const activeMajor = majors.find(m => m.id === activeTab) || majors[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 min-h-[600px] items-center">
      
      {/* LEFT COLUMN: Header + Sidebar Navigation */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        
        {/* Header content moved here to match design */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff4eb] text-[#f87f22] text-[11px] sm:text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f87f22]"></span>
            Jurusan Unggulan
          </div>
          <h2 className="text-4xl md:text-[2.75rem] font-black text-slate-900 leading-tight mb-4 tracking-tight">
            Program <span className="text-[#f87f22]">Keahlian</span>
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed">
            Empat jurusan unggulan siap membentuk<br className="hidden sm:block" />
            generasi kreatif dan kompeten: PPLG, TJKT,<br className="hidden sm:block" />
            BCF, dan DKV. Lengkap dengan kurikulum<br className="hidden sm:block" />
            praktik industri.
          </p>
        </div>

        {/* Major Buttons List */}
        <div className="flex flex-col gap-3">
          {majors.map((major) => {
            const isActive = activeTab === major.id;
            return (
              <button
                key={major.id}
                onClick={() => setActiveTab(major.id)}
                className={`relative flex items-center px-5 py-3.5 rounded-2xl transition-all duration-300 overflow-hidden text-left bg-white border ${
                  isActive 
                    ? 'border-[#f87f22]/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02] z-10' 
                    : 'border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 shrink-0 mr-4">
                  {major.icon}
                </div>
                
                <div>
                  <h4 className="text-[17px] font-black text-slate-900 mb-0.5">
                    {major.acronym}
                  </h4>
                  <p className="text-[13px] font-bold text-slate-700">
                    {major.shortTitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Main Canvas Display */}
      <div className="lg:col-span-7 relative w-full h-[600px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 group isolate">
        
        {/* Dynamic Background Images mapped for Crossfade */}
        {majors.map((major) => (
          <div 
            key={`bg-${major.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeTab === major.id ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          >
            <img src={major.image} alt={major.title} className="w-full h-full object-cover transform transition-transform duration-[15s] scale-105 hover:scale-110" />
            {/* Top and Bottom Dark Gradients for text readability */}
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent opacity-80"></div>
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/90 to-transparent opacity-90"></div>
          </div>
        ))}

        {/* Dynamic Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12">
          
          {/* Top Title Overlay */}
          <div key={`title-${activeTab}`} className="text-center animate-in fade-in zoom-in-95 duration-500 fill-mode-both">
            <h3 className="text-[1.75rem] sm:text-4xl lg:text-[2.25rem] font-black leading-[1.1] tracking-wide">
              {activeMajor.customHeroTitle}
            </h3>
          </div>
          
          {/* Bottom Action Buttons */}
          <div className="flex flex-col items-center gap-3 w-full px-6 mt-auto">
            <Link href={`/program/${activeMajor.id}`} className="px-6 py-3.5 rounded-2xl bg-[#1e243b]/90 backdrop-blur-md border border-white/10 text-white font-bold text-[13px] tracking-wide shadow-xl hover:bg-[#283152] transition-colors flex items-center justify-center gap-2 w-fit">
              JELAJAHI KURIKULUM {activeMajor.acronym}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            <Link href="/ppdb" className="px-8 py-3.5 rounded-2xl bg-[#ce7025] hover:bg-[#b5611e] text-slate-900 font-black text-[13px] tracking-wide shadow-xl transition-colors flex items-center justify-center gap-2 w-fit">
              DAFTAR SEKARANG
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

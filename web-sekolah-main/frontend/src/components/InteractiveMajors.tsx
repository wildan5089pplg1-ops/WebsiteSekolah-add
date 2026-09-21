'use client';

import { useState } from 'react';

const majors = [
  {
    id: 'pplg',
    acronym: 'PPLG',
    title: 'Pengembangan Perangkat Lunak & Gim',
    shortTitle: 'Software & Game Dev',
    desc: 'Pelajari rekayasa perangkat lunak, pengembangan aplikasi mobile & web, hingga pembuatan gim interaktif dengan standar industri teknologi terkini.',
    students: '450+',
    icon: (
      <img src="/images/majors/pplg.png" alt="PPLG Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    color: 'from-blue-600 to-cyan-500',
    shadow: 'shadow-blue-500/30',
    bg: 'bg-blue-50'
  },
  {
    id: 'tjkt',
    acronym: 'TJKT',
    title: 'Teknik Jaringan Komputer & Telekomunikasi',
    shortTitle: 'Network & Telecom',
    desc: 'Kuasai arsitektur jaringan komputer, keamanan siber (cybersecurity), administrasi server, dan sistem telekomunikasi serat optik.',
    students: '380+',
    icon: (
      <img src="/images/majors/tjkt.png" alt="TJKT Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    color: 'from-emerald-500 to-green-500',
    shadow: 'shadow-emerald-500/30',
    bg: 'bg-emerald-50'
  },
  {
    id: 'bcf',
    acronym: 'BCF',
    title: 'Broadcast & Perfilman',
    shortTitle: 'Broadcasting & Film',
    desc: 'Jadilah ahli produksi sinematografi, penyutradaraan, editing video, dan penyiaran televisi dengan peralatan standar studio profesional.',
    students: '210+',
    icon: (
      <img src="/images/majors/bcf.png" alt="BCF Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1200&auto=format&fit=crop',
    color: 'from-purple-600 to-pink-500',
    shadow: 'shadow-purple-500/30',
    bg: 'bg-purple-50'
  },
  {
    id: 'dkv',
    acronym: 'DKV',
    title: 'Desain Komunikasi Visual',
    shortTitle: 'Visual Design & UI/UX',
    desc: 'Kembangkan kreativitas visual Anda melalui desain grafis, ilustrasi digital, UI/UX design, dan animasi 2D/3D yang memukau.',
    students: '320+',
    icon: (
      <img src="/images/majors/dkv.png" alt="DKV Icon" className="w-8 h-8 object-contain" />
    ),
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
    color: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-500/30',
    bg: 'bg-pink-50'
  }
];

export default function InteractiveMajors() {
  const [activeTab, setActiveTab] = useState(majors[0].id);

  const activeMajor = majors.find(m => m.id === activeTab) || majors[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[500px]">
      
      {/* Sidebar Navigation */}
      <div className="lg:col-span-4 flex flex-col justify-center gap-3">
        {majors.map((major) => {
          const isActive = activeTab === major.id;
          return (
            <button
              key={major.id}
              onClick={() => setActiveTab(major.id)}
              className={`relative flex items-center p-4 rounded-2xl transition-all duration-300 overflow-hidden text-left group ${
                isActive 
                  ? 'bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none scale-[1.02] border-transparent' 
                  : 'bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/60 hover:shadow-md'
              }`}
            >
              {/* Active Indicator Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${major.color} transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
              
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl mr-4 transition-all duration-300 ${isActive ? `bg-gradient-to-br ${major.color} text-white ${major.shadow}` : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`}>
                {major.icon}
              </div>
              
              <div>
                <h4 className={`text-sm font-bold tracking-wider mb-0.5 transition-colors ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {major.acronym}
                </h4>
                <p className={`text-xs font-semibold transition-colors ${isActive ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
                  {major.shortTitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Canvas Display */}
      <div className="lg:col-span-8 relative rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 h-[500px] lg:h-auto group">
        
        {/* Dynamic Background Images mapped for Crossfade */}
        {majors.map((major) => (
          <div 
            key={`bg-${major.id}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeTab === major.id ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          >
            <img src={major.image} alt={major.title} className="w-full h-full object-cover transform transition-transform duration-[10s] scale-105 hover:scale-110" />
            <div className="absolute inset-0 bg-slate-900/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
          </div>
        ))}

        {/* Dynamic Content Pane */}
        <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-end max-w-2xl">
          <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
              {activeMajor.students} Siswa Aktif
            </span>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
              {activeMajor.title}
            </h3>
            
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8 drop-shadow-md border-l-2 border-white/40 pl-4">
              {activeMajor.desc}
            </p>
            
            <button className={`px-6 py-3 rounded-xl bg-gradient-to-r ${activeMajor.color} text-white font-bold text-sm shadow-lg ${activeMajor.shadow} hover:-translate-y-1 transition-all flex items-center gap-2 w-fit`}>
              Jelajahi Kurikulum {activeMajor.acronym}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';

const sponsors = [
  { id: 1, name: 'Prambors', category: 'Media Partner', image: '/images/prambos.webp', acronym: 'PRM', color: 'from-yellow-400 to-amber-500' }
];

const industri = [
  { id: 1, name: 'Penerbit Erlangga', acronym: 'ERL', color: 'from-blue-600 to-indigo-800', desc: 'Kolaborasi penyediaan literatur digital dan kurikulum industri modern.' },
  { id: 2, name: 'WIKA', acronym: 'WIKA', color: 'from-sky-500 to-cyan-700', desc: 'Program magang teknologi infrastruktur berskala nasional.' },
  { id: 3, name: 'Telkom Indonesia', acronym: 'TLKM', color: 'from-red-600 to-rose-800', desc: 'Inkubasi startup siswa & sertifikasi jaringan telekomunikasi.' },
  { id: 4, name: 'KOMATSU', acronym: 'KMT', color: 'from-indigo-600 to-blue-900', desc: 'Pelatihan sistem mekanik industri presisi tinggi.' },
  { id: 5, name: 'KemenkopUKM', acronym: 'UKM', color: 'from-emerald-500 to-teal-700', desc: 'Akselerasi wirausaha dan bisnis digital lulusan vokasi.' },
  { id: 6, name: 'Jatelindo', acronym: 'JTL', color: 'from-blue-500 to-blue-700', desc: 'Pengembangan sistem pembayaran digital (payment gateway).' },
];

export default function MitraSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play the accordion
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % industri.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 z-0"></div>

      {/* Premium Edge Decoration - Top Right (Abstract Polygon Network) */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-96 flex items-start justify-end z-0 opacity-40 dark:opacity-20 pointer-events-none translate-x-10 -translate-y-10">
        <svg viewBox="0 0 400 400" className="w-full h-full text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
          <g className="animate-[pulse_5s_ease-in-out_infinite]" stroke="currentColor" fill="none" strokeWidth="1.5">
            <circle cx="300" cy="100" r="4" fill="currentColor" />
            <circle cx="200" cy="50" r="3" fill="currentColor" />
            <circle cx="350" cy="200" r="5" fill="currentColor" />
            <circle cx="150" cy="150" r="3" fill="currentColor" />
            <circle cx="250" cy="250" r="4" fill="currentColor" />
            <circle cx="300" cy="350" r="3" fill="currentColor" />
            
            <path d="M300 100 L200 50 L150 150 L250 250 L350 200 Z" className="opacity-60" />
            <path d="M300 100 L350 200 L300 350 L250 250 Z" className="opacity-40" />
            <path d="M200 50 L250 250" className="opacity-30" />
            <path d="M300 100 L250 250" className="opacity-50" />
            <path d="M150 150 L350 200" className="opacity-20" />
          </g>
        </svg>
        <div className="absolute top-20 right-20 w-48 h-48 bg-orange-500/20 blur-[100px] rounded-full"></div>
      </div>

      {/* Premium Edge Decoration - Bottom Left (Isometric Prism) */}
      <div className="absolute bottom-0 left-0 w-64 md:w-80 h-80 flex items-end justify-start z-0 opacity-40 dark:opacity-20 pointer-events-none -translate-x-10 translate-y-10">
        <svg viewBox="0 0 300 300" className="w-full h-full text-orange-500" fill="none" stroke="currentColor">
          <g className="animate-[spin_30s_linear_infinite]" style={{ transformOrigin: '150px 150px' }}>
            <polygon points="150,20 280,95 280,245 150,320 20,245 20,95" strokeWidth="1" className="opacity-30" />
            <polygon points="150,60 240,115 240,215 150,270 60,215 60,115" strokeWidth="2" className="opacity-50" />
            <polygon points="150,100 200,135 200,195 150,230 100,195 100,135" strokeWidth="1" className="opacity-80" />
            
            <line x1="150" y1="20" x2="150" y2="100" className="opacity-40" />
            <line x1="280" y1="95" x2="200" y2="135" className="opacity-40" />
            <line x1="280" y1="245" x2="200" y2="195" className="opacity-40" />
            <line x1="150" y1="320" x2="150" y2="230" className="opacity-40" />
            <line x1="20" y1="245" x2="100" y2="195" className="opacity-40" />
            <line x1="20" y1="95" x2="100" y2="135" className="opacity-40" />
          </g>
        </svg>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-500/20 blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SPONSORSHIP SECTION */}
        <div className="text-center mb-20">
          <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">Mitra Kami</h4>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight drop-shadow-sm mb-10">
            Sponsorship
          </h2>
          
          <div className="flex justify-center">
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.id}
                className="group relative w-48 h-48 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center p-6 overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {sponsor.image ? (
                  <img 
                    src={sponsor.image} 
                    alt={sponsor.name} 
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 relative z-10" 
                  />
                ) : (
                  <>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center text-2xl font-black mb-3 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 overflow-hidden`}>
                      <span className="text-white">{sponsor.acronym}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-orange-500 transition-colors">
                      {sponsor.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">
                      {sponsor.category}
                    </p>
                  </>
                )}
                
                <div className={`absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-br ${sponsor.color} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* KERJA SAMA INDUSTRI SECTION */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 uppercase tracking-tight drop-shadow-sm mb-6">
            Kerja Sama Industri
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Membangun ekosistem pendidikan yang relevan dengan masa depan. Jelajahi kolaborasi strategis kami bersama para pemimpin industri.
          </p>
        </div>

        {/* COVERFLOW CAROUSEL (INDUSTRY STANDARD & LOGO-READY) */}
        <div className="relative w-full mt-10 mb-8 flex flex-col items-center">
          
          {/* The 3D Carousel Area */}
          <div className="relative w-full h-[200px] md:h-[280px] flex items-center justify-center perspective-[1200px] overflow-hidden md:overflow-visible">
            {industri.map((mitra, index) => {
              const offset = (index - activeIndex + industri.length) % industri.length;
              let normalizedOffset = offset;
              if (normalizedOffset === 4) normalizedOffset = -2;
              if (normalizedOffset === 5) normalizedOffset = -1;
              if (normalizedOffset === 3) normalizedOffset = 3; // The furthest back

              const isActive = normalizedOffset === 0;

              // Calculate pseudo-3D transforms
              let transform = '';
              let opacity = 0;
              let zIndex = 0;
              let filter = '';

              if (normalizedOffset === 0) {
                // Center
                transform = 'translateX(0px) scale(1) translateZ(0px)';
                opacity = 1;
                zIndex = 30;
                filter = 'blur(0px)';
              } else if (normalizedOffset === 1) {
                // Right 1 (Wider spread)
                transform = 'translateX(100%) scale(0.85) translateZ(-50px) rotateY(-15deg)';
                opacity = 0.7;
                zIndex = 20;
                filter = 'blur(1px)';
              } else if (normalizedOffset === -1) {
                // Left 1 (Wider spread)
                transform = 'translateX(-100%) scale(0.85) translateZ(-50px) rotateY(15deg)';
                opacity = 0.7;
                zIndex = 20;
                filter = 'blur(1px)';
              } else if (normalizedOffset === 2) {
                // Right 2 (Wider spread)
                transform = 'translateX(180%) scale(0.7) translateZ(-100px) rotateY(-25deg)';
                opacity = 0.4;
                zIndex = 10;
                filter = 'blur(2px)';
              } else if (normalizedOffset === -2) {
                // Left 2 (Wider spread)
                transform = 'translateX(-180%) scale(0.7) translateZ(-100px) rotateY(25deg)';
                opacity = 0.4;
                zIndex = 10;
                filter = 'blur(2px)';
              } else {
                // Hidden back
                transform = 'translateX(0px) scale(0.5) translateZ(-200px)';
                opacity = 0;
                zIndex = 0;
                filter = 'blur(4px)';
              }

              // Adjust translation values for larger screens using standard CSS media queries or tailwind trickery.
              // Since inline styles override Tailwind transforms, we handle responsiveness within the style by using % or vw, 
              // but % translates relative to the element's own width, which scales nicely!

              return (
                <div
                  key={mitra.id}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[180px] h-[100px] md:w-[280px] md:h-[160px] rounded-2xl bg-white dark:bg-slate-800 border-2 cursor-pointer flex flex-col items-center justify-center p-2 md:p-4 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'border-orange-500 shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)]' : 'border-slate-200 dark:border-slate-700 shadow-xl hover:border-slate-300'}`}
                  style={{ 
                    transform, 
                    opacity, 
                    zIndex, 
                    filter,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card Inner Background Effect (Glow when active) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mitra.color} opacity-0 transition-opacity duration-700 rounded-xl ${isActive ? 'opacity-5' : 'group-hover:opacity-[0.02]'}`}></div>
                  
                  {/* Logo Placeholder / Container */}
                  <div className="relative w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden group-hover:bg-slate-100 transition-colors">
                    {/* IN THE FUTURE: Replace this span with an <img src="logo.png" className="w-full h-full object-contain" /> */}
                    <span className={`text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${mitra.color} drop-shadow-sm`}>
                      {mitra.acronym}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Active Description Area */}
          <div className="mt-8 md:mt-12 h-28 flex flex-col items-center justify-start text-center px-4">
            {industri.map((mitra, index) => (
              <div 
                key={`desc-${mitra.id}`} 
                className={`absolute transition-all duration-500 transform ${index === activeIndex ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}
              >
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {mitra.name}
                </h3>
                <p className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                  {mitra.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-4">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
            Lihat Semua Mitra
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}

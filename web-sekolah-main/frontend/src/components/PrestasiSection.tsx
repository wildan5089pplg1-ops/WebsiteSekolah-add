"use client";

import React, { useState } from 'react';

const achievements = [
  {
    id: 1,
    title: 'Juara 1 Lomba Web Design',
    event: 'Olimpiade IT Nasional 2025',
    student: 'Ahmad & Tim',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    title: 'TURNAMEN SILAT TINGKAT NASIONAL',
    event: 'Kejuaraan Tingkat jakarta timur',
    student: 'Muhammad Nabil Syukri',
    image: '/images/prestasi-silat.jpeg',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 3,
    title: 'Juara 2 Animasi 3D',
    event: 'Festival Film Pendek Pelajar',
    student: 'Citra Kirana',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 4,
    title: 'Best System Administrator',
    event: 'LKS SMK Tingkat Nasional',
    student: 'Dimas Anggara',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 5,
    title: 'Juara 2 Turnamen Basket',
    event: 'Buah Hati Annual Festival',
    student: 'Tim Basket',
    image: '/images/prestasi-basket.jpeg',
    color: 'from-yellow-500 to-orange-500'
  }
];

export default function PrestasiSection() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(achievements.length / 2));

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#fafafa] dark:bg-slate-950 transition-colors duration-300">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-orange-400/10 dark:bg-orange-500/5 blur-[100px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-red-400/10 dark:bg-red-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border border-slate-100 dark:border-slate-700">
               <img src="/images/logo-smk.png" alt="Logo SMK" className="h-10 w-auto object-contain" />
            </div>
          </div>
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest mb-3">Prestasi Kami</h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-snug">
            Mengabadikan momen berharga di balik setiap <br className="hidden md:block" /> 
            <span className="text-orange-500">kemenangan</span>
          </h3>
        </div>

        {/* Card Deck Slider */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex justify-center items-center mt-10" style={{ perspective: '1200px' }}>
          {achievements.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            return (
              <div 
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className="absolute transition-all duration-700 cursor-pointer ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{
                  '--offset': offset,
                  '--abs-offset': absOffset,
                  // Fan out the cards: Translate X for spreading, Translate Y for arc, Rotate for fanning, Scale for depth
                  transform: `
                    translateX(calc(var(--offset) * clamp(40px, 8vw, 130px))) 
                    translateY(calc(var(--abs-offset) * 20px)) 
                    rotate(calc(var(--offset) * 8deg)) 
                    scale(calc(1 - var(--abs-offset) * 0.05))
                  `,
                  zIndex: 50 - absOffset,
                } as React.CSSProperties}
              >
                {/* The Card */}
                <div 
                  className={`
                    w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px] 
                    aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden 
                    shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                    transition-all duration-500 border-[6px] border-white dark:border-slate-800 bg-slate-900
                    ${isCenter ? 'ring-4 ring-orange-500/50 scale-105' : 'hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]'}
                  `}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  
                  {/* Subtle overlay for text readability (in case images aren't pure posters) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-100 sm:opacity-80'}`}>
                    <div className="transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white font-bold text-[10px] uppercase tracking-widest rounded-full mb-3">
                        {item.event}
                      </span>
                      <h4 className="text-white font-black text-lg sm:text-2xl leading-tight mb-2 drop-shadow-md">
                        {item.title}
                      </h4>
                      <p className="text-slate-300 font-medium text-xs sm:text-sm">
                        {item.student}
                      </p>
                    </div>
                  </div>
                  
                  {/* Glass highlight on center card */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Navigation Indicator */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {achievements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${activeIndex === idx ? 'w-8 h-2 bg-orange-500' : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-orange-300'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

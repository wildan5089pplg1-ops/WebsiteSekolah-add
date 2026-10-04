"use client";

import React, { useRef, useState, useEffect } from 'react';

// Data Poster Bintang Lulusan 
const posterData = [
  {
    id: 1,
    image: "/images/ptn/poster-1.jpg", 
    alt: "Bintang Lulusan PTN & Politeknik 1"
  },
  {
    id: 2,
    image: "/images/ptn/poster-2.jpg", 
    alt: "Bintang Lulusan PTN 2"
  },
  {
    id: 3,
    image: "/images/ptn/poster-3.jpg", 
    alt: "Bintang Lulusan Luar Negeri"
  },
  {
    id: 4,
    image: "/images/ptn/poster-4.jpg", 
    alt: "Bintang Lulusan Universitas Swasta"
  },
  {
    id: 5,
    image: "/images/ptn/poster-5.jpg", 
    alt: "Bintang Lulusan Politeknik & PTN 3"
  }
];

export default function BintangLulusanSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 500 : 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-14 relative z-10">
          <p className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3">
            Prestasi Gemilang
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
            Mengabadikan Momen<br/>Setiap Kelulusan
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-300 mt-4 mb-6">
            SMK PRESTASI PRIMA
          </h3>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative group/container mt-8">
          
          {/* Scroll Buttons - Clean & Crisp */}
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-200 hover:scale-105 hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-500/50 ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Geser ke kiri"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-200 hover:scale-105 hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-500/50 ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Geser ke kanan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Wrapper (Poster Slider) */}
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4 md:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {posterData.map((poster) => (
              <div 
                key={poster.id}
                className="flex-none w-[300px] md:w-[420px] snap-center group cursor-pointer"
              >
                {/* Clean Elegant Container */}
                <div className="relative w-full rounded-2xl bg-white shadow-sm border border-slate-200/60 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
                  
                  {/* The Poster Image */}
                  <img 
                    src={poster.image} 
                    alt={poster.alt} 
                    className="w-full h-auto object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle Darkening Overlay (not too heavy) */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

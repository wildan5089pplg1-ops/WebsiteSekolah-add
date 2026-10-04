"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ChampionPoster {
  id: number;
  title: string;
  category: string;
  achievement: string;
  image: string;
  alt: string;
}

const champions: ChampionPoster[] = [
  {
    id: 1,
    title: 'Lomba Voli Putra Satvikara',
    category: 'Olahraga',
    achievement: 'JUARA SATU',
    image: '/images/prestasi-voli.jpg',
    alt: 'Poster Prestasi Juara Satu Lomba Voli Putra Satvikara SMK Prestasi Prima',
  },
  {
    id: 2,
    title: 'Turnamen Basket Buah Hati Annual Festival',
    category: 'Olahraga',
    achievement: 'JUARA DUA',
    image: '/images/prestasi-basket.jpeg',
    alt: 'Poster Prestasi Juara Dua Turnamen Basket Buah Hati Annual Festival SMK Prestasi Prima',
  },
  {
    id: 3,
    title: 'Turnamen Silat Tingkat Nasional',
    category: 'Bela Diri',
    achievement: 'JUARA TIGA',
    image: '/images/prestasi-silat.jpeg',
    alt: 'Poster Prestasi Juara Tiga Turnamen Silat Kelas B Putra Wali Kota Jakarta Timur Championship SMK Prestasi Prima',
  },
  {
    id: 4,
    title: 'Lomba Film Pendek FLS3N Wilayah Jakarta Timur II',
    category: 'Seni & Sinema',
    achievement: 'JUARA TIGA',
    image: '/images/prestasi-filmpendek.jpg',
    alt: 'Poster Prestasi Juara Tiga Lomba Film Pendek FLS3N Wilayah Jakarta Timur II SMK Prestasi Prima',
  },
  {
    id: 5,
    title: 'Piala Suratin U15 2025 Asprov PSSI DKI Jakarta',
    category: 'Sepak Bola',
    achievement: 'JUARA TIGA',
    image: '/images/prestasi-sepakbola.jpeg',
    alt: 'Poster Prestasi Juara Tiga Piala Suratin U15 2025 SMK Prestasi Prima',
  },
];

export default function TheChampionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = champions.length;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  // Automatic carousel rotation every 4.5 seconds
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        goToNext();
      }, 4500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goToNext]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <section
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-orange-400/20 via-orange-100/10 to-white dark:from-orange-950/30 dark:via-slate-950 dark:to-slate-950 transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="The Champions Gallery"
    >
      {/* Soft Center Orange Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-orange-400/25 dark:bg-orange-500/10 blur-[130px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-orange-200 dark:border-orange-500/30 text-[#FF6B00] text-[11px] font-black tracking-widest uppercase mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
            OFFICIAL HALL OF CHAMPIONS
          </div>

          {/* Elegant Serif Title */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            The Champions
          </h2>

          {/* Italic Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg italic font-normal tracking-wide max-w-xl mx-auto">
            “Mengabadikan momen berharga di balik setiap kemenangan”
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] flex items-center justify-center select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: '1200px' }}
        >
          {champions.map((champ, index) => {
            // Calculate circular offset
            const offset = (index - activeIndex + total) % total;
            let normalizedOffset = offset;
            if (normalizedOffset > total / 2) {
              normalizedOffset -= total;
            }

            const isCenter = normalizedOffset === 0;
            const isLeft = normalizedOffset === -1;
            const isRight = normalizedOffset === 1;
            const isVisible = Math.abs(normalizedOffset) <= 2;

            if (!isVisible) return null;

            // Pseudo-3D transform styling
            let transform = '';
            let zIndex = 10;
            let opacity = 0;

            if (isCenter) {
              transform = 'translateX(0%) scale(1) translateZ(50px)';
              zIndex = 40;
              opacity = 1;
            } else if (isLeft) {
              transform = 'translateX(-70%) scale(0.85) translateZ(-40px) rotateY(10deg)';
              zIndex = 25;
              opacity = 0.8;
            } else if (isRight) {
              transform = 'translateX(70%) scale(0.85) translateZ(-40px) rotateY(-10deg)';
              zIndex = 25;
              opacity = 0.8;
            } else if (normalizedOffset === -2) {
              transform = 'translateX(-130%) scale(0.7) translateZ(-100px) rotateY(18deg)';
              zIndex = 10;
              opacity = 0.35;
            } else if (normalizedOffset === 2) {
              transform = 'translateX(130%) scale(0.7) translateZ(-100px) rotateY(-18deg)';
              zIndex = 10;
              opacity = 0.35;
            }

            return (
              <div
                key={champ.id}
                onClick={() => goToIndex(index)}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Poster Card */}
                <div
                  className={`relative w-[240px] sm:w-[310px] md:w-[370px] aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden bg-white shadow-2xl transition-all duration-500 border-4 ${
                    isCenter
                      ? 'border-white ring-4 ring-orange-500/30 shadow-[0_25px_60px_-15px_rgba(249,115,22,0.4)]'
                      : 'border-white/80 hover:border-orange-300 opacity-90 hover:opacity-100 shadow-lg'
                  }`}
                >
                  <img
                    src={champ.image}
                    alt={champ.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Subtle edge sheen on active */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-white/10 pointer-events-none"></div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            onClick={goToPrev}
            type="button"
            className="absolute left-2 sm:left-6 md:left-12 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white border border-slate-200/80 dark:border-slate-700 shadow-xl backdrop-blur-md flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Poster Sebelumnya"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            type="button"
            className="absolute right-2 sm:right-6 md:right-12 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white border border-slate-200/80 dark:border-slate-700 shadow-xl backdrop-blur-md flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Poster Berikutnya"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots Indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-8 sm:mt-10">
          {champions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              type="button"
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 h-2.5 bg-[#FF6B00] shadow-sm shadow-orange-500/50'
                  : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-orange-300'
              }`}
              aria-label={`Lihat juara ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

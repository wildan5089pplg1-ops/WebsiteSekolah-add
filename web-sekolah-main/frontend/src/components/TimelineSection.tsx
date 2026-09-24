"use client";
// Force recompile to remove the watermark

import React, { useState, useEffect, useRef } from 'react';

const timelineData = [
  {
    id: 1,
    year: '2011',
    title: 'The Genesis',
    description: 'Fondasi pertama SMK Prestasi Prima diletakkan dengan visi mencetak generasi unggul.',
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
      </svg>
    )
  },
  {
    id: 2,
    year: '2014',
    title: 'Momentum',
    description: 'Resmi beroperasi dengan fasilitas modern dan kurikulum yang mulai berdetak.',
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
      </svg>
    )
  },
  {
    id: 3,
    year: '2017',
    title: 'Expansion',
    description: 'Program Prakerin diperluas untuk mengasah soft skill siswa di industri nyata.',
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    id: 4,
    year: '2021',
    title: 'Gold Standard',
    description: 'Pencapaian Akreditasi A sebagai pengakuan atas kualitas tanpa henti.',
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    )
  },
  {
    id: 5,
    year: '2025',
    title: 'Future Ready',
    description: 'Transformasi Digital & Kurikulum Merdeka. Kami membentuk masa depan.',
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    id: 6,
    year: '2026',
    title: 'Achieving Perfection',
    description: 'Melangkah menuju standar terbaik melalui inovasi, prestasi, dan kualitas berkelanjutan.',
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
      </svg>
    )
  }
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;
      
      let progress = 0;
      if (scrollableDistance > 0) {
        progress = -rect.top / scrollableDistance;
        progress = Math.min(1, Math.max(0, progress));
      }
      
      // Update state
      setScrollProgress(progress);
      
      const index = Math.round(progress * (timelineData.length - 1));
      setActiveIndex(index);
      
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    // Start loop
    updateScroll();
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Configuration for the Rotary Dial
  const baseAngle = 15; // 15 degrees between each node
  const totalAngle = baseAngle * (timelineData.length - 1); // 60 degrees total
  const startAngle = totalAngle / 2; // +30 degrees to center the first node
  
  // Interpolated rotation based on exact scroll progress for buttery smooth scroll
  const currentRotation = startAngle - (scrollProgress * totalAngle);
  
  // Circle sizing (giant circle to make a gentle arc)
  const circleSize = 3000;
  const radius = circleSize / 2;

  return (
    <section id="our-journey-section" ref={containerRef} className="relative w-full bg-[#0a1128]" style={{ height: '400vh' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center">
        
        {/* Background Dots */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Header (Top) */}
        <div className="relative z-20 pt-32 flex justify-center w-full">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-orange-500/50"></div>
            <div className="px-6 py-2 rounded-full border border-orange-500/30 bg-slate-900/50 backdrop-blur-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"></span>
              <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase">Our Journey</span>
            </div>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-orange-500/50"></div>
          </div>
        </div>

        {/* The Giant Rotary Dial */}
        <div 
          className="absolute left-1/2 rounded-full border-t-[1.5px] border-slate-700/80"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            top: '44vh',
            marginLeft: `-${radius}px`,
            transform: `rotate(${currentRotation}deg)`,
            transformOrigin: '50% 50%',
            willChange: 'transform'
          }}
        >
          {/* Timeline Nodes */}
          {timelineData.map((item, i) => {
             // Calculate the specific angle for this node on the circle
             const itemAngle = -startAngle + (i * baseAngle);
             return (
               <div 
                 key={item.id}
                 className="absolute top-1/2 left-1/2 w-6 h-6 -ml-3 -mt-3"
                 style={{
                   // Rotate it to its position, then push it outward by the radius
                   transform: `rotate(${itemAngle}deg) translateY(-${radius}px)`
                 }}
               >
                 {/* The Dot Marker */}
                 <div className={`w-full h-full rounded-full border-[5px] border-[#0a1128] transition-all duration-300 ${i === activeIndex ? 'bg-orange-500 scale-125 shadow-[0_0_25px_#f97316]' : 'bg-slate-600 scale-75'}`}></div>
                 
                 {/* Year Text (floating above the node) */}
                 <div 
                   className="absolute bottom-full mb-6 left-1/2"
                   style={{ 
                     // We counter-rotate the text by exact opposite of the current overall rotation
                     // so the text ALWAYS stays perfectly upright during the scroll!
                     transform: `translateX(-50%) rotate(${-itemAngle - currentRotation}deg)`,
                     willChange: 'transform'
                   }}
                 >
                   <span className={`text-2xl md:text-3xl font-black transition-colors duration-500 ${i === activeIndex ? 'text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'text-slate-500/40'}`}>
                     {item.year}
                   </span>
                 </div>
               </div>
             )
          })}
        </div>
        
        {/* Dynamic Content Display Area */}
        <div className="absolute top-[52vh] left-0 right-0 flex justify-center px-4 w-full h-[48vh]">
          <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-start pt-2">
            {timelineData.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <div 
                  key={item.id}
                  className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                >

                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col items-center pt-2">
                    {/* The Icon inside Glass Box */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0f172a]/80 border border-slate-700/60 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md text-orange-500 mb-5 md:mb-6 transition-transform duration-500 hover:scale-105 group">
                      <div className="group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                        {item.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl">{item.title}</h3>
                    <p className="text-slate-300 text-sm md:text-base max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

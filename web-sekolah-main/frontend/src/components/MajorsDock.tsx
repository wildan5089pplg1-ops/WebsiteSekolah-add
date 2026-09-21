'use client';
import { useEffect, useRef, useState } from 'react';

export default function MajorsDock() {
  const [isVisible, setIsVisible] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We don't need the timeout anymore because the rootMargin and exact target will prevent premature firing.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Requires the element to be 50px above the bottom of the screen to trigger
      }
    );
    
    if (dockRef.current) {
      observer.observe(dockRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full z-20 pb-8 pt-20 mt-auto bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-6 opacity-0 ${isVisible ? 'animate-[fade-in-up_1.5s_ease-out_both]' : ''}`}>
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-bold">Program Keahlian Unggulan</span>
        </div>
        <div ref={dockRef} className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
          
          {['DKV', 'PPLG', 'TJKT', 'BCF'].map((major, i) => (
            <div 
              key={major} 
              className={`group relative rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-orange-500/50 transition-all duration-300 px-6 py-4 sm:px-8 sm:py-5 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(234,88,12,0.2)] hover:-translate-y-2 ${isVisible ? 'animate-[fade-in-up_1.5s_ease-out_both]' : 'opacity-0'}`} 
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Glowing corner effect on hover */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 blur opacity-transition duration-500 -z-10 group-hover:duration-200"></div>
              <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-orange-200 transition-colors">
                  {major}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] group-hover:text-orange-300 transition-colors whitespace-nowrap">
                  {major === 'DKV' ? 'Desain Visual' : major === 'PPLG' ? 'Software & Gim' : major === 'TJKT' ? 'Jaringan Telecom' : 'Broadcasting Film'}
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

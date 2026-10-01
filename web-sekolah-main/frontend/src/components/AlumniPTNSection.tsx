"use client";

import React from 'react';

const universities = [
  { id: 1, name: 'Universitas Indonesia', image: '/images/ptn/ui3.png', color: 'from-yellow-400 to-amber-500', shadow: 'shadow-yellow-500/20' },
  { id: 2, name: 'Institut Pertanian Bogor', image: '/images/ptn/ipb.png', color: 'from-blue-600 to-indigo-700', shadow: 'shadow-indigo-500/20' },
  { id: 3, name: 'Universitas Negeri Jakarta', image: '/images/ptn/unj.png', color: 'from-emerald-500 to-green-600', shadow: 'shadow-emerald-500/20' },
  { id: 4, name: 'Universitas Padjadjaran', image: '/images/ptn/unpad.png', color: 'from-red-500 to-rose-600', shadow: 'shadow-red-500/20' },
  { id: 5, name: 'UIN', image: '/images/ptn/uin2.png', color: 'from-cyan-500 to-blue-500', shadow: 'shadow-cyan-500/20' },
  { id: 6, name: 'Politeknik', image: '/images/ptn/politeknik.png', color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/20' },
  { id: 7, name: 'ISI', image: '/images/ptn/isi2.png', color: 'from-orange-400 to-amber-600', shadow: 'shadow-orange-500/20' },
  { id: 8, name: 'Trisakti', image: '/images/ptn/trisakti.png', color: 'from-slate-400 to-slate-600', shadow: 'shadow-slate-500/20' },
];

export default function AlumniPTNSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Background Texture (Diagonal Stripes) */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50px)'
        }}
      ></div>

      {/* Premium Edge Decoration - Left (Constellation Network) */}
      <div className="absolute top-0 -left-20 h-full w-80 flex items-center z-0 opacity-60 dark:opacity-30 pointer-events-none">
        <svg viewBox="0 0 300 800" className="w-full h-[150%] text-orange-500" stroke="currentColor" fill="none">
          <g className="animate-pulse" style={{ animationDuration: '4s' }}>
            <line x1="50" y1="200" x2="150" y2="300" strokeWidth="1" className="opacity-40" />
            <line x1="150" y1="300" x2="80" y2="450" strokeWidth="1.5" className="opacity-60" />
            <line x1="150" y1="300" x2="250" y2="350" strokeWidth="1" className="opacity-30" />
            <line x1="80" y1="450" x2="200" y2="550" strokeWidth="2" className="opacity-50" />
            <line x1="200" y1="550" x2="100" y2="700" strokeWidth="1" className="opacity-40" />
            
            <circle cx="50" cy="200" r="4" fill="currentColor" />
            <circle cx="150" cy="300" r="8" fill="currentColor" className="opacity-80" />
            <circle cx="80" cy="450" r="6" fill="currentColor" />
            <circle cx="250" cy="350" r="3" fill="currentColor" className="opacity-60" />
            <circle cx="200" cy="550" r="10" fill="currentColor" className="opacity-90" />
            <circle cx="100" cy="700" r="5" fill="currentColor" />
          </g>
        </svg>
        <div className="absolute top-1/2 left-0 w-40 h-40 bg-orange-500/20 blur-[80px] rounded-full"></div>
      </div>

      {/* Premium Edge Decoration - Right (Geometric Orbit) */}
      <div className="absolute top-0 -right-20 h-full w-80 flex items-center justify-end z-0 opacity-60 dark:opacity-30 pointer-events-none">
        <svg viewBox="0 0 300 800" className="w-full h-[150%] text-blue-600 dark:text-cyan-500">
          <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '250px 400px' }}>
            <circle cx="250" cy="400" r="150" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 20" className="opacity-40" />
            <circle cx="250" cy="400" r="100" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="30 15" className="opacity-60" />
            <circle cx="250" cy="400" r="200" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5 30" className="opacity-30" />
            
            {/* Orbiting Nodes */}
            <circle cx="100" cy="400" r="6" fill="currentColor" className="opacity-80" />
            <circle cx="250" cy="250" r="8" fill="currentColor" className="opacity-60" />
            <circle cx="150" cy="300" r="4" fill="currentColor" className="opacity-90" />
          </g>
        </svg>
        <div className="absolute top-1/3 right-0 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 uppercase tracking-widest drop-shadow-sm mb-4">
            Lulusan PTN
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto">
            Membuka gerbang masa depan. Lulusan kami secara konsisten diterima di berbagai Perguruan Tinggi Negeri terbaik di Indonesia.
          </p>
        </div>

        {/* Grid of Universities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {universities.map((uni) => (
            <div 
              key={uni.id}
              className={`group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 flex items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${uni.shadow} overflow-hidden aspect-video`}
            >
              {/* Card Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${uni.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <img 
                src={uni.image} 
                alt={uni.name} 
                className="w-full h-full max-h-[70px] sm:max-h-[90px] object-contain transform group-hover:scale-110 transition-transform duration-500 relative z-10 filter drop-shadow-sm" 
              />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

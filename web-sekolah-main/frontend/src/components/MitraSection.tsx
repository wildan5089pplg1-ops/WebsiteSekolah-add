"use client";

import React, { useState, useEffect } from 'react';

const sponsors = [
  { id: 1, name: 'Prambors', category: 'Media Partner', image: '/images/prambos.webp', acronym: 'PRM', color: 'from-yellow-400 to-amber-500' }
];



export default function MitraSection() {


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
          <h2 className="text-3xl md:text-4xl font-black text-orange-500 uppercase tracking-tight drop-shadow-sm mb-12">
            Kerja Sama Industri
          </h2>
          
          {/* LOGOS CONTAINER */}
          <div className="w-full flex justify-center items-center py-8">
            <img 
              src="/images/support-logos.png" 
              alt="Mitra Industri" 
              className="w-full max-w-6xl h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
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

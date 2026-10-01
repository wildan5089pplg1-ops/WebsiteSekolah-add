"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';

// Interactive Network/Constellation Background
function NetworkBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  const nodes = useMemo(() => {
    // Generate static nodes for the constellation
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* SVG Network container */}
      <div className="absolute top-0 right-0 w-full h-[900px] lg:w-[65%] pointer-events-none opacity-30 sm:opacity-60 lg:opacity-100 z-0 overflow-hidden">
        <svg className="w-full h-full text-orange-500" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Edges */}
          {nodes.map((node, i) => {
             return nodes.slice(i + 1).map((otherNode, j) => {
               const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
               // Connect nodes that are close to each other
               if (dist < 18) {
                 return (
                   <line 
                     key={`edge-${i}-${j}`} 
                     x1={`${node.x}%`} y1={`${node.y}%`} 
                     x2={`${otherNode.x}%`} y2={`${otherNode.y}%`} 
                     stroke="currentColor" 
                     strokeWidth="0.75" 
                     className="opacity-40" 
                   />
                 );
               }
               return null;
             });
          })}
          
          {/* Nodes */}
          {nodes.map((node) => (
            <g key={`node-${node.id}`}>
              <circle cx={`${node.x}%`} cy={`${node.y}%`} r="3" fill="currentColor" className="opacity-90" />
              <circle cx={`${node.x}%`} cy={`${node.y}%`} r="7" fill="transparent" stroke="currentColor" strokeWidth="1" className="opacity-40" />
            </g>
          ))}

          {/* Glowing Highlight Nodes */}
          {nodes.slice(0, 15).map((node) => (
            <circle 
              key={`glow-${node.id}`} 
              cx={`${node.x}%`} cy={`${node.y}%`} 
              r="4" 
              fill="#fff" 
              filter="url(#glow)" 
              className="opacity-100 animate-pulse" 
              style={{ animationDelay: `${Math.random() * 3}s`, animationDuration: '4s' }} 
            />
          ))}
        </svg>
      </div>

      {/* Interactive Floating Glow tracked by Mouse */}
      <div 
        className="fixed w-[500px] h-[500px] bg-orange-500/15 blur-[100px] rounded-full transition-transform duration-[400ms] ease-out pointer-events-none mix-blend-screen z-0"
        style={{
          transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)`,
          top: 0, left: 0,
        }}
      />
    </>
  );
}

export default function EkskulPage() {
  return (
    <div className="min-h-screen bg-white relative flex flex-col pt-20">
      
      {/* Background Graphic */}
      <NetworkBackground />

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-24 flex flex-col items-start text-left">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-orange-200 bg-orange-50 mb-10 shadow-sm backdrop-blur-sm">
           <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
           <span className="text-xs font-black text-orange-600 tracking-wider uppercase">Eksplorasi Bakat, Raih Prestasi Tanpa Batas!</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
          JELAJAHI BAKATMU,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">RAIH PRESTASI</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">TANPA BATAS</span>
        </h1>
        
        {/* Sub-headline */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-500 font-medium leading-relaxed mb-20">
          SMK Prestasi Prima menyediakan wadah bagi siswa untuk mengembangkan minat dan bakat melalui berbagai kegiatan ekstrakurikuler yang inspiratif dan berprestasi.
        </p>

        {/* Big Interactive Card Image */}
        <div className="w-full max-w-[1000px] mx-auto relative group cursor-pointer perspective-[1200px]">
          {/* Card Outer Glow on Hover */}
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-400 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-30 transition duration-700 ease-out"></div>
          
          {/* Main Card Container */}
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white transform transition-transform duration-700 ease-out group-hover:scale-[1.015] group-hover:-translate-y-3 bg-slate-100">
            {/* Image Placeholder */}
            <img 
              src="/images/gedung.png" 
              alt="Kegiatan Ekskul SMK Prestasi Prima" 
              className="w-full h-[350px] md:h-[500px] object-cover object-center transform transition-transform duration-1000 group-hover:scale-105" 
            />
            
            {/* Overlay Gradient (Top-left & Bottom-right focus) */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60 pointer-events-none"></div>

            {/* Text over image (Top Left) */}
            <div className="absolute top-8 left-8 sm:top-14 sm:left-14">
              <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-xl leading-[1.15]">
                Bergabung & <br/> 
                <span className="text-orange-400">Tunjukkan Bakatmu</span>
              </h2>
            </div>
            
            {/* Floating Action Button (Bottom Right) */}
            <div className="absolute bottom-8 right-8 sm:bottom-14 sm:right-14">
              <button className="bg-white hover:bg-orange-50 text-orange-600 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/30">
                EKSPLORASI SEKARANG 
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* CTA Banner Section */}
      <section className="w-full bg-[#f87f22] py-20 px-6 relative overflow-hidden mt-10">
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-sm leading-tight">
            Bergabunglah, Kembangkan, dan Raih Prestasi
          </h2>
          <Link href="/ppdb" className="bg-white hover:bg-slate-50 text-[#f87f22] px-10 py-4 rounded-full font-black text-sm md:text-base shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 flex items-center gap-3">
            Daftar Sekarang
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </section>
      
    </div>
  );
}

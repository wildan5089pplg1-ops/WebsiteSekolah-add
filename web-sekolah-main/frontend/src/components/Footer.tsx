"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const [supportImgError, setSupportImgError] = useState(false);

  const bannerSlogan = "SMK Prestasi Prima – MENCETAK GENERASI BERPRESTASI! • IF BETTER IS POSSIBLE, GOOD IS NOT ENOUGH!";

  return (
    <footer className="relative w-full bg-[#0a0f1c] pb-8 overflow-hidden font-sans border-t border-slate-800/80">
      
      {/* ======================================================= */}
      {/* 0. GLOBAL ANIMATED ORANGE BRANDING BANNER */}
      {/* ======================================================= */}
      <div className="relative w-full bg-gradient-to-r from-[#FF6B00] via-[#FF5500] to-[#E64A00] overflow-hidden border-b border-orange-700/60 shadow-lg">
        {/* Subtle orange geometric pattern & diagonal light accents */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent skew-x-12 pointer-events-none" />

        {/* Content Row: Logo pinned on left, smooth marquee on right */}
        <div className="flex items-center w-full min-h-[50px] sm:min-h-[58px] relative z-10">
          
          {/* School Logo Crest Element */}
          <div className="shrink-0 flex items-center gap-2.5 sm:gap-3 pl-4 sm:pl-8 pr-3 sm:pr-5 py-2 bg-[#FF6B00] sm:bg-gradient-to-r sm:from-[#FF6B00] sm:to-[#FF6B00]/90 z-20 shadow-[10px_0_20px_-5px_rgba(255,107,0,0.8)] border-r border-white/20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white p-1 sm:p-1.5 shadow-md border-2 border-orange-200/90 shrink-0 flex items-center justify-center">
              <img
                src="/images/logo-smk.png"
                alt="SMK Prestasi Prima"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col text-white leading-tight">
              <span className="text-[11px] font-black uppercase tracking-wider drop-shadow-xs">Prestasi Prima</span>
              <span className="text-[9px] font-semibold text-orange-100">Official Portal</span>
            </div>
          </div>

          {/* Continuous Infinite Marquee Track (Right to Left) */}
          <div className="relative flex-1 overflow-hidden py-2 sm:py-2.5 flex items-center">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-[#FF6B00] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-[#E64A00] to-transparent z-10 pointer-events-none" />

            {/* Seamless 2-track marquee */}
            <div className="flex w-max global-banner-marquee">
              {/* Track 1 */}
              <div className="flex items-center shrink-0">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={`track1-${idx}`}
                    className="flex items-center text-white font-black text-xs sm:text-sm md:text-base tracking-wider uppercase whitespace-nowrap px-4 sm:px-6 drop-shadow-xs"
                  >
                    <span>{bannerSlogan}</span>
                    <span className="ml-8 sm:ml-12 text-white/50 text-sm select-none" aria-hidden="true">•</span>
                  </div>
                ))}
              </div>

              {/* Track 2 (Identical for seamless infinite loop) */}
              <div className="flex items-center shrink-0" aria-hidden="true">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={`track2-${idx}`}
                    className="flex items-center text-white font-black text-xs sm:text-sm md:text-base tracking-wider uppercase whitespace-nowrap px-4 sm:px-6 drop-shadow-xs"
                  >
                    <span>{bannerSlogan}</span>
                    <span className="ml-8 sm:ml-12 text-white/50 text-sm select-none" aria-hidden="true">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom subtle darker orange strip */}
        <div className="w-full h-1 bg-gradient-to-r from-[#D64400] via-[#C43800] to-[#B33000]" />
      </div>

      <div className="relative pt-16 sm:pt-20">
        {/* 1. MASSIVE BACKGROUND TYPOGRAPHY WATERMARK */}
        <div className="absolute top-10 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.02] select-none">
          <h1 className="text-[12vw] font-black whitespace-nowrap text-white tracking-tighter">PRESTASI PRIMA</h1>
        </div>
        
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ========================================= */}
          {/* SECTION 1: IDENTITY & INTERACTIVE CARD */}
          {/* ========================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            
            {/* LEFT: Branding & Contact Info (Span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center p-2 shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]">
                    <img src="/images/logo-smk.png" alt="SMK Prestasi Prima" className="w-full h-full object-contain drop-shadow-lg" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=SP&background=f97316&color=fff' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white leading-tight">SMK Prestasi<br/>Prima</h2>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Pendidikan kejuruan berkualitas dengan jurusan unggulan, fasilitas modern, dan dukungan karier untuk siswa berprestasi.
                </p>
                <div className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold italic">
                  "Berani Hebat, Berani Berprestasi."
                </div>
              </div>

              {/* Premium Contact Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="flex flex-col"><span className="text-[10px] text-slate-500 font-bold uppercase">Telepon</span><span className="text-sm text-slate-300 font-medium">+62 851-9592-8886</span></div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="flex flex-col"><span className="text-[10px] text-slate-500 font-bold uppercase">Email</span><span className="text-sm text-slate-300 font-medium">info@prestasiprima.sch.id</span></div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div className="flex flex-col"><span className="text-[10px] text-slate-500 font-bold uppercase">Alamat</span><span className="text-sm text-slate-300 font-medium leading-snug">Jl. Hankam Raya No. 89, Cilangkap, Jakarta Timur</span></div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="flex flex-col"><span className="text-[10px] text-slate-500 font-bold uppercase">Jam Operasional</span><span className="text-sm text-slate-300 font-medium">Senin – Jumat: 06.00 - 17.00</span></div>
                </div>
              </div>
            </div>

            {/* RIGHT: Dual-Pane Map & Form Card (Span 8) */}
            <div className="lg:col-span-8 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-2 flex flex-col md:flex-row gap-2 shadow-2xl">
              
              {/* Form Pane */}
              <div className="w-full md:w-2/5 p-6 lg:p-10 flex flex-col justify-center rounded-[2rem] bg-white/[0.02]">
                <div className="mb-6">
                  <h3 className="text-white font-black text-2xl tracking-tight">Kirim Pesan</h3>
                  <p className="text-xs text-slate-400 mt-1">Kami siap membantu Anda.</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    className="w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Alamat Email" 
                    className="w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <textarea 
                    placeholder="Pesan Anda..." 
                    rows={3}
                    className="w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  ></textarea>
                  <button type="submit" className="w-full bg-white text-slate-900 hover:bg-orange-500 hover:text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300">
                    Kirim Sekarang
                  </button>
                </form>
              </div>

              {/* Map Pane */}
              <div className="w-full md:w-3/5 rounded-[2rem] overflow-hidden bg-slate-900 relative min-h-[300px]">
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                   <p className="text-xs text-white leading-relaxed">
                     Jl. Hankam Raya No. 89, Cilangkap, Cipayung, Jakarta Timur<br/>
                     <span className="text-orange-400">Jam Buka: Sen - Jum (06.00 - 17.00)</span>
                   </p>
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7335260592965!2d106.90159421528623!3d-6.311792695431697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed55d5b76b25%3A0xc34188bbfb9f84bc!2sSMK%20Prestasi%20Prima!5e0!3m2!1sen!2sid!4v1684829375123!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  className="absolute inset-0 w-full h-full object-cover"
                ></iframe>
              </div>

            </div>
          </div>

          {/* ========================================= */}
          {/* SECTION 2: EDITORIAL NAVIGATION */}
          {/* ========================================= */}
          <div className="py-12 border-y border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            
            {/* Menu Horizontal Wrap */}
            <div>
              <h4 className="text-orange-500 font-bold mb-6 text-xs tracking-widest uppercase flex items-center gap-2">
                <span className="w-4 h-px bg-orange-500"></span> Menu Utama
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                {['Beranda', 'Program', 'Prestasi', 'Pendaftaran', 'Presmalancer'].map((item, i) => (
                  <React.Fragment key={item}>
                    <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{item}</Link>
                    {i !== 4 && <span className="text-slate-700">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Info Tambahan Horizontal Wrap */}
            <div>
              <h4 className="text-blue-500 font-bold mb-6 text-xs tracking-widest uppercase flex items-center gap-2">
                <span className="w-4 h-px bg-blue-500"></span> Info Tambahan
              </h4>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                {['Kegiatan Sekolah', 'Kerja Sama Industri', 'Beasiswa & Prestasi', 'Layanan Alumni', 'Brosur'].map((item, i) => (
                  <React.Fragment key={item}>
                    <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{item}</Link>
                    {i !== 4 && <span className="text-slate-700">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Minimalist FAQ */}
            <div>
              <h4 className="text-amber-500 font-bold mb-6 text-xs tracking-widest uppercase flex items-center gap-2">
                <span className="w-4 h-px bg-amber-500"></span> Pusat Bantuan (FAQ)
              </h4>
              <ul className="space-y-4">
                <li className="text-xs group cursor-pointer">
                  <span className="text-white font-bold block mb-1 group-hover:text-amber-400 transition-colors">Bagaimana cara mendaftar?</span>
                  <span className="text-slate-400 leading-relaxed">Pendaftaran melalui laman online atau ke sekolah.</span>
                </li>
                <li className="text-xs group cursor-pointer">
                  <span className="text-white font-bold block mb-1 group-hover:text-amber-400 transition-colors">Kapan jadwal PPDB dibuka?</span>
                  <span className="text-slate-400 leading-relaxed">Setiap tahun mulai Desember hingga Juni.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* ========================================= */}
          {/* SECTION 3: PREMIUM HORIZONTAL SUPPORT BAR */}
          {/* ========================================= */}
          <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] border border-white/5 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 relative overflow-hidden shadow-2xl">
            
            {/* Decorative bar background glow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 blur-2xl transform translate-x-20"></div>
            
            <div className="relative z-10 text-center lg:text-left shrink-0">
              <h3 className="text-white font-black text-2xl tracking-tight">Support by:</h3>
            </div>
            
            {/* The White Box strictly designed for the horizontal image */}
            <div className="relative z-10 w-full lg:max-w-3xl bg-white rounded-2xl p-4 sm:p-6 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] flex justify-center items-center">
              {!supportImgError ? (
                <img 
                  src="/images/support-logos.png" 
                  alt="Supported by Partners" 
                  className="w-full h-auto max-h-[70px] sm:max-h-[85px] object-contain hover:scale-[1.02] transition-transform duration-500"
                  onError={() => setSupportImgError(true)}
                />
              ) : (
                /* Fallback Horizontal Text Design if Image is missing */
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 w-full opacity-80 grayscale">
                  <span className="font-black italic text-orange-600 text-base sm:text-xl tracking-tighter">INFRA</span>
                  <span className="font-bold text-orange-500 text-sm sm:text-base">Jagoan Hosting</span>
                  <span className="font-bold text-slate-800 tracking-widest text-sm sm:text-base">KOMDIGI</span>
                  <span className="font-bold text-red-600 text-sm sm:text-base">MASPION IT</span>
                  <span className="font-black italic text-slate-700 text-sm sm:text-base leading-none">GAUDA<br/>SPARK</span>
                </div>
              )}
            </div>

          </div>

          {/* ========================================= */}
          {/* COPYRIGHT */}
          {/* ========================================= */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] md:text-xs text-slate-500">
            <p>
              © 2026 SMK Prestasi Prima &nbsp;|&nbsp; Oren Solution v3.0 &nbsp;|&nbsp; Developed by <strong className="text-slate-300 font-semibold">Azzam Mughni Al Ghifari</strong>
            </p>
            <p>
              Dibuat oleh: <strong className="text-orange-400 font-semibold">Azzam, Rendra, Wildan, Junior, Maravile</strong>
            </p>
          </div>

        </div>
      </div>

      {/* Global CSS animation for smooth infinite marquee */}
      <style jsx>{`
        @keyframes globalBannerMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .global-banner-marquee {
          display: flex;
          animation: globalBannerMarquee 38s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .global-banner-marquee {
            animation: none !important;
            transform: none !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </footer>
  );
}

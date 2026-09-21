'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinksLeft = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Tentang', 
      href: '/tentang', 
      hasDropdown: true,
      subLinks: [
        { name: 'PROGRAM', href: '/tentang/program' },
        { name: 'PROFILE SEKOLAH', href: '/tentang/profile' },
        { name: 'FASILITAS', href: '/tentang/fasilitas' },
        { name: 'SAMBUTAN PEMBINA YAYASAN', href: '/tentang/sambutan' },
      ]
    },
    { name: 'Program', href: '/program', hasDropdown: true, subLinks: [] },
    { name: 'Pendaftaran', href: '/pendaftaran', hasDropdown: true, subLinks: [] },
    { 
      name: 'PRESMA', 
      href: '/presma', 
      hasDropdown: true,
      subLinks: [
        { name: 'PRESMA LIB', href: '/presma/lib' },
        { name: 'PRESMA CAREER', href: '/presma/career' },
        { name: 'PRESMA CARASA', href: '/presma/carasa' },
      ]
    },
  ];

  const navLinksRight = [
    { 
      name: 'Dokumentasi', 
      href: '/dokumentasi', 
      hasDropdown: true,
      subLinks: [
        { name: 'PRESTASI', href: '/dokumentasi/prestasi' },
        { name: 'EKSTRAKURIKULER', href: '/dokumentasi/ekskul' },
        { name: 'KARYA & PROYEK', href: '/dokumentasi/karya' },
      ]
    },
  ];

  const DropdownIcon = () => (
    <svg className="w-3.5 h-3.5 ml-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="w-full relative z-50">
      {/* Orange Top Bar */}
      <div className="w-full bg-[#f87f22] h-10 flex items-center justify-end px-8 md:px-16 text-white text-xs font-bold tracking-wide relative">
        {/* White cutout area for logo to match the design curve */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-10 bg-white rounded-b-[40px] z-0"></div>

        <Link href="/selengkapnya" className="flex items-center gap-1.5 hover:text-orange-100 transition-colors z-10">
          Selengkapnya 
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Main Navbar */}
      <header className="w-full bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] h-16 relative flex items-center px-4 md:px-8 xl:px-16 z-20">
        
        {/* Left Links */}
        <nav className="hidden lg:flex flex-1 items-center gap-4 xl:gap-8 pt-1">
          {navLinksLeft.map((link) => (
            <div key={link.name} className="relative group">
              <Link href={link.href} className="flex items-center text-[13px] font-bold text-slate-800 hover:text-[#f87f22] transition-colors pb-4">
                {link.name}
                {link.hasDropdown && <DropdownIcon />}
              </Link>
              {link.hasDropdown && (
                <div className="absolute top-10 left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="bg-white shadow-xl py-4 min-w-[220px] border border-slate-50 flex flex-col gap-1">
                    {link.subLinks?.map(sub => (
                      <Link key={sub.name} href={sub.href} className="block px-6 py-2 text-[11px] font-bold text-slate-600 hover:text-[#f87f22] hover:bg-orange-50 transition-colors uppercase tracking-wider">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Center Logo Area */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 flex flex-col items-center z-50">
          <div className="bg-white rounded-full p-2.5 shadow-[0_0_15px_rgba(0,0,0,0.05)] border-[3px] border-white flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo SMK" className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-sm" />
          </div>
          <span className="text-[9px] md:text-[10px] font-black text-[#f87f22] mt-1.5 uppercase tracking-widest whitespace-nowrap">SMK PRESTASI PRIMA</span>
        </div>

        {/* Right Links & Button */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-6 xl:gap-8 pt-1">
          {navLinksRight.map((link) => (
            <div key={link.name} className="relative group">
              <Link href={link.href} className="flex items-center text-[13px] font-bold text-slate-800 hover:text-[#f87f22] transition-colors pb-4">
                {link.name}
                {link.hasDropdown && <DropdownIcon />}
              </Link>
              {link.hasDropdown && (
                <div className="absolute top-10 left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="bg-white shadow-xl py-4 min-w-[200px] border border-slate-50 flex flex-col gap-1">
                    {link.subLinks?.map(sub => (
                      <Link key={sub.name} href={sub.href} className="block px-6 py-2 text-[11px] font-bold text-slate-600 hover:text-[#f87f22] hover:bg-orange-50 transition-colors uppercase tracking-wider">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link href="/mikrotik" className="flex items-center gap-2 bg-orange-100 text-[#f87f22] font-bold text-[11px] px-4 py-2 rounded-full hover:bg-orange-200 transition-colors uppercase tracking-wider mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f87f22]"></div>
            MIKROTIK ACADEMY
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden ml-auto p-2 mb-2 text-slate-800">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
    </div>
  );
}

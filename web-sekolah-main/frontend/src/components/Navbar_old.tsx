'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SubLink {
  name: string;
  href: string;
  desc?: string;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  subLinks?: SubLink[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const toggleMobileSubmenu = (name: string) => {
    setMobileExpanded(prev => (prev === name ? null : name));
  };

  const navLinksLeft: NavItem[] = [
    { name: 'Beranda', href: '/' },
    {
      name: 'Tentang',
      href: '/tentang',
      hasDropdown: true,
      subLinks: [
        { name: 'Profil Sekolah', href: '/tentang/profile', desc: 'Sejarah, visi, dan misi sekolah' },
        { name: 'Sambutan Pembina Yayasan', href: '/tentang/sambutan', desc: 'Pesan pimpinan yayasan' },
        { name: 'Fasilitas', href: '/tentang/fasilitas', desc: 'Sarana & prasarana pembelajaran' },
      ],
    },
    {
      name: 'Program',
      href: '/program',
      hasDropdown: true,
      subLinks: [
        { name: 'Presma Lib', href: '/program/presmalib', desc: 'Perpustakaan digital & riset' },
        { name: 'Presma Career', href: '/program/presmacareer', desc: 'Pusat karir & mitra industri' },
        { name: 'Presma Carasa', href: '/program/presmacarasa', desc: 'Inkubasi karya & talenta siswa' },
      ],
    },
  ];

  const navLinksRight: NavItem[] = [
    {
      name: 'Dokumentasi',
      href: '/dokumentasi',
      hasDropdown: true,
      subLinks: [
        { name: 'Prestasi', href: '/dokumentasi/prestasi', desc: 'Prestasi siswa tingkat nasional' },
        { name: 'Ekstrakurikuler', href: '/dokumentasi/ekskul', desc: 'Wadah eksplorasi minat & bakat' },
        { name: 'Karya & Proyek', href: '/dokumentasi/karya', desc: 'Portofolio inovasi teknologi' },
      ],
    },
    { name: 'Berita', href: '/news' },
    { name: 'Pendaftaran', href: '/ppdb' },
  ];

  const DropdownIcon = ({ className = "w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-[#f87f22] transition-transform duration-200 group-hover:rotate-180" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="w-full relative z-50 select-none">
      {/* Top Bar (Orange) */}
      <div className="w-full bg-[#f87f22] h-10 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 text-white text-xs font-semibold tracking-wide relative">
        {/* Left slogan / official identity */}
        <div className="hidden sm:flex items-center gap-3 z-10 text-[11px] text-white/90">
          <span className="font-bold tracking-wider">SMK PRESTASI PRIMA</span>
          <span className="text-white/40">•</span>
          <span className="italic font-normal">"If better is possible, good is not enough"</span>
        </div>

        {/* Center white curve cutout for the logo drop-down */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-10 bg-white rounded-b-[40px] z-0 shadow-[0_4px_10px_rgba(0,0,0,0.04)]"></div>

        {/* Right action links */}
        <div className="flex items-center gap-4 ml-auto z-10">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-white/90 hover:text-white transition-colors"
          >
            Kontak
          </Link>
          <span className="hidden md:inline text-white/40">•</span>
          <Link
            href="/selengkapnya"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white hover:text-orange-100 transition-colors"
          >
            Selengkapnya
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="w-full bg-white shadow-[0_4px_25px_-8px_rgba(0,0,0,0.08)] h-18 lg:h-20 relative flex items-center px-4 sm:px-8 md:px-12 lg:px-16 z-20 border-b border-slate-100">
        
        {/* Left Navigation Links */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-6 xl:gap-8 pr-16 xl:pr-20">
          {navLinksLeft.map((link) => (
            <div key={link.name} className="relative group py-5">
              <Link
                href={link.href}
                className="flex items-center text-[13px] font-bold text-slate-700 hover:text-[#f87f22] transition-colors py-1"
              >
                {link.name}
                {link.hasDropdown && <DropdownIcon />}
              </Link>

              {link.hasDropdown && link.subLinks && (
                <div className="absolute top-full -left-4 pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] py-3 min-w-[250px] border border-slate-100 flex flex-col gap-1 p-2">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="group/item flex flex-col px-4 py-2.5 rounded-xl text-slate-700 hover:text-[#f87f22] hover:bg-orange-50/70 transition-colors"
                      >
                        <span className="text-[12px] font-bold tracking-tight">
                          {sub.name}
                        </span>
                        {sub.desc && (
                          <span className="text-[10px] text-slate-400 group-hover/item:text-slate-500 font-normal mt-0.5">
                            {sub.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Center Logo Area */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 flex flex-col items-center z-50 pointer-events-auto">
          <Link href="/" className="group flex flex-col items-center">
            <div className="bg-white rounded-full p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.08)] border-[3px] border-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Logo SMK Prestasi Prima"
                className="h-16 w-16 md:h-18 md:w-18 object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-[9px] md:text-[10px] font-black text-[#f87f22] mt-1.5 uppercase tracking-widest whitespace-nowrap drop-shadow-sm">
              SMK PRESTASI PRIMA
            </span>
          </Link>
        </div>

        {/* Right Navigation Links & Action Button */}
        <nav className="hidden lg:flex flex-1 items-center justify-start gap-6 xl:gap-8 pl-16 xl:pr-0 pl-16 xl:pl-20">
          {navLinksRight.map((link) => (
            <div key={link.name} className="relative group py-5">
              <Link
                href={link.href}
                className="flex items-center text-[13px] font-bold text-slate-700 hover:text-[#f87f22] transition-colors py-1"
              >
                {link.name}
                {link.hasDropdown && <DropdownIcon />}
              </Link>

              {link.hasDropdown && link.subLinks && (
                <div className="absolute top-full -left-4 pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] py-3 min-w-[250px] border border-slate-100 flex flex-col gap-1 p-2">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="group/item flex flex-col px-4 py-2.5 rounded-xl text-slate-700 hover:text-[#f87f22] hover:bg-orange-50/70 transition-colors"
                      >
                        <span className="text-[12px] font-bold tracking-tight">
                          {sub.name}
                        </span>
                        {sub.desc && (
                          <span className="text-[10px] text-slate-400 group-hover/item:text-slate-500 font-normal mt-0.5">
                            {sub.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Action Badge: Mikrotik Academy */}
          <Link
            href="/mikrotik"
            className="flex items-center gap-2 bg-orange-50 text-[#f87f22] border border-orange-200/60 font-bold text-[11px] px-3.5 py-1.5 rounded-full hover:bg-orange-100 hover:border-orange-300 transition-all shadow-sm tracking-wide ml-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#f87f22] animate-pulse"></div>
            MIKROTIK ACADEMY
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden ml-auto p-2 text-slate-700 hover:text-[#f87f22] transition-colors rounded-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </header>

      {/* Mobile Menu Accordion Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-2xl space-y-3 animate-in fade-in duration-200">
          {[...navLinksLeft, ...navLinksRight].map((link) => {
            const isExpanded = mobileExpanded === link.name;
            return (
              <div key={link.name} className="border-b border-slate-100 pb-2.5">
                {link.hasDropdown && link.subLinks ? (
                  <div>
                    <button
                      onClick={() => toggleMobileSubmenu(link.name)}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-800 hover:text-[#f87f22] py-1.5"
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#f87f22]' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="pl-4 pt-1 space-y-1 border-l-2 border-orange-100 ml-2 mt-1">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-xs font-medium text-slate-600 hover:text-[#f87f22] py-1.5"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-sm text-slate-800 hover:text-[#f87f22] block py-1.5"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            );
          })}

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/ppdb"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#f87f22] text-white font-bold text-xs py-2.5 rounded-xl shadow-md hover:bg-orange-600 transition-colors"
            >
              Daftar PPDB Online
            </Link>
            <Link
              href="/mikrotik"
              onClick={() => setIsOpen(false)}
              className="w-full text-center inline-flex items-center justify-center gap-2 bg-orange-50 text-[#f87f22] border border-orange-200 font-bold text-xs py-2 rounded-xl"
            >
              <div className="w-2 h-2 rounded-full bg-[#f87f22]"></div>
              MIKROTIK ACADEMY
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

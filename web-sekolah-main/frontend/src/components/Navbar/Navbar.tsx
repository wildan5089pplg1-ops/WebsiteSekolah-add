"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, type NavSection } from "./navigation";
import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navRef = useRef<HTMLElement | null>(null);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Monitor Hero visibility on the homepage using IntersectionObserver
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const heroEl =
      document.getElementById("hero-section") ||
      document.querySelector(".fullscreen-hero-container");

    if (!heroEl) {
      // Fallback threshold if hero is not immediately available
      const handleScrollFallback = () => {
        setIsScrolled(window.scrollY > 350);
      };
      handleScrollFallback();
      window.addEventListener("scroll", handleScrollFallback, { passive: true });
      return () => window.removeEventListener("scroll", handleScrollFallback);
    }

    // Initial position check
    const rect = heroEl.getBoundingClientRect();
    setIsScrolled(rect.bottom <= 120);

    // Observe Hero section with threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero bottom scrolls past navbar zone, navbar becomes solid
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-120px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(heroEl);

    // Also handle scroll directly as fallback for ultra-fast scrolling
    const handleScroll = () => {
      const currentRect = heroEl.getBoundingClientRect();
      const pastHero = currentRect.bottom <= 120;
      setIsScrolled(pastHero);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  // Handle ESC key and outside clicks to close menus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Visual state calculation:
  // When over Hero on Homepage without mobile menu open, navbar is transparent.
  // Otherwise, it is solid.
  const isTransparent = isHomePage && !isScrolled && !mobileOpen;

  // Curated navigation sections for a clean classic desktop layout
  const navSections = useMemo(() => {
    return navigation.map((item) => {
      if (item.name === "Tentang Kami") {
        return { ...item, name: "Profil" };
      }
      return item;
    });
  }, []);

  const toggleMobileSubmenu = (name: string) => {
    setMobileExpanded((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header
        ref={navRef}
        className={`classic-navbar ${
          isTransparent ? "classic-navbar-transparent" : "classic-navbar-solid"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between transition-colors duration-300">
          {/* =========================================================
              LEFT: LOGO + BRANDING
              ========================================================= */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F96501] rounded-xl pr-2 py-1"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Logo SMK Prestasi Prima"
                width={40}
                height={40}
                className="object-contain w-full h-full drop-shadow-sm"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span
                className={`text-sm sm:text-base font-extrabold tracking-tight leading-none transition-colors duration-300 ${
                  isTransparent
                    ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                PRESTASI PRIMA
              </span>
              <span
                className={`text-[9.5px] font-semibold tracking-wider uppercase leading-tight mt-0.5 transition-colors duration-300 ${
                  isTransparent
                    ? "text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                    : "text-[#F96501]"
                }`}
              >
                Vocational School
              </span>
            </div>
          </Link>

          {/* =========================================================
              CENTER: CLEAN DESKTOP NAVIGATION TEXT LINKS
              ========================================================= */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Navigasi Utama"
          >
            {navSections.map((item) => {
              const hasSub = Boolean(item.subLinks && item.subLinks.length > 0);

              if (!hasSub) {
                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className={`text-[13.5px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-200 ${
                      isTransparent
                        ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                        : "text-slate-700 dark:text-slate-200 hover:text-[#F96501] dark:hover:text-[#F96501] hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <div
                  key={item.name}
                  className="relative classic-dropdown-wrapper py-2"
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[13.5px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-200 group ${
                      isTransparent
                        ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                        : "text-slate-700 dark:text-slate-200 hover:text-[#F96501] dark:hover:text-[#F96501] hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                    }`}
                    aria-haspopup="true"
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${
                        isTransparent
                          ? "text-white/70 group-hover:text-white"
                          : "text-slate-400 group-hover:text-[#F96501]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Desktop Dropdown Popover */}
                  <div className="absolute top-full left-0 pt-1 classic-dropdown-menu z-50">
                    <div className="bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] p-2 min-w-[270px] flex flex-col gap-0.5">
                      {item.subLinks!.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="group/item flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <span className="text-[13px] font-semibold text-white group-hover/item:text-[#F96501] transition-colors">
                            {sub.name}
                          </span>
                          {sub.desc && (
                            <span className="text-[11px] text-slate-300 group-hover/item:text-slate-100 font-normal leading-snug mt-0.5 line-clamp-1 transition-colors">
                              {sub.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* =========================================================
              RIGHT: PRIMARY CTA + MOBILE TRIGGER
              ========================================================= */}
          <div className="flex items-center gap-3">
            {/* Quick Contact link on larger displays */}
            <Link
              href="/contact"
              className={`hidden xl:inline-flex text-[13px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#F96501]"
              }`}
            >
              Kontak
            </Link>

            {/* Primary Orange CTA Button */}
            <Link
              href="/ppdb"
              className="px-5 py-2.5 rounded-full bg-[#F96501] hover:bg-[#e05900] active:scale-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_14px_rgba(249,101,1,0.35)] hover:shadow-[0_6px_20px_rgba(249,101,1,0.45)] transition-all duration-200 flex items-center gap-1.5"
            >
              <span>PPDB 2026</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors focus:outline-none ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================
            MOBILE MENU DRAWER (ALWAYS SOLID & READABLE)
            ========================================================= */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-2xl max-h-[calc(100dvh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-1">
              {navSections.map((item) => {
                const hasSub = Boolean(item.subLinks && item.subLinks.length > 0);
                const isExpanded = mobileExpanded === item.name;

                if (!hasSub) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href || "#"}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-orange-50/70 dark:hover:bg-slate-800/60 hover:text-[#F96501] transition-colors"
                    >
                      {item.name}
                    </Link>
                  );
                }

                return (
                  <div key={item.name} className="rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(item.name)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-orange-50/70 dark:hover:bg-slate-800/60 hover:text-[#F96501] transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#F96501]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="pl-4 pr-2 pb-2 pt-1 space-y-1 bg-slate-900/90 rounded-xl my-1 border border-white/10">
                        {item.subLinks!.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-2 rounded-lg text-xs font-semibold text-white hover:text-[#F96501] hover:bg-white/10 transition-colors"
                          >
                            <span className="block text-white font-medium">{sub.name}</span>
                            {sub.desc && (
                              <span className="block text-[10.5px] text-slate-300 font-normal mt-0.5 line-clamp-1">
                                {sub.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile CTA Button */}
              <div className="pt-4 pb-2">
                <Link
                  href="/ppdb"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#F96501] hover:bg-[#e05900] active:scale-98 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Pendaftaran PPDB 2026</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Quick Contact & Info */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
                <span>SMK PRESTASI PRIMA</span>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-[#F96501] font-semibold hover:underline"
                >
                  Hubungi Sekolah →
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for non-homepage routes so page content is not obscured */}
      {!isHomePage && (
        <div className="h-18 sm:h-20 w-full shrink-0" aria-hidden="true" />
      )}
    </>
  );
}
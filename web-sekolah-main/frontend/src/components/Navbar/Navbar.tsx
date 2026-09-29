"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "./navigation";
import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Navbar solid vs transparent state
  const [isScrolled, setIsScrolled] = useState(!isHomePage);

  // Desktop hover state with debounce
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile drawer & accordion state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navRef = useRef<HTMLElement | null>(null);

  // Close mobile and desktop menus on route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  }, [pathname]);

  // =========================================================================
  // ROUTE & SCROLL STATE MANAGEMENT (ROOT-CAUSE FIX)
  // =========================================================================
  useEffect(() => {
    // Non-home routes are always solid
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let isDisposed = false;

    // Evaluate scroll position relative to current Home Hero DOM element
    const evaluateHeroVisibility = () => {
      if (isDisposed) return;

      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop || 0;

      // When at or near the very top of Home page (<= 15px), always transparent
      if (currentScrollY <= 15) {
        setIsScrolled(false);
        return;
      }

      const heroEl =
        document.getElementById("hero-section") ||
        document.querySelector(".fullscreen-hero-container");

      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // If element is mounted with measured height
        if (rect.height > 60) {
          // Hero bottom scrolled past navbar clearance threshold
          setIsScrolled(rect.bottom <= 80);
          return;
        }
      }

      // Fallback threshold if hero layout is still computing
      setIsScrolled(currentScrollY > 350);
    };

    // 1. Initial synchronous evaluation
    evaluateHeroVisibility();

    // 2. Schedule re-evaluation after DOM layout / route transition
    const rafId = requestAnimationFrame(evaluateHeroVisibility);
    const timerId = setTimeout(evaluateHeroVisibility, 100);

    // 3. Attach IntersectionObserver to the current Home Hero element
    const heroEl =
      document.getElementById("hero-section") ||
      document.querySelector(".fullscreen-hero-container");

    if (heroEl) {
      observer = new IntersectionObserver(
        (entries) => {
          if (isDisposed) return;
          const entry = entries[0];
          if (!entry) return;

          const currentScrollY =
            window.scrollY || document.documentElement.scrollTop || 0;

          if (currentScrollY <= 15) {
            setIsScrolled(false);
          } else {
            // Becomes solid when hero bottom passes navbar clearance
            setIsScrolled(!entry.isIntersecting);
          }
        },
        {
          root: null,
          rootMargin: "-80px 0px 0px 0px",
          threshold: 0,
        }
      );
      observer.observe(heroEl);
    }

    // 4. Listen to native scroll & resize for ultra-responsive feedback
    window.addEventListener("scroll", evaluateHeroVisibility, { passive: true });
    window.addEventListener("resize", evaluateHeroVisibility, { passive: true });

    // Cleanup: disconnect observer and remove listeners
    return () => {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      window.removeEventListener("scroll", evaluateHeroVisibility);
      window.removeEventListener("resize", evaluateHeroVisibility);
    };
  }, [isHomePage, pathname]);

  // Close menus on ESC key or clicking outside navbar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileExpanded(null);
        setActiveDropdown(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Desktop hover handlers with debounce
  const handleDropdownEnter = useCallback((name: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  // Mobile submenu accordion toggle
  const toggleMobileSubmenu = useCallback((name: string) => {
    setMobileExpanded((prev) => (prev === name ? null : name));
  }, []);

  // Transparent hero navbar state:
  // Over Hero on HomePage when mobile drawer is closed.
  const isTransparent = isHomePage && !isScrolled && !mobileOpen;

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
              CENTER: CENTRALIZED DESKTOP NAVIGATION
              ========================================================= */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Navigasi Utama"
          >
            {navigation.map((item) => {
              const hasSub = Boolean(item.subLinks && item.subLinks.length > 0);
              const isOpen = activeDropdown === item.name;

              if (!hasSub) {
                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className={`text-[13.5px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-200 ${
                      isTransparent
                        ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                        : "text-slate-700 dark:text-slate-200 hover:text-[#002B49] dark:hover:text-[#F96501] hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <div
                  key={item.name}
                  className="relative py-2"
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[13.5px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-200 group ${
                      isTransparent
                        ? isOpen
                          ? "bg-white/15 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                          : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                        : isOpen
                        ? "text-[#002B49] dark:text-[#F96501] bg-slate-100/90 dark:bg-slate-800/80"
                        : "text-slate-700 dark:text-slate-200 hover:text-[#002B49] dark:hover:text-[#F96501] hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      } ${
                        isTransparent
                          ? "text-white/70 group-hover:text-white"
                          : "text-slate-400 group-hover:text-[#F96501]"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Desktop Dropdown Popover */}
                  <div
                    className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 ease-out ${
                      isOpen
                        ? "opacity-100 translate-y-0 visible pointer-events-auto"
                        : "opacity-0 translate-y-2 invisible pointer-events-none"
                    }`}
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div
                      className={`p-2 min-w-[275px] rounded-2xl flex flex-col gap-0.5 backdrop-blur-2xl transition-colors duration-200 ${
                        isTransparent
                          ? "bg-slate-950/95 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                          : "bg-white/98 dark:bg-slate-950/98 border border-slate-200/90 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                      }`}
                    >
                      {item.subLinks!.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`group/item flex flex-col px-3.5 py-2.5 rounded-xl transition-colors ${
                            isTransparent
                              ? "hover:bg-white/10"
                              : "hover:bg-orange-50/70 dark:hover:bg-white/10"
                          }`}
                        >
                          <span
                            className={`text-[13px] font-semibold transition-colors ${
                              isTransparent
                                ? "text-white group-hover/item:text-[#F96501]"
                                : "text-slate-900 dark:text-white group-hover/item:text-[#F96501]"
                            }`}
                          >
                            {sub.name}
                          </span>
                          {sub.desc && (
                            <span
                              className={`text-[11px] font-normal leading-snug mt-0.5 line-clamp-1 transition-colors ${
                                isTransparent
                                  ? "text-slate-300 group-hover/item:text-slate-100"
                                  : "text-slate-500 dark:text-slate-400 group-hover/item:text-slate-700 dark:group-hover/item:text-slate-200"
                              }`}
                            >
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
              RIGHT: PRIMARY CTA (MIKROTIK ACADEMY) + MOBILE TRIGGER
              ========================================================= */}
          <div className="flex items-center gap-3">
            {/* Desktop MIKROTIK ACADEMY CTA Button */}
            <Link
              href="/mikrotik"
              className="px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#F96501] hover:bg-[#e05900] active:scale-95 text-white font-bold text-xs tracking-wide shadow-[0_4px_14px_rgba(249,101,1,0.35)] hover:shadow-[0_6px_20px_rgba(249,101,1,0.45)] transition-all duration-200 flex items-center gap-2 shrink-0 group"
              aria-label="Mikrotik Academy"
            >
              <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/mikrotik.png"
                  alt="MikroTik Logo"
                  width={18}
                  height={18}
                  className="object-contain w-full h-full brightness-0 invert"
                />
              </div>
              <span className="font-extrabold tracking-wider text-[11px] sm:text-xs">
                MIKROTIK ACADEMY
              </span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
              {navigation.map((item) => {
                const hasSub = Boolean(item.subLinks && item.subLinks.length > 0);
                const isExpanded = mobileExpanded === item.name;

                if (!hasSub) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href || "#"}
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileExpanded(null);
                      }}
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="pl-4 pr-2 pb-2 pt-1 space-y-1 bg-slate-900/90 rounded-xl my-1 border border-white/10">
                        {item.subLinks!.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileExpanded(null);
                            }}
                            className="block px-3 py-2 rounded-lg text-xs font-semibold text-white hover:text-[#F96501] hover:bg-white/10 transition-colors"
                          >
                            <span className="block text-white font-medium">
                              {sub.name}
                            </span>
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

              {/* Mobile CTA: MIKROTIK ACADEMY */}
              <div className="pt-4 pb-2">
                <Link
                  href="/mikrotik"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileExpanded(null);
                  }}
                  className="w-full py-3 rounded-xl bg-[#F96501] hover:bg-[#e05900] active:scale-98 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2.5 transition-all"
                >
                  <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
                    <Image
                      src="/images/mikrotik.png"
                      alt="MikroTik Logo"
                      width={18}
                      height={18}
                      className="object-contain w-full h-full brightness-0 invert"
                    />
                  </div>
                  <span>MIKROTIK ACADEMY</span>
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
                  Hubungi Narahubung →
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
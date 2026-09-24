"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import "./FullScreenHero.css";

interface SectionData {
  id: string;
  number: string;
  badge: string;
  title: React.ReactNode;
  isH1?: boolean;
  subtitle: React.ReactNode;
  tagline?: string;
  desc: string;
  buttonLabel: string;
  destination: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  mediaAlt: string;
  objectPositionClass?: string;
}

const SECTIONS_CONFIG: SectionData[] = [
  {
    id: "section-01",
    number: "01",
    badge: "01 / OFFICIAL SCHOOL PORTAL",
    title: (
      <>
        PRESTASI <span className="accent-orange">PRIMA</span>
      </>
    ),
    isH1: true,
    subtitle: "VOCATIONAL HIGH SCHOOL OF EXCELLENCE",
    desc: '"If better is possible, good is not enough." Mencetak generasi unggul yang tidak hanya kompeten secara teknis, namun juga memiliki integritas karakter untuk memimpin masa depan industri global.',
    buttonLabel: "PROFILE SEKOLAH",
    destination: "/profile",
    mediaType: "video",
    mediaSrc: "/assets/hero.webm",
    mediaAlt: "SMK Prestasi Prima Official Hero",
    objectPositionClass: "object-center",
  },
  {
    id: "section-02",
    number: "02",
    badge: "02 / VISI KEPEMIMPINAN",
    title: (
      <>
        Visi Kepemimpinan <br />
        <span className="accent-orange">di Era Inovasi.</span>
      </>
    ),
    subtitle: (
      <div className="headmaster-info">
        <span className="headmaster-name">Hendry Kurniawan, S.Kom., M.I.Kom.</span>
        <span className="headmaster-role">Kepala Sekolah</span>
      </div>
    ),
    desc: '"Pendidikan bukan tentang mengikuti arus, tapi tentang menciptakan teknologi yang mengubah arah masa depan." Menyelenggarakan kurikulum berbasis industri teknologi mutakhir.',
    buttonLabel: "PROFILE SEKOLAH",
    destination: "/profile",
    mediaType: "image",
    mediaSrc: "/images/hero-kepsek.png",
    mediaAlt: "Hendry Kurniawan, S.Kom., M.I.Kom. - Kepala Sekolah",
    objectPositionClass: "object-[72%_center] lg:object-[68%_center]",
  },
  {
    id: "section-03",
    number: "03",
    badge: "03 / PROGRAM KEAHLIAN",
    title: "PPLG",
    subtitle: "BUILD THE FUTURE.",
    tagline: '"Pengembangan Perangkat Lunak dan Gim"',
    desc: "Belajar membangun perangkat lunak, website, aplikasi, dan gim melalui logika, teknologi, dan kreativitas.",
    buttonLabel: "LIHAT PROGRAM PPLG",
    destination: "/program/pplg",
    mediaType: "image",
    mediaSrc: "/images/hero-pplg.jpg",
    mediaAlt: "PPLG - Pengembangan Perangkat Lunak dan Gim",
    objectPositionClass: "object-center",
  },
  {
    id: "section-04",
    number: "04",
    badge: "04 / PROGRAM KEAHLIAN",
    title: "DKV",
    subtitle: "MAKE IDEAS VISIBLE.",
    tagline: '"Desain Komunikasi Visual"',
    desc: "Belajar menerjemahkan ide menjadi visual melalui desain grafis, ilustrasi, branding, fotografi, dan media digital.",
    buttonLabel: "LIHAT PROGRAM DKV",
    destination: "/program/dkv",
    mediaType: "image",
    mediaSrc: "/images/hero-dkv.png",
    mediaAlt: "DKV - Desain Komunikasi Visual",
    objectPositionClass: "object-[68%_center] lg:object-[64%_center]",
  },
  {
    id: "section-05",
    number: "05",
    badge: "05 / PROGRAM KEAHLIAN",
    title: "TJKT",
    subtitle: "CONNECT EVERYTHING.",
    tagline: '"Teknik Jaringan Komputer dan Telekomunikasi"',
    desc: "Membangun fondasi jaringan, komputer, sistem komunikasi, dan infrastruktur digital untuk dunia yang semakin terhubung.",
    buttonLabel: "LIHAT PROGRAM TJKT",
    destination: "/program/tjkt",
    mediaType: "image",
    mediaSrc: "/images/hero-tjkt.jpg",
    mediaAlt: "TJKT - Teknik Jaringan Komputer dan Telekomunikasi",
    objectPositionClass: "object-center",
  },
  {
    id: "section-06",
    number: "06",
    badge: "06 / PROGRAM KEAHLIAN",
    title: "BCF",
    subtitle: "TURN IDEAS INTO IMPACT.",
    tagline: '"Broadcasting dan Perfilman"',
    desc: "Mengembangkan kreativitas, komunikasi, strategi, dan jiwa bisnis untuk mengubah ide menjadi peluang.",
    buttonLabel: "LIHAT PROGRAM BCF",
    destination: "/program/bcf",
    mediaType: "image",
    mediaSrc: "/images/hero-bcf.jpg",
    mediaAlt: "BCF - Broadcasting dan Perfilman",
    objectPositionClass: "object-center",
  },
];

export default function FullScreenHero() {
  const [activeSection, setActiveSection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef(0);
  activeSectionRef.current = activeSection;

  const isHeroVisibleRef = useRef(true);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTime = useRef(0);

  // Check desktop breakpoint (>= 1024px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Pause auto-rotation when user interacts, then resume after short delay
  const pauseAutoRotation = useCallback((resumeDelay = 5000) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, resumeDelay);
  }, []);

  // Track if Hero container is currently visible in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Mobile scroll observer: track current section when user scrolls naturally
  useEffect(() => {
    if (isDesktop) return;

    const sectionElements = SECTIONS_CONFIG.map((sec) =>
      document.getElementById(sec.id)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS_CONFIG.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) {
              setActiveSection(idx);
              activeSectionRef.current = idx;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isDesktop]);

  // Navigate to slide (desktop: transform, mobile: scrollIntoView)
  const goToSection = useCallback(
    (idx: number) => {
      pauseAutoRotation();
      setActiveSection(idx);
      activeSectionRef.current = idx;
      if (!isDesktop) {
        const el = document.getElementById(SECTIONS_CONFIG[idx].id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [isDesktop, pauseAutoRotation]
  );

  const handlePrev = useCallback(() => {
    if (activeSectionRef.current > 0) {
      goToSection(activeSectionRef.current - 1);
    }
  }, [goToSection]);

  const handleNext = useCallback(() => {
    if (activeSectionRef.current < SECTIONS_CONFIG.length - 1) {
      goToSection(activeSectionRef.current + 1);
    }
  }, [goToSection]);

  // Automatic progression: 5 seconds per slide (NVIDIA-style storytelling)
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!isHeroVisibleRef.current) return;

      if (isDesktop) {
        setActiveSection((prev) => {
          const next = (prev + 1) % SECTIONS_CONFIG.length;
          activeSectionRef.current = next;
          return next;
        });
      } else {
        setActiveSection((prev) => {
          const next = (prev + 1) % SECTIONS_CONFIG.length;
          activeSectionRef.current = next;
          const el = document.getElementById(SECTIONS_CONFIG[next].id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          return next;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, isDesktop]);

  // Desktop Mouse Wheel / Trackpad Storytelling Navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      // Only hijack wheel when hero is near top of viewport
      if (rect.top < -50 || rect.bottom < window.innerHeight * 0.5) {
        return;
      }

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 20) return;

      const now = Date.now();
      const currentIdx = activeSectionRef.current;

      // Cooldown during transition to absorb trackpad momentum inertia
      if (now - lastWheelTime.current < 650) {
        if (
          (delta > 0 && currentIdx < SECTIONS_CONFIG.length - 1) ||
          (delta < 0 && currentIdx > 0)
        ) {
          e.preventDefault();
        }
        return;
      }

      if (delta > 0) {
        // Scrolling forward
        if (currentIdx < SECTIONS_CONFIG.length - 1) {
          e.preventDefault();
          lastWheelTime.current = now;
          pauseAutoRotation();
          const next = currentIdx + 1;
          setActiveSection(next);
          activeSectionRef.current = next;
        }
        // At the last slide (06), let the user naturally scroll down to the rest of the page
      } else if (delta < 0) {
        // Scrolling backward
        if (currentIdx > 0) {
          e.preventDefault();
          lastWheelTime.current = now;
          pauseAutoRotation();
          const prev = currentIdx - 1;
          setActiveSection(prev);
          activeSectionRef.current = prev;
        }
        // At the first slide (01), let normal page top scroll happen
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isDesktop, pauseAutoRotation]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktop) return;

      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.bottom < 100 || rect.top > window.innerHeight - 100) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesktop, handleNext, handlePrev]);

  return (
    <div
      ref={containerRef}
      className="fullscreen-hero-container"
      onMouseEnter={() => pauseAutoRotation(6000)}
      onMouseLeave={() => pauseAutoRotation(4000)}
      onTouchStart={() => pauseAutoRotation(6000)}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="SMK Prestasi Prima Hero Showcase"
    >
      {/* FLOATING SECTION PROGRESS INDICATOR (RIGHT SIDE: 01 to 06) */}
      <nav className="section-progress-nav" aria-label="Navigasi Seksi">
        {SECTIONS_CONFIG.map((sec, idx) => (
          <button
            key={sec.id}
            type="button"
            className={`section-progress-dot ${activeSection === idx ? "active" : ""}`}
            onClick={() => goToSection(idx)}
            aria-label={`Pindah ke Seksi ${sec.number}`}
            aria-current={activeSection === idx ? "true" : undefined}
          >
            <span>{sec.number}</span>
            <div className="section-progress-line" />
          </button>
        ))}
      </nav>

      {/* HORIZONTAL STORYTELLING TRACK (DESKTOP) / VERTICAL SEQUENCE (MOBILE) */}
      <div
        className="hero-slider-track"
        style={
          isDesktop
            ? {
                transform: `translate3d(-${activeSection * 100}%, 0px, 0px)`,
              }
            : undefined
        }
      >
        {SECTIONS_CONFIG.map((sec, idx) => (
          <section
            key={sec.id}
            id={sec.id}
            className="fullscreen-hero-section text-white"
            aria-hidden={isDesktop && activeSection !== idx ? "true" : undefined}
          >
            {/* 1. FULL-SCREEN MEDIA BACKGROUND */}
            <div className="section-media-wrapper">
              {sec.mediaType === "video" ? (
                <video
                  src={sec.mediaSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`section-media-asset ${sec.objectPositionClass || ""}`}
                />
              ) : (
                <img
                  src={sec.mediaSrc}
                  alt={sec.mediaAlt}
                  className={`section-media-asset ${sec.objectPositionClass || ""}`}
                  loading={idx <= 1 ? "eager" : "lazy"}
                />
              )}
            </div>

            {/* 2. CINEMATIC OVERLAY */}
            <div className="section-overlay" />

            {/* 3. TEXT OVERLAY CONTENT */}
            <div className="section-content-wrapper">
              <div className="section-text-block">
                {/* Small Section Label */}
                <div className="section-badge">
                  <span className="section-badge-dot" />
                  <span>{sec.badge}</span>
                </div>

                {/* Huge Title */}
                {sec.isH1 ? (
                  <h1 className="section-title">{sec.title}</h1>
                ) : (
                  <h2 className="section-title">{sec.title}</h2>
                )}

                {/* Supporting Headline / Headmaster text hierarchy */}
                {typeof sec.subtitle === "string" ? (
                  <div className="section-subtitle">{sec.subtitle}</div>
                ) : (
                  sec.subtitle
                )}

                {/* Tagline (for programs) */}
                {sec.tagline && (
                  <div className="section-tagline">{sec.tagline}</div>
                )}

                {/* Description */}
                <p className="section-desc">{sec.desc}</p>

                {/* Subtle Brand Decorative Line */}
                <div className="section-decor-line" />
              </div>
            </div>

            {/* 4. UNIFIED BOTTOM-LEFT NAVIGATION BUTTON */}
            <Link href={sec.destination} className="section-nav-btn">
              <span>{sec.buttonLabel}</span>
              <span className="nav-btn-arrow">→</span>
            </Link>
          </section>
        ))}
      </div>

      {/* 5. SUBTLE UNIFIED BOTTOM-RIGHT CONTROLS: PREVIOUS  01 / 06  NEXT */}
      <div className="hero-nav-controls" role="toolbar" aria-label="Navigasi Hero">
        <button
          type="button"
          className="hero-nav-arrow-btn"
          onClick={handlePrev}
          disabled={activeSection === 0}
          aria-label="Previous slide"
        >
          <span className="hero-nav-arrow-icon">←</span>
          <span className="hero-nav-arrow-label">PREV</span>
        </button>

        <div className="section-counter" aria-live="polite">
          <span className="current">{SECTIONS_CONFIG[activeSection].number}</span>
          <span className="counter-sep">/</span>
          <span>06</span>
        </div>

        <button
          type="button"
          className="hero-nav-arrow-btn"
          onClick={handleNext}
          disabled={activeSection === SECTIONS_CONFIG.length - 1}
          aria-label="Next slide"
        >
          <span className="hero-nav-arrow-label">NEXT</span>
          <span className="hero-nav-arrow-icon">→</span>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./FullScreenHero.css";

interface SectionData {
  id: string;
  number: string;
  badge: string;
  title: React.ReactNode;
  isH1?: boolean;
  subtitle: string;
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
    mediaSrc: "/assets/hero.mp4",
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
    subtitle: "Hendry Kurniawan, S.Kom., M.I.Kom. • Kepala Sekolah",
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      SECTIONS_CONFIG.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fullscreen-hero-container">
      {/* FLOATING SECTION PROGRESS INDICATOR (RIGHT SIDE: 01 to 06) */}
      <nav className="section-progress-nav" aria-label="Navigasi Seksi">
        {SECTIONS_CONFIG.map((sec, idx) => (
          <button
            key={sec.id}
            type="button"
            className={`section-progress-dot ${activeSection === idx ? "active" : ""}`}
            onClick={() => scrollToSection(sec.id)}
            aria-label={`Pindah ke Seksi ${sec.number}`}
          >
            <span>{sec.number}</span>
            <div className="section-progress-line" />
          </button>
        ))}
      </nav>

      {/* ALL 6 FULL-SCREEN CINEMATIC SECTIONS (SAME COMPOSITION SYSTEM) */}
      {SECTIONS_CONFIG.map((sec, idx) => (
        <section
          key={sec.id}
          id={sec.id}
          className="fullscreen-hero-section text-white"
        >
          {/* 1. FULL-SCREEN MEDIA BACKGROUND (100vw x 100vh full-bleed) */}
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

          {/* 2. CINEMATIC OVERLAY (DARK + SUBTLE ORANGE INFLUENCE) */}
          <div className="section-overlay" />

          {/* 3. TEXT OVERLAY CONTENT (DIRECTLY ON MEDIA, LEFT: ~10-13%) */}
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

              {/* Supporting Headline */}
              <div className="section-subtitle">{sec.subtitle}</div>

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

          {/* 5. BOTTOM-RIGHT SECTION COUNTER (01 / 06 to 06 / 06) */}
          <div className="section-counter" aria-hidden="true">
            <span className="current">{sec.number}</span> / <span>06</span>
          </div>
        </section>
      ))}
    </div>
  );
}

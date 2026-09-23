"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./FullScreenHero.css";

interface SectionData {
  id: string;
  number: string;
  badge: string;
  title: string;
  highlightTitle?: string;
  subtitle?: string;
  desc: string;
  buttonLabel: string;
  destination: string;
}

const SECTIONS_CONFIG: SectionData[] = [
  {
    id: "section-01",
    number: "01",
    badge: "01 / OFFICIAL SCHOOL PORTAL",
    title: "PRESTASI",
    highlightTitle: "PRIMA",
    subtitle: "Vocational High School of Excellence",
    desc: '"If better is possible, good is not enough." Mencetak generasi unggul yang tidak hanya kompeten secara teknis, namun juga memiliki integritas karakter untuk memimpin masa depan industri global.',
    buttonLabel: "PROFILE SEKOLAH",
    destination: "/profile",
  },
  {
    id: "section-02",
    number: "02",
    badge: "02 / VISI KEPEMIMPINAN",
    title: "Visi Kepemimpinan",
    highlightTitle: "di Era Inovasi",
    subtitle: "Hendry Kurniawan, S.Kom., M.I.Kom. • Kepala Sekolah",
    desc: '"Pendidikan bukan tentang mengikuti arus, tapi tentang menciptakan teknologi yang mengubah arah masa depan." Menyelenggarakan kurikulum berbasis industri teknologi mutakhir.',
    buttonLabel: "PROFILE SEKOLAH",
    destination: "/profile",
  },
  {
    id: "section-03",
    number: "03",
    badge: "03 / PROGRAM KEAHLIAN",
    title: "PPLG",
    subtitle: "Pengembangan Perangkat Lunak dan Gim",
    desc: "Kuasai rekayasa perangkat lunak, pengembangan web & aplikasi mobile modern, komputasi awan, serta produksi gim interaktif dengan standar industri teknologi terdepan.",
    buttonLabel: "PPLG",
    destination: "/program/pplg",
  },
  {
    id: "section-04",
    number: "04",
    badge: "04 / PROGRAM KEAHLIAN",
    title: "DKV",
    subtitle: "Desain Komunikasi Visual",
    desc: "Eksplorasi kreativitas visual tanpa batas: UI/UX design, ilustrasi digital, animasi 2D/3D, sinematografi visual, dan brand identity untuk era industri kreatif modern.",
    buttonLabel: "DKV",
    destination: "/program/dkv",
  },
  {
    id: "section-05",
    number: "05",
    badge: "05 / PROGRAM KEAHLIAN",
    title: "TJKT",
    subtitle: "Teknik Jaringan Komputer dan Telekomunikasi",
    desc: "Arsitektur jaringan skala enterprise, sistem keamanan siber (cybersecurity), administrasi server cloud, dan teknologi serat optik modern untuk konektivitas masa depan.",
    buttonLabel: "TJKT",
    destination: "/program/tjkt",
  },
  {
    id: "section-06",
    number: "06",
    badge: "06 / PROGRAM KEAHLIAN",
    title: "BCF",
    subtitle: "Broadcasting dan Perfilman",
    desc: "Produksi sinematografi profesional, penyutradaraan film & program siaran, video editing multi-track, serta tata audio studio dengan peralatan berstandar industri pertelevisian.",
    buttonLabel: "BCF",
    destination: "/program/bcf",
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
      {/* FLOATING SECTION PROGRESS INDICATOR (RIGHT SIDE) */}
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

      {/* =========================================================
          SECTION 01 — HERO (VIDEO ASSET /assets/hero.mp4)
          ========================================================= */}
      <section
        id="section-01"
        className="fullscreen-hero-section bg-slate-950 text-white"
      >
        {/* HERO VIDEO ASSET: Autoplay, Muted, Loop, PlaysInline, Object-Fit Cover */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <video
            src="/assets/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Subtle dark/orange overlay for cinematic text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/30 to-transparent z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center h-full pt-16 pb-28">
          <div className="max-w-3xl">
            {/* Small Section Label */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              {SECTIONS_CONFIG[0].badge}
            </div>

            {/* Large Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6">
              PRESTASI <span className="text-orange-500">PRIMA</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mb-10 drop-shadow-md">
              {SECTIONS_CONFIG[0].desc}
            </p>
          </div>
        </div>

        {/* Section Navigation Button: PROFILE SEKOLAH -> /profile */}
        <Link href={SECTIONS_CONFIG[0].destination} className="section-nav-btn">
          <span>{SECTIONS_CONFIG[0].buttonLabel}</span>
          <span className="nav-btn-arrow">→</span>
        </Link>

        {/* Section Counter: [01 / 06] */}
        <div className="section-counter" aria-hidden="true">
          <span className="current">01</span> / <span>06</span>
        </div>
      </section>

      {/* =========================================================
          SECTION 02 — KEPALA SEKOLAH (hero-kepsek.png)
          ========================================================= */}
      <section
        id="section-02"
        className="fullscreen-hero-section bg-gradient-to-br from-slate-950 via-[#180a03] to-slate-950 text-white"
      >
        {/* Background Visual Atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-16 pb-28">
          {/* Left Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              {SECTIONS_CONFIG[1].badge}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
              Visi Kepemimpinan <br />
              <span className="text-orange-500">di Era Inovasi.</span>
            </h2>

            <div className="text-sm sm:text-base font-bold text-amber-200/90 mb-4 tracking-wide">
              {SECTIONS_CONFIG[1].subtitle}
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
              {SECTIONS_CONFIG[1].desc}
            </p>
          </div>

          {/* Right Visual Composition: Kepala Sekolah Visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-3xl blur-2xl -z-10" />
              <Image
                src="/images/hero-kepsek.png"
                alt="Hendry Kurniawan, S.Kom., M.I.Kom. - Kepala Sekolah SMK Prestasi Prima"
                width={650}
                height={650}
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Section Navigation Button: PROFILE SEKOLAH -> /profile */}
        <Link href={SECTIONS_CONFIG[1].destination} className="section-nav-btn">
          <span>{SECTIONS_CONFIG[1].buttonLabel}</span>
          <span className="nav-btn-arrow">→</span>
        </Link>

        {/* Section Counter: [02 / 06] */}
        <div className="section-counter" aria-hidden="true">
          <span className="current">02</span> / <span>06</span>
        </div>
      </section>

      {/* =========================================================
          SECTION 03 — PPLG
          ========================================================= */}
      <section
        id="section-03"
        className="fullscreen-hero-section bg-gradient-to-br from-slate-950 via-[#06152b] to-slate-950 text-white"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center h-full pt-16 pb-28">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              {SECTIONS_CONFIG[2].badge}
            </div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2">
              PPLG
            </h2>

            <div className="text-lg sm:text-xl font-bold text-blue-300 mb-6">
              {SECTIONS_CONFIG[2].subtitle}
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
              {SECTIONS_CONFIG[2].desc}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {["Software Engineering", "Web & Mobile Apps", "Game Development", "Cloud Architecture"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/40 text-blue-200 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Composition: PPLG */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] p-8 rounded-3xl bg-slate-900/60 border border-blue-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-800">
                <Image
                  src="/images/majors/pplg.png"
                  alt="PPLG Icon"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h4 className="text-xl font-black text-white">Software & Game Dev</h4>
                  <p className="text-xs text-blue-400 font-semibold">Standard Industry Curriculum</p>
                </div>
              </div>
              <div className="space-y-3 font-mono text-xs text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="text-blue-400">// Next-Gen Developer Path</div>
                <div><span className="text-pink-400">const</span> <span className="text-yellow-300">future</span> = <span className="text-blue-300">new</span> <span className="text-green-300">Innovation</span>();</div>
                <div><span className="text-blue-400">await</span> future.<span className="text-amber-300">buildSolutions</span>();</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Button: PPLG -> /program/pplg */}
        <Link href={SECTIONS_CONFIG[2].destination} className="section-nav-btn">
          <span>{SECTIONS_CONFIG[2].buttonLabel}</span>
          <span className="nav-btn-arrow">→</span>
        </Link>

        {/* Section Counter: [03 / 06] */}
        <div className="section-counter" aria-hidden="true">
          <span className="current">03</span> / <span>06</span>
        </div>
      </section>

      {/* =========================================================
          SECTION 04 — DKV (hero-dkv.png)
          ========================================================= */}
      <section
        id="section-04"
        className="fullscreen-hero-section bg-gradient-to-br from-slate-950 via-[#261003] to-slate-950 text-white"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-16 pb-28">
          {/* Left Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              {SECTIONS_CONFIG[3].badge}
            </div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2">
              DKV
            </h2>

            <div className="text-lg sm:text-xl font-bold text-orange-300 mb-6">
              {SECTIONS_CONFIG[3].subtitle}
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
              {SECTIONS_CONFIG[3].desc}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {["UI/UX Design", "Digital Illustration", "2D/3D Animation", "Brand Identity"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-md bg-orange-950/60 border border-orange-800/40 text-orange-200 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Visual Composition: DKV Visual (hero-dkv.png) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-[480px] lg:max-w-[540px] flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-3xl -z-10" />
              <Image
                src="/images/hero-dkv.png"
                alt="DKV - Desain Komunikasi Visual SMK Prestasi Prima"
                width={650}
                height={650}
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>

        {/* Section Navigation Button: DKV -> /program/dkv */}
        <Link href={SECTIONS_CONFIG[3].destination} className="section-nav-btn">
          <span>{SECTIONS_CONFIG[3].buttonLabel}</span>
          <span className="nav-btn-arrow">→</span>
        </Link>

        {/* Section Counter: [04 / 06] */}
        <div className="section-counter" aria-hidden="true">
          <span className="current">04</span> / <span>06</span>
        </div>
      </section>

      {/* =========================================================
          SECTION 05 — TJKT
          ========================================================= */}
      <section
        id="section-05"
        className="fullscreen-hero-section bg-gradient-to-br from-slate-950 via-[#031c19] to-slate-950 text-white"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center h-full pt-16 pb-28">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              {SECTIONS_CONFIG[4].badge}
            </div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2">
              TJKT
            </h2>

            <div className="text-lg sm:text-xl font-bold text-emerald-300 mb-6">
              {SECTIONS_CONFIG[4].subtitle}
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
              {SECTIONS_CONFIG[4].desc}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {["Cybersecurity", "Cloud Infrastructure", "Network Architecture", "Fiber Optics"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-200 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Composition: TJKT */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-800">
                <Image
                  src="/images/majors/tjkt.png"
                  alt="TJKT Icon"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h4 className="text-xl font-black text-white">Network & Telecom</h4>
                  <p className="text-xs text-emerald-400 font-semibold">Enterprise Systems & Security</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">Server Status</div>
                  <div className="text-slate-300">99.9% Uptime Active</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">Fiber Speed</div>
                  <div className="text-slate-300">Gigabit Backbone</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Button: TJKT -> /program/tjkt */}
        <Link href={SECTIONS_CONFIG[4].destination} className="section-nav-btn">
          <span>{SECTIONS_CONFIG[4].buttonLabel}</span>
          <span className="nav-btn-arrow">→</span>
        </Link>

        {/* Section Counter: [05 / 06] */}
        <div className="section-counter" aria-hidden="true">
          <span className="current">05</span> / <span>06</span>
        </div>
      </section>

      {/* =========================================================
          SECTION 06 — BCF
          ========================================================= */}
      <section
        id="section-06"
        className="fullscreen-hero-section bg-gradient-to-br from-slate-950 via-[#1d0628] to-slate-950 text-white"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center h-full pt-16 pb-28">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              {SECTIONS_CONFIG[5].badge}
            </div>

            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2">
              BCF
            </h2>

            <div className="text-lg sm:text-xl font-bold text-purple-300 mb-6">
              {SECTIONS_CONFIG[5].subtitle}
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
              {SECTIONS_CONFIG[5].desc}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {["Cinematography", "TV Broadcasting", "Video Editing", "Studio Lighting"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-purple-200 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Composition: BCF */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] p-8 rounded-3xl bg-slate-900/60 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-800">
                <Image
                  src="/images/majors/bcf.png"
                  alt="BCF Icon"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h4 className="text-xl font-black text-white">Broadcast & Film</h4>
                  <p className="text-xs text-purple-400 font-semibold">Pro Studio & Cinematography</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">Studio Gear</div>
                  <div className="text-slate-300">4K Broadcast Ready</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">Production</div>
                  <div className="text-slate-300">Live Multi-Cam</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Button: BCF -> /program/bcf */}
        <Link href={SECTIONS_CONFIG[5].destination} className="section-nav-btn">
          <span>{SECTIONS_CONFIG[5].buttonLabel}</span>
          <span className="nav-btn-arrow">→</span>
        </Link>

        {/* Section Counter: [06 / 06] */}
        <div className="section-counter" aria-hidden="true">
          <span className="current">06</span> / <span>06</span>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";

interface Milestone {
  id: string;
  index: string;
  year: string;
  title: string;
  description: string;
  catalogId: string;
  visualType:
    | "foundation"
    | "infrastructure"
    | "standard"
    | "operational"
    | "facility"
    | "partnership"
    | "connectivity"
    | "digital"
    | "accreditation"
    | "transformation";
}

const MILESTONES: Milestone[] = [
  {
    id: "milestone-2011",
    index: "ARCHIVE 01 / 10",
    year: "2011",
    title: "Pendirian SMK Prestasi Prima",
    description:
      "Peletakan fondasi pertama dan peresmian pendirian SMK Prestasi Prima dengan visi mencetak generasi unggul yang siap kerja, berkarakter, dan berdaya saing global.",
    catalogId: "PP-ARCH-2011",
    visualType: "foundation",
  },
  {
    id: "milestone-2012",
    index: "ARCHIVE 02 / 10",
    year: "2012",
    title: "Persiapan Fasilitas dan Infrastruktur Awal",
    description:
      "Pembangunan sarana prasarana fisik dasar, penyiapan ruang kelas representatif, serta penataan infrastruktur awal pendukung pembelajaran kejuruan.",
    catalogId: "PP-ARCH-2012",
    visualType: "infrastructure",
  },
  {
    id: "milestone-2013",
    index: "ARCHIVE 03 / 10",
    year: "2013",
    title: "Penguatan Jurusan dan Kurikulum Kejuruan",
    description:
      "Perumusan program keahlian unggulan serta penguatan standarisasi kurikulum kejuruan berbasis kompetensi praktis kebutuhan industri.",
    catalogId: "PP-ARCH-2013",
    visualType: "standard",
  },
  {
    id: "milestone-2014",
    index: "ARCHIVE 04 / 10",
    year: "2014",
    title: "Mulai Operasional Resmi",
    description:
      "SMK Prestasi Prima resmi memasuki tahap operasional penuh dan menyambut angkatan pertama peserta didik untuk memulai kegiatan belajar mengajar.",
    catalogId: "PP-ARCH-2014",
    visualType: "operational",
  },
  {
    id: "milestone-2015",
    index: "ARCHIVE 05 / 10",
    year: "2015",
    title: "Pengembangan Fasilitas Awal",
    description:
      "Laboratorium komputer, studio multimedia, dan perpustakaan modern mulai dikembangkan untuk menunjang proses pembelajaran praktik siswa.",
    catalogId: "PP-ARCH-2015",
    visualType: "facility",
  },
  {
    id: "milestone-2016",
    index: "ARCHIVE 06 / 10",
    year: "2016",
    title: "Peningkatan Akademik dan Kerja Sama Industri",
    description:
      "Peningkatan mutu akademik berkelanjutan serta penguatan jejaring kemitraan strategis dengan dunia usaha dan dunia industri (DUDI).",
    catalogId: "PP-ARCH-2016",
    visualType: "partnership",
  },
  {
    id: "milestone-2017",
    index: "ARCHIVE 07 / 10",
    year: "2017",
    title: "Ekspansi Ekstrakurikuler dan Program Prakerin",
    description:
      "Perluasan program Praktik Kerja Industri (Prakerin) ke berbagai mitra industri terkemuka serta pembinaan karakter siswa melalui ragam kegiatan ekstrakurikuler.",
    catalogId: "PP-ARCH-2017",
    visualType: "connectivity",
  },
  {
    id: "milestone-2018",
    index: "ARCHIVE 08 / 10",
    year: "2018",
    title: "Modernisasi Laboratorium & Teknologi Pembelajaran",
    description:
      "Pembaruan perangkat laboratorium berstandar industri mutakhir dan akselerasi proses belajar mengajar melalui teknologi digital interaktif.",
    catalogId: "PP-ARCH-2018",
    visualType: "digital",
  },
  {
    id: "milestone-2021",
    index: "ARCHIVE 09 / 10",
    year: "2021",
    title: "Pencapaian Akreditasi A",
    description:
      "SMK Prestasi Prima resmi meraih predikat Akreditasi A dari BAN-S/M, membuktikan keunggulan mutu pendidikan dan manajemen sekolah berstandar nasional.",
    catalogId: "PP-ARCH-2021",
    visualType: "accreditation",
  },
  {
    id: "milestone-2025",
    index: "ARCHIVE 10 / 10",
    year: "2025",
    title: "Implementasi Kurikulum Merdeka & Transformasi Digital",
    description:
      "Sekolah memasuki fase transformasi digital menyeluruh sekaligus menerapkan Kurikulum Merdeka yang adaptif dan berorientasi masa depan.",
    catalogId: "PP-ARCH-2025",
    visualType: "transformation",
  },
];

/* -------------------------------------------------------------------------
 * Abstract Geometric Exhibits (Zero External Images / Pure SVG)
 * ------------------------------------------------------------------------- */

function MilestoneVisual({ type, isActive }: { type: Milestone["visualType"]; isActive: boolean }) {
  const accentClass = isActive ? "text-[#F96501]" : "text-slate-400 dark:text-slate-500";
  const strokeClass = isActive ? "stroke-[#F96501]" : "stroke-slate-300 dark:stroke-slate-700";

  switch (type) {
    case "foundation":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Blueprint Baseline Grid */}
          <line x1="20" y1="100" x2="300" y2="100" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <line x1="20" y1="40" x2="300" y2="40" className="stroke-slate-200/50 dark:stroke-slate-800/50" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Cornerstone Block */}
          <rect
            x="40"
            y="50"
            width="80"
            height="50"
            className="stroke-slate-400 dark:stroke-slate-600 transition-colors"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity={isActive ? "0.08" : "0.02"}
          />
          <line x1="40" y1="50" x2="120" y2="100" className={strokeClass} strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Foundation Projection Lines */}
          <line x1="120" y1="100" x2="280" y2="100" className={strokeClass} strokeWidth="1.5" />
          <line x1="120" y1="50" x2="200" y2="50" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          <line x1="200" y1="50" x2="200" y2="100" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Technical Datum Indicators */}
          <circle cx="40" cy="100" r="2.5" className={accentClass} fill="currentColor" />
          <circle cx="120" cy="100" r="2.5" className={accentClass} fill="currentColor" />
          <circle cx="200" cy="100" r="2" className="text-slate-400 dark:text-slate-600" fill="currentColor" />
          <circle cx="280" cy="100" r="2.5" className={accentClass} fill="currentColor" />
          
          {/* Typographic Annotation */}
          <text x="45" y="80" className="font-mono text-[9px] fill-slate-500 dark:fill-slate-400 tracking-wider">
            [ 01_GENESIS ]
          </text>
          <text x="210" y="70" className="font-mono text-[8px] fill-slate-400 dark:fill-slate-500 tracking-widest">
            DATUM // REF 0.00
          </text>
        </svg>
      );

    case "infrastructure":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Construction Structural Grid & Columns */}
          <line x1="25" y1="105" x2="295" y2="105" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
          
          {/* Vertical Support Columns */}
          {[50, 110, 170, 230, 280].map((x) => (
            <g key={x}>
              <line x1={x} y1="35" x2={x} y2="105" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
              <rect x={x - 4} y="32" width="8" height="4" className={strokeClass} strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
              <circle cx={x} cy="105" r="2" className={accentClass} fill="currentColor" />
            </g>
          ))}

          {/* Roof Truss Beam Structure */}
          <line x1="50" y1="35" x2="280" y2="35" className={strokeClass} strokeWidth="1.5" />
          <line x1="50" y1="35" x2="110" y2="105" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="110" y1="35" x2="170" y2="105" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="170" y1="35" x2="230" y2="105" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="230" y1="35" x2="280" y2="105" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />

          {/* Technical Elevation Annotations */}
          <text x="50" y="24" className="font-mono text-[8px] fill-slate-500 dark:fill-slate-400 tracking-wider">
            FRAME_INFRA // ELEVATION +4.20M
          </text>
          <text x="210" y="120" className="font-mono text-[7px] fill-slate-400 dark:fill-slate-500 tracking-widest">
            STRUCTURAL BASE // 2012
          </text>
        </svg>
      );

    case "standard":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Horizontal Calibrated Track Lines */}
          {[25, 45, 65, 85, 105].map((y, idx) => (
            <g key={y}>
              <line
                x1="20"
                y1={y}
                x2="300"
                y2={y}
                className={idx === 2 ? strokeClass : "stroke-slate-200 dark:stroke-slate-800"}
                strokeWidth={idx === 2 ? "1.5" : "1"}
              />
              {/* Caliper Ticks */}
              {[40, 90, 140, 190, 240, 280].map((x) => (
                <line
                  key={`${y}-${x}`}
                  x1={x}
                  y1={y - 3}
                  x2={x}
                  y2={y + 3}
                  className="stroke-slate-300 dark:stroke-slate-700"
                  strokeWidth="1"
                />
              ))}
            </g>
          ))}
          {/* Central Benchmark Indicator */}
          <rect
            x="130"
            y="55"
            width="60"
            height="20"
            className="stroke-slate-400 dark:stroke-slate-600"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity={isActive ? "0.08" : "0.02"}
          />
          <text x="138" y="68" className={`font-mono text-[8px] font-bold tracking-widest ${isActive ? "fill-[#F96501]" : "fill-slate-500 dark:fill-slate-400"}`}>
            ISO : STD
          </text>
          <circle cx="90" cy="65" r="2.5" className={accentClass} fill="currentColor" />
          <circle cx="240" cy="65" r="2.5" className={accentClass} fill="currentColor" />
        </svg>
      );

    case "operational":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Operational Pulse Horizon */}
          <line x1="20" y1="65" x2="110" y2="65" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <path
            d="M 110 65 L 125 65 L 135 35 L 145 95 L 155 45 L 165 75 L 175 65 L 290 65"
            className={strokeClass}
            strokeWidth="1.5"
          />

          {/* Operational Beacon Rings */}
          <circle cx="70" cy="65" r="28" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="70" cy="65" r="16" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          <circle cx="70" cy="65" r="4" className={accentClass} fill="currentColor" />

          {/* Caliper Ticks & Operational Status */}
          <circle cx="175" cy="65" r="2.5" className={accentClass} fill="currentColor" />
          <text x="70" y="112" textAnchor="middle" className="font-mono text-[8px] fill-slate-500 dark:fill-slate-400 tracking-wider">
            STATUS: ACTIVE // 100% OPERATIONAL
          </text>
          <text x="210" y="52" className="font-mono text-[8px] fill-[#F96501] font-semibold tracking-widest">
            INCEPTION CLASS // 2014
          </text>
        </svg>
      );

    case "facility":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Architectural Compartments */}
          <rect
            x="30"
            y="30"
            width="80"
            height="70"
            className={strokeClass}
            strokeWidth="1"
            fill="currentColor"
            fillOpacity={isActive ? "0.05" : "0.01"}
          />
          <rect
            x="120"
            y="30"
            width="90"
            height="70"
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="1"
          />
          <rect
            x="220"
            y="30"
            width="70"
            height="70"
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="1"
          />
          {/* Spatial Grid Dividers & Doors */}
          <line x1="30" y1="65" x2="110" y2="65" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 120 70 A 15 15 0 0 1 135 85" className={strokeClass} strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 220 70 A 15 15 0 0 1 235 85" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Zone Labels */}
          <text x="36" y="52" className="font-mono text-[7px] tracking-wider fill-slate-500 dark:fill-slate-400">
            SEC.01 LAB
          </text>
          <text x="126" y="52" className="font-mono text-[7px] tracking-wider fill-slate-500 dark:fill-slate-400">
            SEC.02 STUDIO
          </text>
          <text x="226" y="52" className="font-mono text-[7px] tracking-wider fill-slate-500 dark:fill-slate-400">
            SEC.03 LIB
          </text>
          <circle cx="70" cy="85" r="2" className={accentClass} fill="currentColor" />
        </svg>
      );

    case "partnership":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Industry Link Conduits & Synchronized Nexus */}
          <line x1="40" y1="65" x2="280" y2="65" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Academy Nexus */}
          <rect x="50" y="35" width="60" height="60" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" fill="currentColor" fillOpacity="0.03" />
          <circle cx="80" cy="65" r="4" className={accentClass} fill="currentColor" />
          <text x="80" y="52" textAnchor="middle" className="font-mono text-[7px] fill-slate-500 dark:fill-slate-400 tracking-wider">
            AKADEMIK
          </text>

          {/* Central Interchange Bridge */}
          <path d="M 110 65 L 140 45 L 180 45 L 210 65" className={strokeClass} strokeWidth="1.5" />
          <path d="M 110 65 L 140 85 L 180 85 L 210 65" className={strokeClass} strokeWidth="1.5" />
          <circle cx="160" cy="45" r="2.5" className={accentClass} fill="currentColor" />
          <circle cx="160" cy="85" r="2.5" className={accentClass} fill="currentColor" />
          <text x="160" y="68" textAnchor="middle" className="font-mono text-[7px] fill-slate-600 dark:fill-slate-300 font-bold tracking-widest">
            DUDI_MOU
          </text>

          {/* Industry Nexus */}
          <rect x="210" y="35" width="60" height="60" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" fill="currentColor" fillOpacity="0.03" />
          <circle cx="240" cy="65" r="4" className={accentClass} fill="currentColor" />
          <text x="240" y="52" textAnchor="middle" className="font-mono text-[7px] fill-slate-500 dark:fill-slate-400 tracking-wider">
            INDUSTRI
          </text>
        </svg>
      );

    case "connectivity":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Orthogonal Industry Interconnect Channels */}
          <line x1="60" y1="65" x2="150" y2="65" className={strokeClass} strokeWidth="1.5" />
          <line x1="150" y1="65" x2="150" y2="35" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          <line x1="150" y1="35" x2="260" y2="35" className={strokeClass} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="150" y1="65" x2="150" y2="95" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          <line x1="150" y1="95" x2="260" y2="95" className={strokeClass} strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Hub Nodes */}
          <rect x="35" y="48" width="34" height="34" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" fill="currentColor" fillOpacity="0.04" />
          <circle cx="52" cy="65" r="4" className={accentClass} fill="currentColor" />
          <text x="40" y="94" className="font-mono text-[7px] fill-slate-500 dark:fill-slate-400 tracking-wider">
            PRAKERIN
          </text>

          {/* Partner Nodes */}
          <rect x="250" y="23" width="24" height="24" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          <circle cx="262" cy="35" r="3" className="text-slate-400 dark:text-slate-500" fill="currentColor" />
          <text x="242" y="16" className="font-mono text-[7px] fill-slate-400 dark:fill-slate-500 tracking-wider">
            EKSTRA_01
          </text>

          <rect x="250" y="83" width="24" height="24" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          <circle cx="262" cy="95" r="3" className={accentClass} fill="currentColor" />
          <text x="242" y="117" className="font-mono text-[7px] fill-slate-400 dark:fill-slate-500 tracking-wider">
            EKSTRA_02
          </text>

          <circle cx="150" cy="65" r="2.5" className={accentClass} fill="currentColor" />
        </svg>
      );

    case "digital":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Discrete 7x14 Digital Bit Matrix */}
          {Array.from({ length: 5 }).map((_, r) => (
            <g key={r}>
              {Array.from({ length: 14 }).map((_, c) => {
                const isLit = (r + c) % 5 === 0 || (r === 2 && c > 4 && c < 10);
                const isHighlight = r === 2 && (c === 6 || c === 7);
                return (
                  <circle
                    key={`${r}-${c}`}
                    cx={45 + c * 18}
                    cy={32 + r * 16}
                    r={isHighlight ? 2.5 : isLit ? 1.8 : 1}
                    className={
                      isHighlight
                        ? accentClass
                        : isLit
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-200 dark:text-slate-800"
                    }
                    fill="currentColor"
                  />
                );
              })}
            </g>
          ))}
          {/* Data Framing Borders */}
          <line x1="35" y1="108" x2="285" y2="108" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <line x1="35" y1="20" x2="285" y2="20" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="36" y="120" className="font-mono text-[7px] tracking-widest fill-slate-400 dark:fill-slate-500">
            LAB_TECH_STREAM // 01001101 01010011 01001011
          </text>
        </svg>
      );

    case "accreditation":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Formal Precision Stamp Frame */}
          <rect
            x="115"
            y="20"
            width="90"
            height="90"
            className={strokeClass}
            strokeWidth="1.2"
            fill="currentColor"
            fillOpacity={isActive ? "0.06" : "0.01"}
          />
          <rect
            x="121"
            y="26"
            width="78"
            height="78"
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          
          {/* Bold Editorial "A" Typography */}
          <text
            x="160"
            y="80"
            textAnchor="middle"
            className={`font-serif text-5xl font-black ${
              isActive ? "fill-[#F96501]" : "fill-slate-700 dark:fill-slate-200"
            } transition-colors duration-500`}
          >
            A
          </text>

          {/* Caliper Corner Marks */}
          <line x1="110" y1="20" x2="120" y2="20" className={strokeClass} strokeWidth="1" />
          <line x1="115" y1="15" x2="115" y2="25" className={strokeClass} strokeWidth="1" />
          <line x1="200" y1="20" x2="210" y2="20" className={strokeClass} strokeWidth="1" />
          <line x1="205" y1="15" x2="205" y2="25" className={strokeClass} strokeWidth="1" />

          {/* Stamp Seal Metadata */}
          <text x="160" y="100" textAnchor="middle" className="font-mono text-[7px] tracking-widest fill-slate-500 dark:fill-slate-400">
            BAN-S/M CERTIFIED
          </text>
          <line x1="40" y1="65" x2="105" y2="65" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <line x1="215" y1="65" x2="280" y2="65" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
        </svg>
      );

    case "transformation":
      return (
        <svg
          viewBox="0 0 320 130"
          className="w-full h-auto transition-colors duration-500 select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Isometric Perspective Plane & Dynamic Trajectory */}
          {/* Layer 1 (Base Grid) */}
          <path d="M 60 70 L 160 30 L 260 70 L 160 110 Z" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" fill="currentColor" fillOpacity="0.02" />
          
          {/* Layer 2 (Elevated Plane) */}
          <path
            d="M 80 55 L 160 22 L 240 55 L 160 88 Z"
            className={strokeClass}
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />

          {/* Coordinate Vectors */}
          <line x1="160" y1="30" x2="160" y2="100" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
          <line x1="60" y1="70" x2="260" y2="70" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="2 2" />

          {/* Forward Vector Node */}
          <line x1="160" y1="65" x2="220" y2="40" className={strokeClass} strokeWidth="1.5" />
          <circle cx="220" cy="40" r="3" className={accentClass} fill="currentColor" />
          <circle cx="160" cy="65" r="2" className="text-slate-400 dark:text-slate-500" fill="currentColor" />

          <text x="210" y="28" className="font-mono text-[7px] tracking-wider fill-[#F96501]">
            VECT_2025 // NEXT
          </text>
          <text x="40" y="118" className="font-mono text-[7px] tracking-widest fill-slate-400 dark:fill-slate-500">
            SYSTEM // KURIKULUM MERDEKA
          </text>
        </svg>
      );
  }
}

/* -------------------------------------------------------------------------
 * Main School Archive Component
 * ------------------------------------------------------------------------- */

export default function TimelineSection() {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  // IntersectionObserver to gracefully track active milestone on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveMilestoneIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -40% 0px",
        threshold: [0.1, 0.4],
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToMilestone = (index: number) => {
    const target = itemRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="school-archive"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-slate-50/70 dark:bg-[#0b0f17] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 overflow-hidden"
      aria-labelledby="archive-heading"
    >
      {/* Background Architectural Grid Lines (Subtle & Non-intrusive) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================
         * SECTION INTRO (Editorial Heading & Metadata)
         * ========================================================= */}
        <header className="mb-20 sm:mb-28 text-center md:text-left">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F96501]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F96501] font-semibold">
              OUR JOURNEY
            </span>
          </div>

          {/* Large Editorial Heading */}
          <h2
            id="archive-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans mb-5 leading-[1.08]"
          >
            THE SCHOOL ARCHIVE
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-normal leading-relaxed">
            Menelusuri perjalanan SMK Prestasi Prima dari awal berdiri hingga transformasi pendidikan modern.
          </p>

          {/* Subtle Metadata Row */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 font-mono text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <span className="text-slate-300 dark:text-slate-700">•</span>
              EST. 2011
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span>10 MILESTONES</span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span>SMK PRESTASI PRIMA</span>
          </div>
        </header>

        {/* =========================================================
         * ARCHIVE TIMELINE TRACK
         * ========================================================= */}
        <div className="relative">
          {/* Vertical Archive Guide Line (Desktop Center, Mobile Left) */}
          <div
            className="absolute top-0 bottom-0 left-4 md:left-[35%] w-[1px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2"
            aria-hidden="true"
          />

          {/* Interactive Progress Indicator along the spine */}
          <div
            className="hidden md:block absolute left-[35%] w-3 h-3 rounded-full bg-[#F96501] -translate-x-1/2 shadow-sm transition-all duration-500 pointer-events-none z-20"
            style={{
              top: `${(activeMilestoneIndex / (MILESTONES.length - 1)) * 95 + 2}%`,
            }}
            aria-hidden="true"
          />

          {/* Milestones Container */}
          <div className="space-y-16 sm:space-y-24">
            {MILESTONES.map((item, idx) => {
              const isActive = idx === activeMilestoneIndex;

              return (
                <article
                  key={item.id}
                  id={item.id}
                  data-index={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`group relative pl-10 md:pl-0 grid grid-cols-1 md:grid-cols-[35%_65%] gap-6 md:gap-12 items-start transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-65 hover:opacity-90"
                  }`}
                  aria-label={`${item.year}: ${item.title}`}
                >
                  {/* Timeline Dot Anchor (Positioned on the vertical line) */}
                  <button
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    aria-label={`Lihat arsip tahun ${item.year}`}
                    className="absolute left-4 md:left-[35%] -translate-x-1/2 top-3 w-6 h-6 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F96501] z-10 cursor-pointer"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border ${
                        isActive
                          ? "bg-[#F96501] border-[#F96501] scale-125 shadow-[0_0_12px_rgba(249,101,1,0.5)]"
                          : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-[#F96501]"
                      }`}
                    />
                  </button>

                  {/* =====================================================
                   * LEFT COLUMN: Archive Label & Year
                   * ===================================================== */}
                  <div className="md:pr-10 md:text-right flex flex-col justify-start md:items-end">
                    {/* Archive Index Label */}
                    <div className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                      {item.index}
                    </div>

                    {/* Prominent Large Year */}
                    <div
                      className={`font-mono font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl transition-colors duration-300 ${
                        isActive
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-400 dark:text-slate-600 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                      }`}
                    >
                      {item.year}
                    </div>

                    {/* Metadata Tag */}
                    <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <span>DOC ID:</span>
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">{item.catalogId}</span>
                    </div>
                  </div>

                  {/* =====================================================
                   * RIGHT COLUMN: Title, Description & Exhibit Visual
                   * ===================================================== */}
                  <div className="relative">
                    <div
                      className={`p-6 sm:p-8 rounded-lg border bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs transition-all duration-300 ${
                        isActive
                          ? "border-slate-300 dark:border-slate-700 shadow-sm"
                          : "border-slate-200/80 dark:border-slate-800/80 group-hover:border-slate-300 dark:group-hover:border-slate-700"
                      }`}
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          CLASSIFICATION // MILESTONE
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#F96501] font-semibold">
                          VERIFIED RECORD
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase mb-3">
                        {item.title}
                      </h3>

                      {/* Historical Description */}
                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        “{item.description.replace(/^“|”$/g, "")}”
                      </p>

                      {/* Abstract Geometric Exhibit (No Images) */}
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            EXHIBIT FIG. {idx + 1}.0 // ABSTRACT COMPOSITION
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            NON-PHOTOGRAPHIC ARTIFACT
                          </span>
                        </div>

                        <div className="p-3 sm:p-4 rounded border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/40 overflow-hidden">
                          <MilestoneVisual type={item.visualType} isActive={isActive} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Section Footer / Metadata Archive Summary */}
        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400 dark:text-slate-500">
          <div>ARCHIVE REPOSITORY // SMK PRESTASI PRIMA HISTORICAL RECORD</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>ALL 10 MILESTONES PRESERVED &amp; VERIFIED</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

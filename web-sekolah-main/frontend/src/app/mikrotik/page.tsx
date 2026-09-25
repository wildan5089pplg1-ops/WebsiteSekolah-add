import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MikroTik Academy | SMK Prestasi Prima",
  description:
    "Program sertifikasi dan pelatihan jaringan komputer berstandar internasional MikroTik Certified Network Associate (MTCNA) di SMK Prestasi Prima.",
};

export default function MikrotikPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#F96501_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F96501] text-xs font-bold uppercase tracking-wider mb-6">
              <Image
                src="/images/mikrotik.png"
                alt="MikroTik"
                width={16}
                height={16}
                className="w-4 h-4 object-contain brightness-0 invert"
              />
              Official MikroTik Academy Partner
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white mb-6">
              MIKROTIK <span className="text-[#F96501]">ACADEMY</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal mb-8">
              Pusat pelatihan dan sertifikasi jaringan berstandar industri internasional.
              Membekali siswa keahlian konfigurasi RouterOS, manajemen bandwidth,
              routing protokol, hingga sertifikasi kompetensi resmi MTCNA.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ppdb"
                className="px-6 py-3 rounded-full bg-[#F96501] hover:bg-[#e05900] active:scale-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all"
              >
                Daftar PPDB Sekarang →
              </Link>
              <Link
                href="/program/tjkt"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm tracking-wide border border-white/15 transition-all"
              >
                Pelajari Jurusan TJKT
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-[#F96501] mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Sertifikasi MTCNA Resmi
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Siswa berkesempatan mengikuti ujian sertifikasi internasional MTCNA
              (MikroTik Certified Network Associate) yang diakui dunia industri IT.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-[#F96501] mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Laboratorium Berstandar Industri
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Didukung perangkat router board MikroTik generasi terbaru untuk
              praktik topologi jaringan skala enterprise dan keamanan data.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-[#F96501] mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Instruktur Bersertifikasi
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Pelatihan dibimbing langsung oleh instruktur terakreditasi MikroTik
              Academy dengan kurikulum aplikatif sesuai kebutuhan industri modern.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

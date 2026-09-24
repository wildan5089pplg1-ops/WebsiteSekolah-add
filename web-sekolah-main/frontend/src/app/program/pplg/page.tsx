import React from 'react';
import { Code2, Layout, Smartphone, Database, PenTool, Gamepad2, View, GitBranch, Terminal, Server, LayoutTemplate, Palette, MonitorPlay, Code } from 'lucide-react';
import Link from 'next/link';

export default function PPLGPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      
      {/* 1. Header Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h4 className="text-orange-500 font-bold uppercase tracking-wider text-sm">Program Keahlian</h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-orange-500 leading-tight">
              PENGEMBANGAN PERANGKAT LUNAK & GIM
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-xl">
              PPLG merupakan jurusan yang berfokus pada perancangan, pembuatan, dan pemeliharaan perangkat lunak, aplikasi, web, dan gim. Siswa tidak hanya belajar coding, tetapi juga mengemban pola pikir computational thinking, problem solving, dan inovasi teknologi cerdas.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/ppdb" className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/30">
                Daftar PPDB
              </Link>
              <Link href="#kurikulum" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                Kurikulum
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="absolute inset-0 bg-orange-100 dark:bg-orange-500/10 rounded-full blur-3xl opacity-50 scale-110"></div>
            <div className="relative z-10 p-12 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Code2 className="w-48 h-48 text-orange-500" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Journey Belajar */}
      <section id="kurikulum" className="w-full bg-slate-50 dark:bg-slate-900 py-20 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-orange-500 mb-4">Journey Belajar</h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Dasar Pemrograman & Algoritma", desc: "Mempelajari logika pemrograman dan bahasa C++/Python." },
              { icon: Layout, title: "Web Development", desc: "Pembangunan website dengan HTML, CSS, JS, dan framework modern." },
              { icon: Smartphone, title: "Mobile Development", desc: "Menciptakan aplikasi smartphone Android/iOS (Flutter/Kotlin)." },
              { icon: Database, title: "Database", desc: "Manajemen basis data SQL dan NoSQL untuk aplikasi skala besar." },
              { icon: PenTool, title: "UI/UX Design", desc: "Merancang antarmuka aplikasi yang user-friendly dan menarik." },
              { icon: Gamepad2, title: "Game Development", desc: "Pembuatan game 2D/3D dengan engine Unity atau Unreal." },
              { icon: View, title: "VR/AR Development", desc: "Eksplorasi realitas virtual dan augmented reality yang mutakhir." },
              { icon: GitBranch, title: "SMK Version Control", desc: "Pengelolaan kolaborasi kode dengan Git dan GitHub." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Kata Kepala Program */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="absolute inset-0 bg-orange-500/5 dark:bg-orange-500/10 rounded-[3rem] -skew-y-2 transform"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-8 md:p-12">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            {/* Menggunakan image placeholder jika foto asli tidak ada */}
            <span className="text-slate-400 font-bold text-center p-4">FOTO<br/>KAPROG PPLG</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <svg className="w-12 h-12 text-orange-300 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-200 italic mb-6 leading-relaxed">
              "Kami mencetak talenta digital yang tidak hanya mahir menulis kode, tetapi mampu memberikan solusi inovatif bagi masalah industri masa kini melalui software engineering dan industri kreatif."
            </p>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">Agus Nugroho, S.Kom</h4>
            <span className="text-orange-500 font-bold">Kepala Program Keahlian PPLG</span>
          </div>
        </div>
      </section>

      {/* 4. Prospek Karir */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 py-20 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Prospek Karir</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">Lulusan PPLG SMK Prestasi Prima memiliki jenjang karir yang luas di berbagai sektor teknologi industri, startup, dan multinasional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: LayoutTemplate, title: "Front-End Developer", desc: "Membangun tampilan UI aplikasi yang interaktif dan responsif." },
              { icon: Server, title: "Back-End Developer", desc: "Mengembangkan sistem server, API, dan logika bisnis aplikasi." },
              { icon: Terminal, title: "Full-Stack Developer", desc: "Menguasai pengembangan front-end dan back-end sekaligus." },
              { icon: Smartphone, title: "Mobile Developer", desc: "Merancang aplikasi canggih untuk platform Android & iOS." },
              { icon: Palette, title: "UI/UX Designer", desc: "Meneliti dan mendesain pengalaman pengguna yang optimal." },
              { icon: MonitorPlay, title: "Game Developer", desc: "Mengembangkan dunia permainan virtual, mekanika, dan AI." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex items-start gap-4 border border-orange-100 dark:border-slate-700/50 shadow-sm hover:border-orange-500 transition-colors">
                <div className="p-3 bg-orange-500 text-white rounded-xl shadow-md shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="w-full bg-gradient-to-r from-orange-600 to-orange-500 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-6 uppercase tracking-wider">
            Siap Menjadi Seorang Developer / Gim Creator?
          </h2>
          <p className="text-orange-50 text-lg mb-8 max-w-2xl mx-auto">
            Tingkatkan kompetensi IT di SMK Prestasi Prima, kembangkan portofolio, dan raih karir impian Anda di industri teknologi.
          </p>
          <Link href="/ppdb" className="inline-block px-10 py-4 bg-white text-orange-600 font-black rounded-full hover:bg-slate-50 hover:scale-105 transition-all shadow-xl uppercase tracking-wider">
            Daftar PPDB Sekarang
          </Link>
        </div>
      </section>

    </div>
  );
}

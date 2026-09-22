import Link from 'next/link';
import { getSchoolInfo, getNewsList, getFacilities } from '@/lib/api';
import InteractiveMajors from '@/components/InteractiveMajors';
import TimelineSection from '@/components/TimelineSection';
import PrestasiSection from '@/components/PrestasiSection';
import AlumniPTNSection from '@/components/AlumniPTNSection';
import MitraSection from '@/components/MitraSection';
import BlogSection from '@/components/BlogSection';


export default async function HomePage() {
  const school = await getSchoolInfo();
  const news = await getNewsList();
  const facilities = await getFacilities();

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#fafafa] overflow-hidden pt-20 pb-20">
        
        {/* Background Decorations */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none z-0">
           {/* Faint wavy lines as seen in bottom left */}
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
              <path d="M-20,150 Q40,100 80,180 T180,150" fill="none" stroke="#f87f22" strokeWidth="0.5" />
              <path d="M-10,180 Q50,130 100,190 T200,170" fill="none" stroke="#fcd34d" strokeWidth="0.5" />
           </svg>
        </div>

        {/* Floating Action Button (Android Logo in Orange Circle) */}
        <div className="absolute bottom-10 right-10 z-20">
          <div className="w-16 h-16 bg-[#f87f22] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(248,127,34,0.3)] hover:scale-110 transition-transform cursor-pointer">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.81.24l-1.92 3.32C14.81 8.35 13.46 8 12 8s-2.81.35-4.45 1.01L5.63 5.69c-.16-.3-.52-.39-.81-.24-.29.16-.42.54-.26.85l1.84 3.18C3.76 11.45 2 14.54 2 18h20c0-3.46-1.76-6.55-4.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center -mt-10">
          <p className="text-[13px] md:text-[14px] font-semibold text-slate-700 mb-6 lowercase tracking-wide font-sans">
            "if better is possible, good is not enough"
          </p>

          <h1 className="flex flex-col items-center font-black tracking-tighter leading-[0.95]">
            <span className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] text-[#111] drop-shadow-xl shadow-black/10">PRESTASI</span>
            <span className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] text-[#f87f22] drop-shadow-xl shadow-orange-500/20 -mt-2">PRIMA</span>
          </h1>

          <p className="text-xs md:text-sm lg:text-base text-slate-700 max-w-[650px] mx-auto mt-8 font-medium leading-relaxed drop-shadow-sm px-4">
            Mencetak generasi unggul yang tidak hanya kompeten secara teknis, namun juga memiliki integritas karakter untuk memimpin masa depan industri global.
          </p>

          <div className="mt-12">
            <Link href="/daftar" className="inline-flex items-center gap-2 bg-[#f87f22] text-white px-8 py-3.5 rounded-full font-bold text-xs shadow-[0_8px_20px_rgba(248,127,34,0.4)] hover:shadow-[0_8px_25px_rgba(248,127,34,0.6)] transition-all hover:bg-orange-600 uppercase tracking-widest">
              Daftar Sekarang
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* Visi Kepemimpinan Section */}
      <section className="relative w-full lg:h-[700px] flex items-center overflow-visible mt-10">
        
        {/* Background Image & Gradient (Clipped to section) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop" alt="School Building" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ed6a00] via-[#f87f22]/90 to-transparent lg:from-[#ed6a00] lg:via-[#f87f22]/80 lg:to-transparent"></div>
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-20 hidden sm:flex items-center gap-4">
           {/* Menggunakan placeholder gambar logo yang sudah ada, sesuaikan path jika ada file spesifik */}
           <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md p-1 shadow-xl border border-white/30 flex items-center justify-center">
             <img src="/images/logo-smk.png" className="w-12 h-12 object-contain" alt="Logo SMK" />
           </div>
           <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md p-1 shadow-xl border border-white/30 flex items-center justify-center">
             <img src="/images/logo.png" className="w-12 h-12 object-contain" alt="Logo Yayasan" />
           </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 flex flex-col lg:flex-row items-center h-full">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start pt-10 lg:pt-0 pb-16 lg:pb-0 z-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[2px] h-4 bg-white"></div>
              <span className="text-white font-bold text-xs tracking-widest uppercase">
                DIGITAL LEADERSHIP ACADEMY
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white leading-[1.1] mb-8 drop-shadow-md">
              Visi Kepemimpinan <br className="hidden lg:block" />
              di Era Inovasi.
            </h2>

            <p className="text-[#ffe0b2] text-sm sm:text-base leading-relaxed mb-6 font-medium italic drop-shadow-sm max-w-lg">
              "Pendidikan bukan tentang mengikuti arus, tapi tentang <br className="hidden sm:block"/> menciptakan teknologi yang mengubah arah masa depan."
            </p>
            
            <p className="text-white text-sm sm:text-base leading-relaxed mb-10 max-w-md drop-shadow-sm">
              Kami mengintegrasikan <strong>Industry-Standard Tech Stack</strong> ke dalam kurikulum inti, memastikan setiap lulusan memiliki peta jalan karir global yang jelas.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3.5 bg-white text-[#f87f22] font-bold text-xs sm:text-sm rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-slate-50 transition-all hover:-translate-y-0.5">
                EKSPLORASI VISI
              </button>
              <button className="px-6 py-3.5 border-2 border-white/60 text-white font-bold text-xs sm:text-sm rounded-md hover:bg-white/10 transition-colors">
                PROFIL LULUSAN
              </button>
            </div>
          </div>

          {/* Right Side - Photo */}
          <div className="w-full lg:w-1/2 relative lg:absolute lg:right-0 lg:bottom-0 h-full flex justify-center lg:justify-end items-end pointer-events-none z-10">
             <div className="relative w-full max-w-lg lg:max-w-none lg:w-auto mx-auto lg:mx-0 flex justify-center lg:justify-end items-end pb-0">
                <img 
                  src="/images/kepsek.png" 
                  alt="Hendry Kurniawan, S.Kom., M.I.Kom. - Kepala Sekolah" 
                  className="w-full lg:w-auto h-auto max-h-[550px] lg:max-h-[750px] xl:max-h-[800px] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] pointer-events-auto"
                />
             </div>
          </div>

        </div>

        {/* Bottom Floating Capsule */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center px-4 transform translate-y-1/2">
           <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-100">
              
              {/* Profile Info */}
              <div className="flex items-center gap-4 pl-2 sm:pl-4 flex-1">
                 <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                 </div>
                 <div className="flex flex-col text-left">
                    <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 leading-tight">Hendry Kurniawan, S.Kom., M.I.Kom.</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Kepala Sekolah SMK Prestasi Prima</p>
                 </div>
              </div>

              {/* Logos Area */}
              <div className="hidden md:flex items-center justify-center gap-4 flex-1 px-4">
                 {/* Asumsikan ada gambar logo kemitraan/support, atau bisa diganti sesuai gambar asli */}
                 <img src="/images/support-logos.png" alt="Logos" className="h-10 object-contain opacity-90 mix-blend-multiply" />
              </div>

              {/* Action Button */}
              <div className="shrink-0 pr-1">
                 <button className="bg-[#f87f22] text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 w-full md:w-auto">
                    HUBUNGI KAMI
                 </button>
              </div>

           </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 z-30 mb-20">
        <div className="rounded-[3rem] bg-slate-50 border border-slate-100 p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            {[
              { value: '2,550+', label: 'Peserta Didik' },
              { value: '200+', label: 'Guru Pendidik' },
              { value: '40', label: 'Ruang Kelas' },
              { value: '6', label: 'Lab Komputer' },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col justify-center items-center text-center ${i === 2 || i === 3 ? 'pt-5 sm:pt-0' : ''}`}>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{stat.value}</h4>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Keahlian Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Jurusan Unggulan
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
              Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Keahlian</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Empat jurusan unggulan siap membentuk generasi kreatif dan kompeten: PPLG, TJKT, BCF, dan DKV — lengkap dengan kurikulum praktik industri.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/program" className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Semua Program
            </Link>
            <Link href="/ppdb" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all">
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Interactive Canvas (Replaces 4 Cards Grid) */}
        <InteractiveMajors />
      </section>

      {/* (Cinematic Edge-to-Edge Banner removed to match Figma) */}

      <TimelineSection key="force-remount-1" />

      {/* Prestasi / Achievements Section */}
      <PrestasiSection />

      {/* Lulusan PTN Section */}
      <AlumniPTNSection />

      {/* Mitra & Sponsorship Section */}
      <MitraSection />

      {/* Blog & Artikel Section */}
      <BlogSection />


      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-orange-600 via-rose-600 to-slate-800 dark:from-orange-900 dark:via-rose-900 dark:to-slate-900 border border-orange-500/50 dark:border-orange-700/50 shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Siap Menjadi Bagian dari SMK Prestasi Prima?
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 dark:text-orange-200">
              Daftarkan diri Anda atau putra-putri Anda sekarang juga dalam Penerimaan Peserta Didik Baru (PPDB) 2026.
            </p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap px-8 py-4 rounded-xl bg-white text-slate-900 font-extrabold text-sm hover:bg-amber-50 hover:shadow-xl transition-all"
          >
            Hubungi Panitia PPDB
          </Link>
        </div>
      </section>

    </div>
  );
}

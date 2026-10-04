import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import CertificateModal from "@/components/CertificateModal";

export const metadata: Metadata = {
  title: "MikroTik Academy | SMK Prestasi Prima",
  description:
    "Program sertifikasi dan pelatihan jaringan komputer berstandar internasional MikroTik Certified Network Associate (MTCNA) di SMK Prestasi Prima.",
};

export default function MikrotikPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors selection:bg-[#F96501]/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src="/images/mikrotik.png"
                  alt="MikroTik"
                  width={150}
                  height={40}
                  className="h-8 object-contain dark:brightness-0 dark:invert"
                />
                <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Official Academy Center
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-8 text-slate-900 dark:text-white">
                Mencetak <span className="text-[#F96501]">Certified</span><br />Network Associate.
              </h1>
              
              <div className="relative pl-6 border-l-4 border-[#F96501] mb-8">
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 italic mb-4">
                  "Di SMK Prestasi Prima, kami menjembatani kurikulum sekolah dengan kebutuhan industri global melalui MikroTik Academy, membekali siswa dengan sertifikasi MTCNA yang diakui dunia."
                </p>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Hendry Kurniawan, S.Kom., M.I.Kom.</h4>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-1">
                    Kepala SMK Prestasi Prima
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative lg:ml-auto w-full max-w-md mx-auto group">
              {/* Abstract shapes behind image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#F96501]/20 to-transparent rounded-[3rem] blur-2xl -z-10 transform group-hover:rotate-6 transition-transform duration-700"></div>
              
              <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 aspect-[3/4]">
                <Image
                  src="/images/hendry.jpeg"
                  alt="Kepala Sekolah SMK Prestasi Prima"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 sm:bottom-8 sm:-left-12 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300 z-20 cursor-default">
                <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-[#F96501]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">Industrial Integration</p>
                  <p className="text-xs text-slate-500">Global Curriculum Standard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Academy Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">
              PROGRAM <span className="text-[#F96501]">ACADEMY</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              MikroTik Academy di SMK Prestasi Prima adalah program kemitraan resmi dengan MikroTik Latvia yang mengintegrasikan sertifikasi <strong className="text-slate-900 dark:text-white">MTCNA</strong> langsung ke dalam kurikulum kejuruan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-[#F96501]/30 hover:shadow-2xl hover:shadow-[#F96501]/5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-[#F96501] mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#F96501] transition-colors">
                Sertifikasi Global
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Lulusan berhak mengikuti ujian sertifikasi <strong className="text-slate-900 dark:text-white">MTCNA</strong> yang diakui secara internasional di dunia IT.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-[#F96501]/30 hover:shadow-2xl hover:shadow-[#F96501]/5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-[#F96501] mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#F96501] transition-colors">
                Kurikulum Industri
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Materi pembelajaran selalu diperbarui sesuai dengan standar teknologi <strong className="text-slate-900 dark:text-white">MikroTik RouterOS</strong> terbaru.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-[#F96501]/30 hover:shadow-2xl hover:shadow-[#F96501]/5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-[#F96501] mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#F96501] transition-colors">
                Keunggulan Lulusan
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Mencetak tenaga ahli jaringan yang siap kerja dengan kredibilitas tinggi di level <strong className="text-slate-900 dark:text-white">Internasional</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materi MTCNA Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#F96501] uppercase mb-3 block">
              Global Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              MATERI <span className="text-[#F96501]">MTCNA</span>
            </h2>
            <div className="w-16 h-1.5 bg-[#F96501] mx-auto mt-6 rounded-full opacity-80"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Introduction", desc: "Tampilan WinBox, CLI, dan dasar-dasar MikroTik." },
              { num: "02", title: "DHCP", desc: "Konfigurasi DHCP Client & Server untuk manajemen IP otomatis." },
              { num: "03", title: "Bridging", desc: "Menghubungkan jaringan lokal melalui fitur Bridge." },
              { num: "04", title: "Routing", desc: "Implementasi Static Routing dan manajemen tabel routing." },
              { num: "05", title: "Wireless", desc: "Keamanan jaringan nirkabel dan konfigurasi AP/Client." },
              { num: "06", title: "Firewall", desc: "Implementasi NAT, Mangle, dan filter Rules keamanan." },
              { num: "07", title: "QoS", desc: "Manajemen bandwidth menggunakan Simple Queue dan PCQ." },
              { num: "08", title: "Tunnels", desc: "Konfigurasi VPN dan Point-to-Point Tunneling Protokol." }
            ].map((materi, idx) => (
              <div 
                key={idx} 
                className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/50 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl font-black text-orange-50 dark:text-orange-900/20 mb-4 group-hover:text-orange-100 dark:group-hover:text-orange-900/40 transition-colors">
                  {materi.num}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-[#F96501] transition-colors">
                  {materi.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {materi.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Profile Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 overflow-hidden">
          
          {/* Background watermark */}
          <div className="absolute top-8 right-8 text-[6rem] sm:text-[8rem] font-black text-slate-50 dark:text-slate-800/30 uppercase tracking-tighter leading-none z-0 pointer-events-none select-none">
            TRAINER
          </div>

          {/* Left - Photo */}
          <div className="relative z-10 w-full max-w-xs shrink-0 mx-auto lg:mx-0 group">
            {/* Photo Container */}
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl shadow-slate-300/50 dark:shadow-none bg-slate-200 dark:bg-slate-800">
              <Image 
                src="/images/achmad.jpg" 
                alt="Achmad Maulana"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Outline decoration */}
            <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-orange-100 dark:border-orange-900/50 -z-10 transition-colors group-hover:border-orange-300 dark:group-hover:border-orange-700"></div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#F96501] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 cursor-default">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>

          {/* Right - Content */}
          <div className="relative z-10 flex-1 w-full text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F96501] text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              Certified Pro Trainer
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
              Achmad Maulana,<br/>
              <span className="text-[#F96501]">S.Kom.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-md mx-auto lg:mx-0">
              Membangun Talenta Muda untuk Masa Depan Infrastruktur Digital
            </p>

            {/* Credentials Card */}
            <CertificateModal />
          </div>
        </div>
      </section>
    </div>
  );
}

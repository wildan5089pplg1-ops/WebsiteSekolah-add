import React from 'react';
import Navbar from '@/components/Navbar_old';
import Footer from '@/components/Footer';

const alumniData = [
  {
    name: 'Haikal Idris',
    major: 'Teknik Informatika',
    ptn: 'Politeknik Negeri Jember',
    avatar: 'https://ui-avatars.com/api/?name=Haikal+Idris&background=f97316&color=fff&size=150'
  },
  {
    name: 'Fariz Novalino',
    major: 'Teknologi Rekayasa Multimedia',
    ptn: 'Politeknik Negeri Media Kreatif',
    avatar: 'https://ui-avatars.com/api/?name=Fariz+Novalino&background=f97316&color=fff&size=150'
  },
  {
    name: 'Kholifatulhusna Fitriana',
    major: 'Desain Grafis',
    ptn: 'Politeknik Negeri Media Kreatif',
    avatar: 'https://ui-avatars.com/api/?name=Kholifatulhusna+Fitriana&background=f97316&color=fff&size=150'
  },
  {
    name: 'Muhammad Davi Abdullah',
    major: 'Teknologi Rekayasa Perangkat Lunak',
    ptn: 'Politeknik Negeri Cilacap',
    avatar: 'https://ui-avatars.com/api/?name=Muhammad+Davi&background=f97316&color=fff&size=150'
  },
  {
    name: 'Ade Rayhan',
    major: 'Teknik Informatika',
    ptn: 'Universitas Khairun',
    avatar: 'https://ui-avatars.com/api/?name=Ade+Rayhan&background=f97316&color=fff&size=150'
  }
];

export default function AlumniPTNPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 py-20 px-4 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 50px)' }}></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg mb-6">
            Mengabadikan Moment Setiap Kelulusan<br />
            <span className="text-yellow-300">SMK PRESTASI PRIMA</span>
          </h1>
          <p className="text-orange-50 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Selamat dan sukses untuk seluruh alumni yang telah berhasil membuktikan prestasinya dengan masuk ke Perguruan Tinggi Negeri pilihan.
          </p>
        </div>
      </div>

      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Poster Showcase */}
        <div className="mb-20 flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-[10px] border-white dark:border-slate-800 bg-white inline-block max-w-[800px] w-full group relative">
            <img src="/images/poster-alumni-ptn.png" alt="Poster Alumni Lolos PTN" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Text Roster */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4">Daftar Bintang Prestasi</h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 justify-center">
          {alumniData.map((alumni, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/50 hover:-translate-y-2 hover:shadow-orange-500/20 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-orange-400 to-red-500 mb-5 shadow-md">
                <img src={alumni.avatar} alt={alumni.name} className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 object-cover" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{alumni.name}</h3>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 font-bold text-xs rounded-full uppercase tracking-wider mb-4">
                {alumni.major}
              </span>
              <p className="text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.221 4.626c-.114.632-.636 1.053-1.251 1.053h-.46a1 1 0 01-.781-.378l-1.06-1.302a1 1 0 00-1.228-.276l-3.803 1.943a.998.998 0 00-.222.102z"></path></svg>
                {alumni.ptn}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

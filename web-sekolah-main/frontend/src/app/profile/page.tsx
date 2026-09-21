import { getSchoolInfo } from '@/lib/api';

export default async function ProfilePage() {
  const school = await getSchoolInfo();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Profil Sekolah</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Mengenal Lebih Dekat {school.name}</h1>
        <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          Berdiri sejak tahun 1995, sekolah kami berdedikasi menciptakan lingkungan belajar yang kondusif, inklusif, dan berorientasi pada kemajuan teknologi.
        </p>
      </div>

      {/* Principal Message Section */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-sm dark:shadow-none">
        <div className="aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
            alt="Kepala Sekolah"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Sambutan Kepala Sekolah</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{school.principal}</h2>
          <blockquote className="text-slate-700 dark:text-slate-300 text-sm italic leading-relaxed border-l-4 border-amber-500 pl-4 py-1">
            &ldquo;Pendidikan di era digital bukan sekadar mentransfer pengetahuan, melainkan membentuk karakter unggul, kemampuan berpikir kritis, serta integritas moral yang kokoh bagi generasi penerus bangsa.&rdquo;
          </blockquote>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Di SMK Prestasi Prima, kami mengintegrasikan pembelajaran berbasis proyek (Project-Based Learning) dengan penguasaan teknologi mutakhir agar setiap siswa memiliki daya saing tinggi di kancah nasional maupun global.
          </p>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Visi */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-orange-50/80 to-white dark:from-orange-950/40 dark:to-slate-900/60 border border-orange-200 dark:border-orange-800/40 space-y-4 shadow-sm dark:shadow-none">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-600/30 border border-orange-300 dark:border-orange-500/50 flex items-center justify-center text-2xl shadow-inner dark:shadow-none">
            🎯
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Visi Sekolah</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            &ldquo;Terwujudnya Lulusan yang Bertaqwa, Berprestasi Akademik & Non-Akademik Tingkat Internasional, Berwawasan Lingkungan, dan Menguasai Teknologi Informasi 2030.&rdquo;
          </p>
        </div>

        {/* Misi */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-50/80 to-white dark:from-amber-950/40 dark:to-slate-900/60 border border-amber-200 dark:border-amber-800/40 space-y-4 shadow-sm dark:shadow-none">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-600/30 border border-amber-300 dark:border-amber-500/50 flex items-center justify-center text-2xl shadow-inner dark:shadow-none">
            🚀
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Misi Utama</h3>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm list-disc pl-5 leading-relaxed">
            <li>Menyelenggarakan proses pembelajaran yang inovatif, efektif, dan berbasis riset digital.</li>
            <li>Mengembangkan potensi bakat dan minat siswa melalui 24 cabang ekstrakurikuler.</li>
            <li>Menanamkan budaya kedisiplinan, budi pekerti, dan kepedulian lingkungan hidup.</li>
            <li>Jalin kemitraan dengan perguruan tinggi ternama dan industri teknologi global.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

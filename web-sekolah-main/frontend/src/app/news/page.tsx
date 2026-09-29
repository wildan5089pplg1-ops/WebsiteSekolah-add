import { getNewsList } from '@/lib/api';
import Link from 'next/link';

export default async function NewsPage() {
  const newsList = await getNewsList();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pusat Informasi</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Berita & Pengumuman Resmi</h1>
        <p className="text-slate-600 dark:text-slate-300 text-base">
          Temukan kabar kegiatan, pengumuman sekolah, agenda akademik, serta prestasi terbaru siswa-siswi kami.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsList.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col group"
          >
            <div className="h-52 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-amber-600 dark:text-amber-400 text-xs font-bold backdrop-blur-md border border-slate-200 dark:border-slate-700">
                {item.category}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-xs text-slate-500 dark:text-slate-400">📅 {item.date}</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.content}
                </p>
                <Link 
                  href={`/news/${item.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition-colors"
                >
                  Baca Artikel Lengkap &rarr;
                </Link>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 cursor-pointer">
                  Dipublikasikan oleh Humas SMA 1
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

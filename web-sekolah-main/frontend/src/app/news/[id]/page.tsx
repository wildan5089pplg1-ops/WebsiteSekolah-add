import { getNewsItem } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsItem = await getNewsItem(params.id);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="mb-8">
        <Link href="/news" className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition-colors flex items-center gap-2">
          &larr; Kembali ke Daftar Berita
        </Link>
      </div>

      <article className="rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-lg dark:shadow-2xl">
        <div className="h-64 sm:h-96 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="px-4 py-2 rounded-full bg-orange-600 text-white text-xs font-bold shadow-lg">
              {newsItem.category}
            </span>
          </div>
        </div>

        <div className="p-8 sm:p-12 space-y-8">
          <div className="space-y-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{newsItem.date}</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {newsItem.title}
            </h1>
          </div>

          <div className="prose dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-8 border-l-4 border-amber-500 pl-4 bg-slate-50 dark:bg-transparent p-4 dark:p-0 rounded-r-lg dark:rounded-none">
              {newsItem.summary}
            </p>
            
            <div className="whitespace-pre-wrap leading-relaxed">
              {newsItem.content}
            </div>
          </div>
        </div>
      </article>

    </div>
  );
}

'use client';

import { useState } from 'react';

export default function PresmaLibSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<{ id: number, title: string, author: string, desc: string, coverImage: string | null } | null>(null);

  // Dummy data for books to match the screenshot grid (18 items)
  const books = [
    {
      id: 1,
      title: 'Buku Java',
      author: 'Tim Kurikulum SMK',
      desc: 'Panduan lengkap belajar pemrograman Java untuk siswa PPLG: dari dasar sintaks, OOP, hingga studi kasus aplikasi nyata di dunia industri.',
      coverImage: '/images/buku-java.webp'
    },
    ...Array.from({ length: 17 }, (_, i) => ({
      id: i + 2,
      title: `Buku Presmalib ${i + 2}`,
      author: 'Tim Kurikulum SMK',
      desc: `Ini adalah deskripsi singkat untuk buku seri ke-${i + 2}. Buku ini dirancang khusus untuk membantu siswa dalam memahami materi pelajaran secara lebih mendalam dengan pendekatan praktis dan studi kasus nyata di industri.`,
      coverImage: null
    }))
  ].filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20 bg-white">

      {/* Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <img src="/images/logo-smk.png" alt="Watermark" className="w-[600px] h-auto object-contain" />
      </div>

      <div className="relative z-10 flex flex-col gap-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">

          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
              {/* Book Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1">
                PRESMA <span className="text-orange-500">LIB</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium max-w-[200px] leading-tight mt-1">
                Temukan <strong className="text-orange-500">buku, materi,</strong> dan <strong className="text-orange-500">sumber belajar</strong> untuk mendukung perjalananmu di SMK.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8 font-bold text-sm text-slate-800">
            <button className="hover:text-orange-500 transition-colors">Eksplorasi</button>
            <button className="flex items-center gap-1 hover:text-orange-500 transition-colors">
              Kategori
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-[300px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari judul buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
            />
          </div>

        </div>

        {/* Conditional Render: Books Grid OR Detail View */}
        {!selectedBook ? (
          books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4 gap-y-8">
            {books.map((book) => (
              <div key={book.id} onClick={() => setSelectedBook(book)} className="flex flex-col items-center group cursor-pointer">
                {/* Book Cover */}
                <div className="w-full aspect-[2/3] bg-[#2a2a2a] rounded-md border-2 border-slate-700 shadow-md relative overflow-hidden flex flex-col items-center justify-center p-3 mb-3 group-hover:-translate-y-1 transition-transform">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover absolute inset-0" />
                  ) : (
                    <>
                      <img src="/images/logo-smk.png" alt="Logo" className="w-8 h-8 object-contain mb-3 opacity-90" />
                      <div className="bg-white text-slate-900 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-sm uppercase mt-auto relative z-10">
                        PRESMALIB
                      </div>
                    </>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-[90%] py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full group-hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20">
                  Lihat Buku Ini
                </button>
              </div>
            ))}
          </div>
          ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <h3 className="text-lg font-black text-slate-700">Buku tidak ditemukan</h3>
            <p className="text-sm text-slate-500 mt-1">Coba kata kunci lain, seperti &quot;Buku Java&quot;.</p>
          </div>
          )
        ) : (
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-4 items-center md:items-start justify-center max-w-5xl mx-auto w-full relative z-10">

            {/* Left Column: Book Cover & Back Button */}
            <div className="w-full md:w-[30%] flex flex-col items-center shrink-0">
              <div className="w-full aspect-[2/3] max-w-[280px] bg-[#2a2a2a] rounded-lg border-2 border-slate-700 shadow-xl relative overflow-hidden flex flex-col items-center justify-center p-8 mb-6">
                {selectedBook.coverImage ? (
                  <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-full h-full object-cover absolute inset-0" />
                ) : (
                  <>
                    <img src="/images/logo-smk.png" alt="Logo" className="w-20 h-20 object-contain mb-8 opacity-95 drop-shadow-md relative z-10" />
                    <div className="bg-white text-slate-900 text-sm font-black tracking-widest px-4 py-1.5 rounded-md uppercase mt-auto relative z-10">
                      PRESMALIB
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => setSelectedBook(null)} className="w-full max-w-[280px] py-3.5 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm tracking-widest uppercase">
                &larr; KEMBALI
              </button>
            </div>

            {/* Right Column: Book Details & Actions */}
            <div className="w-full md:w-[70%] bg-slate-100/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white mt-4 md:mt-0">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">{selectedBook.title}</h3>
              <p className="text-slate-800 font-medium leading-relaxed mb-10 text-justify sm:text-base whitespace-pre-line">
                {selectedBook.desc}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button className="w-14 h-14 bg-transparent border-2 border-slate-900 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors group shrink-0">
                  {/* WhatsApp Icon Outline/Solid */}
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-900 fill-current group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </button>
                <button className="w-full sm:w-auto px-10 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg tracking-wider text-sm uppercase">
                  PINJAM BUKU INI
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

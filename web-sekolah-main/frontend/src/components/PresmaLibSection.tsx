'use client';

import { useState, useEffect } from 'react';

// Define the book interface matching the database
interface Book {
  id: number;
  judul: string;
  pengarang: string | null;
  deskripsi_abstrak: string | null;
  nama_file_cover: string | null;
  penerbit: string | null;
  tahun_terbit: string | null;
  isbn_issn: string | null;
}

// Curated aesthetic gradients for dynamic digital book covers
const COVER_GRADIENTS = [
  { bg: 'from-blue-600 via-indigo-800 to-slate-950', accent: 'bg-blue-400' },
  { bg: 'from-emerald-600 via-teal-800 to-slate-950', accent: 'bg-emerald-400' },
  { bg: 'from-orange-500 via-amber-700 to-stone-950', accent: 'bg-amber-400' },
  { bg: 'from-rose-600 via-pink-800 to-purple-950', accent: 'bg-rose-400' },
  { bg: 'from-purple-600 via-violet-800 to-slate-950', accent: 'bg-purple-400' },
  { bg: 'from-cyan-600 via-sky-800 to-slate-950', accent: 'bg-cyan-400' },
  { bg: 'from-red-600 via-rose-900 to-zinc-950', accent: 'bg-red-400' },
  { bg: 'from-teal-600 via-emerald-900 to-slate-950', accent: 'bg-teal-400' },
];

function getCoverStyle(id: number, title: string) {
  let hash = id || 0;
  for (let i = 0; i < (title || '').length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) % COVER_GRADIENTS.length;
  }
  return COVER_GRADIENTS[Math.abs(hash) % COVER_GRADIENTS.length];
}

// Hybrid Book Cover Component (Backend Upload -> OpenLibrary ISBN -> Stylized Digital Cover)
function BookCover({ book, size = 'sm' }: { book: Book; size?: 'sm' | 'lg' }) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setHasFailed(false);
    if (book.nama_file_cover) {
      setImgSrc(`http://localhost:8000/images/docs/${book.nama_file_cover}`);
    } else if (book.isbn_issn) {
      const cleanIsbn = book.isbn_issn.replace(/[^0-9X]/gi, '');
      if (cleanIsbn.length >= 9) {
        setImgSrc(`https://covers.openlibrary.org/b/isbn/${cleanIsbn}-${size === 'lg' ? 'L' : 'M'}.jpg`);
      } else {
        setImgSrc(null);
      }
    } else {
      setImgSrc(null);
    }
  }, [book.id, book.nama_file_cover, book.isbn_issn, size]);

  const style = getCoverStyle(book.id, book.judul);

  // If there's an image source and it hasn't failed, show the <img>
  if (imgSrc && !hasFailed) {
    return (
      <div className="relative w-full h-full">
        <img
          src={imgSrc}
          alt={book.judul}
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-300"
          onLoad={(e) => {
            // OpenLibrary returns 1x1 blank gif when ISBN has no cover
            if ((e.target as HTMLImageElement).naturalWidth <= 1) {
              setHasFailed(true);
            }
          }}
          onError={() => {
            // If primary was backend upload and failed, try ISBN if available
            if (book.nama_file_cover && book.isbn_issn && !imgSrc.includes('openlibrary.org')) {
              const cleanIsbn = book.isbn_issn.replace(/[^0-9X]/gi, '');
              if (cleanIsbn.length >= 9) {
                setImgSrc(`https://covers.openlibrary.org/b/isbn/${cleanIsbn}-${size === 'lg' ? 'L' : 'M'}.jpg`);
                return;
              }
            }
            setHasFailed(true);
          }}
        />
        {/* Subtle realistic book spine shadow along the left edge */}
        <div className="absolute left-0 inset-y-0 w-2.5 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Fallback: Dynamic Stylized Digital Book Cover
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${style.bg} ${size === 'lg' ? 'p-6' : 'p-3'} flex flex-col justify-between overflow-hidden select-none`}>
      {/* 3D Book Spine Effect */}
      <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute left-3 inset-y-0 w-[1px] bg-white/15 pointer-events-none" />

      {/* Decorative Geometric Patterns */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -right-2 -top-2 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className={`${size === 'lg' ? 'text-xs tracking-widest' : 'text-[8px] tracking-wider'} font-black uppercase text-white/80`}>
          PRESMALIB
        </span>
        <div className={`${size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'} rounded-full ${style.accent} shadow-sm`} />
      </div>

      {/* Center Title & Author */}
      <div className="relative z-10 my-auto py-2">
        <h4 className={`${size === 'lg' ? 'text-xl sm:text-2xl line-clamp-4' : 'text-[11px] sm:text-xs line-clamp-3'} font-black text-white leading-tight drop-shadow-sm`}>
          {book.judul}
        </h4>
        {book.pengarang && (
          <p className={`${size === 'lg' ? 'text-xs sm:text-sm mt-3' : 'text-[9px] mt-1'} text-white/75 font-medium line-clamp-1`}>
            {book.pengarang}
          </p>
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between">
        <span className={`${size === 'lg' ? 'text-[10px]' : 'text-[7px] sm:text-[8px]'} text-white/60 font-semibold tracking-wider uppercase`}>
          {book.tahun_terbit ? `${book.tahun_terbit}` : 'E-LIBRARY'}
        </span>
        <span className={`${size === 'lg' ? 'text-[10px]' : 'text-[7px] sm:text-[8px]'} text-white/40 font-mono`}>
          {book.isbn_issn ? 'ISBN' : 'SMK'}
        </span>
      </div>
    </div>
  );
}

export default function PresmaLibSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from API
  const fetchBooks = async (query: string = '') => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/buku?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      // Laravel pagination returns the array of items in data.data
      setBooks(data.data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking book to show detail & fetch complete data
  const handleSelectBook = async (book: Book) => {
    setSelectedBook(book);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/buku/${book.id}`);
      if (response.ok) {
        const detail = await response.json();
        setSelectedBook(detail);
      }
    } catch (error) {
      console.error('Error fetching book detail:', error);
    }
  };

  // Initial fetch and on search change
  useEffect(() => {
    // Add a small debounce for search typing
    const delayDebounceFn = setTimeout(() => {
      fetchBooks(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20 bg-white">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <img src="/images/logo.png" alt="Watermark" className="w-[600px] h-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/images/logo-smk.png'; }} />
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
              placeholder="Cari judul atau pengarang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
            />
          </div>

        </div>

        {/* Conditional Render: Books Grid OR Detail View */}
        {!selectedBook ? (
          <div>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : books.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4 gap-y-8">
                {books.map((book) => (
                  <div key={book.id} onClick={() => handleSelectBook(book)} className="flex flex-col items-center group cursor-pointer">
                    {/* Book Cover Container with Shadow & Hover Animation */}
                    <div className="w-full aspect-[2/3] bg-slate-900 rounded-lg border border-slate-200 shadow-md relative overflow-hidden mb-3 group-hover:-translate-y-1.5 group-hover:shadow-xl transition-all duration-300">
                      <BookCover book={book} size="sm" />
                    </div>
                    
                    {/* Title & Action */}
                    <h4 className="text-[10px] font-bold text-center text-slate-700 line-clamp-2 mb-1.5 h-7 leading-tight group-hover:text-orange-500 transition-colors">
                      {book.judul}
                    </h4>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSelectBook(book); }}
                      className="w-[90%] py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full group-hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20"
                    >
                      Lihat Detail
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
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-4 items-center md:items-start justify-center max-w-5xl mx-auto w-full relative z-10">
            
            {/* Left Column: Book Cover & Back Button */}
            <div className="w-full md:w-[30%] flex flex-col items-center shrink-0">
               <div className="w-full aspect-[2/3] max-w-[280px] bg-slate-900 rounded-2xl border-2 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center mb-6">
                  <BookCover book={selectedBook} size="lg" />
               </div>
               <button onClick={() => setSelectedBook(null)} className="w-full max-w-[280px] py-3.5 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm tracking-widest uppercase">
                  &larr; KEMBALI
               </button>
            </div>

            {/* Right Column: Book Details & Actions */}
            <div className="w-full md:w-[70%] bg-slate-100/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-sm border border-white mt-4 md:mt-0">
               <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">{selectedBook.judul}</h3>
               {selectedBook.pengarang && (
                 <p className="text-orange-500 font-bold mb-6">{selectedBook.pengarang}</p>
               )}
               
               <div className="flex flex-wrap gap-4 mb-6">
                 {selectedBook.penerbit && (
                   <span className="text-xs bg-white px-3 py-1 rounded-full text-slate-600 border border-slate-200">
                     Penerbit: {selectedBook.penerbit}
                   </span>
                 )}
                 {selectedBook.tahun_terbit && (
                   <span className="text-xs bg-white px-3 py-1 rounded-full text-slate-600 border border-slate-200">
                     Tahun: {selectedBook.tahun_terbit}
                   </span>
                 )}
                 {selectedBook.isbn_issn && (
                   <span className="text-xs bg-white px-3 py-1 rounded-full text-slate-600 border border-slate-200">
                     ISBN: {selectedBook.isbn_issn}
                   </span>
                 )}
               </div>

               <div className="text-slate-800 leading-relaxed mb-10 text-justify sm:text-base whitespace-pre-line">
                 {selectedBook.deskripsi_abstrak ? (
                   <p>{selectedBook.deskripsi_abstrak}</p>
                 ) : (
                   <p className="italic text-slate-500">Tidak ada deskripsi tersedia untuk buku ini.</p>
                 )}
               </div>
               
               <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <button className="w-14 h-14 bg-transparent border-2 border-slate-900 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors group shrink-0">
                     {/* WhatsApp Icon */}
                     <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-900 fill-current group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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
  subjek_kategori?: string | null;
}

interface CategoryChild {
  name: string;
  count: number;
}

interface CategoryGroup {
  name: string;
  count: number;
  children: CategoryChild[];
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

// Generates pagination items: 5 numbers in window, with '...' for remaining
function getPaginationRange(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // 5 numbers window
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    start = 1;
    end = 5;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 4;
    end = totalPages;
  }

  const range: (number | string)[] = [];

  if (start > 1) {
    range.push(1);
    if (start > 2) range.push('...');
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) range.push('...');
    range.push(totalPages);
  }

  return range;
}

// =====================================================================
// GLOBAL IMAGE CACHE — Persist across re-renders, survives pagination
// Key: bookId → { url: resolved image URL | null, status: 'loaded'|'failed'|'pending' }
// =====================================================================
const imageCache = new Map<number, { url: string | null; status: 'loaded' | 'failed' | 'pending' }>();

function getBookImageUrl(book: Book, size: 'sm' | 'lg' = 'sm'): string | null {
  if (book.nama_file_cover) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:8000';
    return `${baseUrl}/images/docs/${book.nama_file_cover}`;
  }
  if (book.isbn_issn) {
    const cleanIsbn = book.isbn_issn.replace(/[^0-9X]/gi, '');
    if (cleanIsbn.length >= 9) {
      return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-${size === 'lg' ? 'L' : 'M'}.jpg`;
    }
  }
  return null;
}

/** Preload images for an array of books in the background */
function preloadBookImages(books: Book[]) {
  books.forEach((book) => {
    if (imageCache.has(book.id)) return; // Already cached
    const url = getBookImageUrl(book);
    if (!url) {
      imageCache.set(book.id, { url: null, status: 'failed' });
      return;
    }
    imageCache.set(book.id, { url, status: 'pending' });
    const img = new Image();
    img.onload = () => {
      // OpenLibrary returns 1x1 blank gif when ISBN has no cover
      if (img.naturalWidth <= 1) {
        imageCache.set(book.id, { url: null, status: 'failed' });
      } else {
        imageCache.set(book.id, { url, status: 'loaded' });
      }
    };
    img.onerror = () => {
      // Fallback: try OpenLibrary if backend cover failed
      if (book.nama_file_cover && book.isbn_issn) {
        const cleanIsbn = book.isbn_issn.replace(/[^0-9X]/gi, '');
        if (cleanIsbn.length >= 9) {
          const fallbackUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`;
          imageCache.set(book.id, { url: fallbackUrl, status: 'pending' });
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            if (fallbackImg.naturalWidth <= 1) {
              imageCache.set(book.id, { url: null, status: 'failed' });
            } else {
              imageCache.set(book.id, { url: fallbackUrl, status: 'loaded' });
            }
          };
          fallbackImg.onerror = () => imageCache.set(book.id, { url: null, status: 'failed' });
          fallbackImg.src = fallbackUrl;
          return;
        }
      }
      imageCache.set(book.id, { url: null, status: 'failed' });
    };
    img.src = url;
  });
}

// =====================================================================
// DATA CACHE — In-memory SWR-like cache for book pages
// Key: "page_1_search_cat" → { books, meta, timestamp }
// =====================================================================
interface CachedPage {
  books: Book[];
  meta: { current_page: number; last_page: number; total: number };
  timestamp: number;
}
const pageCache = new Map<string, CachedPage>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(page: number, search: string, category: string | null): string {
  return `p${page}_s${search}_c${category || 'all'}`;
}

// =====================================================================
// DETAIL CACHE — Pre-cached full book detail to eliminate detail loading
// =====================================================================
const detailCache = new Map<number, Book>();

// Hybrid Book Cover Component (Backend Upload -> OpenLibrary ISBN -> Stylized Digital Cover)
// Now uses global imageCache for instant rendering
function BookCover({ book, size = 'sm' }: { book: Book; size?: 'sm' | 'lg' }) {
  const cached = imageCache.get(book.id);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // If image is still pending, poll briefly until resolved
    if (cached?.status === 'pending') {
      const interval = setInterval(() => {
        const current = imageCache.get(book.id);
        if (current?.status !== 'pending') {
          clearInterval(interval);
          forceUpdate((n) => n + 1);
        }
      }, 100);
      return () => clearInterval(interval);
    }
    // If no cache entry yet, create one
    if (!cached) {
      preloadBookImages([book]);
      const interval = setInterval(() => {
        const current = imageCache.get(book.id);
        if (current?.status !== 'pending') {
          clearInterval(interval);
          forceUpdate((n) => n + 1);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [book.id, cached?.status]);

  const style = getCoverStyle(book.id, book.judul);

  // If image loaded successfully, show it instantly (already in browser cache)
  if (cached?.status === 'loaded' && cached.url) {
    return (
      <div className="relative w-full h-full">
        <img
          src={cached.url}
          alt={book.judul}
          className="w-full h-full object-cover absolute inset-0"
          loading="eager"
        />
        <div className="absolute left-0 inset-y-0 w-2.5 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Fallback: Dynamic Stylized Digital Book Cover (instant, no loading)
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
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

  const [searchQuery, setSearchQuery] = useState('');
  // appliedSearch = search term yang benar-benar aktif (hanya berubah saat Enter)
  const [appliedSearch, setAppliedSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  // CHANGE: Start with false — show content skeleton instead of spinner on first load
  const [loading, setLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // Category states (hierarchical)
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Which parent group name is expanded in the dropdown
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch hierarchical category groups from backend API
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/buku/kategori`);
      if (res.ok) {
        const json = await res.json();
        setCategoryGroups(json.data || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, [API_URL]);

  // Fetch books with IN-MEMORY CACHE — no loading spinner if data is cached
  const fetchBooks = useCallback(async (query: string = '', page: number = 1, category: string | null = null) => {
    const cacheKey = getCacheKey(page, query, category);

    // CHECK CACHE FIRST — if valid, render instantly (zero loading)
    const cached = pageCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setBooks(cached.books);
      setCurrentPage(cached.meta.current_page);
      setTotalPages(cached.meta.last_page);
      setTotalItems(cached.meta.total);
      setInitialLoaded(true);
      // Preload images from cache instantly
      preloadBookImages(cached.books);
      return;
    }

    // Only show loading if we have NO cached data to show
    if (!cached) setLoading(true);

    try {
      let url = `${API_URL}/buku?page=${page}`;
      if (query.trim()) {
        url += `&search=${encodeURIComponent(query.trim())}`;
      }
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      const response = await fetch(url);
      const json = await response.json();
      const newBooks = json.data || [];
      const meta = {
        current_page: json.meta?.current_page || page,
        last_page: json.meta?.last_page || 1,
        total: json.meta?.total || 0,
      };

      // STORE IN CACHE
      pageCache.set(cacheKey, { books: newBooks, meta, timestamp: Date.now() });

      // PRELOAD ALL IMAGES BEFORE rendering (hidden, in background)
      preloadBookImages(newBooks);

      setBooks(newBooks);
      setCurrentPage(meta.current_page);
      setTotalPages(meta.last_page);
      setTotalItems(meta.total);
      setInitialLoaded(true);

      // PREFETCH next page in background for instant pagination
      if (meta.current_page < meta.last_page) {
        const nextCacheKey = getCacheKey(page + 1, query, category);
        if (!pageCache.has(nextCacheKey)) {
          fetch(`${API_URL}/buku?page=${page + 1}${query.trim() ? `&search=${encodeURIComponent(query.trim())}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}`)
            .then(r => r.json())
            .then(nextJson => {
              const nextBooks = nextJson.data || [];
              pageCache.set(nextCacheKey, {
                books: nextBooks,
                meta: { current_page: nextJson.meta?.current_page || page + 1, last_page: nextJson.meta?.last_page || 1, total: nextJson.meta?.total || 0 },
                timestamp: Date.now(),
              });
              preloadBookImages(nextBooks);
            })
            .catch(() => {}); // Silent fail for prefetch
        }
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // OPTIMISTIC DETAIL VIEW: Show book immediately with grid data,
  // then silently upgrade with full detail data in background
  const handleSelectBook = useCallback(async (book: Book) => {
    // Check detail cache first — if we prefetched, it's instant!
    const cachedDetail = detailCache.get(book.id);
    if (cachedDetail) {
      setSelectedBook(cachedDetail);
      setDetailLoading(false);
      return;
    }

    // INSTANT: Show immediately with data we already have
    setSelectedBook(book);
    setDetailLoading(true); // Mark that we're loading detail

    // Also preload the large cover version immediately
    if (book.nama_file_cover || book.isbn_issn) {
      const lgUrl = getBookImageUrl(book, 'lg');
      if (lgUrl && !imageCache.has(-book.id)) {
        const lgImg = new Image();
        lgImg.src = lgUrl;
      }
    }
    // BACKGROUND: Fetch full detail (deskripsi_abstrak, etc.)
    try {
      const response = await fetch(`${API_URL}/buku/${book.id}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          detailCache.set(book.id, json.data);
          setSelectedBook(json.data);
        }
      }
    } catch (error) {
      // Silent fail — we already have the grid data displayed
    } finally {
      setDetailLoading(false);
    }
  }, [API_URL]);

  // PREFETCH detail on hover — by the time user clicks, data is already cached
  const handleHoverBook = useCallback((book: Book) => {
    if (detailCache.has(book.id)) return; // Already cached
    fetch(`${API_URL}/buku/${book.id}`)
      .then(r => r.json())
      .then(json => {
        if (json.success && json.data) {
          detailCache.set(book.id, json.data);
        }
      })
      .catch(() => {}); // Silent
  }, [API_URL]);

  // Handle page change with smooth scroll to PresmaLib top
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    fetchBooks(appliedSearch, newPage, selectedCategory);
    const element = document.getElementById('presmalib');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle category selection
  const handleSelectCategory = (catName: string | null) => {
    setSelectedCategory(catName);
    setIsCategoryOpen(false);
    setExpandedGroup(null);
    setCategorySearch('');
    setCurrentPage(1);
    setSelectedBook(null);
    fetchBooks(appliedSearch, 1, catName);
    const element = document.getElementById('presmalib');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle "Eksplorasi" button: Reset all filters & back to initial catalog state
  const handleResetExploration = useCallback(() => {
    setSearchQuery('');
    setAppliedSearch('');
    setSelectedCategory(null);
    setSelectedBook(null);
    setCurrentPage(1);
    setIsCategoryOpen(false);
    fetchBooks('', 1, null);
    const element = document.getElementById('presmalib');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [fetchBooks]);

  // Handle search: ONLY trigger on Enter key press
  const handleSearchSubmit = useCallback(() => {
    const trimmed = searchQuery.trim();
    if (trimmed === appliedSearch) return; // No change, skip
    setAppliedSearch(trimmed);
    setCurrentPage(1);
    setSelectedBook(null);
    setLoading(true);
    fetchBooks(trimmed, 1, selectedCategory);
    const element = document.getElementById('presmalib');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchQuery, appliedSearch, selectedCategory, fetchBooks]);

  // Handle clearing search from filter chip
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setAppliedSearch('');
    setCurrentPage(1);
    fetchBooks('', 1, selectedCategory);
  }, [selectedCategory, fetchBooks]);

  // Initial fetch on mount (no debounce, no search effect)
  useEffect(() => {
    fetchBooks('', 1, null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================================
  // 🚀 ADVANCED ALGORITHM: PREDICTIVE SEARCH PREFETCHING
  // =====================================================================
  // Research-backed optimization: Menghilangkan persepsi loading pada pencarian
  // dengan melakukan fetching diam-diam (silent prefetch) di background saat user 
  // masih mengetik. Saat user akhirnya menekan "Enter", data 99% sudah ada 
  // di dalam memory cache dan akan dirender dalam 0 milidetik.
  useEffect(() => {
    // Jangan prefetch jika input kosong atau belum ditekan enter tapi sama dengan yang aktif
    const trimmed = searchQuery.trim();
    if (!trimmed || trimmed === appliedSearch) return;

    const delayDebounceFn = setTimeout(() => {
      const cacheKey = getCacheKey(1, trimmed, selectedCategory);
      // Hanya fetch jika belum ada di cache
      if (!pageCache.has(cacheKey)) {
        fetch(`${API_URL}/buku?page=1&search=${encodeURIComponent(trimmed)}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`)
          .then(r => r.json())
          .then(json => {
            const nextBooks = json.data || [];
            pageCache.set(cacheKey, {
              books: nextBooks,
              meta: { current_page: json.meta?.current_page || 1, last_page: json.meta?.last_page || 1, total: json.meta?.total || 0 },
              timestamp: Date.now(),
            });
            // Eagerly preload cover images too!
            preloadBookImages(nextBooks);
          })
          .catch(() => {}); // Silent fail, if it fails, it will retry normally on Enter
      }
    }, 400); // 400ms typing debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, appliedSearch, selectedCategory, API_URL]);

  // When searching, flatten all children and filter by query
  const searchLower = categorySearch.toLowerCase();
  const filteredGroups: CategoryGroup[] = categorySearch.trim()
    ? categoryGroups
        .map((g) => ({
          ...g,
          children: g.children.filter((c) =>
            c.name.toLowerCase().includes(searchLower) ||
            g.name.toLowerCase().includes(searchLower)
          ),
        }))
        .filter((g) => g.children.length > 0)
    : categoryGroups;

  // The parent group that the currently selected category belongs to
  const selectedGroupName = selectedCategory
    ? categoryGroups.find((g) => g.children.some((c) => c.name === selectedCategory))?.name ?? null
    : null;

  return (
    <section id="presmalib" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20 bg-white scroll-mt-24">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <img src="/images/logo.png" alt="Watermark" className="w-[600px] h-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/images/logo-smk.png'; }} />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white shrink-0 shadow-md">
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

          {/* Navigation: Eksplorasi & Kategori Dropdown */}
          <div className="flex items-center gap-3 sm:gap-4 font-bold text-sm">
            {/* Tombol Eksplorasi: Kembali ke Awal */}
            <button
              onClick={handleResetExploration}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                !selectedCategory && !searchQuery
                  ? 'bg-orange-500 text-white shadow-orange-500/30'
                  : 'bg-white text-slate-700 hover:text-orange-600 hover:bg-orange-50 border border-slate-200'
              }`}
              title="Kembali ke katalog awal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Eksplorasi</span>
            </button>

            {/* Tombol & Dropdown Kategori */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                  selectedCategory || isCategoryOpen
                    ? 'bg-orange-500 text-white shadow-orange-500/30 ring-2 ring-orange-500/30'
                    : 'bg-white text-slate-700 hover:text-orange-600 hover:bg-orange-50 border border-slate-200'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="max-w-[130px] truncate">
                  {selectedCategory ? `${selectedCategory}` : 'Kategori'}
                </span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu Categories — Hierarchical */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 sm:right-auto mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-800">Pilih Kategori Buku</span>
                    <span className="text-[10px] text-orange-500 font-bold">{categoryGroups.length} Grup</span>
                  </div>

                  {/* Search inside categories */}
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Cari kategori..."
                      value={categorySearch}
                      onChange={(e) => { setCategorySearch(e.target.value); setExpandedGroup(null); }}
                      className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-orange-500 transition-colors"
                      autoFocus
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* List of hierarchical categories */}
                  <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                    {/* Option: Semua Kategori */}
                    <button
                      onClick={() => handleSelectCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        selectedCategory === null
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Semua Kategori</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === null ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        Semua
                      </span>
                    </button>

                    {/* Group separator */}
                    <div className="pt-1 pb-0.5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Berdasarkan Grup</span>
                    </div>

                    {filteredGroups.length > 0 ? (
                      filteredGroups.map((group) => {
                        const isGroupOpen = expandedGroup === group.name || !!categorySearch.trim() || selectedGroupName === group.name;
                        const isGroupActive = selectedGroupName === group.name;

                        return (
                          <div key={group.name}>
                            {/* Parent Group Button */}
                            <button
                              onClick={() => setExpandedGroup(isGroupOpen && !categorySearch.trim() ? null : group.name)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                                isGroupActive
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'text-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                {/* Expand chevron */}
                                <svg
                                  className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                                    isGroupOpen ? 'rotate-90 text-orange-500' : 'text-slate-400'
                                  }`}
                                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="truncate">{group.name}</span>
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${
                                isGroupActive ? 'bg-orange-200 text-orange-700' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {group.count}
                              </span>
                            </button>

                            {/* Children Sub-categories */}
                            {isGroupOpen && (
                              <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-orange-100 pl-2">
                                {group.children.map((child) => {
                                  const isSelected = selectedCategory === child.name;
                                  return (
                                    <button
                                      key={child.name}
                                      onClick={() => handleSelectCategory(child.name)}
                                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-between transition-colors ${
                                        isSelected
                                          ? 'bg-orange-500 text-white shadow-sm'
                                          : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                                      }`}
                                    >
                                      <span className="truncate pr-2">{child.name}</span>
                                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                                        isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-400'
                                      }`}>
                                        {child.count}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-4 text-xs text-slate-400">
                        Kategori &quot;{categorySearch}&quot; tidak ditemukan.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar — triggers on Enter only */}
          <div className="relative w-full md:w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari judul atau pengarang... (Enter)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
              className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg leading-5 bg-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
            />
            {/* Search submit button inside input */}
            {searchQuery.trim() && searchQuery.trim() !== appliedSearch && (
              <button
                onClick={handleSearchSubmit}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                title="Tekan Enter untuk mencari"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            )}
          </div>

        </div>

        {/* Active Filter Chips Bar */}
        {(selectedCategory || appliedSearch) && (
          <div className="flex items-center gap-2 flex-wrap -mt-4 pb-2">
            <span className="text-xs text-slate-400 font-semibold">Filter:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">
                Kategori: {selectedCategory}
                <button
                  onClick={() => handleSelectCategory(null)}
                  className="w-4 h-4 rounded-full bg-orange-200 hover:bg-orange-300 text-orange-800 flex items-center justify-center text-xs transition-colors"
                  title="Hapus filter kategori"
                >
                  ✕
                </button>
              </span>
            )}
            {appliedSearch && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                Pencarian: &quot;{appliedSearch}&quot;
                <button
                  onClick={handleClearSearch}
                  className="w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-xs transition-colors"
                  title="Hapus kata kunci"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              onClick={handleResetExploration}
              className="text-xs text-orange-500 font-bold hover:underline hover:text-orange-600 transition-colors ml-1"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* Conditional Render: Books Grid OR Detail View */}
        {!selectedBook ? (
          <div>
            {loading ? (
              /* SKELETON GRID for search/filter/pagination loading */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4 gap-y-8">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center animate-pulse">
                    <div className="w-full aspect-[2/3] bg-slate-200 rounded-lg mb-3" />
                    <div className="w-3/4 h-2.5 bg-slate-200 rounded mb-1.5" />
                    <div className="w-[90%] h-6 bg-slate-200 rounded-full" />
                  </div>
                ))}
              </div>
            ) : books.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4 gap-y-8">
                  {books.map((book) => (
                    <div key={book.id} onMouseEnter={() => handleHoverBook(book)} onClick={() => handleSelectBook(book)} className="flex flex-col items-center group cursor-pointer">
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-100">
                    {/* Information Text */}
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Halaman <strong className="text-slate-800">{currentPage}</strong> dari <strong className="text-slate-800">{totalPages}</strong> ({totalItems} buku tersedia)
                    </p>

                    {/* Buttons Group */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      {/* Previous Page Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
                        aria-label="Halaman sebelumnya"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Sebelumnya</span>
                      </button>

                      {/* Numbered Buttons & Ellipsis */}
                      <div className="flex items-center gap-1">
                        {getPaginationRange(currentPage, totalPages).map((item, idx) => {
                          if (item === '...') {
                            return (
                              <span
                                key={`dots-${idx}`}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-slate-400 font-black tracking-widest text-xs select-none"
                              >
                                ...
                              </span>
                            );
                          }

                          const pageNum = Number(item);
                          const isActive = pageNum === currentPage;

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                                isActive
                                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 shadow-sm'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Page Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
                        aria-label="Halaman selanjutnya"
                      >
                        <span className="hidden sm:inline">Selanjutnya</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-100/50 dark:from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="w-24 h-24 mb-6 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center relative z-10 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 relative z-10 tracking-tight">Oops! Buku Belum Tersedia</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 max-w-md relative z-10 leading-relaxed">
                  {selectedCategory 
                    ? <>Waduh, sepertinya belum ada buku untuk kategori <strong className="text-slate-700 dark:text-slate-200">{selectedCategory}</strong>. Coba kategori atau kata kunci pencarian yang lain yuk!</>
                    : <>Waduh, kami tidak menemukan buku dengan kata kunci tersebut. Coba kata kunci lain atau pilih kategori lain yuk!</>
                  }
                </p>
                
                <button
                  onClick={handleResetExploration}
                  className="relative z-10 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/30"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Kembali ke Eksplorasi
                </button>
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
                 {detailLoading ? (
                   /* SKELETON for description — smooth pulse animation */
                   <div className="animate-pulse space-y-3">
                     <div className="h-4 bg-slate-200 rounded-full w-full" />
                     <div className="h-4 bg-slate-200 rounded-full w-full" />
                     <div className="h-4 bg-slate-200 rounded-full w-[95%]" />
                     <div className="h-4 bg-slate-200 rounded-full w-full" />
                     <div className="h-4 bg-slate-200 rounded-full w-[88%]" />
                     <div className="h-4 bg-slate-200 rounded-full w-[70%]" />
                   </div>
                 ) : selectedBook.deskripsi_abstrak ? (
                   <p>{selectedBook.deskripsi_abstrak}</p>
                 ) : (
                   <p className="italic text-slate-500">Tidak ada deskripsi tersedia untuk buku ini.</p>
                 )}
               </div>
               
               <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  {(() => {
                    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    const message = `Halo Admin Presma Lib, saya ingin meminjam buku berikut:\n\n*Judul Buku:* ${selectedBook.judul}\n*Penulis / Pengarang:* ${selectedBook.pengarang || '-'}\n*Tanggal Pinjam:* ${today}\n\nMohon informasi ketersediaan buku ini. Terima kasih!`;
                    const waLink = `https://wa.me/6285157861182?text=${encodeURIComponent(message)}`;
                    
                    return (
                      <>
                        <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-transparent border-2 border-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white text-emerald-600 transition-colors group shrink-0" title="Hubungi Admin via WhatsApp">
                           {/* WhatsApp Icon */}
                           <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current transition-colors" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                           </svg>
                        </a>
                        <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg tracking-wider text-sm uppercase text-center inline-block">
                           PINJAM BUKU INI
                        </a>
                      </>
                    );
                  })()}
               </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

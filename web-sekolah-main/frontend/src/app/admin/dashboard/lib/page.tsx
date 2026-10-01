'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/types/admin';
import { adminCache } from '@/lib/adminCache';

export default function AdminLibPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTotal, setBookTotal] = useState(0);
  const [bookPage, setBookPage] = useState(1);
  const [bookLastPage, setBookLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Form State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Book Form
  const [bJudul, setBJudul] = useState('');
  const [bPengarang, setBPengarang] = useState('');
  const [bPenerbit, setBPenerbit] = useState('');
  const [bTahun, setBTahun] = useState('');
  const [bKategori, setBKategori] = useState('');
  const [bIsbn, setBIsbn] = useState('');

  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return null;
    }
    return token;
  };

  const fetchBooks = async (page: number) => {
    const token = checkAuth();
    if (!token) return;

    const cacheKey = `books_page_${page}`;
    const cached = adminCache.get<any>(cacheKey);
    if (cached) {
      setBooks(cached.data);
      if (cached.meta) {
        setBookTotal(cached.meta.total);
        setBookLastPage(cached.meta.last_page);
        setBookPage(cached.meta.current_page);
      }
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/buku?page=${page}&_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
        if (data.meta) {
          setBookTotal(data.meta.total);
          setBookLastPage(data.meta.last_page);
          setBookPage(data.meta.current_page);
        }
        adminCache.set(cacheKey, { data: data.data, meta: data.meta });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_token')) {
      fetchBooks(1);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const openBookModal = (book: Book | null = null) => {
    setEditingBook(book);
    if (book) {
      setBJudul(book.judul);
      setBPengarang(book.pengarang || '');
      setBPenerbit(book.penerbit || '');
      setBTahun(book.tahun_terbit || '');
      setBKategori(book.kategori_1 || '');
      setBIsbn(book.isbn_issn || '');
    } else {
      setBJudul('');
      setBPengarang('');
      setBPenerbit('');
      setBTahun('');
      setBKategori('');
      setBIsbn('');
    }
    setIsBookModalOpen(true);
  };

  const closeBookModal = () => setIsBookModalOpen(false);

  const saveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = checkAuth();
    if (!token) return;

    const payload = {
      judul: bJudul,
      pengarang: bPengarang,
      penerbit: bPenerbit,
      tahun_terbit: bTahun,
      kategori_1: bKategori,
      isbn_issn: bIsbn,
    };

    try {
      const url = editingBook 
        ? `http://127.0.0.1:8000/api/v1/buku/${editingBook.id}` 
        : `http://127.0.0.1:8000/api/v1/buku`;
      const method = editingBook ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeBookModal();
        adminCache.flush('books_page_');
        adminCache.flush('overview');
        fetchBooks(bookPage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id: number) => {
    if (!confirm('Hapus buku ini?')) return;
    const token = checkAuth();
    if (!token) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/buku/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        adminCache.flush('books_page_');
        adminCache.flush('overview');
        fetchBooks(bookPage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-fadeIn relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Manajemen Presma Lib</h1>
          <p className="text-slate-500">Kelola katalog buku perpustakaan.</p>
        </div>
        <button 
          onClick={() => openBookModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
        >
          + Tambah Buku
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Judul Buku</th>
                <th className="p-4">Pengarang</th>
                <th className="p-4">Kategori</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400 text-sm">Memuat data...</td></tr>
              ) : books.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-400 text-sm">Belum ada buku.</td></tr>
              ) : books.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="p-4 text-slate-400 text-sm">#{b.id}</td>
                  <td className="p-4 font-bold text-slate-800">{b.judul}</td>
                  <td className="p-4 text-sm text-slate-600">{b.pengarang || '-'}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{b.kategori_1 || 'Umum'}</span></td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <button onClick={() => openBookModal(b)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition">Edit</button>
                    <button onClick={() => deleteBook(b.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        {bookTotal > 20 && (
          <div className="p-4 border-t border-slate-200/60 flex items-center justify-between bg-slate-50/50">
            <span className="text-sm font-bold text-slate-500">
              Halaman {bookPage} dari {bookLastPage} (Total: {bookTotal} buku)
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => fetchBooks(bookPage - 1)}
                disabled={bookPage <= 1}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
              >
                &larr; Prev
              </button>
              <button 
                onClick={() => fetchBooks(bookPage + 1)}
                disabled={bookPage >= bookLastPage}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-6">{editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
            <form onSubmit={saveBook} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Buku</label>
                <input type="text" required value={bJudul} onChange={e => setBJudul(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Pengarang</label>
                  <input type="text" value={bPengarang} onChange={e => setBPengarang(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Penerbit</label>
                  <input type="text" value={bPenerbit} onChange={e => setBPenerbit(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
                  <input type="text" value={bKategori} onChange={e => setBKategori(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tahun</label>
                  <input type="text" value={bTahun} onChange={e => setBTahun(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">ISBN/ISSN</label>
                <input type="text" value={bIsbn} onChange={e => setBIsbn(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={closeBookModal} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Batal</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-500/30 transition">{editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: number;
  judul: string;
  deskripsi: string;
  tipe: 'PPLG' | 'TJKT' | 'DKV' | 'BCF' | 'Karir';
  link: string;
  biaya: 'Gratis' | 'Biaya tertera';
}

interface Book {
  id: number;
  judul: string;
  pengarang: string;
  penerbit: string;
  tahun_terbit: string;
  kategori_1: string;
  isbn_issn: string;
}

interface PpdbRegistration {
  id: number;
  registration_number: string;
  full_name: string;
  nisn: string;
  gender: string;
  gender: string;
  birth_place: string;
  birth_date: string;
  religion: string;
  previous_school: string;
  major: string;
  path: string;
  parent_name: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  created_at: string;
}

interface Contact {
  id: number;
  name: string;
  email_or_phone: string;
  category: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'career' | 'lib' | 'ppdb' | 'contact'>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['overview', 'career', 'lib', 'ppdb', 'contact'].includes(tab)) {
        setActiveTab(tab as any);
      }
    }
  }, []);

  const changeTab = (newTab: 'overview' | 'career' | 'lib' | 'ppdb' | 'contact') => {
    setActiveTab(newTab);
    router.replace(`?tab=${newTab}`, { scroll: false });
  };
  const [courses, setCourses] = useState<Course[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [ppdbList, setPpdbList] = useState<PpdbRegistration[]>([]);
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [bookTotal, setBookTotal] = useState(0);
  const [bookPage, setBookPage] = useState(1);
  const [bookLastPage, setBookLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Form State
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'book' | 'course' | 'contact', id: number, name: string } | null>(null);
  const [selectedPpdb, setSelectedPpdb] = useState<PpdbRegistration | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Course Form
  const [cJudul, setCJudul] = useState('');
  const [cDeskripsi, setCDeskripsi] = useState('');
  const [cTipe, setCTipe] = useState<'PPLG' | 'TJKT' | 'DKV' | 'BCF' | 'Karir'>('PPLG');
  const [cBiaya, setCBiaya] = useState<'Gratis' | 'Biaya tertera'>('Gratis');
  const [cLink, setCLink] = useState('');

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

  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/kelas-pelatihan?per_page=1000&_t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setCourses(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchBooks = async (page: number = 1) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/buku?admin=1&per_page=20&page=${page}&_t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
        setBookTotal(data.meta.total);
        setBookPage(data.meta.current_page);
        setBookLastPage(data.meta.last_page);
      }
    } catch (err) { console.error(err); }
  };

  const fetchPpdb = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/ppdb?_t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setPpdbList(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchContacts = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/contact?_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data.success) setContactList(data.data);
    } catch (err) { console.error(err); }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    await Promise.all([fetchCourses(), fetchBooks(1), fetchPpdb(), fetchContacts()]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (checkAuth()) {
      fetchAllData();
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        await fetch('http://127.0.0.1:8000/api/v1/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (e) {}
    }
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // --- COURSE ACTIONS ---
  const openCourseModal = (course: Course | null = null) => {
    if (course) {
      setEditingCourse(course);
      setCJudul(course.judul);
      setCDeskripsi(course.deskripsi);
      setCTipe(course.tipe);
      setCBiaya(course.biaya || 'Gratis');
      setCLink(course.link);
    } else {
      setEditingCourse(null);
      setCJudul('');
      setCDeskripsi('');
      setCTipe('PPLG');
      setCBiaya('Gratis');
      setCLink('');
    }
    setIsCourseModalOpen(true);
  };

  const saveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = checkAuth();
    if (!token) return;

    const method = editingCourse ? 'PUT' : 'POST';
    const url = editingCourse 
      ? `http://127.0.0.1:8000/api/v1/kelas-pelatihan/${editingCourse.id}`
      : 'http://127.0.0.1:8000/api/v1/kelas-pelatihan';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ judul: cJudul, deskripsi: cDeskripsi, tipe: cTipe, link: cLink, biaya: cBiaya }),
      });
      if (res.ok) {
        setIsCourseModalOpen(false);
        fetchAllData();
      } else {
        const errData = await res.json();
        alert('Gagal menyimpan kelas: ' + (errData.message || JSON.stringify(errData.errors)));
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    }
  };

  const requestDeleteBook = (book: Book) => {
    setDeleteConfirm({ type: 'book', id: book.id, name: book.judul });
  };

  const requestDeleteCourse = (course: Course) => {
    setDeleteConfirm({ type: 'course', id: course.id, name: course.judul });
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    const token = checkAuth();
    if (!token) return;

    const currentConfirm = deleteConfirm;
    setDeleteConfirm(null); // Tutup modal seketika agar tidak ada jeda UI

    try {
      let endpoint = '';
      if (currentConfirm.type === 'book') endpoint = `http://127.0.0.1:8000/api/v1/buku/${currentConfirm.id}`;
      else if (currentConfirm.type === 'course') endpoint = `http://127.0.0.1:8000/api/v1/kelas-pelatihan/${currentConfirm.id}`;
      else if (currentConfirm.type === 'contact') endpoint = `http://127.0.0.1:8000/api/v1/contact/${currentConfirm.id}`;
        
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        if (currentConfirm.type === 'book') fetchBooks(bookPage);
        else if (currentConfirm.type === 'course') fetchCourses();
        else if (currentConfirm.type === 'contact') fetchContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async (id: number) => {
    // Deprecated
  };

  // --- BOOK ACTIONS ---
  const openBookModal = (book: Book | null = null) => {
    if (book) {
      setEditingBook(book);
      setBJudul(book.judul);
      setBPengarang(book.pengarang || '');
      setBPenerbit(book.penerbit || '');
      setBTahun(book.tahun_terbit || '');
      setBKategori(book.kategori_1 || '');
      setBIsbn(book.isbn_issn || '');
    } else {
      setEditingBook(null);
      setBJudul('');
      setBPengarang('');
      setBPenerbit('');
      setBTahun('');
      setBKategori('');
      setBIsbn('');
    }
    setIsBookModalOpen(true);
  };

  const saveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = checkAuth();
    if (!token) return;

    const method = editingBook ? 'PUT' : 'POST';
    const url = editingBook 
      ? `http://127.0.0.1:8000/api/v1/buku/${editingBook.id}`
      : 'http://127.0.0.1:8000/api/v1/buku';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          judul: bJudul, 
          pengarang: bPengarang, 
          penerbit: bPenerbit, 
          tahun_terbit: bTahun, 
          kategori_1: bKategori,
          isbn_issn: bIsbn 
        }),
      });
      if (res.ok) {
        setIsBookModalOpen(false);
        fetchBooks(bookPage);
      }
    } catch (err) {}
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
      if (res.ok) fetchBooks(bookPage);
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-slate-900 text-slate-300 shadow-[10px_0_30px_rgba(0,0,0,0.15)] z-40 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-full md:w-64'}`}>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-5 top-10 bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] border-4 border-slate-50 hidden md:flex items-center justify-center z-30 transition-all hover:scale-110"
          style={{ transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          title={isSidebarCollapsed ? "Perlebar Sidebar" : "Perkecil Sidebar"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        <div className={`p-6 border-b border-slate-800/50 mb-4 flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/10 flex items-center justify-center shadow-lg border border-white/5 p-1.5">
              <img src="/images/logo-smk.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden">
                <h2 className="text-xl font-black text-white tracking-tight whitespace-nowrap">Admin Portal</h2>
                <p className="text-[10px] text-orange-400 uppercase tracking-widest font-bold whitespace-nowrap">SMK Prestasi Prima</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="mt-4 px-4 space-y-2">
          <button 
            onClick={() => changeTab('overview')}
            title="Overview"
            className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${activeTab === 'overview' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Overview</span>}
          </button>
          
          <button 
            onClick={() => changeTab('lib')}
            title="Presma Lib"
            className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${activeTab === 'lib' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Presma Lib (Buku)</span>}
          </button>

          <button 
            onClick={() => changeTab('career')}
            title="Presma Career"
            className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${activeTab === 'career' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Presma Career (Kelas)</span>}
          </button>

          <button 
            onClick={() => changeTab('ppdb')}
            title="Manajemen PPDB"
            className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${activeTab === 'ppdb' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Manajemen PPDB</span>}
          </button>

          <button 
            onClick={() => changeTab('contact')}
            title="Pesan & Kontak"
            className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${activeTab === 'contact' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Pesan & Kontak</span>}
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            title="Logout"
            className={`w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors font-bold text-sm flex items-center justify-center ${isSidebarCollapsed ? 'px-0' : 'px-4 gap-2'}`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-h-screen overflow-x-hidden p-6 md:p-10 relative transition-all duration-300 md:ml-20">
        {/* Background Gradients (Glassmorphism Effect) */}
        <div className="fixed top-[-20%] right-[-10%] w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>

        {activeTab === 'overview' && (
          <div className="animate-fadeIn relative z-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">Dashboard Overview</h1>
            <p className="text-slate-500 mb-8">Selamat datang kembali! Berikut ringkasan data sistem SMK Prestasi Prima hari ini.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Buku Perpustakaan</h3>
                <p className="text-4xl font-black text-slate-800">{isLoading ? '...' : bookTotal}</p>
                <button onClick={() => changeTab('lib')} className="mt-4 text-sm font-bold text-emerald-600 hover:text-emerald-700">Kelola Buku &rarr;</button>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Kelas & Pelatihan Aktif</h3>
                <p className="text-4xl font-black text-slate-800">{isLoading ? '...' : courses.length}</p>
                <button onClick={() => changeTab('career')} className="mt-4 text-sm font-bold text-orange-600 hover:text-orange-700">Kelola Pelatihan &rarr;</button>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pendaftar PPDB</h3>
                <p className="text-4xl font-black text-slate-800">{isLoading ? '...' : ppdbList.length}</p>
                <button onClick={() => changeTab('ppdb')} className="mt-4 text-sm font-bold text-amber-600 hover:text-amber-700">Manajemen PPDB &rarr;</button>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pesan Masuk</h3>
                <p className="text-4xl font-black text-slate-800">{isLoading ? '...' : contactList.length}</p>
                <button onClick={() => changeTab('contact')} className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700">Lihat Pesan &rarr;</button>
              </div>
            </div>
          </div>
        )}

        {/* PRESMA LIB TAB */}
        {activeTab === 'lib' && (
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
                    {books.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50/50">
                        <td className="p-4 text-slate-400 text-sm">#{b.id}</td>
                        <td className="p-4 font-bold text-slate-800">{b.judul}</td>
                        <td className="p-4 text-sm text-slate-600">{b.pengarang || '-'}</td>
                        <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{b.kategori_1 || 'Umum'}</span></td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => openBookModal(b)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition">Edit</button>
                          <button onClick={() => requestDeleteBook(b)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition">Hapus</button>
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
          </div>
        )}

        {/* PPDB TAB */}
        {activeTab === 'ppdb' && (
          <div className="animate-fadeIn relative z-10">
            {!selectedPpdb ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-slate-800">Manajemen PPDB</h1>
                    <p className="text-slate-500">Lihat data calon siswa baru yang telah mendaftar.</p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200/60">
                          <th className="p-4 font-bold">Nama Lengkap Pendaftar</th>
                          <th className="p-4 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {ppdbList.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedPpdb(p)}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black text-lg">
                                  {p.full_name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-bold text-slate-800">{p.full_name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSelectedPpdb(p); }}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                              >
                                Lihat Detail &rarr;
                              </button>
                            </td>
                          </tr>
                        ))}
                        {ppdbList.length === 0 && !isLoading && (
                          <tr>
                            <td colSpan={2} className="p-8 text-center text-slate-400 text-sm">Belum ada pendaftar PPDB.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 p-8 sm:p-10 relative">
                <button 
                  onClick={() => setSelectedPpdb(null)}
                  className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Kembali ke Daftar
                </button>

                <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-orange-500/30">
                    {selectedPpdb.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{selectedPpdb.full_name}</h2>
                    <p className="text-sm font-bold text-amber-500 mt-1">No. Registrasi: {selectedPpdb.registration_number}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                  {/* Row 1 */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nama Lengkap *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.full_name}</div>
                  </div>
                  <div></div> {/* Empty for alignment if needed, or NISN goes here. Based on image, Full Name takes full width, so let's adjust layout to match image. */}
                  
                  {/* Wait, the image shows Nama Lengkap takes full width */}
                  <div className="sm:col-span-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nama Lengkap *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.full_name}</div>
                  </div>

                  {/* Row 2 */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">NISN</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.nisn || '-'}</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jenis Kelamin *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                  </div>

                  {/* Row 3 */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tempat Lahir *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.birth_place}</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tanggal Lahir *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{new Date(selectedPpdb.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>

                  {/* Row 4 */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Agama *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.religion}</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Asal Sekolah *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.previous_school}</div>
                  </div>

                  {/* Row 5 */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jurusan Pilihan *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.major}</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jalur Pendaftaran *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.path}</div>
                  </div>

                  {/* Row 6 */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nama Orang Tua / Wali *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.parent_name}</div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">No. HP Aktif *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.phone}</div>
                  </div>

                  {/* Row 7 */}
                  <div className="sm:col-span-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.email || '-'}</div>
                  </div>

                  {/* Row 8 */}
                  <div className="sm:col-span-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Alamat Lengkap *</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium min-h-[100px]">{selectedPpdb.address}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PRESMA CAREER TAB */}
        {activeTab === 'career' && (
          <div className="animate-fadeIn relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-black text-slate-800">Manajemen Presma Career</h1>
                <p className="text-slate-500">Kelola modul kelas dan pelatihan siswa.</p>
              </div>
              <button 
                onClick={() => openCourseModal()}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
              >
                + Tambah Kelas
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                    <tr>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Judul Kelas</th>
                      <th className="p-4">Biaya</th>
                      <th className="p-4">Deskripsi Singkat</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {courses.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="p-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-[10px] font-black">{c.tipe}</span></td>
                        <td className="p-4 font-bold text-slate-800">{c.judul}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${c.biaya === 'Gratis' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                            {c.biaya}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-slate-500 truncate max-w-[200px]">{c.deskripsi}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => openCourseModal(c)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition">Edit</button>
                          <button onClick={() => requestDeleteCourse(c)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="animate-fadeIn relative z-10">
            {!selectedContact ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-slate-800">Pesan & Kontak</h1>
                    <p className="text-slate-500">Lihat semua pesan dan pertanyaan dari pengunjung website.</p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200/60">
                          <th className="p-4 font-bold">Nama Pengirim</th>
                          <th className="p-4 font-bold">Kategori</th>
                          <th className="p-4 font-bold">Waktu</th>
                          <th className="p-4 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {contactList.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedContact(c)}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg">
                                  {c.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <span className="text-sm font-bold text-slate-800 block">{c.name}</span>
                                  <span className="text-xs text-slate-500">{c.email_or_phone}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{c.category}</span>
                            </td>
                            <td className="p-4 text-sm text-slate-500">
                              {new Date(c.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSelectedContact(c); }}
                                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold transition"
                              >
                                Buka
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ type: 'contact', id: c.id, name: c.name }); }}
                                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition"
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                        {contactList.length === 0 && !isLoading && (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-400 text-sm">Belum ada pesan masuk.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 p-8 sm:p-10 relative">
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Kembali ke Daftar Pesan
                </button>

                <div className="flex items-center gap-5 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-blue-500/30">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedContact.name}</h2>
                    <p className="text-sm font-bold text-blue-500 mt-1">{selectedContact.email_or_phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm mb-8">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kategori Pesan</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                      {selectedContact.category}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Waktu Pengiriman</p>
                    <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                      {new Date(selectedContact.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Isi Pesan</p>
                    <div className="w-full px-5 py-4 rounded-xl bg-blue-50/50 border border-blue-100 text-slate-800 font-medium min-h-[150px] whitespace-pre-wrap leading-relaxed">
                      {selectedContact.message}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Book Modal */}
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
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">ISBN / ISSN (Opsional)</label>
                <input type="text" value={bIsbn} onChange={e => setBIsbn(e.target.value)} placeholder="Contoh: 978-602-1234-56-7" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                <p className="text-[10px] text-slate-400 mt-1">Isi ISBN untuk mengunduh sampul otomatis dari OpenLibrary.</p>
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsBookModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition">Simpan Buku</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-6">{editingCourse ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h3>
            <form onSubmit={saveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Kelas</label>
                <input type="text" required value={cJudul} onChange={e => setCJudul(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori (Tipe)</label>
                <select value={cTipe} onChange={e => setCTipe(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                  <option value="PPLG">PPLG</option><option value="TJKT">TJKT</option><option value="DKV">DKV</option><option value="BCF">BCF</option><option value="Karir">Karir</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Biaya</label>
                <select value={cBiaya} onChange={e => setCBiaya(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                  <option value="Gratis">Gratis</option>
                  <option value="Biaya tertera">Biaya tertera</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Link Pendaftaran</label>
                <input type="url" required value={cLink} onChange={e => setCLink(e.target.value)} placeholder="Contoh: https://docs.google.com/forms/..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                <p className="text-[10px] text-slate-400 mt-1">Pastikan link diawali dengan <strong>https://</strong></p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi</label>
                <textarea required value={cDeskripsi} onChange={e => setCDeskripsi(e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsCourseModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 transition">Simpan Kelas</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center transform transition-all">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Konfirmasi Hapus</h3>
            <p className="text-sm text-slate-500 mb-6">
              Apakah Anda yakin ingin menghapus <strong>"{deleteConfirm.name}"</strong>? Data ini akan dihapus secara permanen.
            </p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)} 
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition flex-1"
              >
                Batal
              </button>
              <button 
                onClick={executeDelete} 
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition flex-1"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

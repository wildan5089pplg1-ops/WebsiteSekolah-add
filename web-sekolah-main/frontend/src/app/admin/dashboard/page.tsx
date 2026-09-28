'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Course, Book, PpdbRegistration, Contact } from '@/types/admin';
import { adminCache } from '@/lib/adminCache';

export default function AdminOverviewPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [bookTotal, setBookTotal] = useState(0);
  const [ppdbList, setPpdbList] = useState<PpdbRegistration[]>([]);
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return null;
    }
    return token;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const token = checkAuth();
      if (!token) return;

      const cachedData = adminCache.get<any>('overview');
      if (cachedData) {
        setCourses(cachedData.courses);
        setBookTotal(cachedData.bookTotal);
        setPpdbList(cachedData.ppdbList);
        setContactList(cachedData.contactList);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [cRes, bRes, pRes, coRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/v1/kelas-pelatihan?per_page=100`, { headers: { 'Authorization': `Bearer ${token}` }}).then(r => r.json()),
          fetch(`http://127.0.0.1:8000/api/v1/buku`, { headers: { 'Authorization': `Bearer ${token}` }}).then(r => r.json()),
          fetch(`http://127.0.0.1:8000/api/v1/ppdb?per_page=100`, { headers: { 'Authorization': `Bearer ${token}` }}).then(r => r.json()),
          fetch(`http://127.0.0.1:8000/api/v1/contact?per_page=100`, { headers: { 'Authorization': `Bearer ${token}` }}).then(r => r.json())
        ]);

        const data = {
          courses: cRes.success ? cRes.data : [],
          bookTotal: bRes.success ? (bRes.meta ? bRes.meta.total : bRes.data.length) : 0,
          ppdbList: pRes.success ? pRes.data : [],
          contactList: coRes.success ? coRes.data : []
        };

        setCourses(data.courses);
        setBookTotal(data.bookTotal);
        setPpdbList(data.ppdbList);
        setContactList(data.contactList);
        
        adminCache.set('overview', data);
      } catch (err) {
        console.error('Error fetching overview data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className="animate-fadeIn relative z-10">
      {/* Background Gradients */}
      <div className="fixed top-[-20%] right-[-10%] w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>

      <h1 className="text-3xl font-black text-slate-800 mb-2">Dashboard Overview</h1>
      <p className="text-slate-500 mb-8">Selamat datang kembali! Berikut ringkasan data sistem SMK Prestasi Prima hari ini.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Buku</h3>
          {isLoading ? <div className="h-10 w-16 bg-slate-200 animate-pulse rounded-lg mt-1 mb-1"></div> : <p className="text-4xl font-black text-slate-800">{bookTotal}</p>}
          <button onClick={() => router.push('/admin/dashboard/lib')} className="mt-4 text-sm font-bold text-emerald-600 hover:text-emerald-700">Kelola Buku &rarr;</button>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Kelas Aktif</h3>
          {isLoading ? <div className="h-10 w-16 bg-slate-200 animate-pulse rounded-lg mt-1 mb-1"></div> : <p className="text-4xl font-black text-slate-800">{courses.length}</p>}
          <button onClick={() => router.push('/admin/dashboard/career')} className="mt-4 text-sm font-bold text-orange-600 hover:text-orange-700">Kelola Pelatihan &rarr;</button>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pendaftar PPDB</h3>
          {isLoading ? <div className="h-10 w-16 bg-slate-200 animate-pulse rounded-lg mt-1 mb-1"></div> : <p className="text-4xl font-black text-slate-800">{ppdbList.length}</p>}
          <button onClick={() => router.push('/admin/dashboard/ppdb')} className="mt-4 text-sm font-bold text-amber-600 hover:text-amber-700">Manajemen PPDB &rarr;</button>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          </div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pesan & Kontak</h3>
          {isLoading ? <div className="h-10 w-16 bg-slate-200 animate-pulse rounded-lg mt-1 mb-1"></div> : <p className="text-4xl font-black text-slate-800">{contactList.length}</p>}
          <button onClick={() => router.push('/admin/dashboard/contact')} className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700">Lihat Pesan &rarr;</button>
        </div>
      </div>
    </div>
  );
}

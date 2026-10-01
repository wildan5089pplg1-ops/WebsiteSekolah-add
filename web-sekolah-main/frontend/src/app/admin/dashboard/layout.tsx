'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <aside className={`fixed top-0 left-0 h-screen bg-slate-900 text-slate-300 shadow-[10px_0_30px_rgba(0,0,0,0.15)] z-40 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-full md:w-64'}`}>
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-5 top-10 bg-orange-500 text-white hover:bg-orange-600 p-2 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] border-4 border-slate-50 hidden md:flex items-center justify-center z-30 transition-all hover:scale-110"
          style={{ transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          title={isSidebarCollapsed ? 'Perlebar Sidebar' : 'Perkecil Sidebar'}
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
          <Link href="/admin/dashboard" className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${pathname === '/admin/dashboard' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'hover:bg-slate-800'}`}>
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Overview</span>}
          </Link>
          
          <Link href="/admin/dashboard/lib" className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${pathname === '/admin/dashboard/lib' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'hover:bg-slate-800'}`}>
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Presma Lib (Buku)</span>}
          </Link>

          <Link href="/admin/dashboard/career" className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${pathname === '/admin/dashboard/career' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'hover:bg-slate-800'}`}>
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Presma Career (Kelas)</span>}
          </Link>

          <Link href="/admin/dashboard/ppdb" className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${pathname === '/admin/dashboard/ppdb' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'hover:bg-slate-800'}`}>
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Manajemen PPDB</span>}
          </Link>

          <Link href="/admin/dashboard/contact" className={`w-full text-left py-3 rounded-xl transition-all text-sm font-bold flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${pathname === '/admin/dashboard/contact' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-800'}`}>
            <svg className="w-5 h-5 opacity-75 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            {!isSidebarCollapsed && <span className="whitespace-nowrap">Pesan & Kontak</span>}
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            title="Logout"
            className={`w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors font-bold text-sm flex items-center justify-center ${isSidebarCollapsed ? 'px-0' : 'px-4 gap-2'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            {!isSidebarCollapsed && <span>Keluar Sistem</span>}
          </button>
        </div>
      </aside>

      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'}`}>
        {children}
      </main>
    </div>
  );
}

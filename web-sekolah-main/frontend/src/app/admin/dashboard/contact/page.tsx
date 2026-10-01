'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Contact } from '@/types/admin';
import { adminCache } from '@/lib/adminCache';

export default function AdminContactPage() {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const router = useRouter();

  const fetchContacts = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    const cached = adminCache.get<Contact[]>('contact_list');
    if (cached) {
      setContactList(cached);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/contact?per_page=100&_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data.success) {
        setContactList(data.data);
        adminCache.set('contact_list', data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchContacts();
  }, [router]);

  const deleteContact = async (id: number) => {
    if (!confirm('Hapus pesan kontak ini?')) return;
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSelectedContact(null);
        adminCache.flush('contact_list');
        adminCache.flush('overview');
        fetchContacts();
      }
    } catch (err) {}
  };

  return (
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
                  {isLoading ? (
                    <tr><td colSpan={4} className="p-8 text-center text-slate-400 text-sm">Memuat data...</td></tr>
                  ) : contactList.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-slate-400 text-sm">Belum ada pesan kontak.</td></tr>
                  ) : (
                    contactList.map(c => (
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
                        <td className="p-4 text-right whitespace-nowrap space-x-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteContact(c.id); }}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
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
  );
}

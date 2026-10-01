'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PpdbRegistration } from '@/types/admin';
import { adminCache } from '@/lib/adminCache';

export default function AdminPpdbPage() {
  const [ppdbList, setPpdbList] = useState<PpdbRegistration[]>([]);
  const [ppdbPage, setPpdbPage] = useState(1);
  const PPDB_PER_PAGE = 20;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPpdb, setSelectedPpdb] = useState<PpdbRegistration | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    const fetchPpdb = async () => {
      const cached = adminCache.get<PpdbRegistration[]>('ppdb_list');
      if (cached) {
        setPpdbList(cached);
        setPpdbPage(1);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/ppdb?per_page=100&_t=${Date.now()}`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });
        const data = await res.json();
        if (data.success) {
          setPpdbList(data.data);
          setPpdbPage(1);
          adminCache.set('ppdb_list', data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPpdb();
  }, [router]);

  return (
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
                  {isLoading ? (
                    <tr><td colSpan={2} className="p-8 text-center text-slate-400 text-sm">Memuat data...</td></tr>
                  ) : ppdbList.length === 0 ? (
                    <tr><td colSpan={2} className="p-8 text-center text-slate-400 text-sm">Belum ada pendaftar PPDB.</td></tr>
                  ) : (
                    ppdbList.slice((ppdbPage - 1) * PPDB_PER_PAGE, ppdbPage * PPDB_PER_PAGE).map(p => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {ppdbList.length > PPDB_PER_PAGE && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">
                  Menampilkan {(ppdbPage - 1) * PPDB_PER_PAGE + 1} - {Math.min(ppdbPage * PPDB_PER_PAGE, ppdbList.length)} dari {ppdbList.length} pendaftar
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={ppdbPage === 1}
                    onClick={() => setPpdbPage(p => p - 1)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 transition"
                  >
                    &larr; Prev
                  </button>
                  <button
                    disabled={ppdbPage >= Math.ceil(ppdbList.length / PPDB_PER_PAGE)}
                    onClick={() => setPpdbPage(p => p + 1)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 transition"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            )}
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
            <div className="sm:col-span-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nama Lengkap *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.full_name}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">NISN</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.nisn || '-'}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jenis Kelamin *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tempat Lahir *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.birth_place}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tanggal Lahir *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{new Date(selectedPpdb.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Agama *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.religion}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Asal Sekolah *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.previous_school}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jurusan Pilihan *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.major}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jalur Pendaftaran *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.path}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nama Orang Tua / Wali *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.parent_name}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">No. HP Aktif *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.phone}</div>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">{selectedPpdb.email || '-'}</div>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Alamat Lengkap *</p>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium min-h-[100px]">{selectedPpdb.address}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

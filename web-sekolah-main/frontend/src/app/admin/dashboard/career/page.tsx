'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '@/types/admin';
import { adminCache } from '@/lib/adminCache';

export default function AdminCareerPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursePage, setCoursePage] = useState(1);
  const COURSES_PER_PAGE = 20;
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Form State
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Course Form
  const [cJudul, setCJudul] = useState('');
  const [cDeskripsi, setCDeskripsi] = useState('');
  const [cTipe, setCTipe] = useState<'PPLG' | 'TJKT' | 'DKV' | 'BCF' | 'Karir'>('PPLG');
  const [cBiaya, setCBiaya] = useState<'Gratis' | 'Biaya tertera'>('Gratis');
  const [cLink, setCLink] = useState('');

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
    const token = checkAuth();
    if (!token) return;

    const cached = adminCache.get<Course[]>('course_list');
    if (cached) {
      setCourses(cached);
      setCoursePage(1);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/kelas-pelatihan?per_page=100&_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
        setCoursePage(1);
        adminCache.set('course_list', data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_token')) {
      fetchCourses();
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const openCourseModal = (course: Course | null = null) => {
    setEditingCourse(course);
    if (course) {
      setCJudul(course.judul);
      setCDeskripsi(course.deskripsi);
      setCTipe(course.tipe);
      setCBiaya(course.biaya);
      setCLink(course.link || '');
    } else {
      setCJudul('');
      setCDeskripsi('');
      setCTipe('PPLG');
      setCBiaya('Gratis');
      setCLink('');
    }
    setIsCourseModalOpen(true);
  };

  const closeCourseModal = () => setIsCourseModalOpen(false);

  const saveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = checkAuth();
    if (!token) return;

    const payload = {
      judul: cJudul,
      deskripsi: cDeskripsi,
      tipe: cTipe,
      biaya: cBiaya,
      link: cLink
    };

    try {
      const url = editingCourse 
        ? `http://127.0.0.1:8000/api/v1/kelas-pelatihan/${editingCourse.id}` 
        : `http://127.0.0.1:8000/api/v1/kelas-pelatihan`;
      const method = editingCourse ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeCourseModal();
        adminCache.flush('course_list');
        adminCache.flush('overview');
        fetchCourses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async (id: number) => {
    if (!confirm('Hapus kelas/pelatihan ini?')) return;
    const token = checkAuth();
    if (!token) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/kelas-pelatihan/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        adminCache.flush('course_list');
        adminCache.flush('overview');
        fetchCourses();
      }
    } catch (err) {}
  };

  return (
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

      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200/60">
                <th className="p-4 font-bold">Judul & Tipe</th>
                <th className="p-4 font-bold">Biaya</th>
                <th className="p-4 font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={3} className="p-8 text-center text-slate-400 text-sm">Memuat data...</td></tr>
              ) : courses.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-slate-400 text-sm">Belum ada kelas/pelatihan.</td></tr>
              ) : courses.slice((coursePage - 1) * COURSES_PER_PAGE, coursePage * COURSES_PER_PAGE).map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <span className="text-sm font-bold text-slate-800 block">{c.judul}</span>
                    <span className="text-xs text-slate-500 inline-block px-2 py-0.5 bg-slate-100 rounded-md mt-1 font-bold">{c.tipe}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${c.biaya === 'Gratis' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>{c.biaya}</span>
                  </td>
                  <td className="p-4 whitespace-nowrap space-x-2">
                    <button onClick={() => openCourseModal(c)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">Edit</button>
                    <button onClick={() => deleteCourse(c.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {courses.length > COURSES_PER_PAGE && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">
              Menampilkan {(coursePage - 1) * COURSES_PER_PAGE + 1} - {Math.min(coursePage * COURSES_PER_PAGE, courses.length)} dari {courses.length} modul
            </span>
            <div className="flex gap-2">
              <button
                disabled={coursePage === 1}
                onClick={() => setCoursePage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 transition"
              >
                &larr; Prev
              </button>
              <button
                disabled={coursePage >= Math.ceil(courses.length / COURSES_PER_PAGE)}
                onClick={() => setCoursePage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 transition"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-800 mb-6">{editingCourse ? 'Edit Kelas/Pelatihan' : 'Tambah Kelas Baru'}</h3>
            <form onSubmit={saveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul</label>
                <input type="text" required value={cJudul} onChange={e => setCJudul(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tipe / Kategori</label>
                <select value={cTipe} onChange={e => setCTipe(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                  <option value="PPLG">PPLG</option>
                  <option value="TJKT">TJKT</option>
                  <option value="DKV">DKV</option>
                  <option value="BCF">BCF</option>
                  <option value="Karir">Persiapan Karir</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi Singkat</label>
                <textarea required value={cDeskripsi} onChange={e => setCDeskripsi(e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Biaya</label>
                  <select value={cBiaya} onChange={e => setCBiaya(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                    <option value="Gratis">Gratis</option>
                    <option value="Biaya tertera">Berbayar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Link Pendaftaran / Materi</label>
                  <input type="url" value={cLink} onChange={e => setCLink(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none" placeholder="https://..." />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={closeCourseModal} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Batal</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/30 transition">{editingCourse ? 'Simpan Perubahan' : 'Tambah Kelas'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

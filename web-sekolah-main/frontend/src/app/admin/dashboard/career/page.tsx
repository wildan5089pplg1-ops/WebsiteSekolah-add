'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Course, Career } from '@/types/admin';
import { adminCache } from '@/lib/adminCache';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function AdminCareerPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'careers'>('courses');

  // Courses state
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursePage, setCoursePage] = useState(1);
  const COURSES_PER_PAGE = 20;
  const [isCourseLoading, setIsCourseLoading] = useState(true);

  // Careers state
  const [careers, setCareers] = useState<Career[]>([]);
  const [careerPage, setCareerPage] = useState(1);
  const CAREERS_PER_PAGE = 20;
  const [isCareerLoading, setIsCareerLoading] = useState(true);

  // Modals & Form State for Courses
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [cJudul, setCJudul] = useState('');
  const [cDeskripsi, setCDeskripsi] = useState('');
  const [cTipe, setCTipe] = useState<'PPLG' | 'TJKT' | 'DKV' | 'BCF' | 'Karir'>('PPLG');
  const [cBiaya, setCBiaya] = useState<'Gratis' | 'Biaya tertera'>('Gratis');
  const [cLink, setCLink] = useState('');

  // Modals & Form State for Careers
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [kNamaPekerjaan, setKNamaPekerjaan] = useState('');
  const [kDeskripsi, setKDeskripsi] = useState('');
  const [kJurusan, setKJurusan] = useState<'PPLG' | 'TJKT' | 'DKV' | 'BCF' | string>('PPLG');
  const [kLink, setKLink] = useState('');

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
      setIsCourseLoading(false);
      return;
    }

    setIsCourseLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/kelas-pelatihan?per_page=100&_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data.success || data.status === 'success') {
        setCourses(data.data);
        setCoursePage(1);
        adminCache.set('course_list', data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCourseLoading(false);
    }
  };

  const fetchCareers = async () => {
    const token = checkAuth();
    if (!token) return;

    const cached = adminCache.get<Career[]>('career_list');
    if (cached) {
      setCareers(cached);
      setCareerPage(1);
      setIsCareerLoading(false);
      return;
    }

    setIsCareerLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/karir?per_page=100&_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });
      const data = await res.json();
      if (data.status === 'success' || data.success) {
        setCareers(data.data);
        setCareerPage(1);
        adminCache.set('career_list', data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCareerLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_token')) {
      if (activeTab === 'courses') fetchCourses();
      if (activeTab === 'careers') fetchCareers();
    } else {
      router.push('/admin/login');
    }
  }, [router, activeTab]);

  // Course handlers
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
    const payload = { judul: cJudul, deskripsi: cDeskripsi, tipe: cTipe, biaya: cBiaya, link: cLink };
    try {
      const url = editingCourse ? `http://127.0.0.1:8000/api/v1/kelas-pelatihan/${editingCourse.id}` : `http://127.0.0.1:8000/api/v1/kelas-pelatihan`;
      const res = await fetch(url, {
        method: editingCourse ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeCourseModal();
        adminCache.flush('course_list');
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
        fetchCourses();
      }
    } catch (err) {}
  };

  // Career handlers
  const openCareerModal = (career: Career | null = null) => {
    setEditingCareer(career);
    if (career) {
      setKNamaPekerjaan(career.nama_pekerjaan);
      setKDeskripsi(career.deskripsi);
      setKJurusan(career.jurusan);
      setKLink(career.link || '');
    } else {
      setKNamaPekerjaan('');
      setKDeskripsi('');
      setKJurusan('PPLG');
      setKLink('');
    }
    setIsCareerModalOpen(true);
  };
  const closeCareerModal = () => setIsCareerModalOpen(false);

  const saveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = checkAuth();
    if (!token) return;
    const payload = { nama_pekerjaan: kNamaPekerjaan, deskripsi: kDeskripsi, jurusan: kJurusan, link: kLink };
    try {
      const url = editingCareer ? `http://127.0.0.1:8000/api/v1/karir/${editingCareer.id}` : `http://127.0.0.1:8000/api/v1/karir`;
      const res = await fetch(url, {
        method: editingCareer ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeCareerModal();
        adminCache.flush('career_list');
        fetchCareers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCareer = async (id: number) => {
    if (!confirm('Hapus karir ini?')) return;
    const token = checkAuth();
    if (!token) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/karir/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        adminCache.flush('career_list');
        fetchCareers();
      }
    } catch (err) {}
  };

  return (
    <div className="animate-fadeIn relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Manajemen Presma Career</h1>
          <p className="text-slate-500">Kelola modul kelas/pelatihan dan informasi pencarian karir.</p>
        </div>
        
        <div className="flex gap-2">
          {activeTab === 'courses' ? (
            <button 
              onClick={() => openCourseModal()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
            >
              + Tambah Kelas
            </button>
          ) : (
            <button 
              onClick={() => openCareerModal()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
            >
              + Tambah Karir
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('courses')}
          className={`pb-3 font-bold text-sm px-2 border-b-2 transition-colors ${activeTab === 'courses' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Kelas & Pelatihan
        </button>
        <button 
          onClick={() => setActiveTab('careers')}
          className={`pb-3 font-bold text-sm px-2 border-b-2 transition-colors ${activeTab === 'careers' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Cari Karir
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        {activeTab === 'courses' && (
          <>
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
                  {isCourseLoading ? (
                    Array.from({length: 3}).map((_, i) => (
                      <tr key={`skel-c-${i}`} className="animate-pulse border-b border-slate-50">
                        <td colSpan={3} className="p-4"><div className="h-8 bg-slate-200 rounded-md"></div></td>
                      </tr>
                    ))
                  ) : courses.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <h4 className="text-base font-bold text-slate-800 mb-1">Belum Ada Kelas/Pelatihan</h4>
                          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">Mulai buat kelas sertifikasi, bootcamp, atau pelatihan kejuruan untuk siswa.</p>
                          <button onClick={() => openCourseModal()} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-md transition-colors">
                            + Tambah Kelas Baru
                          </button>
                        </div>
                      </td>
                    </tr>
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
            {courses.length > COURSES_PER_PAGE && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Menampilkan {(coursePage - 1) * COURSES_PER_PAGE + 1} - {Math.min(coursePage * COURSES_PER_PAGE, courses.length)} dari {courses.length}</span>
                <div className="flex gap-2">
                  <button disabled={coursePage === 1} onClick={() => setCoursePage(p => p - 1)} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold disabled:opacity-50">&larr; Prev</button>
                  <button disabled={coursePage >= Math.ceil(courses.length / COURSES_PER_PAGE)} onClick={() => setCoursePage(p => p + 1)} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold disabled:opacity-50">Next &rarr;</button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'careers' && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200/60">
                    <th className="p-4 font-bold">Nama Pekerjaan</th>
                    <th className="p-4 font-bold">Jurusan</th>
                    <th className="p-4 font-bold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isCareerLoading ? (
                    Array.from({length: 3}).map((_, i) => (
                      <tr key={`skel-k-${i}`} className="animate-pulse border-b border-slate-50">
                        <td colSpan={3} className="p-4"><div className="h-8 bg-slate-200 rounded-md"></div></td>
                      </tr>
                    ))
                  ) : careers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h4 className="text-base font-bold text-slate-800 mb-1">Belum Ada Lowongan Karir</h4>
                          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">Tambahkan informasi peluang karir, magang, atau pekerjaan untuk siswa.</p>
                          <button onClick={() => openCareerModal()} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-md transition-colors">
                            + Tambah Karir Baru
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : careers.slice((careerPage - 1) * CAREERS_PER_PAGE, careerPage * CAREERS_PER_PAGE).map(k => (
                    <tr key={k.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <span className="text-sm font-bold text-slate-800 block">{k.nama_pekerjaan}</span>
                        {k.link && <a href={k.link} target="_blank" className="text-xs text-orange-500 hover:underline mt-1 inline-block">Lihat Link ↗</a>}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-600">{k.jurusan}</span>
                      </td>
                      <td className="p-4 whitespace-nowrap space-x-2">
                        <button onClick={() => openCareerModal(k)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">Edit</button>
                        <button onClick={() => deleteCareer(k.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {careers.length > CAREERS_PER_PAGE && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Menampilkan {(careerPage - 1) * CAREERS_PER_PAGE + 1} - {Math.min(careerPage * CAREERS_PER_PAGE, careers.length)} dari {careers.length}</span>
                <div className="flex gap-2">
                  <button disabled={careerPage === 1} onClick={() => setCareerPage(p => p - 1)} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold disabled:opacity-50">&larr; Prev</button>
                  <button disabled={careerPage >= Math.ceil(careers.length / CAREERS_PER_PAGE)} onClick={() => setCareerPage(p => p + 1)} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold disabled:opacity-50">Next &rarr;</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Kelas & Pelatihan */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
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
                <div className="bg-white rounded-xl overflow-hidden [&_.ql-container]:min-h-[120px] [&_.ql-toolbar]:border-slate-200 [&_.ql-container]:border-slate-200 [&_.ql-editor]:text-sm">
                  <ReactQuill theme="snow" value={cDeskripsi} onChange={setCDeskripsi} />
                </div>
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

      {/* Modal Cari Karir */}
      {isCareerModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-black text-slate-800 mb-6">{editingCareer ? 'Edit Karir' : 'Tambah Karir Baru'}</h3>
            <form onSubmit={saveCareer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Pekerjaan</label>
                <input type="text" required value={kNamaPekerjaan} onChange={e => setKNamaPekerjaan(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Jurusan</label>
                <select value={kJurusan} onChange={e => setKJurusan(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                  <option value="PPLG">PPLG</option>
                  <option value="TJKT">TJKT</option>
                  <option value="DKV">DKV</option>
                  <option value="BCF">Broadcasting (BCF)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi Pekerjaan</label>
                <div className="bg-white rounded-xl overflow-hidden [&_.ql-container]:min-h-[120px] [&_.ql-toolbar]:border-slate-200 [&_.ql-container]:border-slate-200 [&_.ql-editor]:text-sm">
                  <ReactQuill theme="snow" value={kDeskripsi} onChange={setKDeskripsi} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Link Lamaran / Informasi</label>
                <input type="url" value={kLink} onChange={e => setKLink(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none" placeholder="https://..." />
              </div>
              <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={closeCareerModal} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Batal</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-500/30 transition">{editingCareer ? 'Simpan Perubahan' : 'Tambah Karir'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

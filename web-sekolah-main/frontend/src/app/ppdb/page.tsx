'use client';

import { useState } from 'react';

const initialForm = {
  full_name: '',
  nisn: '',
  gender: 'L',
  birth_place: '',
  birth_date: '',
  religion: 'Islam',
  previous_school: '',
  major: 'Rekayasa Perangkat Lunak',
  path: 'Prestasi',
  parent_name: '',
  phone: '',
  email: '',
  address: '',
};

export default function PpdbPage() {
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string; regNumber?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'}/ppdb`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setResult({
          type: 'success',
          message: data.message,
          regNumber: data.data.registration_number,
        });
        setFormData(initialForm);
      } else if (data.errors) {
        const firstError = Object.values(data.errors)[0] as string[];
        setResult({ type: 'error', message: firstError[0] });
      } else {
        setResult({ type: 'error', message: data.message || 'Terjadi kesalahan saat mendaftar.' });
      }
    } catch {
      setResult({ type: 'error', message: 'Gagal terhubung ke server. Pastikan backend berjalan.' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-colors';
  const labelClass = 'block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider">
            PPDB 2026/2027
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Formulir Pendaftaran Siswa Baru</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            Isi data dengan lengkap dan benar. Setelah pendaftaran berhasil, Anda akan mendapatkan nomor registrasi sebagai bukti.
          </p>
        </div>

        {result && (
          <div className={`p-5 rounded-2xl text-sm border ${
            result.type === 'success'
              ? 'bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
          }`}>
            <p className="font-bold">{result.message}</p>
            {result.regNumber && (
              <p className="mt-2 text-lg font-extrabold tracking-wide">No. Registrasi: {result.regNumber}</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Nama Lengkap *</label>
              <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} placeholder="Sesuai akta kelahiran" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>NISN</label>
              <input type="text" name="nisn" value={formData.nisn} onChange={handleChange} placeholder="10 digit (jika ada)" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jenis Kelamin *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tempat Lahir *</label>
              <input type="text" name="birth_place" required value={formData.birth_place} onChange={handleChange} placeholder="Contoh: Jakarta" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tanggal Lahir *</label>
              <input type="date" name="birth_date" required value={formData.birth_date} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Agama *</label>
              <select name="religion" value={formData.religion} onChange={handleChange} className={inputClass}>
                {['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Asal Sekolah *</label>
              <input type="text" name="previous_school" required value={formData.previous_school} onChange={handleChange} placeholder="Contoh: SMPN 1 Jakarta" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Jurusan Pilihan *</label>
              <select name="major" value={formData.major} onChange={handleChange} className={inputClass}>
                {['Rekayasa Perangkat Lunak', 'TKJ', 'DKV', 'Akuntansi', 'Pemasaran', 'Bisnis Digital'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Jalur Pendaftaran *</label>
              <select name="path" value={formData.path} onChange={handleChange} className={inputClass}>
                {['Prestasi', 'Zonasi', 'Afirmasi'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Nama Orang Tua / Wali *</label>
              <input type="text" name="parent_name" required value={formData.parent_name} onChange={handleChange} placeholder="Nama lengkap orang tua/wali" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>No. HP Aktif *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="0812..." className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@domain.com (opsional)" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Alamat Lengkap *</label>
              <textarea name="address" required rows={3} value={formData.address} onChange={handleChange} placeholder="Alamat tempat tinggal sesuai KK" className={inputClass} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 text-white dark:text-slate-950 font-extrabold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Mengirim Pendaftaran...' : 'Daftar Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}

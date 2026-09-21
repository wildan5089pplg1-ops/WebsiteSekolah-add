'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email_or_phone: '',
    category: 'Informasi PPDB 2026',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ type: 'success', message: 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.' });
        setFormData({
          name: '',
          email_or_phone: '',
          category: 'Informasi PPDB 2026',
          message: ''
        });
      } else {
        setStatus({ type: 'error', message: data.message || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Gagal terhubung ke server. Pastikan koneksi internet Anda stabil.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm dark:shadow-none">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Formulir Pesan / Pertanyaan</h2>
      
      {status && (
        <div className={`p-4 rounded-xl text-sm font-bold border ${
          status.type === 'success' 
            ? 'bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400' 
            : 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Email / No. HP</label>
            <input
              type="text"
              name="email_or_phone"
              required
              value={formData.email_or_phone}
              onChange={handleChange}
              placeholder="email@domain.com / 0812..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Kategori Pesan</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-colors"
          >
            <option value="Informasi PPDB 2026">Informasi PPDB 2026</option>
            <option value="Pertanyaan Akademik & Kurikulum">Pertanyaan Akademik & Kurikulum</option>
            <option value="Pengaduan / Saran">Pengaduan / Saran</option>
            <option value="Kerjasama / Sponsor">Kerjasama / Sponsor</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Isi Pesan</label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda sampaikan..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-500 dark:to-amber-400 text-white dark:text-slate-950 font-extrabold text-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
        </button>
      </form>
    </div>
  );
}

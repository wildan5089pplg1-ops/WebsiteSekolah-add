import { getSchoolInfo } from '@/lib/api';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage() {
  const school = await getSchoolInfo();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Hubungi Kami</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Layanan Informasi & PPDB</h1>
        <p className="text-slate-600 dark:text-slate-300 text-base">
          Ada pertanyaan seputar penerimaan siswa baru, informasi sekolah, atau kerjasama? Silakan kirimkan pesan kepada kami.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
            <span className="text-2xl">📍</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Alamat Kampus</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{school.address}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
            <span className="text-2xl">📞</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Telepon / Fax</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{school.phone}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
            <span className="text-2xl">✉️</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Email Resmi</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{school.email}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
            <span className="text-2xl">🕒</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Jam Operasional Sekretariat</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Senin - Jumat: 07.00 - 16.00 WIB</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sabtu & Minggu: Tutup (Kecuali Kegiatan Khusus)</p>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />

      </div>

    </div>
  );
}

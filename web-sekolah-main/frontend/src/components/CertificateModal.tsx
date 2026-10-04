"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function CertificateModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Credentials Card - Clickable Trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-white dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-slate-100 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-none transition-all duration-300 hover:shadow-xl hover:shadow-[#F96501]/5 hover:border-orange-200 dark:hover:border-orange-900/50 hover:-translate-y-1 cursor-pointer group/card"
      >
        {/* Certificate Stack */}
        <div className="relative w-36 shrink-0 aspect-[4/3] flex items-center justify-center">
          {/* Bottom Certificate */}
          <div className="absolute inset-0 transform rotate-6 scale-95 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 shadow-sm transition-transform duration-500 group-hover/card:rotate-12 group-hover/card:scale-100">
            <Image src="/images/sertif academy2.webp" alt="Certificate 2" fill className="object-cover opacity-80" />
          </div>
          {/* Top Certificate */}
          <div className="absolute inset-0 bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md transform group-hover/card:scale-105 group-hover/card:-rotate-2 transition-transform duration-500 z-10">
            <Image src="/images/sertif academy1.webp" alt="Certificate 1" fill className="object-cover" />
          </div>
          
          {/* Photo Count Badge */}
          <div className="absolute -right-2 -top-2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md z-20">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            2
          </div>
        </div>

        {/* Text Info */}
        <div className="flex-1 text-center sm:text-left relative">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-2 text-[#F96501]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Verified Credentials</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
            Lihat Riwayat<br/>Sertifikasi
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto sm:mx-0">
            2 Sertifikat Internasional Aktif. Klik untuk verifikasi detail dan validasi ID.
          </p>

          {/* Arrow Icon */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-orange-500 group-hover/card:bg-[#F96501] group-hover/card:text-white group-hover/card:border-[#F96501] transition-all hidden sm:flex">
            <svg className="w-4 h-4 transform group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm transition-opacity">
          {/* Close Backdrop Overlay */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)}></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sertifikat Internasional</h3>
                <p className="text-sm text-slate-500">Achmad Maulana - MTCNA</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar bg-slate-50 dark:bg-slate-950">
              <div className="flex flex-col gap-6">
                <div className="relative w-full aspect-[1.414] rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-white">
                  <Image src="/images/sertif academy1.webp" alt="Certificate 1 Full" fill className="object-contain p-2" />
                </div>
                <div className="relative w-full aspect-[1.414] rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-white">
                  <Image src="/images/sertif academy2.webp" alt="Certificate 2 Full" fill className="object-contain p-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PrimaBoardPage() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] bg-[#f5f6f8] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      {/* Main Card Container */}
      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-full max-w-[1000px] min-h-[650px] flex flex-col md:flex-row overflow-hidden relative border border-slate-100">
        
        {/* Sidebar (Orange) */}
        <div className="w-full md:w-[260px] bg-[#f87f22] text-white flex flex-col pt-10 pb-8 px-6 rounded-b-[2rem] md:rounded-b-none md:rounded-r-[2.5rem] shadow-[4px_0_24px_rgba(248,127,34,0.3)] z-10 shrink-0">
          <h1 className="text-2xl font-black mb-10 tracking-wide text-center md:text-left">Prima Board</h1>
          
          <nav className="flex flex-row md:flex-col gap-4 md:gap-6 flex-wrap md:flex-nowrap justify-center md:justify-start flex-grow">
            <Link href="/" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              <span className="font-bold text-sm">Home</span>
            </Link>
            
            <Link href="#" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" /></svg>
              <span className="font-bold text-sm">Leader Board</span>
            </Link>
            
            <Link href="#" className="flex items-center gap-3 bg-white text-[#f87f22] px-4 py-2.5 md:-ml-4 rounded-full shadow-md group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
              <span className="font-bold text-sm">Daftar Siswa</span>
            </Link>
            
            <Link href="#" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              <span className="font-bold text-sm">Profile</span>
            </Link>
          </nav>
          
          <div className="pt-6 border-t border-white/20 mt-6 md:mt-auto flex justify-center md:justify-start">
            <Link href="/" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className="font-bold text-sm">Logout</span>
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-6 sm:px-12 py-10 md:py-12 bg-white overflow-y-auto">
          <h2 className="text-[24px] font-black text-slate-900 text-center mb-10">Tambah Data Siswa</h2>
          
          <form className="max-w-[650px] mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              
              {/* NIS */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">NIS</label>
                <input type="text" placeholder="Input nomor induk siswa" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm transition-all" />
              </div>
              
              {/* Tempat Lahir */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Tempat Lahir</label>
                <input type="text" defaultValue="Wuhan" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm text-slate-500 transition-all" />
              </div>

              {/* Nama Lengkap */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Nama Lengkap</label>
                <input type="text" placeholder="Input nama lengkap" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm transition-all" />
              </div>

              {/* Tanggal Lahir */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Tanggal Lahir</label>
                <div className="relative">
                   <input type="text" defaultValue="Maret/08/2003" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm text-slate-500 transition-all pr-10" />
                   <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>

              {/* Nama Wali */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Nama Wali</label>
                <input type="text" placeholder="Input nama wali" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm transition-all" />
              </div>

              {/* Alamat Domisili */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Alamat Domisili</label>
                <input type="text" placeholder="Alamat Domisili" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm transition-all" />
              </div>

              {/* Asal Sekolah */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Asal Sekolah</label>
                <input type="text" placeholder="Asal Sekolah" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm transition-all" />
              </div>

              {/* Agama */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Agama</label>
                <input type="text" placeholder="Agama" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm transition-all" />
              </div>

              {/* Jenis Kelamin */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Jenis Kelamin</label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm text-slate-500 appearance-none transition-all cursor-pointer">
                    <option>Laki-Laki</option>
                    <option>Perempuan</option>
                  </select>
                  <svg className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {/* Nomer Telepon */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Nomer Telepon</label>
                <input type="text" placeholder="Nomer Telepon" className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f87f22]/50 focus:bg-white text-sm transition-all" />
              </div>
            </div>

            {/* Status Toggle */}
            <div className="mt-8">
              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsActive(!isActive)}
                  className={`w-11 h-[22px] rounded-full relative transition-colors duration-300 ${isActive ? 'bg-black' : 'bg-slate-300'}`}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] transition-transform duration-300 ${isActive ? 'translate-x-[24px]' : 'translate-x-[2px]'}`}></div>
                </button>
                <span className="text-[13px] font-bold text-slate-800">Active</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button type="submit" className="flex items-center gap-2 bg-black hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Upload
              </button>
              <button type="button" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-700 px-8 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5">
                Discard
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

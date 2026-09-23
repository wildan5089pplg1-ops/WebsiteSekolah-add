export interface SubLink {
  name: string;
  href: string;
  desc?: string;
}

export interface NavSection {
  name: string;
  href?: string;
  description?: string;
  subLinks?: SubLink[];
}

export const navigation: NavSection[] = [
  {
    name: "Beranda",
    href: "/",
    description: "Halaman utama website resmi SMK Prestasi Prima.",
  },
  {
    name: "Tentang Kami",
    href: "/tentang/profile",
    description: "Mengenal visi, kepemimpinan, dan ekosistem sekolah.",
    subLinks: [
      {
        name: "Profil Sekolah",
        href: "/tentang/profile",
        desc: "Sejarah, visi, misi, dan identitas sekolah.",
      },
      {
        name: "Sambutan Yayasan",
        href: "/tentang/sambutan",
        desc: "Pesan dan arahan kepemimpinan yayasan.",
      },
      {
        name: "Fasilitas",
        href: "/#fasilitas",
        desc: "Laboratorium, ruang praktik, dan sarana modern.",
      },
      {
        name: "Kontak & Layanan",
        href: "/contact",
        desc: "Layanan informasi publik, lokasi, dan konsultasi.",
      },
      {
        name: "Prima Board",
        href: "/prima-board",
        desc: "Papan informasi digital dan pengumuman sekolah.",
      },
    ],
  },
  {
    name: "Program Keahlian",
    href: "/#program-keahlian",
    description: "Empat jurusan unggulan siap kerja berstandar industri.",
    subLinks: [
      {
        name: "BCF",
        href: "/#program-keahlian",
        desc: "Broadcasting & Perfilman",
      },
      {
        name: "DKV",
        href: "/#program-keahlian",
        desc: "Desain Komunikasi Visual",
      },
      {
        name: "TJKT",
        href: "/#program-keahlian",
        desc: "Teknik Jaringan Komputer & Telekomunikasi",
      },
      {
        name: "PPLG",
        href: "/#program-keahlian",
        desc: "Pengembangan Perangkat Lunak & Gim",
      },
    ],
  },
  {
    name: "Presma",
    href: "/program/presmacareer",
    description: "Pusat inovasi literasi digital dan kesiapan karir.",
    subLinks: [
      {
        name: "Presma Lib",
        href: "/program/presmalib",
        desc: "Perpustakaan digital & riset informasi siswa.",
      },
      {
        name: "Presma Career",
        href: "/program/presmacareer",
        desc: "Pusat karir, magang, dan mitra industri.",
      },
      {
        name: "Carasa",
        href: "/program/presmacareer/carasa",
        desc: "Career & Study Assessment untuk pemetaan potensi.",
      },
    ],
  },
  {
    name: "Dokumentasi",
    href: "/program/ekskul",
    description: "Aktivitas, karya, dan jejak prestasi warga sekolah.",
    subLinks: [
      {
        name: "Ekstrakurikuler",
        href: "/program/ekskul",
        desc: "Wadah eksplorasi minat, bakat, dan komunitas siswa.",
      },
      {
        name: "Alumni PTN",
        href: "/alumni-ptn",
        desc: "Jejak kelulusan dan sebaran alumni di perguruan tinggi negeri.",
      },
      {
        name: "Prestasi",
        href: "/#prestasi",
        desc: "Pencapaian dan rekam jejak juara siswa.",
      },
    ],
  },
  {
    name: "Berita",
    href: "/news",
    description: "Berita, artikel, dan informasi agenda terbaru sekolah.",
  },
  {
    name: "Pendaftaran",
    href: "/ppdb",
    description: "Informasi Penerimaan Peserta Didik Baru (PPDB 2026).",
  },
];
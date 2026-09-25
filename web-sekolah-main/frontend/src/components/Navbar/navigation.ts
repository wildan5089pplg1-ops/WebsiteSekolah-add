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

/**
 * Centralized navigation configuration for SMK Prestasi Prima.
 * Consumed by both desktop and mobile navigation.
 */
export const navigation: NavSection[] = [
  {
    name: "Beranda",
    href: "/",
    description: "Halaman utama website SMK Prestasi Prima.",
  },
  {
    name: "Profil",
    href: "/tentang/profile-sekolah",
    description: "Mengenal visi, kepemimpinan, dan sarana SMK Prestasi Prima.",
    subLinks: [
      {
        name: "Profil Sekolah",
        href: "/tentang/profile-sekolah",
        desc: "Sejarah, visi, misi, dan identitas keunggulan sekolah.",
      },
      {
        name: "Sambutan Yayasan",
        href: "/tentang/sambutan",
        desc: "Amanat dan arah pendidikan dari Ketua Yayasan.",
      },
      {
        name: "Fasilitas",
        href: "/tentang/profile#fasilitas",
        desc: "Sarana modern penunjang pembelajaran berkualitas.",
      },
    ],
  },
  {
    name: "Program Keahlian",
    href: "/program",
    description: "Kompetensi keahlian unggulan berbasis industri masa depan.",
    subLinks: [
      {
        name: "PPLG",
        href: "/program/pplg",
        desc: "Software engineering, web development, dan mobile apps.",
      },
      {
        name: "TJKT",
        href: "/program/tjkt",
        desc: "Infrastruktur jaringan canggih, server, dan cybersecurity.",
      },
      {
        name: "BCF",
        href: "/program/bcf",
        desc: "Kreativitas produksi siaran, sinematografi, dan konten digital.",
      },
      {
        name: "DKV",
        href: "/program/dkv",
        desc: "Eksplorasi grafis, animasi, UI/UX, dan komunikasi visual.",
      },
    ],
  },
  {
    name: "PRESMA",
    href: "/program/presmacareer",
    description: "Ekosistem pengembangan karier, riset literasi, dan asesmen bakat.",
    subLinks: [
      {
        name: "PRESMA LIB",
        href: "/program/presmalib",
        desc: "Perpustakaan digital dan pusat referensi ilmiah modern.",
      },
      {
        name: "PRESMA CAREER",
        href: "/program/presmacareer",
        desc: "Jembatan karir siswa menuju dunia usaha & dunia industri.",
      },
      {
        name: "PRESMA TOUR",
        href: "/virtual-tour",
        desc: "Jelajahi seluruh fasilitas sekolah secara interaktif 360°.",
      },
    ],
  },
  {
    name: "Dokumentasi",
    href: "/#our-journey-section",
    description: "Rekam jejak, prestasi nasional, dan portofolio kebanggaan.",
    subLinks: [
      {
        name: "Ekstrakurikuler",
        href: "/program/ekskul",
        desc: "Wadah eksplorasi minat, bakat, dan komunitas siswa.",
      },
      {
        name: "Bintang Lulusan PTN",
        href: "/alumni-ptn",
        desc: "Daftar alumni berprestasi yang menembus PTN ternama.",
      },
      {
        name: "Prestasi Siswa",
        href: "/#prestasi",
        desc: "Raihan medali dan penghargaan di tingkat regional & nasional.",
      },
      {
        name: "Berita & Artikel",
        href: "/news",
        desc: "Kabar terbaru, agenda kegiatan, dan artikel edukasi terkini.",
      },
    ],
  },
  {
    name: "Pendaftaran",
    href: "/ppdb",
    description: "Penerimaan Peserta Didik Baru (PPDB) SMK Prestasi Prima.",
    subLinks: [
      {
        name: "PPDB Online",
        href: "/ppdb",
        desc: "Pendaftaran siswa baru dan informasi gelombang masuk.",
      },
      {
        name: "Kontak",
        href: "/contact",
        desc: "Hubungi kami dan informasi narahubung sekolah.",
      },
    ],
  },
];
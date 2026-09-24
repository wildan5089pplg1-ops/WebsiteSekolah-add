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
    description: "Halaman utama website SMK Prestasi Prima.",
  },
  {
    name: "Tentang Kami",
    href: "/tentang/profile",
    description: "Mengenal visi, kepemimpinan, dan sarana SMK Prestasi Prima.",
    subLinks: [
      {
        name: "Profil Sekolah",
        href: "/tentang/profile",
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
      {
        name: "Prima Board",
        href: "/prima-board",
        desc: "Papan informasi digital dan pengumuman sekolah.",
      },
    ],
  },
  {
    name: "Program Keahlian",
    href: "/#program",
    description: "Kompetensi keahlian unggulan berbasis industri masa depan.",
    subLinks: [
      {
        name: "BCF",
        href: "/#program",
        desc: "Kreativitas produksi siaran, sinematografi, dan konten digital.",
      },
      {
        name: "DKV",
        href: "/#program",
        desc: "Eksplorasi grafis, animasi, UI/UX, dan komunikasi visual.",
      },
      {
        name: "TJKT",
        href: "/#program",
        desc: "Infrastruktur jaringan canggih, server, dan cybersecurity.",
      },
      {
        name: "PPLG",
        href: "/#program",
        desc: "Software engineering, web development, dan mobile apps.",
      },
    ],
  },
  {
    name: "Presma",
    href: "/program/presmacareer",
    description: "Ekosistem pengembangan karier, riset literasi, dan asesmen bakat.",
    subLinks: [
      {
        name: "Presma Lib",
        href: "/program/presmalib",
        desc: "Perpustakaan digital dan pusat referensi ilmiah modern.",
      },
      {
        name: "Presma Career",
        href: "/program/presmacareer",
        desc: "Jembatan karir siswa menuju dunia usaha & dunia industri.",
      },
      {
        name: "Carasa",
        href: "/program/presmacareer/carasa",
        desc: "Career & Study Assessment untuk pemetaan potensi siswa.",
      },
      {
        name: "Kelas Industri",
        href: "/program/presmacareer/kelas",
        desc: "Pembelajaran intensif kurikulum mitra industri ternama.",
      },
      {
        name: "Dashboard Siswa",
        href: "/program/presmacareer/dashboard",
        desc: "Portal monitoring portofolio dan progres kesiapan karier.",
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
        name: "Jejak Aktivitas & Perjalanan",
        href: "/#our-journey-section",
        desc: "Dokumentasi kegiatan akademik, ekstrakurikuler, dan komunitas.",
      },
    ],
  },
  {
    name: "Berita",
    href: "/news",
    description: "Kabar terbaru, agenda kegiatan, dan artikel edukasi terkini.",
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
        name: "Kontak & Layanan",
        href: "/contact",
        desc: "Informasi narahubung, konsultasi pendaftaran, dan lokasi sekolah.",
      },
    ],
  },
];
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
    name: "Tentang Kami",
    href: "/tentang",
    description:
      "Mengenal lebih dekat SMK Prestasi Prima.",

    subLinks: [
      {
        name: "Profil Sekolah",
        href: "/tentang/profile",
        desc:
          "Sejarah, visi, misi, dan identitas sekolah.",
      },
      {
        name: "Sambutan Yayasan",
        href: "/sambutan",
        desc:
          "Pesan dan arah pendidikan dari yayasan.",
      },
      {
        name: "Fasilitas",
        href: "/tentang/fasilitas",
        desc:
          "Sarana dan ruang pembelajaran sekolah.",
      },
    ],
  },

  {
    name: "Program",
    href: "/program",
    description:
      "Program pembelajaran dan pengembangan siswa.",

    subLinks: [
      {
        name: "PPLG",
        href: "/tentang/program/pplg",
        desc:
          "Pengembangan Perangkat Lunak dan Gim.",
      },
      {
        name: "TJKT",
        href: "/tentang/program/tjkt",
        desc:
          "Teknik Jaringan Komputer dan Telekomunikasi.",
      },
      {
        name: "DKV",
        href: "/tentang/program/dkv",
        desc:
          "Desain Komunikasi Visual.",
      },
      {
        name: "BCF",
        href: "/tentang/program/bcf",
        desc:
          "Bisnis dan Creative Fashion.",
      },
      {
        name: "Presma Lib",
        href: "/program/presmalib",
        desc:
          "Perpustakaan dan sumber belajar digital.",
      },
      {
        name: "Presma Career",
        href: "/program/presmacareer",
        desc:
          "Eksplorasi karier dan dunia industri.",
      },
      {
        name: "Presma Carasa",
        href: "/program/presmacarasa",
        desc:
          "Career & Study Assessment.",
      },
    ],
  },

  {
    name: "Dokumentasi",
    href: "/dokumentasi",
    description:
      "Cerita, aktivitas, dan karya warga sekolah.",

    subLinks: [
      {
        name: "Prestasi",
        href: "/dokumentasi/prestasi",
        desc:
          "Pencapaian dan prestasi siswa.",
      },
      {
        name: "Ekstrakurikuler",
        href: "/dokumentasi/ekskul",
        desc:
          "Komunitas dan aktivitas siswa.",
      },
      {
        name: "Karya Siswa",
        href: "/dokumentasi/karya",
        desc:
          "Karya, proyek, dan kreativitas siswa.",
      },
    ],
  },

  {
    name: "Berita",
    href: "/news",
    description:
      "Berita dan informasi terbaru sekolah.",
  },

  {
    name: "Pendaftaran",
    href: "/ppdb",
    description:
      "Informasi penerimaan peserta didik baru.",
  },
];
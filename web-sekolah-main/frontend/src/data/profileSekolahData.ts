export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
  badge?: string;
}

export interface MissionItem {
  id: string;
  number: string;
  shortTitle: string;
  desc: string;
  iconName: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
  tag: string;
}

export interface HighlightCard {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
  metric: string;
}

export interface GalleryPhoto {
  id: string;
  label: "CAMPUS" | "LEARNING" | "STUDENT LIFE" | "CREATIVE SPACE" | "TECHNOLOGY";
  title: string;
  image: string;
  aspect: string;
}

export interface AlumniStoryItem {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  quote: string;
  major: string;
  gradYear: string;
}

export const PROFILE_DATA = {
  hero: {
    badgeTop: "SMK PUSAT KEUNGGULAN",
    badgeSecondary: "TECHNOLOGY & INNOVATION",
    headlinePart1: "Mencetak Pionir",
    headlinePart2: "Era Digital.",
    supportingHeadline: "Integrasi teknologi dan integritas karakter.",
    desc: "Kami tidak hanya mengajar teknis, kami membentuk visi untuk menghadapi masa depan teknologi.",
    heroImage: "/images/gedung.png",
    fallbackHeroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    statsPreview: [
      { label: "Status Akreditasi", value: "Akreditasi A Unggul" },
      { label: "Tahun Berdiri", value: "2011" },
      { label: "Kemitraan Industri", value: "100+ Mitra DUDI" },
    ],
  },

  identity: {
    label: "ABOUT PRESTASI PRIMA",
    headline: "Lebih dari sekadar sekolah kejuruan.",
    descParagraph1:
      "SMK Prestasi Prima didirikan sebagai wujud komitmen nyata menghadirkan pendidikan vokasi berkualitas unggul di Jakarta Timur. Kami memadukan kurikulum berstandar industri dengan penguatan karakter nilai-nilai luhur Pancasila.",
    descParagraph2:
      "Dengan 4 kompetensi keahlian strategis di bidang teknologi informasi dan industri kreatif (PPLG, DKV, TJKT, dan BCF), kami mendidik siswa menjadi tenaga profesional yang adaptif, inovatif, dan siap bersaing di panggung nasional maupun global.",
    stats: [
      {
        value: "2011",
        label: "Tahun Berdiri",
        sublabel: "Lebih dari satu dekade mencetak lulusan berprestasi",
        badge: "ESTABLISHED",
      },
      {
        value: "4",
        label: "Program Keahlian",
        sublabel: "PPLG, DKV, TJKT, dan Broadcasting Film",
        badge: "MAJORS",
      },
      {
        value: "INDUSTRY",
        label: "Focused Learning",
        sublabel: "Kurikulum terintegrasi sertifikasi kompetensi industri",
        badge: "CURRICULUM",
      },
      {
        value: "DIGITAL",
        label: "Integrated Education",
        sublabel: "Ekosistem smart campus berbasis teknologi mutakhir",
        badge: "ECOSYSTEM",
      },
    ] as StatItem[],
  },

  visionMission: {
    label: "LANDASAN INSTITUSI",
    sectionTitle: "Visi & Misi Sekolah",
    visionCardTitle: "Visi Resmi SMK Prestasi Prima",
    visionText:
      "Mewujudkan Lulusan yang Unggul, Terpercaya, Berkarakter Pancasila dan Memiliki Kompetensi Dunia Usaha/Industri Global.",
    visionQuote: "“If better is possible, good is not enough.”",
    missions: [
      {
        id: "misi-01",
        number: "01",
        shortTitle: "Pendidikan Karakter Pancasila",
        desc: "Menumbuhkembangkan keimanan dan ketaqwaan kepada Tuhan Yang Maha Esa serta membentuk budi pekerti luhur berlandaskan Profil Pelajar Pancasila.",
        iconName: "heart",
      },
      {
        id: "misi-02",
        number: "02",
        shortTitle: "Pembelajaran Berbasis Riset & Proyek",
        desc: "Menyelenggarakan proses pembelajaran berbasis proyek nyata (Project-Based Learning), riset teknologi terapan, dan pemecahan masalah riil industri.",
        iconName: "code",
      },
      {
        id: "misi-03",
        number: "03",
        shortTitle: "Penyelarasan Kurikulum DUDI",
        desc: "Mengembangkan kurikulum operasional sekolah yang diselaraskan secara berkelanjutan dengan kebutuhan dunia usaha dan dunia industri (DUDI).",
        iconName: "briefcase",
      },
      {
        id: "misi-04",
        number: "04",
        shortTitle: "Pendidik Bersertifikasi Profesi",
        desc: "Meningkatkan profesionalisme dan kompetensi tenaga pendidik melalui program magang industri dan sertifikasi keahlian standar nasional/internasional.",
        iconName: "award",
      },
      {
        id: "misi-05",
        number: "05",
        shortTitle: "Fasilitas Berstandar Industri",
        desc: "Menyediakan sarana dan prasarana laboratorium komputer, studio penyiaran, dan bengkel teknologi berstandar industri modern.",
        iconName: "cpu",
      },
      {
        id: "misi-06",
        number: "06",
        shortTitle: "Kemitraan Strategis & Global",
        desc: "Membangun jejaring kerjasama strategis dengan institusi pendidikan tinggi terkemuka dan industri skala nasional hingga internasional.",
        iconName: "globe",
      },
      {
        id: "misi-07",
        number: "07",
        shortTitle: "Kewirausahaan & Technopreneurship",
        desc: "Membekali peserta didik dengan pola pikir wirausaha digital (technopreneurship) untuk menciptakan lapangan kerja mandiri.",
        iconName: "trending-up",
      },
    ] as MissionItem[],
  },

  history: {
    label: "JEJAK PERJALANAN",
    title: "Perjalanan Sejarah",
    subtitle:
      "Berdiri dengan visi mencetak talenta digital bermutu tinggi, SMK Prestasi Prima terus bertransformasi menjadi pusat keunggulan vokasi di Jakarta.",
    milestones: [
      {
        year: "2011",
        title: "Pendirian Awal",
        subtitle: "Peletakan Fondasi Institusi",
        desc: "Pendirian resmi SMK Prestasi Prima di bawah Yayasan Wahana Prestasi Prima dengan tekad memajukan vokasi teknologi di Jakarta Timur.",
        icon: "flag",
        tag: "Inisiasi",
      },
      {
        year: "2013",
        title: "Standarisasi Kurikulum",
        subtitle: "Integrasi Kebutuhan Industri",
        desc: "Penguatan silabus kompetensi kejuruan berbasis kebutuhan nyata industri dan pembukaan laboratorium praktik pertama.",
        icon: "check-circle",
        tag: "Konsolidasi",
      },
      {
        year: "2015",
        title: "Ekspansi Fasilitas",
        subtitle: "Pembangunan Studio & Lab Modern",
        desc: "Perluasan gedung kampus, peresmian studio multimedia broadcasting, studio fotografi DKV, dan penambahan kapasitas kelas.",
        icon: "home",
        tag: "Infrastruktur",
      },
      {
        year: "2018",
        title: "Digitalisasi Pembelajaran",
        subtitle: "Era Smart Campus",
        desc: "Implementasi Learning Management System (LMS) digital mandiri, pengadaan jaringan fiber optic terpadu, dan sertifikasi vendor IT.",
        icon: "wifi",
        tag: "Teknologi",
      },
      {
        year: "2021",
        title: "Akreditasi A Unggul",
        subtitle: "Pengakuan Mutu Tertinggi",
        desc: "Meraih predikat Akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) dengan nilai keunggulan menyeluruh.",
        icon: "star",
        tag: "Prestasi",
      },
      {
        year: "2025",
        title: "Transformasi Pusat Keunggulan",
        subtitle: "SMK PK & Technopreneur Hub",
        desc: "Akselerasi sebagai SMK Pusat Keunggulan dengan kurikulum kecerdasan buatan, inkubator karya siswa, dan ekspansi kemitraan global.",
        icon: "zap",
        tag: "Masa Depan",
      },
    ] as TimelineMilestone[],
  },

  highlights: {
    label: "KEUNGGULAN UTAMA",
    title: "Karakteristik Institusi",
    subtitle: "Empat pilar komprehensif yang membedakan pengalaman belajar di SMK Prestasi Prima.",
    cards: [
      {
        id: "hl-1",
        title: "Industry-Standard Curriculum",
        subtitle: "Kurikulum Selaras Industri",
        desc: "Materi pembelajaran divalidasi langsung oleh praktisi industri terkemuka guna menjamin relevansi skill teknis masa kini.",
        icon: "layers",
        metric: "100% Selaras DUDI",
      },
      {
        id: "hl-2",
        title: "Technology Integrated",
        subtitle: "Infrastruktur Digital Penuh",
        desc: "Didukung ruang lab high-performance, koneksi fiber optik gigabit, dan platform pembelajaran daring modern.",
        icon: "cpu",
        metric: "Dedicated Fiber Optic",
      },
      {
        id: "hl-3",
        title: "Project-Based Learning",
        subtitle: "Pengalaman Nyata Lapangan",
        desc: "Siswa menghasilkan portofolio riil berupa aplikasi, konten siaran, karya desain, dan jaringan yang siap dipresentasikan.",
        icon: "terminal",
        metric: "Portofolio Teruji",
      },
      {
        id: "hl-4",
        title: "Character Development",
        subtitle: "Pondasi Moral & Integritas",
        desc: "Membentuk soft skill unggul: disiplin tinggi, etika kerja profesional, daya juang pantang menyerah, dan jiwa kepemimpinan.",
        icon: "shield",
        metric: "Profil Pancasila",
      },
    ] as HighlightCard[],
  },

  gallery: {
    label: "CAMPUS LIFE",
    title: "Tempat Belajar, Tempat Bertumbuh.",
    subtitle: "Menyusuri denyut aktivitas, sarana modern, dan kehangatan komunitas akademik di kampus SMK Prestasi Prima.",
    photos: [
      {
        id: "gal-1",
        label: "CAMPUS",
        title: "Gedung Kampus & Lapangan Utama",
        image: "/images/gedung.png",
        aspect: "aspect-[16/10]",
      },
      {
        id: "gal-2",
        label: "LEARNING",
        title: "Laboratorium Komputer Software Engineering",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        aspect: "aspect-square",
      },
      {
        id: "gal-3",
        label: "TECHNOLOGY",
        title: "Praktek Server & Jaringan Komputer",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
        aspect: "aspect-square",
      },
      {
        id: "gal-4",
        label: "CREATIVE SPACE",
        title: "Studio Siaran & Kamera Broadcasting",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
        aspect: "aspect-[16/10]",
      },
      {
        id: "gal-5",
        label: "STUDENT LIFE",
        title: "Aktivitas Kolaborasi & Diskusi Siswa",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        aspect: "aspect-square",
      },
      {
        id: "gal-6",
        label: "CREATIVE SPACE",
        title: "Eksplorasi Karya Desain Komunikasi Visual",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
        aspect: "aspect-square",
      },
    ] as GalleryPhoto[],
  },

  principal: {
    label: "LEADERSHIP & VISION",
    title: "Pesan Kepala Sekolah",
    name: "Hendry Kurniawan, S.Kom., M.I.Kom.",
    role: "Kepala Sekolah",
    school: "SMK Prestasi Prima",
    photo: "/images/hero-kepsek.png",
    fallbackPhoto: "/images/kepala-sekolah.png",
    greeting: "Assalamu’alaikum Warahmatullahi Wabarakatuh.",
    quote:
      "Pendidikan di era inovasi bukan tentang mengikuti arus, melainkan menciptakan teknologi dan karakter yang mengubah arah masa depan.",
    paragraphs: [
      "Selamat datang di portal profil resmi SMK Prestasi Prima. Pendidikan kejuruan di abad ke-21 menuntut lompatan paradigma yang mendalam: kita tidak hanya mempersiapkan peserta didik untuk mengisi lowongan pekerjaan yang ada hari ini, melainkan mendidik mereka agar memiliki ketangguhan intelektual, kepemimpinan moral, dan kemandirian berkarya untuk masa depan.",
      "Melalui integrasi kurikulum mutakhir berbasis industri, sarana laboratorium canggih, serta pembudayaan karakter Profil Pelajar Pancasila, kami berkomitmen mendampingi setiap siswa mengenali potensi terdalamnya. Kami mendidik anak-anak kita agar berani berpikir kritis, kreatif memecahkan masalah, dan memiliki etos kerja yang dihormati di tingkat global.",
      "Mari bersama-sama bersinergi mewujudkan generasi Indonesia emas yang unggul, terpercaya, dan berprestasi prima.",
    ],
    closing: "Wassalamu’alaikum Warahmatullahi Wabarakatuh.",
  },

  video: {
    label: "EXPLORE CAMPUS",
    title: "Tonton Eksplorasi.",
    subtitle: "Video Profil SMK Prestasi Prima",
    desc: "Menyaksikan secara langsung lingkungan pembelajaran, fasilitas berstandar industri, dan semangat kolaborasi civitas akademika kami.",
    videoSrc: "/assets/hero.webm",
    poster: "/images/gedung.png",
  },

  testimonials: [
    {
      id: "testi-1",
      name: "Rizky Firmansyah",
      role: "Frontend Engineer",
      company: "Tech Startup Jakarta",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      quote:
        "Di SMK Prestasi Prima, saya belajar bukan cuma teori sintaks koding, tapi bagaimana alur kerja agile di perusahaan nyata. Portofolio sekolah yang saya bangun menjadi kunci langsung diterima kerja sebelum wisuda.",
      major: "PPLG (RPL)",
      gradYear: "Alumni 2022",
    },
    {
      id: "testi-2",
      name: "Annisa Larasati",
      role: "Visual Content Creator & Editor",
      company: "Production House Creative",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
      quote:
        "Fasilitas studio penyiaran dan kamera di sekolah benar-benar sesuai dengan alat yang dipakai tim broadcast profesional. Kepercayaan diri saya terbentuk dari jam terbang proyek nyata di sini.",
      major: "Broadcasting Film",
      gradYear: "Alumni 2023",
    },
    {
      id: "testi-3",
      name: "Dimas Aditya Pratama",
      role: "Mahasiswa Teknik Informatika",
      company: "Institut Teknologi Sepuluh Nopember",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      quote:
        "Dasar jaringan dan sertifikasi yang saya dapatkan selama di TJKT membuat perkuliahan di perguruan tinggi negeri terasa jauh lebih mudah dan aplikatif. Guru-gurunya sangat suportif.",
      major: "TJKT",
      gradYear: "Alumni 2021",
    },
  ] as AlumniStoryItem[],

  cta: {
    badge: "PENDAFTARAN PESERTA DIDIK BARU",
    headline: "Bangun Masa Depanmu Bersama Prestasi Prima.",
    desc: "Belajar, berkarya, dan berkembang dalam lingkungan pendidikan yang memadukan teknologi, kompetensi, dan karakter.",
    primaryBtnLabel: "Daftar Sekarang",
    primaryBtnUrl: "/ppdb",
    secondaryBtnLabel: "Jelajahi Program Keahlian",
    secondaryBtnUrl: "/program",
  },
};

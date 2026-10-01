export interface SkillItem {
  icon: string;
  name: string;
  desc: string;
  tag?: string;
}

export interface HighlightPoint {
  title: string;
  desc: string;
}

export interface FeatureHighlight {
  badge: string;
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
  points: HighlightPoint[];
}

export interface PracticeItem {
  icon: string;
  title: string;
  desc: string;
}

export interface ToolItem {
  name: string;
  category: string;
  iconType: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  desc: string;
  image: string;
  tags: string[];
}

export interface CareerItem {
  icon: string;
  title: string;
  desc: string;
  demandTag?: string;
}

export interface MajorData {
  id: "pplg" | "dkv" | "tjkt" | "bcf";
  name: string;
  fullName: string;
  heroFocus: string;
  shortDesc: string;
  heroImage: string;
  logoIcon: string;
  accentColor: string;
  stats: { label: string; value: string }[];
  skills: SkillItem[];
  featureHighlight: FeatureHighlight;
  practiceLearning: PracticeItem[];
  tools: ToolItem[];
  projects: ProjectItem[];
  careers: CareerItem[];
}

export const MAJORS_DATA: Record<string, MajorData> = {
  pplg: {
    id: "pplg",
    name: "PPLG",
    fullName: "Pengembangan Perangkat Lunak dan Gim",
    heroFocus: "Fokus pada rekayasa perangkat lunak modern, pengembangan website, aplikasi mobile, cloud system, dan logika gim interaktif berstandar industri.",
    shortDesc: "Mencetak software engineer, web/mobile developer, dan creative game creator yang berintegritas dan siap bersaing di kancah industri teknologi global.",
    heroImage: "/images/hero-pplg.jpg",
    logoIcon: "/images/majors/pplg.png",
    accentColor: "#F96501",
    stats: [
      { label: "Kurikulum", value: "Merdeka Berbasis Industri" },
      { label: "Sertifikasi", value: "BNSP & Vendor IT" },
      { label: "Lab Komputer", value: "Spesifikasi High-End" },
      { label: "Penyaluran Kerja", value: "Mitra Perusahaan IT" },
    ],
    skills: [
      {
        icon: "code",
        name: "Programming Fundamentals",
        desc: "Menguasai algoritma pemrograman, logika komputasional, struktur data, dan paradigma Object-Oriented Programming (OOP).",
        tag: "Core Logic",
      },
      {
        icon: "globe",
        name: "Web Development",
        desc: "Membangun website responsif dan scalable menggunakan HTML5, modern CSS/Tailwind, JavaScript, hingga fullstack framework.",
        tag: "Fullstack",
      },
      {
        icon: "smartphone",
        name: "Mobile App Development",
        desc: "Merancang dan mendevelop aplikasi mobile berbasis Android dan cross-platform dengan performa optimal.",
        tag: "Mobile",
      },
      {
        icon: "database",
        name: "Database Management",
        desc: "Perancangan database relasional (SQL) dan non-relasional, normalisasi data, query optimasi, serta integrasi RESTful API.",
        tag: "Data & Backend",
      },
      {
        icon: "layout",
        name: "UI/UX Design",
        desc: "Riset pengguna, wireframing, perancangan design system, dan interactive prototyping yang menitikberatkan usability.",
        tag: "Product Design",
      },
      {
        icon: "gamepad",
        name: "Game Development",
        desc: "Pengembangan gameplay, asset 2D/3D integration, game physics, audio, dan mekanik game interaktif.",
        tag: "Interactive Tech",
      },
    ],
    featureHighlight: {
      badge: "Penerapan Nyata di Laboratorium",
      title: "Membangun Ekosistem Aplikasi Nyata Sejak Bangku Sekolah",
      desc: "Di SMK Prestasi Prima, pembelajaran PPLG disimulasikan seperti iklim kerja software house profesional. Siswa tidak hanya menulis baris kode teoritis, namun mengimplementasikan project riil mulai dari requirement gathering, system architecture, coding sprint, hingga deployment.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Siswa PPLG sedang coding dan merancang software di lab komputer",
      points: [
        {
          title: "Standard Code Review & Version Control",
          desc: "Setiap tugas dan project dikelola melalui Git dan GitHub untuk melatih alur kerja tim standar industri.",
        },
        {
          title: "Agile & Scrum Workflow",
          desc: "Membiasakan siswa bekerja dalam sprint terstruktur, daily standup, dan presentasi milestone produk.",
        },
        {
          title: "Portofolio Aplikasi Teruji",
          desc: "Lulusan dibekali repositori kode dan portofolio live web/app yang siap ditunjukkan kepada rekruter industri.",
        },
      ],
    },
    practiceLearning: [
      {
        icon: "terminal",
        title: "Praktik Langsung (Hands-on Lab)",
        desc: "Siswa menghabiskan 70% waktu pembelajaran di laboratorium komputer berkecepatan tinggi dengan skenario pemecahan masalah riil.",
      },
      {
        icon: "briefcase",
        title: "Project-Based Learning (PBL)",
        desc: "Siswa mengerjakan proyek nyata pesanan mitra industri dan solusi digital untuk kebutuhan operasional lingkungan sekolah.",
      },
      {
        icon: "cpu",
        title: "Teknologi Industri Mutakhir",
        desc: "Kurikulum selalu diperbarui mengikuti stack teknologi industri terkini seperti JavaScript modern, TypeScript, Python, dan Cloud services.",
      },
      {
        icon: "users",
        title: "Kolaborasi Tim & Presentasi",
        desc: "Membentuk soft skills krusial seperti komunikasi teknis, kemampuan membedah masalah, kerja sama tim, dan kepemimpinan proyek.",
      },
    ],
    tools: [
      { name: "VS Code", category: "IDE & Editor", iconType: "code" },
      { name: "Git & GitHub", category: "Version Control", iconType: "git" },
      { name: "HTML & CSS3", category: "Markup & Styling", iconType: "globe" },
      { name: "JavaScript / TS", category: "Language", iconType: "terminal" },
      { name: "React & Next.js", category: "Web Framework", iconType: "react" },
      { name: "Node.js & Express", category: "Backend Runtime", iconType: "server" },
      { name: "MySQL / Postgre", category: "Database", iconType: "database" },
      { name: "Figma", category: "UI/UX Prototype", iconType: "figma" },
    ],
    projects: [
      {
        title: "School Management System",
        category: "Web Application",
        desc: "Platform portal informasi sekolah, presensi digital terintegrasi, dan rekap nilai siswa berbasis cloud.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        tags: ["React", "Node.js", "Tailwind CSS", "MySQL"],
      },
      {
        title: "Presma Career Mobile Hub",
        category: "Mobile Application",
        desc: "Aplikasi Android penelusuran lowongan magang, asesmen bakat, dan portofolio keahlian siswa SMK.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
        tags: ["React Native", "REST API", "UI/UX"],
      },
      {
        title: "Echoes of Nusantara",
        category: "2D Adventure Game",
        desc: "Gim petualangan edukatif bermuatan sejarah lokal Indonesia dengan mekanik puzzle dan grafis pixel art.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        tags: ["Game Engine", "Pixel Art", "C# Logic"],
      },
      {
        title: "IoT Smart Attendance Scanner",
        category: "Software & IoT",
        desc: "Sistem presensi cepat menggunakan QR code dinamis dan face detection untuk efisiensi pintu masuk sekolah.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        tags: ["Python", "OpenCV", "Cloud DB"],
      },
    ],
    careers: [
      {
        icon: "globe",
        title: "Web Developer (Frontend & Fullstack)",
        desc: "Merancang, membangun, dan memelihara aplikasi web modern untuk perusahaan rintisan hingga korporasi besar.",
        demandTag: "Kebutuhan Tinggi",
      },
      {
        icon: "terminal",
        title: "Software Engineer",
        desc: "Mengembangkan perangkat lunak sistem, arsitektur backend, dan solusi otomasi bisnis yang andal.",
        demandTag: "High Demand",
      },
      {
        icon: "smartphone",
        title: "Mobile App Developer",
        desc: "Mengembangkan aplikasi mobile berbasis Android/iOS yang digunakan oleh ribuan hingga jutaan pengguna aktif.",
        demandTag: "Kebutuhan Tinggi",
      },
      {
        icon: "gamepad",
        title: "Game Developer / Programmer",
        desc: "Membangun mekanik interaktif, gameplay logic, dan pengujian gim untuk studio game domestik maupun internasional.",
        demandTag: "Industri Kreatif",
      },
      {
        icon: "layout",
        title: "UI/UX Product Designer",
        desc: "Meneliti kebutuhan pengguna dan menciptakan desain interface produk digital yang intuitif dan menarik secara estetika.",
        demandTag: "Popular",
      },
      {
        icon: "database",
        title: "Database Administrator / Backend",
        desc: "Mengelola ketersediaan, integritas data, dan keamanan infrastruktur basis data perusahaan.",
        demandTag: "Stabil & Penting",
      },
    ],
  },

  dkv: {
    id: "dkv",
    name: "DKV",
    fullName: "Desain Komunikasi Visual",
    heroFocus: "Fokus pada kekuatan komunikasi visual, desain grafis editorial, branding korporat, ilustrasi digital, UI/UX, dan fotografi komersial.",
    shortDesc: "Melahirkan desainer visual inovatif yang mampu mengubah ide abstrak menjadi pesan visual yang komunikatif, estetis, dan berdampak kuat di media modern.",
    heroImage: "/images/hero-dkv.png",
    logoIcon: "/images/majors/dkv.png",
    accentColor: "#F96501",
    stats: [
      { label: "Kurikulum", value: "Standar Industri Kreatif" },
      { label: "Studio Desain", value: "Workstation iMac & PC" },
      { label: "Sertifikasi", value: "Adobe & BNSP Grafis" },
      { label: "Pameran Karya", value: "Exhibition Tahunan" },
    ],
    skills: [
      {
        icon: "pen-tool",
        name: "Graphic Design",
        desc: "Penguasaan prinsip tata letak visual (layout), hierarki tipografi, komposisi warna, dan format publikasi cetak maupun digital.",
        tag: "Core Design",
      },
      {
        icon: "palette",
        name: "Digital Illustration",
        desc: "Eksplorasi pembuatan gambar ilustrasi digital, karakter desain, storyboard animasi, dan vector art menggunakan drawing tablet.",
        tag: "Creative Art",
      },
      {
        icon: "tag",
        name: "Branding & Identity",
        desc: "Membangun identitas merek yang kohesif: perancangan logo, brand guidelines, kemasan produk (packaging), dan corporate collateral.",
        tag: "Brand Strategy",
      },
      {
        icon: "layout",
        name: "UI/UX Design",
        desc: "Merancang antarmuka aplikasi dan website yang estetik, konsisten, dan mudah digunakan oleh target audiens.",
        tag: "Digital Product",
      },
      {
        icon: "camera",
        name: "Photography & Lighting",
        desc: "Penguasaan teknik kamera manual, tata cahaya studio foto, komposisi framing, dan post-processing foto komersial.",
        tag: "Commercial Media",
      },
      {
        icon: "film",
        name: "Visual Communication",
        desc: "Menerjemahkan pesan strategi pemasaran menjadi motion graphics, poster kampanye publik, dan materi konten digital interaktif.",
        tag: "Storytelling",
      },
    ],
    featureHighlight: {
      badge: "Praktik Studio Desain Nyata",
      title: "Dari Sketsa Manual Hingga Kampanye Visual Profesional",
      desc: "Siswa DKV SMK Prestasi Prima ditempa dalam studio desain modern yang mensimulasikan agensi periklanan dan branding studio. Setiap siswa dilatih berpikir kritis dalam merumuskan konsep desain, memilih tone-of-voice visual, dan mengeksekusi karya dengan software standar industri dunia.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Siswa DKV sedang mendesain poster dan ilustrasi di workstation komputer",
      points: [
        {
          title: "Studio Foto Komersial Lengkap",
          desc: "Dilengkapi lighting studio profesional, background cyclorama, dan perlengkapan pemotretan produk komersial.",
        },
        {
          title: "Pameran Desain & Gelar Karya",
          desc: "Karya siswa dipamerkan secara terbuka kepada publik dan praktisi industri untuk membangun jejaring karir.",
        },
        {
          title: "Brief Proyek Klien Industri Nyata",
          desc: "Siswa terbiasa mengerjakan brief desain dari UMKM dan mitra industri sebagai portofolio profesional.",
        },
      ],
    },
    practiceLearning: [
      {
        icon: "pen-tool",
        title: "Praktik Langsung di Workstation",
        desc: "Setiap siswa mengasah kemampuan menggunakan PC performa tinggi dan pen tablet display untuk eksplorasi visual maksimal.",
      },
      {
        icon: "briefcase",
        title: "Project-Based Learning",
        desc: "Mengerjakan proyek kampanye visual menyeluruh, mulai dari perancangan identitas brand hingga materi promosi multi-channel.",
      },
      {
        icon: "layers",
        title: "Standard Software Industri",
        desc: "Menggunakan ekosistem Adobe Creative Cloud (Photoshop, Illustrator, InDesign) dan tools kolaborasi modern seperti Figma.",
      },
      {
        icon: "eye",
        title: "Kritik Desain & Presentasi",
        desc: "Melatih rasa percaya diri siswa saat mempresentasikan ide, argumentasi pemilihan visual, dan menerima evaluasi konstruktif.",
      },
    ],
    tools: [
      { name: "Adobe Photoshop", category: "Raster & Retouching", iconType: "photoshop" },
      { name: "Adobe Illustrator", category: "Vector Design", iconType: "illustrator" },
      { name: "Figma", category: "UI/UX Design", iconType: "figma" },
      { name: "Adobe InDesign", category: "Editorial & Layout", iconType: "indesign" },
      { name: "After Effects", category: "Motion Graphics", iconType: "film" },
      { name: "Blender 3D", category: "3D Asset Modeling", iconType: "box" },
      { name: "Drawing Tablet", category: "Digital Illustration", iconType: "pen-tool" },
      { name: "DSLR / Mirrorless", category: "Photo Equipment", iconType: "camera" },
    ],
    projects: [
      {
        title: "Rebranding UMKM Kuliner Tradisional",
        category: "Brand Identity",
        desc: "Paket identitas visual menyeluruh: logo baru, buku panduan merek, packaging eco-friendly, dan seragam pegawai.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop",
        tags: ["Branding", "Packaging", "Illustrator"],
      },
      {
        title: "Poster Seri Kampanye Lingkungan Hidup",
        category: "Graphic Design",
        desc: "Koleksi poster sosial persuasif dengan pendekatan tipografi ekspresif dan ilustrasi digital bertema hemat energi.",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
        tags: ["Typography", "Social Campaign", "Photoshop"],
      },
      {
        title: "EcoGrocery App UI/UX Prototype",
        category: "Product Design",
        desc: "Perancangan wireframe dan purwarupa interaktif aplikasi belanja tanpa sampah plastik dengan design system modern.",
        image: "https://images.unsplash.com/photo-1581291518655-9523c932deda?q=80&w=800&auto=format&fit=crop",
        tags: ["Figma", "Design System", "Mobile UX"],
      },
      {
        title: "Ilustrasi Digital Kisah Pahlawan",
        category: "Digital Illustration",
        desc: "Buku cerita bergambar digital dengan goresan ilustrasi orisinal untuk mengenalkan legenda pahlawan nusantara kepada anak.",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
        tags: ["Illustration", "Concept Art", "Digital Pen"],
      },
    ],
    careers: [
      {
        icon: "pen-tool",
        title: "Graphic Designer",
        desc: "Merancang materi grafis promosi, media sosial, dan materi publikasi cetak/digital di perusahaan agensi atau in-house.",
        demandTag: "Kebutuhan Luas",
      },
      {
        icon: "layout",
        title: "UI/UX Designer",
        desc: "Mendesain interface aplikasi dan website yang memudahkan jutaan pengguna dalam berinteraksi dengan produk digital.",
        demandTag: "Gaji Tinggi",
      },
      {
        icon: "palette",
        title: "Digital Illustrator",
        desc: "Menciptakan karya seni ilustrasi untuk buku, periklanan, merchandise, industri game, dan komik web.",
        demandTag: "Kreatif & Fleksibel",
      },
      {
        icon: "tag",
        title: "Brand & Packaging Specialist",
        desc: "Membantu merek membangun reputasi visual dan merancang kemasan produk yang memikat di rak belanja.",
        demandTag: "Strategis",
      },
      {
        icon: "camera",
        title: "Commercial Photographer",
        desc: "Melakukan pemotretan profesional untuk katalog produk e-commerce, kuliner, fesyen, dan periklanan.",
        demandTag: "Freelance & Studio",
      },
      {
        icon: "film",
        title: "Motion Designer",
        desc: "Menghidupkan elemen grafis menjadi animasi dinamis untuk iklan video, bumper YouTube, dan presentasi produk.",
        demandTag: "Trend Naik",
      },
    ],
  },

  tjkt: {
    id: "tjkt",
    name: "TJKT",
    fullName: "Teknik Jaringan Komputer dan Telekomunikasi",
    heroFocus: "Fokus pada arsitektur jaringan komputer modern, routing & switching, administrasi server, keamanan siber (cybersecurity), fiber optic, dan cloud infrastructure.",
    shortDesc: "Mempersiapkan network engineer andal yang menguasai fondasi konektivitas data, perlindungan sistem informasi, dan pemeliharaan server tingkat korporasi.",
    heroImage: "/images/hero-tjkt.jpg",
    logoIcon: "/images/majors/tjkt.png",
    accentColor: "#F96501",
    stats: [
      { label: "Kurikulum", value: "Cisco & MikroTik Academy" },
      { label: "Sertifikasi", value: "MTCNA & CCNA Ready" },
      { label: "Lab Jaringan", value: "Rack Server & Fiber Optic" },
      { label: "Konektivitas", value: "Dedicated High-Speed Fiber" },
    ],
    skills: [
      {
        icon: "share-2",
        name: "Computer Networking",
        desc: "Memahami model OSI 7 layer, TCP/IP, subnetting IP addressing, serta perancangan topologi jaringan skala LAN, MAN, hingga WAN.",
        tag: "Network Core",
      },
      {
        icon: "settings",
        name: "Network Configuration",
        desc: "Konfigurasi perangkat router dan switch manageable (MikroTik, Cisco), manajemen bandwidth, VLAN, VPN, dan QoS.",
        tag: "Configuration",
      },
      {
        icon: "server",
        name: "Server Administration",
        desc: "Instalasi dan pengelolaan server Linux dan Windows: Web Server, DNS Server, DHCP, Database, dan File Sharing terpusat.",
        tag: "Systems",
      },
      {
        icon: "shield",
        name: "Cybersecurity Fundamentals",
        desc: "Pencegahan serangan peretasan, implementasi firewall stateful, filtering paket data, SSL/TLS security, dan hardening server.",
        tag: "Security",
      },
      {
        icon: "cpu",
        name: "Hardware & Troubleshooting",
        desc: "Perakitan komputer server dan workstation, troubleshooting perangkat keras, crimping kabel UTP, dan instalasi konektor.",
        tag: "Hardware",
      },
      {
        icon: "cloud",
        name: "Cloud & Fiber Optic Infrastructure",
        desc: "Penyambungan kabel serat optik (splicing), pengukuran redaman OTDR, serta pengenalan dasar virtualisasi dan cloud computing.",
        tag: "Infrastructure",
      },
    ],
    featureHighlight: {
      badge: "Praktik Laboratorium Server Nyata",
      title: "Mengelola Jaringan Nyata dengan Perangkat Standar Data Center",
      desc: "Di lab TJKT SMK Prestasi Prima, siswa belajar langsung memprogram router, switch enterprise, dan server rack fisik. Pengalaman langsung ini membekali siswa dengan intuisi teknis yang tinggi dalam mengatasi kendala konektivitas data korporasi.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Siswa TJKT sedang merakit server dan konfigurasi router di lab jaringan",
      points: [
        {
          title: "MikroTik & Cisco Certified Training",
          desc: "Materi dipersiapkan langsung untuk menempuh sertifikasi internasional resmi (MTCNA dan Cisco Certified Associate).",
        },
        {
          title: "Peralatan Splicing Fiber Optic Mandiri",
          desc: "Siswa dilatih mengoperasikan alat fusionsplicer presisi tinggi untuk instalasi jaringan kabel serat optik.",
        },
        {
          title: "Simulasi Jaringan Kompleks & Live Lab",
          desc: "Mengombinasikan perangkat keras fisik dengan simulasi canggih Cisco Packet Tracer dan GNS3/EVE-NG.",
        },
      ],
    },
    practiceLearning: [
      {
        icon: "server",
        title: "Praktik Langsung Rack Server",
        desc: "Siswa berinteraksi langsung dengan kabinet server, patch panel, switch manage, dan access point enterprise.",
      },
      {
        icon: "briefcase",
        title: "Project-Based Learning Jaringan",
        desc: "Merancang jaringan intranet sekolah, manajemen hotspot berbayar, dan sistem monitoring lalu lintas data terpusat.",
      },
      {
        icon: "terminal",
        title: "Teknologi Standar Industri",
        desc: "Menguasai command line interface (CLI) Linux server, RouterOS MikroTik, serta pemantauan jaringan dengan Wireshark.",
      },
      {
        icon: "shield-check",
        title: "Simulasi Cyber Defense",
        desc: "Latihan simulasi pencegahan unauthorized access dan audit keamanan sistem jaringan internal.",
      },
    ],
    tools: [
      { name: "Cisco Packet Tracer", category: "Network Simulator", iconType: "share-2" },
      { name: "MikroTik RouterOS", category: "Routing System", iconType: "settings" },
      { name: "Linux Server (Ubuntu)", category: "Server OS", iconType: "terminal" },
      { name: "Wireshark", category: "Packet Analyzer", iconType: "search" },
      { name: "Fusion Splicer", category: "Fiber Optic Tool", iconType: "zap" },
      { name: "Windows Server", category: "Enterprise OS", iconType: "server" },
      { name: "Putty / SSH", category: "Remote Management", iconType: "terminal" },
      { name: "GNS3 / EVE-NG", category: "Virtual Emulator", iconType: "cloud" },
    ],
    projects: [
      {
        title: "Perancangan Topologi Jaringan Kampus Sekolah",
        category: "Network Architecture",
        desc: "Desain jaringan terdistribusi 3 lantai dengan pembagian VLAN per jurusan, redundansi gateway, dan firewall bertingkat.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
        tags: ["Cisco", "VLAN", "Routing", "Subnetting"],
      },
      {
        title: "Enterprise Linux Server Cluster",
        category: "Server Setup",
        desc: "Pembangunan web server Apache, database MySQL, dan Mail server berbasis Ubuntu dengan automated backup harian.",
        image: "https://images.unsplash.com/photo-1597852074816-d933c4d2b988?q=80&w=800&auto=format&fit=crop",
        tags: ["Linux", "Web Server", "DNS", "Security"],
      },
      {
        title: "Sistem Hotspot & Bandwidth Limiter MikroTik",
        category: "Network Management",
        desc: "Implementasi captive portal login dengan voucher terintegrasi dan pembatasan bandwidth otomatis per user.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
        tags: ["MikroTik", "Hotspot", "QoS", "Queue Tree"],
      },
      {
        title: "Instalasi Jaringan Backbone Fiber Optic",
        category: "Infrastructure",
        desc: "Proyek penarikan dan terminasi kabel serat optik antar gedung sekolah dengan hasil uji redaman di bawah batas toleransi.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
        tags: ["Fiber Optic", "Splicing", "OTDR", "FTTH"],
      },
    ],
    careers: [
      {
        icon: "share-2",
        title: "Network Engineer",
        desc: "Merancang, mengimplementasikan, dan mengelola jaringan komputer skala besar di ISP, perbankan, atau perusahaan multinasional.",
        demandTag: "Kebutuhan Vital",
      },
      {
        icon: "server",
        title: "System & Server Administrator",
        desc: "Memastikan kestabilan, performa, dan pemeliharaan server data center serta sistem operasi server perusahaan.",
        demandTag: "Stabil & Penting",
      },
      {
        icon: "shield",
        title: "Cybersecurity Analyst (Junior)",
        desc: "Memonitor sistem keamanan data, menganalisis potensi ancaman peretasan, dan menerapkan langkah pertahanan jaringan.",
        demandTag: "Gaji Tinggi",
      },
      {
        icon: "headphones",
        title: "IT Support & Infrastructure Specialist",
        desc: "Memberikan solusi pemecahan masalah teknis hardware, software, dan konektivitas untuk operasional harian kantor.",
        demandTag: "Kebutuhan Luas",
      },
      {
        icon: "cloud",
        title: "Cloud Infrastructure Associate",
        desc: "Mengonfigurasi dan memonitor layanan cloud computing serta virtualisasi server modern.",
        demandTag: "Masa Depan",
      },
      {
        icon: "zap",
        title: "Fiber Optic Technician",
        desc: "Melakukan pemasangan, pemeliharaan, dan penyambungan kabel fiber optic untuk penyedia layanan internet (ISP).",
        demandTag: "Industri Telekomunikasi",
      },
    ],
  },

  bcf: {
    id: "bcf",
    name: "BCF",
    fullName: "Broadcasting dan Perfilman",
    heroFocus: "Fokus pada industri penyiaran televisi & radio, sinematografi, penyutradaraan, produksi konten live streaming, tata suara audio, dan pascaproduksi film.",
    shortDesc: "Mencetak sineas muda dan tenaga ahli penyiaran kreatif yang menguasai alur kerja produksi audio-visual dari pra-produksi hingga penyiaran publik.",
    heroImage: "/images/hero-bcf.jpg",
    logoIcon: "/images/majors/bcf.png",
    accentColor: "#F96501",
    stats: [
      { label: "Kurikulum", value: "Standar Industri Perfilman" },
      { label: "Studio Siaran", value: "TV & Podcast Studio" },
      { label: "Peralatan", value: "Cinema Camera & Lighting" },
      { label: "Sertifikasi", value: "BNSP Broadcasting" },
    ],
    skills: [
      {
        icon: "tv",
        name: "Broadcasting & Penyiaran",
        desc: "Pengoperasian Master Control Room (MCR), multi-camera switcher, teknik live broadcast, dan tata kelola program siaran.",
        tag: "Broadcasting",
      },
      {
        icon: "video",
        name: "Produksi Video & Film",
        desc: "Tahapan produksi audio-visual menyeluruh: penulisan skenario, breakdown naskah, directing, hingga tata letak sinematografi.",
        tag: "Cinematography",
      },
      {
        icon: "camera",
        name: "Kamera & Tata Cahaya",
        desc: "Penguasaan teknik kamera cinema, pergerakan kamera (gimbal/dolly), pemilahan lensa, dan tata cahaya 3-point lighting studio.",
        tag: "Technical Crew",
      },
      {
        icon: "mic",
        name: "Audio Production & Sound Design",
        desc: "Perekaman suara lapangan (boom mic / clip-on), voice-over, tata suara studio, peredaman noise, dan mixing musik latar.",
        tag: "Audio Engineering",
      },
      {
        icon: "scissors",
        name: "Video Editing & Color Grading",
        desc: "Penyuntingan video non-linear, pemotongan ritme dramatik, visual effect compositing, dan koreksi warna film (color grading).",
        tag: "Post-Production",
      },
      {
        icon: "play-circle",
        name: "Digital Content Production",
        desc: "Pembuatan konten video digital untuk YouTube, podcast profesional, video dokumenter sosial, dan iklan komersial.",
        tag: "Digital Creator",
      },
    ],
    featureHighlight: {
      badge: "Praktik Studio Siaran Nyata",
      title: "Produksi Siaran Langsung dan Sinematografi Berstandar Stasiun TV",
      desc: "Siswa BCF SMK Prestasi Prima belajar langsung di Studio Siaran Televisi dan Studio Podcast berakustik khusus. Dilengkapi dengan kamera profesional multi-angle, video switcher terintegrasi, audio mixer digital, serta lampu studio DMX yang mensimulasikan lingkungan stasiun televisi nasional.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Siswa BCF sedang mengoperasikan kamera studio dan switcher siaran",
      points: [
        {
          title: "Studio TV & Podcast Akustik Kedap Suara",
          desc: "Ruang studio yang dirancang khusus untuk perekaman audio jernih dan produksi visual berkualitas broadcast.",
        },
        {
          title: "Kamera Sinema & Aksesori Stabilizer",
          desc: "Siswa terlatih menggunakan rig kamera profesional, tripod hidrolik, wireless follow focus, dan gimbal 3-axis.",
        },
        {
          title: "Festival Film & Penayangan Bioskop Mini",
          desc: "Setiap karya film pendek siswa diuji dan diputar dalam sesi pemutaran apresiasi bersama praktisi film independen.",
        },
      ],
    },
    practiceLearning: [
      {
        icon: "video",
        title: "Praktik Lapangan & Studio",
        desc: "Siswa bergantian menjalankan peran penting kru produksi: Produser, Sutradara, Kameramen, Penata Suara, hingga Editor.",
      },
      {
        icon: "briefcase",
        title: "Project-Based Learning Nyata",
        desc: "Memproduksi siaran langsung wisuda, event sekolah akbar, program bincang-bincang inspiratif, dan iklan layanan masyarakat.",
      },
      {
        icon: "layers",
        title: "Software Editing Industri",
        desc: "Menguasai perangkat lunak editing standar bioskop dan pertelevisian seperti Adobe Premiere Pro dan DaVinci Resolve.",
      },
      {
        icon: "users",
        title: "Manajemen Kru & Etika Kerja",
        desc: "Melatih kedisiplinan waktu, kekompakan tim di lokasi syuting, komunikasi interpersonal, dan penyelesaian masalah cepat.",
      },
    ],
    tools: [
      { name: "Adobe Premiere Pro", category: "Video Editing", iconType: "film" },
      { name: "DaVinci Resolve", category: "Color Grading & Audio", iconType: "palette" },
      { name: "Adobe After Effects", category: "Motion & VFX", iconType: "layers" },
      { name: "vMix / OBS Studio", category: "Live Broadcast Switcher", iconType: "tv" },
      { name: "Sony / Blackmagic Cinema", category: "Cinema Cameras", iconType: "camera" },
      { name: "Digital Audio Mixer", category: "Sound Hardware", iconType: "mic" },
      { name: "Studio Lighting DMX", category: "Lighting System", iconType: "sun" },
      { name: "Adobe Audition", category: "Audio Post-Production", iconType: "headphones" },
    ],
    projects: [
      {
        title: "Film Pendek: 'Langkah Pertama'",
        category: "Short Narrative Film",
        desc: "Film drama fiksi pendek yang diproduksi penuh oleh siswa, mengangkat tema perjuangan meraih cita-cita di era modern.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
        tags: ["Short Movie", "Directing", "Color Grading"],
      },
      {
        title: "Presma Talk: Siaran Live Streaming Interaktif",
        category: "Multi-Camera Broadcast",
        desc: "Program talkshow live streaming 3 kamera di studio sekolah yang menghadirkan narasumber inspiratif dunia industri.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
        tags: ["Live Streaming", "MCR", "Audio Mixing"],
      },
      {
        title: "Dokumenter Kreatif: Denyut Budaya Jakarta",
        category: "Documentary Video",
        desc: "Liputan dokumenter human interest mengenai warisan kuliner dan komunitas pengrajin seni lokal ibu kota.",
        image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop",
        tags: ["Documentary", "Field Audio", "Cinematography"],
      },
      {
        title: "Video Komersial Iklan Produk Kreatif",
        category: "Commercial Ad",
        desc: "Iklan video dinamis berdurasi 60 detik untuk mempromosikan produk lokal dengan konsep visual sinematik modern.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
        tags: ["Commercial", "Lighting", "Storyboarding"],
      },
    ],
    careers: [
      {
        icon: "scissors",
        title: "Video Editor & Colorist",
        desc: "Merangkai footage menjadi tayangan utuh yang menarik dan menyempurnakan warna film untuk stasiun TV atau rumah produksi.",
        demandTag: "Kebutuhan Tinggi",
      },
      {
        icon: "video",
        title: "Videographer & Cinematographer",
        desc: "Bertanggung jawab atas estetika gambar, tata kamera, dan pencahayaan dalam pembuatan film, iklan, dan event bergengsi.",
        demandTag: "Industri Kreatif",
      },
      {
        icon: "tv",
        title: "Broadcast & MCR Operator",
        desc: "Mengoperasikan sistem kendali siaran langsung di stasiun televisi, platform live streaming, atau agensi event organizer.",
        demandTag: "Broadcasting",
      },
      {
        icon: "mic",
        title: "Sound Recordist & Audio Mixer",
        desc: "Merekam suara berkualitas tinggi di lokasi syuting dan meramu musik latar serta sound effect agar terdengar megah.",
        demandTag: "Spesialisasi",
      },
      {
        icon: "play-circle",
        title: "Content Creator & Producer",
        desc: "Merencanakan, memproduksi, dan mengelola saluran konten digital profesional untuk brand dan media sosial.",
        demandTag: "Sangat Populer",
      },
      {
        icon: "film",
        title: "Director / Assistant Director",
        desc: "Memimpin visi kreatif tim produksi film dan memastikan jalannya syuting sesuai naskah dan perencanaan waktu.",
        demandTag: "Karir Bergengsi",
      },
    ],
  },
};

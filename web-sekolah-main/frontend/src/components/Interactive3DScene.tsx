'use client';

// ==============================================================================
// CARA MENJALANKAN DI TERMINAL/CMD:
// 1. Buka Terminal / CMD
// 2. Ketik perintah berikut untuk masuk ke folder frontend:
//    cd c:\Users\Azzam\Documents\web_sekolah\frontend
// 3. Jalankan server:
//    npm run dev
// ==============================================================================

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- INTERACTIVE BUILDING (INDI TECHNOLOGY) ---
// CATATAN: Jika Anda sudah punya file .glb, komponen MainBuilding ini bisa diganti
// dengan membaca node/mesh dari file 3D Anda.
// Contoh: 
// const { nodes } = useGLTF('/models/campus.glb')
// lalu gunakan <mesh geometry={nodes.Gedung_Indi.geometry} ... />

const navLinks3D = [
  { name: 'BERANDA', href: '/', description: 'Kembali ke halaman utama untuk melihat gambaran umum sekolah kami.' },
  { name: 'TENTANG KAMI', href: '/tentang-kami', description: 'Kenali lebih dekat sejarah, visi, misi, dan nilai-nilai luhur SMK Prestasi Prima.' },
  { name: 'KEHIDUPAN SISWA', href: '/kehidupan-siswa', description: 'Intip keseruan aktivitas, ekstrakurikuler, dan prestasi para siswa kami.' },
  { name: 'INFORMASI', href: '/informasi', description: 'Dapatkan pengumuman terbaru, berita, dan jadwal kegiatan akademik sekolah.' },
  { name: 'DOKUMENTASI', href: '/dokumentasi', description: 'Galeri foto dan video dari berbagai momen spesial dan acara sekolah.' },
  { name: 'PRESMA', href: '/presma', description: 'Jelajahi inovasi dan karya-karya luar biasa dari siswa-siswi Prestasi Prima.' },
  { name: 'PPDB 2026', href: '/ppdb', isButton: true, description: 'Bergabunglah bersama kami! Klik di sini untuk informasi pendaftaran peserta didik baru.' },
];

function SceneController({ onActiveZoneChange }: { onActiveZoneChange: (index: number | null) => void }) {
  const controlsRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useFrame(() => {
    if (controlsRef.current) {
      const angle = controlsRef.current.getAzimuthalAngle();
      let normalizedAngle = angle;
      if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
      
      const segment = (2 * Math.PI) / navLinks3D.length;
      const index = Math.round(normalizedAngle / segment) % navLinks3D.length;
      const targetAngle = index * segment;
      
      // ±15 degrees active zone
      const threshold = 15 * (Math.PI / 180); 
      let diff = Math.abs(normalizedAngle - targetAngle);
      if (diff > Math.PI) diff = 2 * Math.PI - diff; // Handle wrap around
      
      const newIndex = diff < threshold ? index : null;
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        onActiveZoneChange(newIndex);
      }
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={false} 
      enableZoom={false}
      minPolarAngle={Math.PI / 2.2} 
      maxPolarAngle={Math.PI / 2.2} 
      autoRotate 
      autoRotateSpeed={0.5}
      target={[0, 4, 0]} 
    />
  );
}

function MenuOverlay({ activeIndex }: { activeIndex: number | null }) {
  const [displayedIndex, setDisplayedIndex] = useState<number | null>(activeIndex);

  if (activeIndex !== null && activeIndex !== displayedIndex) {
    setDisplayedIndex(activeIndex);
  }

  const menu = displayedIndex !== null ? navLinks3D[displayedIndex] : null;
  const isVisible = activeIndex !== null;

  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 flex flex-col items-center justify-center ${isVisible ? 'opacity-100 scale-100 pointer-events-auto delay-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
       {menu && (
         <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl text-center max-w-[320px] w-[90vw]">
           <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-wide drop-shadow-sm">{menu.name}</h2>
           <p className="text-slate-700 dark:text-slate-300 text-sm mb-6 leading-relaxed font-medium">
             {menu.description}
           </p>
           <Link href={menu.href}>
             <button className={`w-full py-3.5 font-bold rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 ${menu.isButton ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30 hover:shadow-orange-500/50' : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-slate-900/20 hover:shadow-slate-900/30'}`}>
               {menu.isButton ? "Daftar Sekarang" : "Kunjungi Halaman"}
             </button>
           </Link>
         </div>
       )}
    </div>
  );
}

function MainBuilding({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group 
      position={position} 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); setClicked(!clicked); }}
    >
      {/* Main Base */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[4, 8, 3]} />
        <meshStandardMaterial color={hovered ? "#f1f5f9" : "#ffffff"} roughness={0.2} />
      </mesh>
      
      {/* Blue Stripes (Windows) */}
      <mesh position={[0, 4, 1.55]}>
        <boxGeometry args={[0.3, 7, 0.1]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[-1, 4, 1.55]}>
        <boxGeometry args={[0.3, 7, 0.1]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[1, 4, 1.55]}>
        <boxGeometry args={[0.3, 7, 0.1]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* Building Logo/Text */}
      <Text 
        position={[0, 7.5, 1.6]} 
        fontSize={0.4} 
        color="#000000"
        anchorX="center" 
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjQ.ttf"
      >
        INDI TECH
      </Text>

      {/* Outline effect when hovered */}
      {hovered && (
        <mesh position={[0, 4, 0]} scale={1.05}>
          <boxGeometry args={[4, 8, 3]} />
          <meshBasicMaterial color="#fb923c" side={THREE.BackSide} />
        </mesh>
      )}

      {/* HTML Popup Mechanism */}
      {clicked && (
        <Html position={[0, 8.5, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-80 text-center animate-[fade-in-up_0.3s_ease-out_both] border border-sky-100">
            <button 
              onClick={(e) => { e.stopPropagation(); setClicked(false); }}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-2">INDI TECHNOLOGY</h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              We have a great desire to produce innovative technology that will able to improve society and encourage our partners.
            </p>
            <button className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 transition-all">
              Learn More
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

// --- DECORATIVE ELEMENTS ---

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#4ade80" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Rocket() {
  const rocketRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 2;
    }
  });

  return (
    <group ref={rocketRef} position={[6, 2, 6]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Body */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <capsuleGeometry args={[0.8, 2, 4, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Nose */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.8, 1.5, 16]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      {/* Fins */}
      <mesh position={[-1, 0.8, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[-1, -0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
}

function Globe() {
  return (
    <group position={[-8, 4, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[2, 16, 16]} />
          <meshStandardMaterial color="#2563eb" wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.9, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" opacity={0.3} transparent />
        </mesh>
      </Float>
      {/* Stand Base */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[2.5, 3, 1]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[-2, -1, 0]} rotation={[0, 0, -Math.PI/6]}>
        <boxGeometry args={[1, 5, 2]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    </group>
  );
}

function Lightbulb() {
  return (
    <group position={[2, 6, -8]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
        {/* Glass */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#fcd34d" emissive="#f59e0b" emissiveIntensity={0.5} roughness={0.1} />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 0.8, 1.5, 16]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </Float>
    </group>
  );
}

// --- MAIN SCENE ---
// CATATAN UNTUK PENGGUNAAN MODEL ASLI:
// Jika nanti Anda memiliki 1 file utuh campus.glb, Anda bisa menghapus semua bentuk 
// dasar (mesh cylinder, box, dll) di bawah ini dan cukup memanggil:
// <primitive object={scene} /> 
// (dimana `scene` didapat dari const { scene } = useGLTF('/models/campus.glb'))

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      
      {/* Central Island Base (Cyan) */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[21, 24, 4, 64]} />
        <meshStandardMaterial color="#a5f3fc" roughness={0.3} />
      </mesh>
      
      {/* Grass Top */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[20.5, 21, 0.1, 64]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* River / Road rings */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[27, 27, 2, 64]} />
        <meshStandardMaterial color="#2563eb" /> {/* River */}
      </mesh>
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[33, 33, 1, 64]} />
        <meshStandardMaterial color="#4ade80" /> {/* Outer Grass */}
      </mesh>
      <mesh position={[0, -1.9, 0]} receiveShadow>
        <cylinderGeometry args={[30, 30, 1.1, 64]} />
        <meshStandardMaterial color="#94a3b8" /> {/* Road */}
      </mesh>

      {/* INTERACTIVE BUILDING */}
      <MainBuilding position={[6, 0.1, -2]} />

      {/* OTHER OBJECTS */}
      <Globe />
      <Lightbulb />
      <Rocket />



      {/* TREES */}
      <Tree position={[0, 0.1, 5]} />
      <Tree position={[-3, 0.1, 4]} />
      <Tree position={[2, 0.1, 8]} />
      <Tree position={[-2, 0.1, -5]} />
      <Tree position={[4, 0.1, -4]} />
      <Tree position={[10, -1.8, 8]} />
      <Tree position={[-12, -1.8, -4]} />

      {/* Lighting for the scene instead of Environment to prevent fetch error */}
      <hemisphereLight intensity={0.5} groundColor="#0f172a" />
    </>
  );
}

export default function Interactive3DScene({ className }: { className?: string }) {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  return (
    <div className={`relative ${className || 'w-full h-full min-h-[500px] lg:min-h-[600px] bg-gradient-to-b from-sky-300 to-sky-100 rounded-3xl overflow-hidden shadow-2xl'}`}>
      
      {/* 2D Overlay for menus */}
      <MenuOverlay activeIndex={activeMenuIndex} />

      <div className={`absolute top-[120px] left-0 right-0 text-center z-10 pointer-events-none transition-opacity duration-500 ${activeMenuIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2">
          <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Geser kanan atau kiri untuk memutar
        </p>
      </div>
      
      {/* Canvas adalah wadah (viewport) utama untuk merender 3D */}
      <Canvas shadows camera={{ position: [0, 15, 45], fov: 45 }}>
        <Scene />
        <SceneController onActiveZoneChange={setActiveMenuIndex} />
      </Canvas>
    </div>
  );
}

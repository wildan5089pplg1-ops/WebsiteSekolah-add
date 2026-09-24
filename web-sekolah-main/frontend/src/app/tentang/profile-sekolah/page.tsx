import React from "react";
import { Metadata } from "next";
import ProfileSekolahPage from "@/components/ProfileSekolah/ProfileSekolahPage";

export const metadata: Metadata = {
  title: "Profil Sekolah | SMK Prestasi Prima",
  description:
    "Profil resmi SMK Prestasi Prima: Mencetak pionir era digital dengan integrasi teknologi industri dan integritas karakter luhur Pancasila.",
  openGraph: {
    title: "Profil Sekolah | SMK Prestasi Prima",
    description:
      "Profil resmi SMK Prestasi Prima: Visi, Misi, Sejarah Perjalanan, Kepemimpinan, dan Ekosistem Pendidikan Vokasi Keunggulan.",
    images: ["/images/gedung.png"],
  },
};

export default function ProfileSekolahRoute() {
  return <ProfileSekolahPage />;
}

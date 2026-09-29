import type { Metadata } from "next";
import VirtualTourPage from "@/components/virtual-tour/VirtualTourPage";

export const metadata: Metadata = {
  title: "Virtual Tour 360° | SMK Prestasi Prima",
  description:
    "Jelajahi seluruh sarana, kelas, laboratorium teknologi, dan fasilitas kampus SMK Prestasi Prima secara interaktif melalui pengalaman 360° Virtual Tour.",
  keywords: [
    "Virtual Tour 360",
    "SMK Prestasi Prima",
    "Fasilitas Sekolah 360",
    "Tour Kampus Interaktif",
    "Lab BCF",
    "Lab PPLG",
    "Aula Mora",
  ],
  openGraph: {
    title: "Virtual Tour 360° | SMK Prestasi Prima",
    description:
      "Jelajahi seluruh sarana dan fasilitas unggulan SMK Prestasi Prima secara interaktif 360°.",
    images: ["/virtual-tour/panoramas/aula-mora.jpeg"],
  },
};

export default function Page() {
  return <VirtualTourPage />;
}

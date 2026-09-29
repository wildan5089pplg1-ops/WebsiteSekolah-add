import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MAJORS_DATA } from "@/data/keahlianData";
import ProgramKeahlianPage from "@/components/ProgramKeahlian/ProgramKeahlianPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { id: "bcf" },
    { id: "dkv" },
    { id: "tjkt" },
    { id: "pplg" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const major = MAJORS_DATA[id.toLowerCase()];

  if (!major) {
    return {
      title: "Program Keahlian Tidak Ditemukan | SMK Prestasi Prima",
    };
  }

  return {
    title: `${major.name} - ${major.fullName} | SMK Prestasi Prima`,
    description: major.shortDesc,
    openGraph: {
      title: `${major.name} - ${major.fullName} | SMK Prestasi Prima`,
      description: major.heroFocus,
      images: [major.heroImage],
    },
  };
}

export default async function MajorDetailPage({ params }: PageProps) {
  const { id } = await params;
  const major = MAJORS_DATA[id.toLowerCase()];

  if (!major) {
    notFound();
  }

  return <ProgramKeahlianPage major={major} />;
}

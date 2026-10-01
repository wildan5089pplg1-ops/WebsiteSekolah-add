import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function KeahlianDetailPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/program/${id}`);
}

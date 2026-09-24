import React from "react";
import { MajorData } from "@/data/keahlianData";
import ProgramHero from "./ProgramHero";
import ProgramSkills from "./ProgramSkills";
import ProgramFeatureHighlight from "./ProgramFeatureHighlight";
import ProgramPractice from "./ProgramPractice";
import ProgramTools from "./ProgramTools";
import ProgramProjects from "./ProgramProjects";
import ProgramCareers from "./ProgramCareers";
import ProgramCTA from "./ProgramCTA";

interface ProgramKeahlianPageProps {
  major: MajorData;
}

export default function ProgramKeahlianPage({ major }: ProgramKeahlianPageProps) {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* SECTION 1 — HERO / INTRO */}
      <ProgramHero major={major} />

      {/* SECTION 2 — KEAHLIAN YANG DIPELAJARI */}
      <ProgramSkills skills={major.skills} majorName={major.name} />

      {/* SECTION 3 — VISUAL / FEATURE HIGHLIGHT */}
      <ProgramFeatureHighlight
        feature={major.featureHighlight}
        majorName={major.name}
      />

      {/* SECTION 4 — PEMBELAJARAN PRAKTIK */}
      <ProgramPractice
        practices={major.practiceLearning}
        majorName={major.name}
      />

      {/* SECTION 5 — TOOLS & TEKNOLOGI */}
      <ProgramTools tools={major.tools} majorName={major.name} />

      {/* SECTION 6 — HASIL / PROJECT SISWA */}
      <ProgramProjects projects={major.projects} majorName={major.name} />

      {/* SECTION 7 — PROSPEK KARIR */}
      <ProgramCareers careers={major.careers} majorName={major.name} />

      {/* SECTION 8 — CTA */}
      <ProgramCTA currentMajorId={major.id} />
    </div>
  );
}

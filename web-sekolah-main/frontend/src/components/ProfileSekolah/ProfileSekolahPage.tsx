import React from "react";
import ProfileHero from "./ProfileHero";
import SchoolIdentity from "./SchoolIdentity";
import VisionMission from "./VisionMission";
import HistoryTimeline from "./HistoryTimeline";
import SchoolHighlights from "./SchoolHighlights";
import CampusGallery from "./CampusGallery";
import PrincipalMessage from "./PrincipalMessage";
import SchoolVideo from "./SchoolVideo";
import AlumniStory from "./AlumniStory";
import LocationSection from "./LocationSection";
import ProfileCTA from "./ProfileCTA";

export default function ProfileSekolahPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* SECTION 01 — HERO */}
      <ProfileHero />

      {/* SECTION 02 — SCHOOL IDENTITY */}
      <SchoolIdentity />

      {/* SECTION 03 — VISI & MISI */}
      <VisionMission />

      {/* SECTION 04 — PERJALANAN SEJARAH */}
      <HistoryTimeline />

      {/* SECTION 05 — SCHOOL IN NUMBERS / HIGHLIGHTS */}
      <SchoolHighlights />

      {/* SECTION 06 — KEHIDUPAN & LINGKUNGAN SEKOLAH */}
      <CampusGallery />

      {/* SECTION 07 — KEPEMIMPINAN */}
      <PrincipalMessage />

      {/* SECTION 08 — VIDEO / SCHOOL EXPERIENCE */}
      <SchoolVideo />

      {/* SECTION 09 — STUDENT / ALUMNI STORY */}
      <AlumniStory />

      {/* SECTION 10 — CAMPUS LOCATION */}
      <LocationSection />

      {/* SECTION 11 — CTA */}
      <ProfileCTA />
    </div>
  );
}

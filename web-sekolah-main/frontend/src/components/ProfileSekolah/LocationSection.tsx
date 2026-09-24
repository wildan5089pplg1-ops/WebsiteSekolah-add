import React from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";
import { ProfileIcon } from "./ProfileIcons";

export default function LocationSection() {
  const { location } = PROFILE_DATA;

  return (
    <section className="w-full py-16 bg-slate-50 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-lg p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-4 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#F96501]" />
                {location.label}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">
                {location.title}
              </h2>

              <p className="text-slate-600 text-sm mb-6">{location.subtitle}</p>

              {/* Address details */}
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F96501] flex items-center justify-center shrink-0 mt-0.5">
                    <ProfileIcon name="map-pin" className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900">{location.schoolName}</h4>
                    <p className="text-slate-600">{location.addressLine1}</p>
                    <p className="text-slate-600">{location.addressLine2}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F96501] flex items-center justify-center shrink-0">
                    <ProfileIcon name="phone" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Telepon / WhatsApp:</span>
                    <span className="font-bold text-slate-900">
                      {location.phone} • {location.whatsapp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F96501] flex items-center justify-center shrink-0">
                    <ProfileIcon name="clock" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Jam Pelayanan:</span>
                    <span className="font-bold text-slate-900">
                      {location.operationalHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Petunjuk Arah */}
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-fit px-6 py-3.5 rounded-xl bg-[#F96501] hover:bg-orange-600 text-white font-bold text-sm tracking-wide shadow-md shadow-[#F96501]/25 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Petunjuk Arah (Google Maps)</span>
                <span>↗</span>
              </a>
            </div>

            {/* Right Map Preview / Visual Card */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
              <iframe
                title="Peta Lokasi SMK Prestasi Prima"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.733575647573!2d106.9022634!3d-6.2986427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f2e30f1437bd%3A0x6b45a55633633e9b!2sSMK%20Prestasi%20Prima!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-150 contrast-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profileSekolahData";
import { ProfileIcon } from "./ProfileIcons";

export default function HistoryTimeline() {
  const { history } = PROFILE_DATA;
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <section className="w-full py-20 bg-white text-slate-900 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#F96501] text-xs font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F96501]" />
            {history.label}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {history.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
            {history.subtitle}
          </p>
        </div>

        {/* DESKTOP TIMELINE (HORIZONTAL TRACK >= 1024px) */}
        <div className="hidden lg:block relative mb-12">
          {/* Decorative Horizontal Tech Line */}
          <div className="absolute top-9 left-12 right-12 h-1 bg-slate-200 -z-0">
            {/* Progress filled bar */}
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-[#F96501] transition-all duration-500"
              style={{
                width: `${(activeMilestone / (history.milestones.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Milestone Step Nodes */}
          <div className="relative z-10 grid grid-cols-6 gap-3">
            {history.milestones.map((m, idx) => {
              const isActive = activeMilestone === idx;
              const isPassed = activeMilestone >= idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveMilestone(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  {/* Node Dot / Icon Circle */}
                  <div
                    className={`w-18 h-18 rounded-2xl flex items-center justify-center p-2 transition-all duration-300 shadow-md ${
                      isActive
                        ? "bg-[#F96501] text-white scale-110 ring-4 ring-orange-200"
                        : isPassed
                        ? "bg-slate-900 text-white hover:bg-[#F96501]"
                        : "bg-white text-slate-400 border border-slate-200 hover:border-[#F96501] hover:text-[#F96501]"
                    }`}
                  >
                    <ProfileIcon name={m.icon} className="w-6 h-6" />
                  </div>

                  {/* Year & Title below node */}
                  <div className="mt-4">
                    <span
                      className={`text-lg font-black block transition-colors ${
                        isActive
                          ? "text-[#F96501]"
                          : isPassed
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5 line-clamp-1">
                      {m.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Highlight Card */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm flex items-start gap-6 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#F96501] flex items-center justify-center text-2xl font-black shrink-0 border border-orange-200">
              <ProfileIcon
                name={history.milestones[activeMilestone].icon}
                className="w-8 h-8"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-black text-[#F96501]">
                  {history.milestones[activeMilestone].year}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                  {history.milestones[activeMilestone].tag}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {history.milestones[activeMilestone].title}
              </h3>
              <p className="text-sm font-semibold text-slate-500 mb-2">
                {history.milestones[activeMilestone].subtitle}
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {history.milestones[activeMilestone].desc}
              </p>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET TIMELINE (VERTICAL TRACK < 1024px) */}
        <div className="block lg:hidden relative pl-6 border-l-2 border-orange-200 space-y-8">
          {history.milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on vertical line */}
              <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-white border-4 border-[#F96501] shadow-sm flex items-center justify-center" />

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#F96501]/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl font-black text-[#F96501]">{m.year}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    {m.tag}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-0.5">{m.title}</h3>
                <p className="text-xs font-semibold text-slate-500 mb-2">{m.subtitle}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

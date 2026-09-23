"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation, type NavSection } from "./navigation";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("Tentang Kami");

  const navRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    // 320ms hysteresis gives smooth grace period when cursor moves between logo and panel
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 320);
  };

  const toggleOpen = () => {
    clearCloseTimeout();
    setOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    clearCloseTimeout();
    setOpen(false);
  };

  const handleSectionClick = (section: NavSection) => {
    if (section.subLinks?.length) {
      setActiveSection((curr) => (curr === section.name ? null : section.name));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearCloseTimeout();
        setOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        clearCloseTimeout();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      clearCloseTimeout();
    };
  }, []);

  return (
    <header
      ref={navRef}
      className={`pp-navbar ${open ? "is-open" : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pp-navbar-inner">
        {/* CENTER TRIGGER: EXPLORE CUE + LOGO */}
        <div
          className="pp-center-trigger-wrap"
          onMouseEnter={handleMouseEnter}
        >
          <div className="pp-explore-cue" aria-hidden="true">
            <span className="pp-cue-text">EXPLORE WEBSITE</span>
            <span className="pp-cue-arrow">↓</span>
          </div>

          <button
            type="button"
            className="pp-logo-trigger"
            onClick={toggleOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleOpen();
              }
            }}
            aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi SMK Prestasi Prima"}
            aria-expanded={open}
          >
            <span className="pp-logo-ring">
              <Image
                src="/images/logo.png"
                alt="Logo SMK Prestasi Prima"
                width={48}
                height={48}
                priority
              />
            </span>
          </button>
        </div>
      </div>

      {/* MEGA MENU PANEL (PURE WHITE SURFACE) */}
      <div
        className={`pp-menu-wrapper ${open ? "is-visible" : ""}`}
        aria-hidden={!open}
        onMouseEnter={handleMouseEnter}
      >
        <div className="pp-menu-panel">
          <div className="pp-menu-content">
            {/* INTRO LEFT COLUMN */}
            <div className="pp-menu-intro">
              <span className="pp-menu-eyebrow">SMK PRESTASI PRIMA</span>
              <h2>
                Ruang untuk
                <br />
                <span>berkembang.</span>
              </h2>
              <p>
                Jelajahi informasi resmi, kompetensi keahlian unggulan, ekosistem karier Presma,
                dan pendaftaran siswa baru.
              </p>
              <div className="pp-menu-badge-list">
                <span className="pp-badge-tag">Akreditasi A</span>
                <span className="pp-badge-tag">Berbasis Industri</span>
              </div>
            </div>

            {/* LINKS RIGHT COLUMN */}
            <div className="pp-menu-links">
              {navigation.map((section, index) => {
                const hasChildren = !!section.subLinks?.length;
                const isActive = activeSection === section.name;

                return (
                  <div
                    key={section.name}
                    className={`pp-menu-section ${isActive ? "active" : ""}`}
                    style={
                      {
                        "--menu-index": index,
                      } as React.CSSProperties
                    }
                  >
                    {hasChildren ? (
                      <button
                        type="button"
                        className="pp-menu-heading"
                        onClick={() => handleSectionClick(section)}
                        aria-expanded={isActive}
                      >
                        <span>
                          <small>0{index + 1}</small>
                          {section.name}
                        </span>
                        <span className="pp-menu-arrow">
                          {isActive ? "−" : "+"}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={section.href ?? "/"}
                        className="pp-menu-heading"
                        onClick={handleLinkClick}
                      >
                        <span>
                          <small>0{index + 1}</small>
                          {section.name}
                        </span>
                        <span className="pp-menu-arrow">↗</span>
                      </Link>
                    )}

                    {hasChildren && (
                      <div className="pp-submenu">
                        <div className="pp-submenu-inner">
                          {section.subLinks!.map((subLink) => (
                            <Link
                              href={subLink.href}
                              key={subLink.name}
                              className="pp-submenu-link"
                              onClick={handleLinkClick}
                            >
                              <span className="pp-submenu-title">
                                {subLink.name}
                              </span>
                              {subLink.desc && (
                                <span className="pp-submenu-desc">
                                  {subLink.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pp-menu-footer">
            <span>SMK PRESTASI PRIMA • JAKARTA TIMUR</span>
            <span>BEYOND EDUCATION</span>
          </div>
        </div>
      </div>
    </header>
  );
}
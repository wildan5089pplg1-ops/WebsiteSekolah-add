"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation, type NavSection } from "./navigation";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("Tentang Kami");
  const [mobile, setMobile] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const updateViewport = () => {
      setMobile(window.innerWidth <= 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

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
    };
  }, []);

  const handleMouseEnter = () => {
    clearCloseTimeout();
    if (!mobile) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!mobile) {
      clearCloseTimeout();
      closeTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 280);
    }
  };

  const toggleMenu = () => {
    clearCloseTimeout();
    setOpen((current) => !current);
  };

  const handleSectionClick = (section: NavSection) => {
    if (section.subLinks?.length) {
      setActiveSection((current) =>
        current === section.name ? null : section.name
      );
      return;
    }

    setOpen(false);
  };

  const handleSectionHover = (section: NavSection) => {
    if (!mobile && section.subLinks?.length) {
      setActiveSection(section.name);
    }
  };

  const handleLinkClick = () => {
    clearCloseTimeout();
    setOpen(false);
  };

  return (
    <header
      ref={navRef}
      className={`pp-navbar ${open ? "is-open" : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pp-navbar-inner">
        {/* CENTER TRIGGER: PROMPT + LOGO */}
        <div
          className="pp-logo-center-wrapper"
          onMouseEnter={handleMouseEnter}
        >
          <button
            type="button"
            className="pp-logo-trigger"
            onClick={toggleMenu}
            aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi SMK Prestasi Prima"}
            aria-expanded={open}
          >
            <span className="pp-logo-prompt" aria-hidden="true">
              <span className="pp-prompt-text">
                {open ? "TUTUP MENU" : "EXPLORE WEBSITE"}
              </span>
              <span className="pp-prompt-indicator">
                {open ? "↑" : "↓"}
              </span>
            </span>

            <span className="pp-logo-ring">
              <Image
                src="/images/logo.png"
                alt="SMK Prestasi Prima"
                width={46}
                height={46}
                priority
              />
            </span>
          </button>
        </div>
      </div>

      {/* MEGA MENU PANEL (WHITE SURFACE) */}
      <div
        className={`pp-menu-wrapper ${open ? "is-visible" : ""}`}
        aria-hidden={!open}
        onMouseEnter={handleMouseEnter}
      >
        <div className="pp-menu-panel">
          <div className="pp-menu-content">
            {/* INTRO COLUMN */}
            <div className="pp-menu-intro">
              <span className="pp-menu-eyebrow">SMK PRESTASI PRIMA</span>

              <h2>
                Ruang untuk
                <br />
                <span>berkembang.</span>
              </h2>

              <p>
                Jelajahi informasi, keahlian vokasi masa depan, dan ekosistem pendidikan
                terbaik di SMK Prestasi Prima.
              </p>

              <div className="pp-menu-cta">
                <Link
                  href="/ppdb"
                  className="pp-menu-cta-btn"
                  onClick={handleLinkClick}
                >
                  Pendaftaran PPDB 2026
                  <span className="pp-cta-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* LINKS COLUMN */}
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
                        onMouseEnter={() => handleSectionHover(section)}
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
                        href={section.href ?? "#"}
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
                        {section.name === "Program Keahlian" ? (
                          <div className="pp-majors-grid">
                            {section.subLinks!.map((subLink) => (
                              <Link
                                href={subLink.href}
                                key={subLink.name}
                                className="pp-major-card"
                                onClick={handleLinkClick}
                              >
                                <span className="pp-major-badge">
                                  {subLink.name}
                                </span>
                                <span className="pp-major-label">
                                  {subLink.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ) : (
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
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pp-menu-footer">
            <span>SMK PRESTASI PRIMA • JAKARTA TIMUR</span>
            <span>BEYOND EDUCATION • IF BETTER IS POSSIBLE, GOOD IS NOT ENOUGH</span>
          </div>
        </div>
      </div>
    </header>
  );
}
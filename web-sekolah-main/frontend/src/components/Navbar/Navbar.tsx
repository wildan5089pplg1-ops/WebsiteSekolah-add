"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigation, type NavSection } from "./navigation";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);

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
        setOpen(false);
        setActiveSection(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveSection(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSectionClick = (section: NavSection) => {
    if (section.subLinks?.length) {
      setOpen(true);

      setActiveSection((current) =>
        current === section.name ? null : section.name
      );

      return;
    }

    setOpen(false);
    setActiveSection(null);
  };

  const handleMouseEnter = (section: NavSection) => {
    if (!mobile && section.subLinks?.length) {
      setOpen(true);
      setActiveSection(section.name);
    }
  };

  const handleMouseLeave = () => {
    if (!mobile) {
      setOpen(false);
      setActiveSection(null);
    }
  };

  return (
    <header
      ref={navRef}
      className={`pp-navbar ${open ? "is-open" : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pp-navbar-inner">
        {/* LEFT SIDE */}
        <div className="pp-nav-side pp-nav-left">
          <Link href="/" className="pp-small-link">
            Beranda
          </Link>

          <button
            type="button"
            className={`pp-small-link pp-nav-button ${
              activeSection === "Tentang Kami" ? "active" : ""
            }`}
            onMouseEnter={() =>
              handleMouseEnter(
                navigation.find(
                  (item) => item.name === "Tentang Kami"
                )!
              )
            }
            onClick={() =>
              handleSectionClick(
                navigation.find(
                  (item) => item.name === "Tentang Kami"
                )!
              )
            }
            aria-expanded={activeSection === "Tentang Kami"}
          >
            Tentang Kami
          </button>

          <button
            type="button"
            className={`pp-small-link pp-nav-button ${
              activeSection === "Program" ? "active" : ""
            }`}
            onMouseEnter={() =>
              handleMouseEnter(
                navigation.find(
                  (item) => item.name === "Program"
                )!
              )
            }
            onClick={() =>
              handleSectionClick(
                navigation.find(
                  (item) => item.name === "Program"
                )!
              )
            }
            aria-expanded={activeSection === "Program"}
          >
            Program
          </button>
        </div>

        {/* CENTER LOGO */}
        <button
          type="button"
          className="pp-logo-trigger"
          onClick={() => {
            setOpen((current) => !current);
            setActiveSection(
              open
                ? null
                : navigation.find((item) => item.subLinks)?.name ??
                    null
            );
          }}
          aria-label={
            open ? "Tutup menu navigasi" : "Buka menu navigasi"
          }
          aria-expanded={open}
        >
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

        {/* RIGHT SIDE */}
        <div className="pp-nav-side pp-nav-right">
          <button
            type="button"
            className={`pp-small-link pp-nav-button ${
              activeSection === "Dokumentasi" ? "active" : ""
            }`}
            onMouseEnter={() =>
              handleMouseEnter(
                navigation.find(
                  (item) => item.name === "Dokumentasi"
                )!
              )
            }
            onClick={() =>
              handleSectionClick(
                navigation.find(
                  (item) => item.name === "Dokumentasi"
                )!
              )
            }
            aria-expanded={activeSection === "Dokumentasi"}
          >
            Dokumentasi
          </button>

          <Link href="/news" className="pp-small-link">
            Berita
          </Link>

          <Link
            href="/ppdb"
            className="pp-small-link pp-apply-link"
          >
            Pendaftaran
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="pp-mobile-trigger"
          onClick={() => setOpen((current) => !current)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      {/* MENU PANEL */}
      <div
        className={`pp-menu-wrapper ${
          open ? "is-visible" : ""
        }`}
        aria-hidden={!open}
      >
        <div className="pp-menu-panel">
          <div className="pp-menu-content">
            <div className="pp-menu-intro">
              <span className="pp-menu-eyebrow">
                SMK PRESTASI PRIMA
              </span>

              <h2>
                Ruang untuk
                <br />
                <span>berkembang.</span>
              </h2>

              <p>
                Jelajahi informasi, program, dan kehidupan
                sekolah Prestasi Prima.
              </p>
            </div>

            <div className="pp-menu-links">
              {navigation.map((section, index) => {
                const hasChildren =
                  !!section.subLinks?.length;

                const isActive =
                  activeSection === section.name;

                return (
                  <div
                    key={section.name}
                    className={`pp-menu-section ${
                      isActive ? "active" : ""
                    }`}
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
                        onClick={() =>
                          handleSectionClick(section)
                        }
                      >
                        <span>
                          <small>
                            0{index + 1}
                          </small>

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
                        onClick={() => {
                          setOpen(false);
                          setActiveSection(null);
                        }}
                      >
                        <span>
                          <small>
                            0{index + 1}
                          </small>

                          {section.name}
                        </span>

                        <span className="pp-menu-arrow">
                          ↗
                        </span>
                      </Link>
                    )}

                    {hasChildren && (
                      <div className="pp-submenu">
                        <div className="pp-submenu-inner">
                          {section.subLinks!.map(
                            (subLink) => (
                              <Link
                                href={subLink.href}
                                key={subLink.name}
                                className="pp-submenu-link"
                                onClick={() => {
                                  setOpen(false);
                                  setActiveSection(null);
                                }}
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
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pp-menu-footer">
            <span>SMK PRESTASI PRIMA</span>

            <span>
              BEYOND EDUCATION
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
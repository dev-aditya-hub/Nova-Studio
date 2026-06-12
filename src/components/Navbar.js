"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">
          Nova<span>Studio</span>
        </a>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
              Services
            </a>
          </li>
          <li>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, "portfolio")}>
              Portfolio
            </a>
          </li>
          <li>
            <a href="#stats" onClick={(e) => handleNavClick(e, "stats")}>
              Stats
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
              Contact
            </a>
          </li>
        </ul>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

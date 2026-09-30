// src/app/_components/Navbar.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { socialLinks } from "./socialLinks";
import {
  getAgentsDictionary,
  getShellDictionary,
  localizePath,
  removeLocaleFromPathname,
} from "@/lib/i18n";

const selfEnrollmentPages = [
  { href: "/self-enrollment/one-share", label: "One Share" },
  { href: "/self-enrollment/ameritas", label: "Ameritas" },
  { href: "/self-enrollment/ncd", label: "NCD" },
];

function isActive(pathname, path) {
  return pathname === path ? "active" : undefined;
}

export default function Navbar({ locale = "en" }) {
  const rawPathname = usePathname() || "/";
  const pathname = removeLocaleFromPathname(rawPathname);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSelfEnrollmentOpen, setIsSelfEnrollmentOpen] = useState(false);
  const headerRef = useRef(null);
  const t = getShellDictionary(locale);
  const ui = t.ui;
  const findAgentLabel = getAgentsDictionary(locale).directory.title;
  const agentsActive = pathname === "/agents" || pathname.startsWith("/agents/");
  const selfEnrollmentActive = selfEnrollmentPages.some((item) => pathname === item.href);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsResourcesOpen(false);
    setIsSelfEnrollmentOpen(false);
    document.body.classList.remove("mobile-nav-active");
  }, [rawPathname]);

  // Publishes the header's real height as the CSS variable --header-height,
  // so the hero and page titles always start just below the fixed header,
  // whatever the screen width, language or font. Once scrolled, the top bar
  // collapses (and animates back open at the top), so only the tallest,
  // fully open height is kept for the current width; following the animation
  // would make the page content jump.
  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return undefined;

    let tallest = 0;
    let measuredWidth = window.innerWidth;

    const publish = () => {
      if (window.innerWidth !== measuredWidth) {
        measuredWidth = window.innerWidth;
        tallest = 0;
      }
      if (document.body.classList.contains("scrolled")) return;

      const height = Math.round(header.getBoundingClientRect().height);
      if (height > tallest) {
        tallest = height;
        document.documentElement.style.setProperty("--header-height", `${height}px`);
      }
    };

    const observer = new ResizeObserver(publish);
    observer.observe(header);
    publish();

    return () => observer.disconnect();
  }, [rawPathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", isMobileNavOpen);

    return () => {
      document.body.classList.remove("mobile-nav-active");
    };
  }, [isMobileNavOpen]);

  function closeMobileNav() {
    setIsMobileNavOpen(false);
    setIsResourcesOpen(false);
    setIsSelfEnrollmentOpen(false);
  }

  function toggleMobileNav(event) {
    event.preventDefault();
    event.nativeEvent?.stopImmediatePropagation?.();
    setIsMobileNavOpen((current) => !current);
  }

  function toggleResources(event) {
    if (window.innerWidth >= 1200) {
      return;
    }

    event.preventDefault();
    setIsResourcesOpen((current) => !current);
  }

  function toggleSelfEnrollment(event) {
    if (window.innerWidth >= 1200) {
      return;
    }

    event.preventDefault();
    setIsSelfEnrollmentOpen((current) => !current);
  }

  return (
    <header
      id="header"
      ref={headerRef}
      className={`header fixed-top${isMobileNavOpen ? " is-mobile-nav-open" : ""}${pathname === "/" ? " video-hero-page" : ""}`}
    >
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            {/* On phones only the icon shows (the label keeps the link understandable
                for screen readers), so the whole bar stays on one line. */}
            <a
              href="mailto:info@h4hinsurance.com"
              className="topbar-contact topbar-email d-flex align-items-center"
              aria-label={`${ui.emailUs}: info@h4hinsurance.com`}
            >
              <i className="bi bi-envelope" aria-hidden="true" />
              <span className="topbar-label">info@h4hinsurance.com</span>
            </a>
            <a href="tel:+17863977167" className="topbar-phone d-flex align-items-center">
              <i className="bi bi-phone" aria-hidden="true" />
              <span>(786) 397-7167</span>
            </a>
            <a
              href="tel:+18445440663"
              className="topbar-phone topbar-tollfree d-flex align-items-center"
              aria-label={`${ui.callTollFree}: (844) 544-0663`}
            >
              <i className="bi bi-telephone" aria-hidden="true" />
              <span className="topbar-label">(844) 544-0663</span>
            </a>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            {socialLinks.map((social) => (
              <a
                href={social.href}
                aria-label={social.label}
                key={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={social.icon} />
              </a>
            ))}
            {/* Desktop only; phones and tablets get the switch in the menu. */}
            <ThemeToggle label={ui.darkMode} className="d-none d-xl-inline-flex" />
          </div>
        </div>
      </div>

      <div className="branding-bar">
      <div className="container branding position-relative d-flex align-items-center justify-content-between">
        <Link href={localizePath("/", locale)} className="logo d-flex align-items-center">
          <img src="/HHlogoNoBg3.png" alt="H4H Insurance" width="345" height="327" />
          {/* A span, not an h1: each page already has its own h1 (the hero or
              page title), and search engines want exactly one per page. */}
          <span className="sitename">
            <span>Health<span className="logo-four">4</span>Haitians</span>
          </span>
        </Link>

        <nav id="navmenu" className={`navmenu${isMobileNavOpen ? " is-mobile-open" : ""}`}>
          <ul>
            <li>
              <Link href={localizePath("/", locale)} className={isActive(pathname, "/")} onClick={closeMobileNav}>
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/about", locale)}
                className={isActive(pathname, "/about")}
                onClick={closeMobileNav}
              >
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/departments", locale)}
                className={isActive(pathname, "/departments")}
                onClick={closeMobileNav}
              >
                {t.nav.coverageOptions}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/agents", locale)}
                className={agentsActive ? "active" : undefined}
                onClick={closeMobileNav}
              >
                {findAgentLabel}
              </Link>
            </li>
            {/* <li className="dropdown">
              <a
                href="#"
                className={selfEnrollmentActive ? "active" : undefined}
                onClick={toggleSelfEnrollment}
                aria-expanded={isSelfEnrollmentOpen}
              >
                <span>{t.nav.selfEnrollment}</span>{" "}
                <i className="bi bi-chevron-down" />
              </a>
              <ul className={isSelfEnrollmentOpen ? "dropdown-active" : ""}>
                {selfEnrollmentPages.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizePath(item.href, locale)}
                      className={isActive(pathname, item.href)}
                      onClick={closeMobileNav}
                    >
                      <i className="bi bi-arrow-right-short dropdown-sub-icon" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            <li className="dropdown">
              <a
                href="#"
                className={isResourcesOpen ? "active" : undefined}
                onClick={toggleResources}
                aria-expanded={isResourcesOpen}
              >
                <span>{t.nav.resources}</span>{" "}
                <i className="bi bi-chevron-down" />
              </a>
              <ul className={`resources-menu${isResourcesOpen ? " dropdown-active" : ""}`}>
                <li>
                  <Link
                    href={localizePath("/service-details", locale)}
                    className={isActive(pathname, "/service-details")}
                    onClick={closeMobileNav}
                  >
                    <i className="bi bi-grid-3x3-gap dropdown-item-icon" />
                    {t.nav.serviceDetails}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/testimonials", locale)}
                    className={isActive(pathname, "/testimonials")}
                    onClick={closeMobileNav}
                  >
                    <i className="bi bi-chat-quote dropdown-item-icon" />
                    {t.nav.testimonials}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/refer-a-friend", locale)}
                    className={isActive(pathname, "/refer-a-friend")}
                    onClick={closeMobileNav}
                  >
                    <i className="bi bi-people dropdown-item-icon" />
                    {t.nav.referFriend}
                  </Link>
                </li>
                <li>
                  <Link href={localizePath("/faq", locale)} className={isActive(pathname, "/faq")} onClick={closeMobileNav}>
                    <i className="bi bi-question-circle dropdown-item-icon" />
                    {t.nav.faq}
                  </Link>
                </li>
                <li className="dropdown-divider-item">
                  <Link
                    href={localizePath("/terms", locale)}
                    className={isActive(pathname, "/terms")}
                    onClick={closeMobileNav}
                  >
                    <i className="bi bi-file-earmark-text dropdown-item-icon" />
                    {t.nav.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/privacy", locale)}
                    className={isActive(pathname, "/privacy")}
                    onClick={closeMobileNav}
                  >
                    <i className="bi bi-shield-lock dropdown-item-icon" />
                    {t.nav.privacy}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href={localizePath("/contact", locale)}
                className={isActive(pathname, "/contact")}
                onClick={closeMobileNav}
              >
                {t.nav.contact}
              </Link>
            </li>
            {/* Mobile menu only: the header has no room for these on phones. */}
            <li className="mobile-menu-extra mobile-menu-theme d-xl-none">
              <ThemeToggle label={ui.darkMode} variant="menu" />
            </li>
            <li className="mobile-menu-extra mobile-menu-cta">
              <Link
                href={localizePath("/appointment", locale)}
                className="mobile-menu-appointment"
                onClick={closeMobileNav}
              >
                <i className="bi bi-calendar-check" aria-hidden="true" />
                {t.nav.appointment}
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className={`mobile-nav-toggle d-xl-none bi ${isMobileNavOpen ? "bi-x" : "bi-list"}`}
            aria-label={isMobileNavOpen ? ui.closeMenu : ui.openMenu}
            aria-expanded={isMobileNavOpen}
            aria-controls="navmenu"
            onClick={toggleMobileNav}
          />
        </nav>

        <div className="header-actions">
          <LanguageSelector locale={locale} label={ui.language} />
          <Link className="btn-getstarted" href={localizePath("/appointment", locale)}>
            {t.nav.appointment}
          </Link>
        </div>
      </div>
      </div>
    </header>
  );
}

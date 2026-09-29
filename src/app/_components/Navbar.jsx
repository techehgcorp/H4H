// src/app/_components/Navbar.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
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
  const t = getShellDictionary(locale);
  const findAgentLabel = getAgentsDictionary(locale).directory.title;
  const agentsActive = pathname === "/agents" || pathname.startsWith("/agents/");
  const selfEnrollmentActive = selfEnrollmentPages.some((item) => pathname === item.href);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsResourcesOpen(false);
    setIsSelfEnrollmentOpen(false);
    document.body.classList.remove("mobile-nav-active");
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
    <header id="header" className={`header fixed-top${isMobileNavOpen ? " is-mobile-nav-open" : ""}${pathname === "/" ? " video-hero-page" : ""}`}>
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <a href="mailto:info@h4hinsurance.com" className="topbar-contact d-flex align-items-center">
              <i className="bi bi-envelope" aria-hidden="true" />
              <span>info@h4hinsurance.com</span>
            </a>
            <a href="tel:+17863977167" className="topbar-phone d-flex align-items-center">
              <i className="bi bi-phone" aria-hidden="true" />
              <span>(786) 397-7167</span>
            </a>
            <a href="tel:+18445440663" className="topbar-phone d-flex align-items-center">
              <i className="bi bi-telephone" aria-hidden="true" />
              <span>(844) 544-0663</span>
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
          </div>
        </div>
      </div>

      <div className="branding-bar">
      <div className="container branding position-relative d-flex align-items-center justify-content-between">
        <Link href={localizePath("/", locale)} className="logo d-flex align-items-center">
          <img src="/HHlogoNoBg3.png" alt="H4H Insurance" />
          <h1 className="sitename">
            <span>Health<span className="logo-four">4</span>Haitians</span>
          </h1>
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

          </ul>
          <button
            type="button"
            className={`mobile-nav-toggle d-xl-none bi ${isMobileNavOpen ? "bi-x" : "bi-list"}`}
            aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileNavOpen}
            onClick={toggleMobileNav}
          />
        </nav>

        <div className="header-actions">
          <LanguageSelector locale={locale} />
          <Link className="btn-getstarted" href={localizePath("/appointment", locale)}>
            {t.nav.appointment}
          </Link>
        </div>
      </div>
      </div>
    </header>
  );
}

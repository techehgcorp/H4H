// src/app/_components/Footer.jsx
import Link from "next/link";
import { socialLinks } from "./socialLinks";
import { getAgentsDictionary, getShellDictionary, localizePath } from "@/lib/i18n";

export default function Footer({ locale = "en" }) {
  const t = getShellDictionary(locale);
  const findAgentLabel = getAgentsDictionary(locale).directory.title;

  return (
    <footer id="footer" className="footer footer-bg position-relative">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <Link href={localizePath("/", locale)} className="logo d-flex align-items-center">
              <img src="/HHlogoNoBg3.png" alt="H4H Insurance" />
              <span className="sitename">{t.footer.company}</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>Health 4 Haitians (H4H Insurance)</p>
              <p>1000 NW 65th St #103</p>
              <p>Fort Lauderdale, FL 33309, EUA</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>(786) 397-7167</span>
              </p>
              <p>
                <strong>Email:</strong> <span>info@h4hinsurance.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
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

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t.footer.usefulLinks}</h4>
            <ul>
              <li>
                <Link href={localizePath("/", locale)}>{t.nav.home}</Link>
              </li>
              <li>
                <Link href={localizePath("/about", locale)}>{t.nav.about}</Link>
              </li>
              <li>
                <Link href={localizePath("/agents", locale)}>{findAgentLabel}</Link>
              </li>
              <li>
                <Link href={localizePath("/services", locale)}>{t.footer.services}</Link>
              </li>
              <li>
                <Link href={localizePath("/terms", locale)}>{t.footer.termsOfService}</Link>
              </li>
              <li>
                <Link href={localizePath("/privacy", locale)}>{t.footer.privacyPolicy}</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t.footer.ourServices}</h4>
            <ul>
              <li>
                <Link href={localizePath("/service-details", locale)}>
                  {t.footer.medicalCare}
                </Link>
              </li>
              <li>
                <Link href={localizePath("/departments", locale)}>{t.footer.departments}</Link>
              </li>
              <li>
                <Link href={localizePath("/appointment", locale)}>{t.footer.appointments}</Link>
              </li>
              <li>
                <Link href={localizePath("/contact", locale)}>{t.footer.support}</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t.footer.resources}</h4>
            <ul>
              <li>
                <Link href={localizePath("/faq", locale)}>FAQ</Link>
              </li>
              <li>
                <Link href={localizePath("/gallery", locale)}>{t.nav.gallery}</Link>
              </li>
              <li>
                <Link href={localizePath("/testimonials", locale)}>{t.nav.testimonials}</Link>
              </li>
              <li>
                <Link href={localizePath("/department-details", locale)}>
                  {t.nav.departmentDetails}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>{t.footer.legal}</h4>
            <ul>
              <li>
                <Link href={localizePath("/privacy", locale)}>{t.nav.privacy}</Link>
              </li>
              <li>
                <Link href={localizePath("/terms", locale)}>{t.nav.terms}</Link>
              </li>
              <li>
                <Link href={localizePath("/contact", locale)}>{t.nav.contact}</Link>
              </li>
              <li>
                <Link href={localizePath("/about", locale)}>{t.nav.about}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong>{t.footer.company}</strong>{" "}
          <span>{t.footer.copyright}</span>
        </p>
      </div>
    </footer>
  );
}

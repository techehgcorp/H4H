import Script from "next/script";
import TemplateRuntime from "./_components/TemplateRuntime";
import "./globals.css";

export const metadata = {
  title: "Health4Haitians",
  description: "Health4Haitians healthcare landing page",
  icons: {
    icon: [
      { url: "/assets/img/favicon.ico", sizes: "any" },
      { url: "/assets/img/favicon2.png", type: "image/png" },
    ],
    apple: "/assets/img/apple-touch-icon.png",
    shortcut: "/assets/img/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link
          href="/assets/vendor/fontawesome-free/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets/css/main.css" rel="stylesheet" />
      </head>
      <body className="index-page">
        <TemplateRuntime />
        {children}
        <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />
        <Script src="/assets/vendor/aos/aos.js" />
        <Script src="/assets/vendor/glightbox/js/glightbox.min.js" />
        <Script src="/assets/vendor/purecounter/purecounter_vanilla.js" />
        <Script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js" />
        <Script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" />
        <Script src="/assets/vendor/swiper/swiper-bundle.min.js" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a763a9be425d99b06f23d60"
          data-source="WEB_USER"
        />
      </body>
    </html>
  );
}

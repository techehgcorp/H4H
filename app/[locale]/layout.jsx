import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GAListener from "./ga-listener";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Health For Haitians</title>
      </head>
      <body className={inter.className}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LS0G00BZFS"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-LS0G00BZFS', {
              page_path: window.location.pathname + window.location.search,
              page_location: window.location.href
            });
          `}
        </Script>

        {/* dispara pageviews em cada navegação */}
        <GAListener />

        {children}
      </body>
    </html>
  );
}

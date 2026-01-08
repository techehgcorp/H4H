import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "../components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Health For Haitians</title>
      </head>
      <body className={inter.className}>
        {children}
        <GoogleAnalytics />

      </body>
    </html>
  );
}

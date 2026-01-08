import { Inter } from "next/font/google";
import "./globals.css"; 
import GoogleAnalytics from "../components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>
      {children}
      <GoogleAnalytics />
    </div>
  );
}
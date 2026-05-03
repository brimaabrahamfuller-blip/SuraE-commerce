import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/Footer";
import { Navbar } from "@/components/Navbar";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Sura Luxury Collection | Style that speaks for you",
  description: "Liberian fashion and luxury brand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans bg-white text-luxuryBlack`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

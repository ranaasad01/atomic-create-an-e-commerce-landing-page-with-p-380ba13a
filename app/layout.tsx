import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toby's Shop — Premium Modern Store",
  description: "Discover curated products crafted for modern living. Shop the latest collections at Toby's Shop with free shipping on orders over $75.",
  keywords: ["e-commerce", "premium", "modern", "shop", "lifestyle"],
  openGraph: {
    title: "Toby's Shop — Premium Modern Store",
    description: "Discover curated products crafted for modern living.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-stone-50 text-slate-900 antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

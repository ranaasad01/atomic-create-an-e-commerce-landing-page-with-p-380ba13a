"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Code2 as Github, Mail, ArrowRight } from 'lucide-react';
import { brand, footerLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  };

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter / X", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-semibold text-lg tracking-tight">
              Free shipping on orders over $75
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Delivered in 3-5 business days. Easy 30-day returns.
            </p>
          </div>
          <Link
            href="#products"
            onClick={(e) => handleAnchorClick(e, "#products")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition-colors duration-200 shrink-0"
          >
            Browse Products <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10"
      >
        {/* Brand column */}
        <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
          <p className="text-white text-xl font-bold tracking-tight mb-2">
            {brand.name}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            {brand.tagline} Curated goods for people who care about quality and design.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Shop */}
        <motion.div variants={fadeInUp}>
          <p className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
            Shop
          </p>
          <ul className="space-y-2.5">
            {footerLinks.shop.map((link) => (
              <li key={link.label}>
                <Link
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-slate-400 text-sm hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div variants={fadeInUp}>
          <p className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
            Support
          </p>
          <ul className="space-y-2.5">
            {footerLinks.support.map((link) => (
              <li key={link.label}>
                <Link
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-slate-400 text-sm hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div variants={fadeInUp}>
          <p className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
            Company
          </p>
          <ul className="space-y-2.5">
            {footerLinks.company.map((link) => (
              <li key={link.label}>
                <Link
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-slate-400 text-sm hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export type NavLink = {
  label: string;
  href: string;
};

export type BrandConstants = {
  name: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
];

export const brand: BrandConstants = {
  name: "Lumière",
  tagline: "Crafted for modern living.",
  ctaLabel: "Shop Now",
  ctaHref: "#products",
};

export const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "#products" },
    { label: "Best Sellers", href: "#products" },
    { label: "Sale", href: "#products" },
    { label: "Collections", href: "#categories" },
  ],
  support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "Contact Us", href: "#newsletter" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Sustainability", href: "#" },
  ],
};
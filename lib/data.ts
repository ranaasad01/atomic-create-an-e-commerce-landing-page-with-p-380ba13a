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
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
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
    { label: "Sale", href: "/shop" },
    { label: "Collections", href: "#categories" },
    { label: "All Products", href: "/shop" },
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

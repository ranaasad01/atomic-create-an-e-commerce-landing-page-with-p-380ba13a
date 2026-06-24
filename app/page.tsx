"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { brand } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: 1,
    name: "Ceramic Pour-Over Set",
    category: "Kitchen",
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviews: 214,
    badge: "Best Seller",
    image: "https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg",
    description: "Hand-thrown stoneware with a matte glaze. Brews a flawless cup every morning.",
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Home",
    price: 64,
    originalPrice: null,
    rating: 4.8,
    reviews: 178,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    description: "Stonewashed European linen. Breathable, durable, and impossibly soft.",
  },
  {
    id: 3,
    name: "Walnut Desk Organizer",
    category: "Office",
    price: 112,
    originalPrice: 135,
    rating: 4.7,
    reviews: 96,
    badge: "Sale",
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    description: "Solid black walnut with a natural oil finish. Keeps your workspace serene.",
  },
  {
    id: 4,
    name: "Merino Wool Beanie",
    category: "Apparel",
    price: 48,
    originalPrice: null,
    rating: 4.9,
    reviews: 302,
    badge: null,
    image: "http://www.ridgemerino.com/cdn/shop/files/ASPECTBEANIEBLK.jpg?v=1694720096",
    description: "Extra-fine 18.5-micron merino. Warm without the bulk, soft against skin.",
  },
  {
    id: 5,
    name: "Brass Candle Holder",
    category: "Decor",
    price: 36,
    originalPrice: null,
    rating: 4.6,
    reviews: 143,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71D673+sDPL.jpg",
    description: "Solid spun brass with a brushed finish. A quiet centerpiece for any table.",
  },
  {
    id: 6,
    name: "Leather Card Wallet",
    category: "Accessories",
    price: 58,
    originalPrice: 72,
    rating: 4.8,
    reviews: 261,
    badge: "Sale",
    image: "https://www.popovleather.com/cdn/shop/files/leather-5-card-wallet-popov-leather-1174379443.jpg?v=1750466630",
    description: "Full-grain vegetable-tanned leather. Holds 6 cards and ages beautifully.",
  },
];

const categories = [
  {
    id: 1,
    name: "Kitchen & Dining",
    count: 48,
    image: "https://picsum.photos/seed/5bcab54bbfe2/800/600",
    accent: "bg-amber-50",
  },
  {
    id: 2,
    name: "Home & Living",
    count: 63,
    image: "https://picsum.photos/seed/5bcab54bbfe2/800/600",
    accent: "bg-indigo-50",
  },
  {
    id: 3,
    name: "Apparel",
    count: 37,
    image: "https://houseandhome.com/wp-content/uploads/2020/12/feature-LivingRoom-091_TREES_HH_AP20_40.jpg",
    accent: "bg-rose-50",
  },
  {
    id: 4,
    name: "Office & Desk",
    count: 29,
    image: "http://www.apparelentrepreneurship.com/wp-content/uploads/2019/04/apparel_entrepreneurship_what_your_clothing_brand_needs_to_stay_relevant_2019.jpg",
    accent: "bg-emerald-50",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Mara Lindqvist",
    location: "Stockholm",
    rating: 5,
    text: "The pour-over set is genuinely beautiful. It sits on my counter like a sculpture and makes the best coffee I've ever had at home.",
    product: "Ceramic Pour-Over Set",
    avatar: "https://migma.ai/images/avatars/mara.png",
  },
  {
    id: 2,
    name: "James Okafor",
    location: "London",
    rating: 5,
    text: "Lumière has completely changed how I think about everyday objects. The walnut organizer is the first thing people notice in my office.",
    product: "Walnut Desk Organizer",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    location: "Barcelona",
    rating: 5,
    text: "I've bought three linen blankets as gifts. Every single person has asked me where it's from. The quality speaks for itself.",
    product: "Linen Throw Blanket",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/78/Sof%C3%ADa_Reyes_2016.jpg",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description: "Delivered in 3 to 5 business days, tracked from our studio to your door.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love with it? Return any item within 30 days, no questions asked.",
  },
  {
    icon: Shield,
    title: "Lifetime Guarantee",
    description: "Every piece is built to last. We stand behind our craftsmanship, always.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "Materials traced to responsible suppliers. Good for you and the planet.",
  },
];

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof featuredProducts)[0] }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <motion.span
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full tracking-wide ${
              product.badge === "Sale"
                ? "bg-rose-500 text-white"
                : product.badge === "New"
                ? "bg-indigo-600 text-white"
                : "bg-amber-400 text-amber-900"
            }`}
          >
            {product.badge}
          </motion.span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={14}
            className={
              wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          {product.category}
        </span>
        <h3 className="text-slate-900 font-semibold text-base leading-snug mb-1.5 tracking-tight">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-3 flex-1">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviews} />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-slate-900 font-bold text-lg">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-slate-400 text-sm line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition-colors duration-200 shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
          >
            <ShoppingBag size={14} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-slate-50 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Faint grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.span
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-full tracking-wide mb-6"
            >
              <Sparkles size={12} />
              New arrivals for Spring 2025
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] text-balance mb-6"
            >
              Objects worth
              <br />
              <span className="text-indigo-600">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md mb-8 text-pretty"
            >
              {brand.tagline} Lumière curates everyday objects that earn their place in your home through beauty, function, and lasting quality.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all duration-200 shadow-[0_2px_12px_rgba(99,102,241,0.40)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.50)] hover:-translate-y-0.5"
              >
                {brand.ctaLabel}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#categories"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                Browse Collections
              </Link>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-200 w-full"
            >
              {[
                { value: "4,800+", label: "Happy customers" },
                { value: "4.9", label: "Average rating" },
                { value: "Free", label: "Returns always" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero image mosaic */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden md:grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 rounded-2xl overflow-hidden aspect-[16/9] shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
              <img
                src="https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg"
                alt="Curated home objects on a warm wooden surface"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <img
                src="https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg"
                alt="Ceramic pour-over coffee set"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <img
                src="https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg"
                alt="Walnut desk organizer"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {valueProps.map((vp) => (
            <motion.div
              key={vp.title}
              variants={fadeInUp}
              className="flex flex-col items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <vp.icon size={18} />
              </div>
              <div>
                <p className="text-slate-900 font-semibold text-sm leading-snug">
                  {vp.title}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed mt-1">
                  {vp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section id="categories" className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
                Collections
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-2 text-balance">
                Shop by category
              </h2>
              <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">
                Every collection is built around a single idea: that the objects you use every day should bring quiet joy.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {categories.map((cat, i) => (
                <motion.a
                  key={cat.id}
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] ${
                    i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-semibold text-base tracking-tight">
                        {cat.name}
                      </p>
                      <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                        {cat.count} products
                        <ChevronRight size={12} />
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section id="products" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
            >
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
                  Featured
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-2 text-balance">
                  Picked for you
                </h2>
                <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">
                  A rotating selection of our most-loved pieces, chosen by our team each season.
                </p>
              </div>
              <a
                href="#products"
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                View all products <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ───────────────────────────────────────────── */}
      <section id="about" className="bg-slate-900 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_8px_40px_rgba(0,0,0,0.40)]">
                <img
                  src="https://images.stockcake.com/public/f/b/8/fb8e34b1-8a2f-45b6-acfc-fd5ab86ba068/hands-shaping-clay-stockcake.jpg"
                  alt="Artisan hands shaping a ceramic piece in the Lumière studio"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-black/5"
              >
                <p className="text-3xl font-bold text-slate-900 tracking-tight">
                  12+
                </p>
                <p className="text-slate-500 text-sm mt-0.5">
                  Years of craft
                </p>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col"
            >
              <motion.span
                variants={fadeIn}
                className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4"
              >
                Our story
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight text-balance mb-6"
              >
                Made with intention. Built to last.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-5 text-pretty"
              >
                Lumière began in 2012 as a small studio in Copenhagen, born from a simple frustration: why were beautiful, well-made everyday objects so hard to find? We set out to change that by working directly with independent makers and small-batch manufacturers who share our obsession with quality.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-8 text-pretty"
              >
                Every product in our collection is tested in our own homes before it reaches yours. If it doesn't earn a permanent spot on our shelves, it doesn't make the cut.
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-3 mb-10">
                {[
                  "Sourced from independent makers in 18 countries",
                  "Carbon-neutral shipping on every order",
                  "1% of revenue donated to reforestation projects",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    className="flex items-start gap-3 text-slate-300 text-sm"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-indigo-400" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp}>
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all duration-200 shadow-[0_2px_12px_rgba(99,102,241,0.40)]"
                >
                  Shop the collection
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
                Reviews
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-2 text-balance">
                Loved by real people
              </h2>
              <p className="text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
                Over 4,800 customers have made Lumière part of their everyday life.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`bg-white rounded-2xl p-7 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col ${
                    i === 1 ? "md:mt-6" : ""
                  }`}
                >
                  <div className="flex items-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm flex-1 mb-5 text-pretty">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">
                        {t.name}
                      </p>
                      <p className="text-slate-400 text-xs">{t.location}</p>
                    </div>
                    <span className="ml-auto text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
                      {t.product}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section id="newsletter" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative bg-indigo-600 rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-20"
          >
            {/* Background glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
              }}
            />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <motion.span
                  variants={fadeIn}
                  className="inline-block text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-4"
                >
                  Stay in the loop
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight text-balance mb-4"
                >
                  New arrivals, first.
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-indigo-200 leading-relaxed text-pretty"
                >
                  Join 12,000 subscribers who get early access to new collections, exclusive discounts, and stories from the makers behind our products.
                </motion.p>
              </div>

              <motion.div variants={fadeInUp}>
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-start gap-3 bg-white/10 border border-white/20 rounded-2xl p-8"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Check size={18} className="text-white" />
                    </div>
                    <p className="text-white font-semibold text-lg">
                      You're on the list.
                    </p>
                    <p className="text-indigo-200 text-sm leading-relaxed">
                      Welcome to the Lumière community. Expect something beautiful in your inbox soon.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-6 py-3.5 bg-white text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors duration-200 shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                    >
                      Subscribe
                    </motion.button>
                  </form>
                )}
                <p className="text-indigo-300 text-xs mt-3">
                  No spam, ever. Unsubscribe in one click.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star, ShoppingBag, Heart, ChevronDown, X, Filter, Check, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { brand } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  image: string;
  description: string;
};

// ─── Mock Data ───────────────────────────────────────────────────────────────

const allProducts: Product[] = [
  {
    id: 1,
    name: "Ceramic Pour-Over Set",
    category: "Kitchen",
    brand: "Lumière",
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviews: 214,
    badge: "Best Seller",
    image:
      "https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg",
    description:
      "Hand-thrown stoneware with a matte glaze. Brews a flawless cup every morning.",
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Home",
    brand: "Nordic Home",
    price: 64,
    originalPrice: null,
    rating: 4.8,
    reviews: 178,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    description:
      "Stonewashed European linen. Breathable, durable, and impossibly soft.",
  },
  {
    id: 3,
    name: "Walnut Desk Organizer",
    category: "Office",
    brand: "Artisan Co.",
    price: 112,
    originalPrice: 135,
    rating: 4.7,
    reviews: 96,
    badge: "Sale",
    image:
      "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    description:
      "Solid black walnut with a natural oil finish. Keeps your workspace serene.",
  },
  {
    id: 4,
    name: "Merino Wool Beanie",
    category: "Apparel",
    brand: "Urban Craft",
    price: 48,
    originalPrice: null,
    rating: 4.9,
    reviews: 302,
    badge: null,
    image:
      "http://www.ridgemerino.com/cdn/shop/files/ASPECTBEANIEBLK.jpg?v=1694720096",
    description:
      "Extra-fine 18.5-micron merino. Warm without the bulk, soft against skin.",
  },
  {
    id: 5,
    name: "Brass Candle Holder",
    category: "Decor",
    brand: "Lumière",
    price: 36,
    originalPrice: null,
    rating: 4.6,
    reviews: 143,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71D673+sDPL.jpg",
    description:
      "Solid spun brass with a brushed finish. A quiet centerpiece for any table.",
  },
  {
    id: 6,
    name: "Leather Card Wallet",
    category: "Accessories",
    brand: "Artisan Co.",
    price: 58,
    originalPrice: 72,
    rating: 4.8,
    reviews: 261,
    badge: "Sale",
    image:
      "https://www.popovleather.com/cdn/shop/files/leather-5-card-wallet-popov-leather-1174379443.jpg?v=1750466630",
    description:
      "Full-grain vegetable-tanned leather. Holds 6 cards and ages beautifully.",
  },
  {
    id: 7,
    name: "Matte Black French Press",
    category: "Kitchen",
    brand: "Lumière",
    price: 74,
    originalPrice: 90,
    rating: 4.7,
    reviews: 189,
    badge: "Sale",
    image:
      "https://m.media-amazon.com/images/I/61zMFMGpTHL._AC_UF894,1000_QL80_.jpg",
    description:
      "Borosilicate glass with a powder-coated steel frame. Rich, full-bodied brew.",
  },
  {
    id: 8,
    name: "Woven Storage Basket",
    category: "Home",
    brand: "Nordic Home",
    price: 42,
    originalPrice: null,
    rating: 4.5,
    reviews: 87,
    badge: "New",
    image:
      "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UF894,1000_QL80_.jpg",
    description:
      "Hand-woven seagrass with leather handles. Functional and beautifully textured.",
  },
  {
    id: 9,
    name: "Minimalist Desk Lamp",
    category: "Office",
    brand: "Nordic Home",
    price: 129,
    originalPrice: 155,
    rating: 4.8,
    reviews: 134,
    badge: "Best Seller",
    image:
      "https://m.media-amazon.com/images/I/61SUj2stKrL._AC_UF894,1000_QL80_.jpg",
    description:
      "Adjustable arm with warm LED. Designed for focus, built to last a decade.",
  },
  {
    id: 10,
    name: "Cashmere Scarf",
    category: "Apparel",
    brand: "Urban Craft",
    price: 95,
    originalPrice: 120,
    rating: 4.9,
    reviews: 211,
    badge: "Sale",
    image:
      "https://m.media-amazon.com/images/I/71b5MqMNFAL._AC_UF894,1000_QL80_.jpg",
    description:
      "Pure Grade-A cashmere. Featherlight warmth that drapes effortlessly.",
  },
  {
    id: 11,
    name: "Geometric Vase Set",
    category: "Decor",
    brand: "Artisan Co.",
    price: 55,
    originalPrice: null,
    rating: 4.6,
    reviews: 72,
    badge: "New",
    image:
      "https://m.media-amazon.com/images/I/71w+5XNBPNL._AC_UF894,1000_QL80_.jpg",
    description:
      "Set of three ceramic vases in matte earth tones. Minimal, sculptural, timeless.",
  },
  {
    id: 12,
    name: "Canvas Tote Bag",
    category: "Accessories",
    brand: "Urban Craft",
    price: 32,
    originalPrice: null,
    rating: 4.7,
    reviews: 318,
    badge: null,
    image:
      "https://m.media-amazon.com/images/I/71rFNMgCYgL._AC_UF894,1000_QL80_.jpg",
    description:
      "Heavy-duty 12oz canvas with reinforced stitching. Your everyday carry, elevated.",
  },
];

const CATEGORIES = [
  "All",
  "Kitchen",
  "Home",
  "Office",
  "Apparel",
  "Decor",
  "Accessories",
];

const BRANDS = ["Lumière", "Artisan Co.", "Nordic Home", "Urban Craft"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const ITEMS_PER_PAGE = 6;

// ─── Badge colour helper ──────────────────────────────────────────────────────

function badgeClass(badge: string) {
  switch (badge) {
    case "Best Seller":
      return "bg-amber-400 text-slate-900";
    case "Sale":
      return "bg-rose-500 text-white";
    case "New":
      return "bg-indigo-600 text-white";
    default:
      return "bg-slate-700 text-white";
  }
}

// ─── Star renderer ────────────────────────────────────────────────────────────

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  wishlisted,
  onWishlist,
  onAddToCart,
  justAdded,
}: {
  product: Product;
  wishlisted: boolean;
  onWishlist: () => void;
  onAddToCart: () => void;
  justAdded: boolean;
}) {
  return (
    <motion.div
      variants={scaleIn}
      className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://picsum.photos/seed/${product.id}/400/400`;
          }}
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badgeClass(product.badge)
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={onWishlist}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart
            size={15}
            className={wishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-slate-500">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-base font-bold text-slate-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <button
          onClick={onAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            justAdded
              ? "bg-emerald-500 text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-500"
          }`}
        >
          {justAdded ? (
            <>
              <Check size={15} /> Added!
            </>
          ) : (
            <>
              <ShoppingBag size={15} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(200);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [justAddedIds, setJustAddedIds] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // ── Filter + sort ──────────────────────────────────────────────────────────

  const filtered = allProducts
    .filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory)
        return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;
      if (selectedRating > 0 && p.rating < selectedRating) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand))
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedRating, selectedBrands, sortBy, priceMin, priceMax]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
    setJustAddedIds((prev) => [...prev, id]);
    setTimeout(() => {
      setJustAddedIds((prev) => prev.filter((x) => x !== id));
    }, 1200);
  };

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceMin(0);
    setPriceMax(200);
    setSelectedRating(0);
    setSelectedBrands([]);
    setSearchQuery("");
    setSortBy("featured");
  };

  // ── Sidebar JSX ────────────────────────────────────────────────────────────

  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Category
        </p>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategory === cat}
                onChange={() =>
                  setSelectedCategory(selectedCategory === cat ? "All" : cat)
                }
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700 group-hover:text-indigo-600 transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Price Range
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-xs text-slate-500 mb-1 block">Min ($)</label>
            <input
              type="number"
              min={0}
              max={priceMax}
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <span className="text-slate-400 mt-4">–</span>
          <div className="flex-1">
            <label className="text-xs text-slate-500 mb-1 block">Max ($)</label>
            <input
              type="number"
              min={priceMin}
              max={500}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-slate-100 relative">
          <div
            className="absolute h-full bg-indigo-500 rounded-full"
            style={{
              left: `${(priceMin / 500) * 100}%`,
              right: `${100 - (priceMax / 500) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>${priceMin}</span>
          <span>${priceMax}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Minimum Rating
        </p>
        <div className="space-y-2">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
              className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm transition-colors ${
                selectedRating === r
                  ? "bg-indigo-50 text-indigo-700"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <Stars rating={r} size={13} />
              <span className="text-xs">& up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Brand
        </p>
        <div className="space-y-2">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700 group-hover:text-indigo-600 transition-colors">
                {b}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={() => setShowFilters(false)}
        className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Hero Strip ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 py-16 pt-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="inline-block text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            All Products
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Shop the Full Collection
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-indigo-200 text-lg mb-8"
          >
            Curated goods for modern living — from kitchen essentials to everyday
            carry.
          </motion.p>

          {/* Search bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 bg-white rounded-2xl shadow-lg px-4 py-2 max-w-xl mx-auto"
          >
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none py-1"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
            <button className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors shrink-0">
              Search
            </button>
          </motion.div>

          {/* Breadcrumb */}
          <motion.nav
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-1.5 mt-6 text-sm text-indigo-300"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={13} />
            <span className="text-white font-medium">Shop</span>
          </motion.nav>
        </div>
      </section>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* ── Desktop Sidebar ──────────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* ── Product Grid Area ────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter bar */}
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-indigo-400 transition-colors shadow-sm"
              >
                <Filter size={15} />
                Filters
              </button>
              <div className="relative flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm pr-8"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">
                  {filtered.length}
                </span>{" "}
                product{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="hidden lg:flex items-center gap-3">
                <LayoutGrid size={16} className="text-slate-400" />
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Grid */}
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <SlidersHorizontal size={40} className="text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">No products match your filters.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <motion.div
                key={`${currentPage}-${selectedCategory}-${sortBy}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wishlisted={wishlist.includes(product.id)}
                    onWishlist={() => toggleWishlist(product.id)}
                    onAddToCart={() => addToCart(product.id)}
                    justAdded={justAddedIds.includes(product.id)}
                  />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                      p === currentPage
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Promo Banner ───────────────────────────────────────────────────── */}
      <section className="bg-indigo-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white text-2xl sm:text-3xl font-bold mb-2"
          >
            Members get 15% off every order
          </motion.p>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-indigo-200 mb-6"
          >
            Join free and unlock exclusive discounts, early access, and more.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/#newsletter"
              className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
            >
              Join Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Mobile Filter Drawer ───────────────────────────────────────────── */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-slate-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}

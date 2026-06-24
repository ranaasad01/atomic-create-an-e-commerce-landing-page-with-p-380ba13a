"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Share2, Trash2, ArrowLeft, Copy, Check, Star, X } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface WishlistItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  image: string;
  inStock: boolean;
}

interface RecommendedProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Ceramic Pour-Over Set",
    category: "Kitchen",
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviews: 214,
    badge: "Best Seller",
    image:
      "https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg",
    inStock: true,
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
    image:
      "http://www.ridgemerino.com/cdn/shop/files/ASPECTBEANIEBLK.jpg?v=1694720096",
    inStock: true,
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
    inStock: false,
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
    image:
      "https://www.popovleather.com/cdn/shop/files/leather-5-card-wallet-popov-leather-1174379443.jpg?v=1750466630",
    inStock: true,
  },
];

const recommendedProducts: RecommendedProduct[] = [
  {
    id: 101,
    name: "Linen Throw Blanket",
    price: 64,
    rating: 4.8,
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    category: "Home",
  },
  {
    id: 102,
    name: "Walnut Desk Organizer",
    price: 112,
    rating: 4.7,
    image:
      "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    category: "Office",
  },
  {
    id: 103,
    name: "Matte Black French Press",
    price: 74,
    rating: 4.6,
    image:
      "https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg",
    category: "Kitchen",
  },
  {
    id: 104,
    name: "Minimalist Wall Clock",
    price: 95,
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/71D673+sDPL.jpg",
    category: "Decor",
  },
];

// ─── Badge colour helper ──────────────────────────────────────────────────────

function badgeColor(badge: string): string {
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

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating} ({reviews})
      </span>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(initialWishlistItems);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [shareTooltip, setShareTooltip] = useState(false);
  const [sortBy, setSortBy] = useState("date-added");
  const [wishlistedRecs, setWishlistedRecs] = useState<number[]>([]);

  // ── Sorted items ────────────────────────────────────────────────────────────
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-az") return a.name.localeCompare(b.name);
    return 0; // date-added: keep original order
  });

  // ── Actions ─────────────────────────────────────────────────────────────────
  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function moveToCart(id: number) {
    setCartItems((prev) => [...prev, id]);
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setCartItems((prev) => prev.filter((cid) => cid !== id));
    }, 500);
  }

  function moveAllToCart() {
    const inStockIds = items.filter((i) => i.inStock).map((i) => i.id);
    setCartItems(inStockIds);
    setTimeout(() => {
      setItems([]);
      setCartItems([]);
    }, 500);
  }

  function shareWishlist() {
    const fakeUrl = "https://lumiere.store/wishlist/shared?id=abc123";
    navigator.clipboard.writeText(fakeUrl).catch(() => {});
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  }

  function toggleRecWishlist(id: number) {
    setWishlistedRecs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const hasInStock = items.some((i) => i.inStock);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── 1. PAGE HEADER ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-indigo-200 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Wishlist</span>
          </nav>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Heart size={32} className="text-white fill-white/30" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3"
            >
              My Wishlist
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-indigo-200 text-lg mb-5"
            >
              Your saved favourites, all in one place
            </motion.p>

            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-sm font-medium">
                <Heart size={14} className="fill-white" />
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. TOOLBAR ─────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left: count */}
            <p className="text-slate-600 text-sm font-medium">
              <span className="font-bold text-slate-900">{items.length}</span>{" "}
              {items.length === 1 ? "saved item" : "saved items"}
            </p>

            {/* Right: controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="date-added">Date Added</option>
                <option value="price-asc">Price: Low–High</option>
                <option value="price-desc">Price: High–Low</option>
                <option value="name-az">Name A–Z</option>
              </select>

              {/* Share */}
              <div className="relative">
                <button
                  onClick={shareWishlist}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                >
                  <Share2 size={15} />
                  Share Wishlist
                </button>
              </div>

              {/* Move All to Cart */}
              {items.length > 0 && hasInStock && (
                <button
                  onClick={moveAllToCart}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all duration-200"
                >
                  <ShoppingBag size={15} />
                  Move All to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. WISHLIST GRID / EMPTY STATE ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="popLayout">
          {sortedItems.length > 0 ? (
            <motion.div
              key="grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {sortedItems.map((item) => {
                const savings =
                  item.originalPrice
                    ? Math.round(
                        ((item.originalPrice - item.price) /
                          item.originalPrice) *
                          100
                      )
                    : null;
                const inCart = cartItems.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    variants={scaleIn}
                    exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.25 } }}
                    layout
                    className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x400/f1f5f9/94a3b8?text=Image";
                        }}
                      />

                      {/* Badge */}
                      {item.badge && (
                        <span
                          className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${badgeColor(item.badge)}`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-white transition-all duration-200"
                      >
                        <X size={14} />
                      </button>

                      {/* Out of stock overlay */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                          <span className="bg-white/90 text-slate-800 text-sm font-semibold px-4 py-2 rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-4 flex flex-col flex-1">
                      <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2">
                        {item.name}
                      </h3>
                      <StarRating rating={item.rating} reviews={item.reviews} />

                      {/* Price row */}
                      <div className="flex items-center gap-2 mt-3 mb-4">
                        <span className="text-lg font-bold text-slate-900">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                        {savings && (
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            -{savings}%
                          </span>
                        )}
                      </div>

                      {/* Move to Cart */}
                      <div className="mt-auto">
                        <button
                          onClick={() => item.inStock && moveToCart(item.id)}
                          disabled={!item.inStock}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            inCart
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : item.inStock
                              ? "bg-indigo-600 text-white hover:bg-indigo-500"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          {inCart ? (
                            <>
                              <Check size={15} />
                              Added to Cart
                            </>
                          ) : item.inStock ? (
                            <>
                              <ShoppingBag size={15} />
                              Move to Cart
                            </>
                          ) : (
                            "Out of Stock"
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* ── 4. EMPTY STATE ─────────────────────────────────────────────── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
                <Heart size={40} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-slate-500 mb-8 max-w-sm">
                Start saving items you love — tap the heart icon on any product
                to add it here.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors duration-200"
              >
                <ShoppingBag size={16} />
                Browse Products
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 5. RECOMMENDATIONS ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                You Might Love These
              </h2>
              <p className="text-slate-500">
                Handpicked picks based on your taste
              </p>
            </motion.div>

            {/* Horizontal scroll row */}
            <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
              {recommendedProducts.map((product) => {
                const isWishlisted = wishlistedRecs.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    variants={scaleIn}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-64 sm:w-auto"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x400/f1f5f9/94a3b8?text=Image";
                        }}
                      />
                      {/* Wishlist toggle */}
                      <button
                        onClick={() => toggleRecWishlist(product.id)}
                        aria-label="Add to wishlist"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
                        <Heart
                          size={14}
                          className={
                            isWishlisted
                              ? "fill-rose-500 text-rose-500"
                              : "text-slate-400"
                          }
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-slate-900 text-sm mt-1 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={11}
                            className={
                              s <= Math.round(product.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }
                          />
                        ))}
                        <span className="text-xs text-slate-500 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          ${product.price}
                        </span>
                        <Link
                          href="/shop"
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to shop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors duration-200"
        >
          <ArrowLeft size={15} />
          Continue Shopping
        </Link>
      </div>

      {/* ── 6. SHARE TOAST ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {shareTooltip && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <Check size={14} />
            </div>
            <div>
              <p className="text-sm font-semibold">Wishlist link copied!</p>
              <p className="text-xs text-slate-400">Share it with friends</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

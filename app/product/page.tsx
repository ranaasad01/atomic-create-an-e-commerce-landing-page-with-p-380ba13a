"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight, Check, Truck, RefreshCw, Shield, Plus, Minus, ArrowLeft } from 'lucide-react';
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const product = {
  id: 1,
  name: "Ceramic Pour-Over Set",
  category: "Kitchen",
  price: 89,
  originalPrice: 110,
  rating: 4.9,
  reviews: 214,
  badge: "Best Seller",
  description:
    "Hand-thrown stoneware with a matte glaze finish. Each piece is unique, with subtle variations that make it truly one-of-a-kind. Brews a flawless cup every morning with a clean, even pour. Includes the dripper, carafe, and a pack of 40 filters.",
  features: [
    "Hand-thrown stoneware",
    "Matte glaze finish",
    "Includes dripper + carafe + 40 filters",
    "Dishwasher safe",
    "Holds 600ml",
  ],
  images: [
    "https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg",
    "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71D673+sDPL.jpg",
  ],
  colors: ["Matte White", "Slate Grey", "Terracotta"],
  sizes: ["Standard (600ml)", "Large (900ml)"],
};

const reviews = [
  {
    id: 1,
    author: "Mara Lindqvist",
    avatar: "https://ui-avatars.com/api/?name=Mara+Lindqvist&background=e0e7ff&color=4338ca&size=64",
    rating: 5,
    date: "June 12, 2024",
    title: "Absolutely stunning piece",
    body: "The pour-over set is genuinely beautiful. It sits on my counter like a sculpture and makes the best coffee I've ever had at home. The matte glaze is even more gorgeous in person.",
  },
  {
    id: 2,
    author: "James Okafor",
    avatar: "https://ui-avatars.com/api/?name=James+Okafor&background=fef3c7&color=92400e&size=64",
    rating: 5,
    date: "May 28, 2024",
    title: "Worth every penny",
    body: "I was hesitant at the price point but this set has completely replaced my old plastic dripper. The ceramic retains heat beautifully and the pour is incredibly even. Highly recommend.",
  },
  {
    id: 3,
    author: "Sofia Reyes",
    avatar: "https://ui-avatars.com/api/?name=Sofia+Reyes&background=fce7f3&color=9d174d&size=64",
    rating: 4,
    date: "May 14, 2024",
    title: "Great quality, minor gripe",
    body: "Love the look and feel of this set. The only reason I'm giving 4 stars is that the carafe is slightly smaller than I expected. But the coffee it produces is exceptional.",
  },
  {
    id: 4,
    author: "Luca Bianchi",
    avatar: "https://ui-avatars.com/api/?name=Luca+Bianchi&background=d1fae5&color=065f46&size=64",
    rating: 5,
    date: "April 30, 2024",
    title: "A morning ritual upgrade",
    body: "This set has transformed my morning routine. The ritual of brewing with this beautiful ceramic piece makes the whole process meditative. Packaging was also impeccable.",
  },
];

const relatedProducts = [
  {
    id: 2,
    name: "Linen Throw Blanket",
    price: 64,
    rating: 4.8,
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    category: "Home",
  },
  {
    id: 3,
    name: "Walnut Desk Organizer",
    price: 112,
    rating: 4.7,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    category: "Office",
  },
  {
    id: 4,
    name: "Merino Wool Beanie",
    price: 48,
    rating: 4.9,
    image: "http://www.ridgemerino.com/cdn/shop/files/ASPECTBEANIEBLK.jpg?v=1694720096",
    category: "Apparel",
  },
  {
    id: 5,
    name: "Brass Candle Holder",
    price: 36,
    rating: 4.6,
    image: "https://m.media-amazon.com/images/I/71D673+sDPL.jpg",
    category: "Decor",
  },
];

const colorSwatchMap: Record<string, string> = {
  "Matte White": "bg-stone-100 border border-stone-300",
  "Slate Grey": "bg-slate-400",
  Terracotta: "bg-orange-400",
};

const ratingBreakdown = [
  { stars: 5, count: 172 },
  { stars: 4, count: 28 },
  { stars: 3, count: 9 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
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
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews">("description");

  const handleAddToCart = () => {
    setInCart(true);
    setTimeout(() => setInCart(false), 2000);
  };

  const prevImage = () =>
    setSelectedImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const nextImage = () =>
    setSelectedImage((i) => (i === product.images.length - 1 ? 0 : i + 1));

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link href="/shop" className="hover:text-indigo-600 transition-colors">
            Shop
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link
            href="/shop"
            className="hover:text-indigo-600 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-900 font-medium truncate">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ── Back link ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Shop
        </Link>
      </div>

      {/* ── Product Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* LEFT — Image Gallery */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-md aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x600/f1f5f9/94a3b8?text=Image";
                }}
              />
              {/* Prev / Next */}
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-slate-700 hover:bg-white hover:text-indigo-600 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-slate-700 hover:bg-white hover:text-indigo-600 transition-all"
              >
                <ChevronRight size={18} />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === selectedImage
                        ? "bg-indigo-600 w-5"
                        : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    i === selectedImage
                      ? "border-indigo-600 shadow-md"
                      : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/200x200/f1f5f9/94a3b8?text=Img";
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Product Info */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {/* Badge + Category */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.badge && (
                <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold tracking-wide">
                  {product.badge}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap">
              <StarRow rating={product.rating} size={18} />
              <span className="text-slate-900 font-semibold text-sm">
                {product.rating}
              </span>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-sm text-indigo-600 hover:underline"
              >
                {product.reviews} reviews
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-slate-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-sm font-semibold">
                    Save ${savings}
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            <p className="text-slate-600 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Color picker */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Color:{" "}
                <span className="font-normal text-slate-500">
                  {selectedColor}
                </span>
              </p>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-8 h-8 rounded-full transition-all ${
                      colorSwatchMap[color] ?? "bg-slate-300"
                    } ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-indigo-600 scale-110"
                        : "hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Size
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:text-indigo-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">
                Quantity
              </p>
              <div className="flex items-center gap-0 border border-slate-200 rounded-xl w-fit overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="px-5 py-2.5 text-slate-900 font-semibold text-sm min-w-[3rem] text-center border-x border-slate-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-base transition-all duration-300 ${
                inCart
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-lg"
              }`}
            >
              {inCart ? (
                <>
                  <Check size={18} />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  Add to Cart — ${product.price * quantity}
                </>
              )}
            </button>

            {/* Wishlist + Share */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setInWishlist((w) => !w)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border font-medium text-sm transition-all ${
                  inWishlist
                    ? "border-rose-300 bg-rose-50 text-rose-600"
                    : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-500"
                }`}
              >
                <Heart
                  size={16}
                  className={inWishlist ? "fill-rose-500 text-rose-500" : ""}
                />
                {inWishlist ? "Wishlisted" : "Add to Wishlist"}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-600 font-medium text-sm transition-all">
                <Share2 size={16} />
                Share
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <Truck size={13} className="text-indigo-600" />
                Free Shipping
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <RefreshCw size={13} className="text-indigo-600" />
                Free Returns
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <Shield size={13} className="text-indigo-600" />
                2-Year Warranty
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs Section ── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab bar */}
          <div className="flex items-center gap-0 border-b border-slate-100 overflow-x-auto">
            {([
              { key: "description", label: "Description" },
              { key: "features", label: "Features" },
              { key: "reviews", label: `Reviews (${product.reviews})` },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-10">
            {activeTab === "description" && (
              <motion.div
                key="description"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="max-w-3xl space-y-4 text-slate-600 leading-relaxed"
              >
                <p>
                  The Ceramic Pour-Over Set is the result of a collaboration between our design team and a small-batch pottery studio in the Pacific Northwest. Every dripper and carafe is individually hand-thrown on a wheel, meaning no two sets are exactly alike. The subtle variations in glaze pooling and rim thickness are a testament to the human hands that shaped each piece.
                </p>
                <p>
                  We chose stoneware for its exceptional heat retention — the thick walls keep your water at the ideal brewing temperature throughout the pour, extracting the full spectrum of flavors from your ground coffee. The wide-mouth carafe allows you to observe the bloom and the draw-down, turning your morning brew into a mindful ritual rather than a rushed chore.
                </p>
                <p>
                  The matte glaze is fired at high temperature for durability and is completely food-safe. It resists staining and is dishwasher safe, though we recommend hand washing to preserve the finish over time. Each set ships in a gift-ready box with a linen drawstring bag, making it an ideal present for the coffee lover in your life.
                </p>
              </motion.div>
            )}

            {activeTab === "features" && (
              <motion.div
                key="features"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="max-w-2xl"
              >
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-slate-700"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Check size={12} className="text-indigo-600" />
                      </span>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-100">
                  <p className="text-sm font-semibold text-amber-800 mb-1">
                    What's in the box
                  </p>
                  <p className="text-sm text-amber-700">
                    1× Ceramic dripper, 1× 600ml carafe, 40× paper filters, 1× linen drawstring bag, care instructions card.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-10"
              >
                {/* Rating summary */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-8 items-start"
                >
                  {/* Big number */}
                  <div className="flex flex-col items-center justify-center bg-indigo-50 rounded-2xl px-10 py-6 shrink-0">
                    <span className="text-5xl font-bold text-slate-900">
                      {product.rating}
                    </span>
                    <StarRow rating={product.rating} size={20} />
                    <span className="text-sm text-slate-500 mt-1">
                      {product.reviews} reviews
                    </span>
                  </div>

                  {/* Bar chart */}
                  <div className="flex-1 space-y-2 w-full">
                    {ratingBreakdown.map(({ stars, count }) => {
                      const pct = Math.round(
                        (count / product.reviews) * 100
                      );
                      return (
                        <div
                          key={stars}
                          className="flex items-center gap-3 text-sm"
                        >
                          <span className="w-4 text-slate-600 font-medium text-right">
                            {stars}
                          </span>
                          <Star
                            size={13}
                            className="fill-amber-400 text-amber-400 shrink-0"
                          />
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-slate-500 text-xs">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Review cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      variants={fadeInUp}
                      className="bg-stone-50 rounded-2xl p-6 border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {review.author}
                          </p>
                          <p className="text-xs text-slate-400">{review.date}</p>
                        </div>
                        <div className="ml-auto">
                          <StarRow rating={review.rating} size={13} />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mb-1">
                        {review.title}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {review.body}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            You May Also Like
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {relatedProducts.map((rp) => (
            <motion.div
              key={rp.id}
              variants={fadeInUp}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href="/product" className="block">
                <div className="aspect-square overflow-hidden bg-slate-50">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/400x400/f1f5f9/94a3b8?text=Product";
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-1">{rp.category}</p>
                  <p className="text-sm font-semibold text-slate-900 leading-snug mb-2">
                    {rp.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      ${rp.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-xs text-slate-500">{rp.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

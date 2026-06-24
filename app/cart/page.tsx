"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck, Shield, ChevronRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string | null;
}

interface RecommendedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Ceramic Pour-Over Set",
    category: "Kitchen",
    price: 89,
    quantity: 1,
    image:
      "https://images.squarespace-cdn.com/content/v1/633d97a584c81a7b487bccd0/1666200539913-NJTKCUZF9KWR0HJY8KXN/IMG_1474.jpeg",
    color: "Matte White",
    size: "Standard",
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Home",
    price: 64,
    quantity: 2,
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    color: "Natural",
    size: null,
  },
  {
    id: 3,
    name: "Walnut Desk Organizer",
    category: "Office",
    price: 112,
    quantity: 1,
    image:
      "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    color: "Walnut",
    size: null,
  },
];

const recommendedProducts: RecommendedProduct[] = [
  {
    id: 101,
    name: "Merino Wool Beanie",
    price: 48,
    image:
      "http://www.ridgemerino.com/cdn/shop/files/ASPECTBEANIEBLK.jpg?v=1694720096",
    category: "Apparel",
  },
  {
    id: 102,
    name: "Brass Candle Holder",
    price: 36,
    image: "https://m.media-amazon.com/images/I/71D673+sDPL.jpg",
    category: "Decor",
  },
  {
    id: 103,
    name: "Leather Card Wallet",
    price: 58,
    image:
      "https://www.popovleather.com/cdn/shop/files/leather-5-card-wallet-popov-leather-1174379443.jpg?v=1750466630",
    category: "Accessories",
  },
  {
    id: 104,
    name: "Linen Cushion Cover",
    price: 32,
    image:
      "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    category: "Home",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(10, Math.max(1, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === "LUMIERE15") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError("Invalid code. Try LUMIERE15.");
    }
  };

  const handleAddRecommended = (id: number) => {
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  // ─── Calculations ──────────────────────────────────────────────────────────

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.15 : 0;
  const shipping = subtotal >= 75 ? 0 : 8.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;
  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Page Header ── */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-indigo-200 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Cart</span>
          </nav>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            Your Cart
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-indigo-200 mt-2 text-base"
          >
            Review your items before checkout
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          /* Empty State */
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
              <ShoppingBag size={36} className="text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-sm">
              Looks like you haven&apos;t added anything yet. Explore our collection and find something you love.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* ── LEFT: Cart Items ── */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Cart{" "}
                  <span className="text-slate-400 font-normal text-base">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                </h2>
                <Link
                  href="/shop"
                  className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                >
                  <ArrowLeft size={14} />
                  Continue Shopping
                </Link>
              </div>

              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={fadeInUp}
                      layout
                      exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                      className="bg-white rounded-xl shadow-sm border border-slate-100 p-4"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover bg-slate-100"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/96x96/f1f5f9/94a3b8?text=Item";
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.color && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs">
                                    {item.color}
                                  </span>
                                )}
                                {item.size && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs">
                                    {item.size}
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Remove */}
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 shrink-0"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          {/* Bottom row: price + qty + line total */}
                          <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                            <p className="text-sm text-slate-500">
                              ${item.price.toFixed(2)} each
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={item.quantity >= 10}
                                aria-label="Increase quantity"
                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            {/* Line Total */}
                            <p className="font-bold text-slate-900 text-sm sm:text-base">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="mt-8 lg:mt-0">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Order Summary</h2>

                {/* Free Shipping Progress */}
                {amountToFreeShipping > 0 && (
                  <div className="mb-5 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={14} className="text-amber-600" />
                      <p className="text-xs font-medium text-amber-700">
                        Add{" "}
                        <span className="font-bold">${amountToFreeShipping.toFixed(2)}</span>{" "}
                        more for free shipping!
                      </p>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-1.5">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Promo Code */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                        placeholder="Enter code"
                        className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors duration-200"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 text-xs mt-1.5">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="text-emerald-600 text-xs mt-1.5 font-medium">
                      ✓ 15% discount applied!
                    </p>
                  )}
                </div>

                {/* Line Items */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount (15%)</span>
                      <span className="font-medium">−${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Tax (8%)</span>
                    <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-4" />

                <div className="flex justify-between items-center mb-5">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="block w-full text-center py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors duration-200 text-sm"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-center text-xs text-slate-400 mt-3">
                  or{" "}
                  <Link href="/shop" className="text-indigo-600 hover:underline font-medium">
                    Continue Shopping
                  </Link>
                </p>

                {/* Trust Badges */}
                <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Shield size={16} className="text-indigo-500" />
                    <span className="text-xs text-slate-500 leading-tight">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowLeft size={16} className="text-indigo-500" />
                    <span className="text-xs text-slate-500 leading-tight">Free Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck size={16} className="text-indigo-500" />
                    <span className="text-xs text-slate-500 leading-tight">2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Recommended Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-slate-900 mb-6"
          >
            You Might Also Like
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {recommendedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group"
              >
                <div className="relative overflow-hidden aspect-square bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/300x300/f1f5f9/94a3b8?text=Product";
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-0.5">{product.category}</p>
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-slate-900">${product.price}</span>
                    <button
                      onClick={() => handleAddRecommended(product.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                        addedToCart === product.id
                          ? "bg-emerald-500 text-white"
                          : "bg-indigo-600 text-white hover:bg-indigo-500"
                      }`}
                    >
                      {addedToCart === product.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateItem, removeItem, isLoading } = useCart();

  const lines = cart?.lines.nodes || [];
  const subtotal = cart?.cost.subtotalAmount || { amount: "0", currencyCode: "USD" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-espresso shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif">Your Selection</h2>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">
                  {lines.length} {lines.length === 1 ? "Item" : "Items"}
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-700 mb-6" />
                  <p className="text-gray-400 font-light mb-8">Your selection is currently empty.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold border-b border-gold pb-1"
                  >
                    Explore the Menu
                  </button>
                </div>
              ) : (
                lines.map((line) => (
                  <div key={line.id} className="flex gap-6">
                    <div className="relative w-24 h-24 bg-black overflow-hidden flex-shrink-0">
                      <Image
                        src={line.merchandise.product.featuredImage?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000"}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-serif truncate pr-4">
                          {line.merchandise.product.title}
                        </h3>
                        <p className="text-sm text-gold">
                          {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                        </p>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">
                        {line.merchandise.title !== "Default Title" ? line.merchandise.title : "Selection"}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/10 h-8">
                          <button
                            onClick={() => updateItem(line.id, Math.max(1, line.quantity - 1))}
                            disabled={isLoading}
                            className="w-8 flex items-center justify-center hover:text-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[10px] font-bold">{line.quantity}</span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="w-8 flex items-center justify-center hover:text-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(line.id)}
                          disabled={isLoading}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="p-8 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Subtotal</span>
                  <span className="text-xl font-serif">
                    {formatPrice(subtotal.amount, subtotal.currencyCode)}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-5 bg-gold text-background text-center text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-champaya transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

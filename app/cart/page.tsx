"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";

export default function CartPage() {
  const { cart, updateItem, removeItem, isLoading } = useCart();
  const lines = cart?.lines.nodes || [];
  const subtotal = cart?.cost.subtotalAmount || { amount: "0", currencyCode: "USD" };

  if (lines.length === 0) {
    return (
      <div className="pt-40 pb-32 px-6 md:px-12 min-h-[70vh] flex flex-col items-center justify-center">
        <AnimatedSection className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-800 mb-8 mx-auto" />
          <h1 className="text-4xl font-serif mb-6">Your Selection is Empty</h1>
          <p className="text-gray-400 mb-12 max-w-md mx-auto">
            It seems you haven&apos;t added any culinary selections to your cart yet.
          </p>
          <Link 
            href="/menu" 
            className="px-10 py-4 bg-gold text-background text-xs uppercase tracking-widest font-bold hover:bg-champagne transition-colors"
          >
            Explore Menu
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-gold mb-6 block">Review Selections</span>
          <h1 className="text-5xl md:text-7xl font-serif">Your Cart</h1>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Cart Items */}
          <div className="flex-1 space-y-12">
            {lines.map((line) => (
              <AnimatedSection key={line.id} className="flex flex-col sm:flex-row gap-8 pb-12 border-b border-white/5">
                <div className="relative w-full sm:w-48 aspect-square bg-espresso overflow-hidden">
                  <Image
                    src={line.merchandise.product.featuredImage?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000"}
                    alt={line.merchandise.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-serif">{line.merchandise.product.title}</h3>
                      <p className="text-xl text-gold font-serif">
                        {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">
                      {line.merchandise.title !== "Default Title" ? line.merchandise.title : "Selection"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-white/10 h-12">
                      <button
                        onClick={() => updateItem(line.id, Math.max(1, line.quantity - 1))}
                        disabled={isLoading}
                        className="w-12 h-full flex items-center justify-center hover:text-gold transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold">{line.quantity}</span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="w-12 h-full flex items-center justify-center hover:text-gold transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96">
            <AnimatedSection className="bg-espresso p-10 border border-white/5 sticky top-32">
              <h2 className="text-xl font-serif mb-10 border-b border-white/5 pb-6">Summary</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Service Fee</span>
                  <span className="text-gray-500 italic">Calculated at checkout</span>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-serif text-gold">
                    {formatPrice(subtotal.amount, subtotal.currencyCode)}
                  </span>
                </div>
              </div>
              
              <a
                href={cart?.checkoutUrl}
                className="w-full py-5 bg-gold text-background text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-champagne transition-colors flex items-center justify-center gap-3"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </a>
              
              <Link 
                href="/menu"
                className="block text-center mt-8 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}

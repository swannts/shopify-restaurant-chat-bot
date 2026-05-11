"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Minus, Check, ShoppingBag } from "lucide-react";
import { Product, ProductVariant } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import AnimatedSection from "./AnimatedSection";
import { useCart } from "@/lib/cart";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants.nodes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, isLoading } = useCart();

  const handleAddToCart = async () => {
    await addItem(selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section className="px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-24 relative z-10 items-center">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] border-8 border-[#17120d]"
          >
            <Image
              src={product.featuredImage?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"}
              alt={product.featuredImage?.altText || product.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gold text-xs font-bold uppercase tracking-widest mb-6">
              {product.availableForSale ? "Available Selection" : "Temporarily Unavailable"}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-ivory mb-6 leading-tight">{product.title}</h1>
            <p className="text-3xl text-gold font-serif mb-10">
              {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
            </p>
            
            <div 
              className="text-muted font-light leading-relaxed mb-12 prose prose-invert"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {/* Variant Selection */}
            {product.variants.nodes.length > 1 && (
              <div className="mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-ivory mb-4 block">Options</span>
                <div className="flex flex-wrap gap-4">
                  {product.variants.nodes.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        "px-6 py-3 border text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300",
                        selectedVariant.id === variant.id
                          ? "bg-white/10 border-gold text-gold"
                          : "bg-white/5 border-white/10 text-muted hover:border-white/30 hover:text-ivory"
                      )}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 glass-card border-white/10">
              <div className="flex items-center justify-between w-full sm:w-32 bg-[#17120d] rounded-full p-1 border border-white/10">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-ivory transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-ivory">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-ivory transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isLoading || !product.availableForSale}
                className={cn(
                  "flex-1 py-4 px-8 text-sm font-bold rounded-full transition-all duration-500 flex items-center justify-center gap-3 w-full",
                  added 
                    ? "bg-green-900/20 text-green-500 border border-green-500/30" 
                    : "bg-gold text-background hover:bg-gold-dark disabled:bg-white/10 disabled:text-muted disabled:cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                  />
                ) : added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Selection
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Selection
                  </>
                )}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

import { Product } from "@/lib/types";

interface MenuContentProps {
  products: Product[];
}

const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks"];

export default function MenuContent({ products }: MenuContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "All") return true;
    
    const type = product.productType?.toLowerCase() || "";
    
    if (activeCategory === "Starters") return type.includes("appetizer") || type.includes("starter") || type.includes("entrée") || type.includes("entree");
    if (activeCategory === "Main Course") return type.includes("main") || type.includes("plat");
    if (activeCategory === "Desserts") return type.includes("dessert") || type.includes("sweet");
    if (activeCategory === "Drinks") return type.includes("wine") || type.includes("cocktail") || type.includes("drink") || type.includes("beverage") || type.includes("cave");
    
    return false;
  });

  return (
    <>
      {/* Category Filters */}
      <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 border ${
              activeCategory === category
                ? "bg-gold text-background border-gold shadow-[0_10px_20px_rgba(255,216,77,0.2)]"
                : "bg-white/5 text-ivory/60 hover:text-ivory hover:bg-white/10 border-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </AnimatedSection>

      {/* Product Grid */}
      <div className="min-h-[400px] relative">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-glass"
            >
              <p className="text-muted uppercase tracking-widest text-sm">
                No items found in this selection.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

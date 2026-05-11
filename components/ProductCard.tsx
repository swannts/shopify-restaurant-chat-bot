"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isLoading } = useCart();
  const price = product.priceRange.minVariantPrice;
  const defaultVariant = product.variants.nodes[0];

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    if (!product.availableForSale) return;
    await addItem(defaultVariant.id, 1);
  };

  return (
    <Link href={`/product/${product.handle}`} className="group block h-full">
      <div className="glass-card p-6 h-full flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden hover:border-white/20">
        
        {/* Circular Image Container */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-105 border-4 border-[#17120d]">
          <Image
            src={product.featuredImage?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"}
            alt={product.featuredImage?.altText || product.title}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <h3 className="text-xl font-serif text-ivory mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted line-clamp-2 mb-6 flex-1 font-light">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="w-full flex items-center justify-between mt-auto">
          <span className="text-xl font-serif text-gold">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <button 
            onClick={handleAdd}
            disabled={isLoading || !product.availableForSale}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ivory hover:bg-gold hover:text-background hover:border-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}

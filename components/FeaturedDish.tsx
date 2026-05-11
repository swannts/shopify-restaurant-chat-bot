import { getProducts } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { formatPrice } from "@/lib/utils";

export default async function FeaturedDish() {
  let products = [];
  try {
    products = await getProducts(1);
  } catch (error) {
    console.error("Failed to fetch featured product:", error);
  }

  if (products.length === 0) return null;

  const product = products[0];
  const price = product.priceRange.minVariantPrice;

  return (
    <section className="py-24 px-6 md:px-12 bg-surface overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(255,216,77,0.03),_transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[2rem] overflow-hidden">
          <AnimatedSection>
            <Image
              src={product.featuredImage?.url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"}
              alt={product.featuredImage?.altText || product.title}
              fill
              className="object-cover"
            />
          </AnimatedSection>
        </div>
        
        <div className="w-full lg:w-1/2">
          <AnimatedSection delay={0.2}>
            <span className="text-gold text-sm font-bold uppercase tracking-widest mb-4 block">Signature Dish</span>
            <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-6 leading-tight">{product.title}</h2>
            <div 
              className="text-muted font-light leading-relaxed mb-8 prose prose-invert"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <div className="flex items-center gap-8">
              <span className="text-3xl text-gold font-serif">
                {formatPrice(price.amount, price.currencyCode)}
              </span>
              <Link 
                href={`/product/${product.handle}`} 
                className="px-8 py-3 bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-ivory text-sm font-bold rounded-full transition-all duration-300"
              >
                Order Now
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

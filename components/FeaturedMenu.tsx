import { getProducts } from "@/lib/shopify";
import ProductCard from "./ProductCard";
import AnimatedSection from "./AnimatedSection";

export default async function FeaturedMenu() {
  let products = [];
  try {
    products = await getProducts(8);
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  if (products.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest mb-4 block">Handpicked Specialties</span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory">Choose Our Menu</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

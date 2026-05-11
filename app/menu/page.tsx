import { getProducts } from "@/lib/shopify";
import AnimatedSection from "@/components/AnimatedSection";
import MenuContent from "@/components/MenuContent";

export const metadata = {
  title: "Choose Our Menu | Maison Étoile",
  description: "Explore our chef-curated selections, from seasonal starters to exquisite wine pairings.",
};

import { Product } from "@/lib/types";

export default async function MenuPage() {
  let products: Product[] = [];
  try {
    products = await getProducts(50);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="pt-40 pb-32 px-6 md:px-12 bg-background min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest mb-4 block">Handpicked Specialties</span>
          <h1 className="text-5xl md:text-7xl font-serif text-ivory mb-6 tracking-tight">Choose Our Menu</h1>
          <p className="text-muted max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Our menu is a living expression of the seasons, changing daily based on the finest ingredients available to our kitchen.
          </p>
        </AnimatedSection>

        {products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-glass">
            <p className="text-muted uppercase tracking-widest text-sm">Our menu is currently being curated.</p>
          </div>
        ) : (
          <MenuContent products={products} />
        )}
      </div>
    </div>
  );
}

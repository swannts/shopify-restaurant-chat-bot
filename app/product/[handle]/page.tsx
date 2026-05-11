import { getProductByHandle, getProducts } from "@/lib/shopify";
import ProductDetails from "@/components/ProductDetails";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found | Maison Étoile",
    };
  }

  return {
    title: `${product.title} | Maison Étoile`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Fetch related products
  const allProducts = await getProducts(10);
  const relatedProducts = allProducts.filter(p => p.handle !== handle).slice(0, 4);

  return (
    <div className="pt-40 pb-32 bg-background min-h-screen">
      <ProductDetails product={product} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
            <AnimatedSection className="mb-16 text-center">
              <span className="text-gold text-xs font-bold uppercase tracking-widest mb-4 block">Complete the Experience</span>
              <h2 className="text-3xl md:text-5xl font-serif text-ivory">You May Also Enjoy</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, index) => (
                <AnimatedSection key={p.id} delay={index * 0.1}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

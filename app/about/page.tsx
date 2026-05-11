import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import ReservationCTA from "@/components/ReservationCTA";

export const metadata = {
  title: "Our Story | Maison Étoile",
  description: "Discover the heritage, philosophy, and culinary vision of Maison Étoile.",
};

export default function AboutPage() {
  return (
    <div className="pt-40 bg-background">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-32">
          <span className="text-xs uppercase tracking-[0.4em] text-gold mb-6 block">Our Story</span>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 tracking-tight">The Art of Fine Dining</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Founded on the principles of classic Parisian gastronomy and contemporary innovation, Maison Étoile is a sanctuary for those who appreciate the finer details of life.
          </p>
        </AnimatedSection>

        {/* Heritage Section */}
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
            <div className="w-full lg:w-1/2">
              <AnimatedSection>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000"
                    alt="Restaurant interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>
            <div className="w-full lg:w-1/2">
              <AnimatedSection delay={0.2}>
                <h2 className="text-3xl md:text-5xl font-serif mb-8">A Legacy of Excellence</h2>
                <div className="space-y-6 text-gray-400 font-light leading-relaxed">
                  <p>
                    Established in 2010, Maison Étoile began as a small bistro in the heart of the 8th arrondissement. Our vision was simple: to create a space where the ingredient is king and the guest is royalty.
                  </p>
                  <p>
                    Over the years, we have evolved into a destination for global gourmands, earning acclaim for our commitment to seasonal purity and technical precision.
                  </p>
                  <p>
                    Today, Maison Étoile continues to push the boundaries of fine dining, blending traditional French techniques with global influences to create a truly unique culinary language.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Chef Section */}
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-32 items-center">
            <div className="w-full lg:w-1/2">
              <AnimatedSection>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1577214190422-09852277f985?auto=format&fit=crop&q=80&w=1000"
                    alt="Executive Chef"
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>
            <div className="w-full lg:w-1/2">
              <AnimatedSection delay={0.2}>
                <h2 className="text-3xl md:text-5xl font-serif mb-8">Chef Jean-Pierre Valois</h2>
                <div className="space-y-6 text-gray-400 font-light leading-relaxed">
                  <p>
                    With over three decades of experience in Michelin-starred kitchens across Europe, Chef Jean-Pierre brings a wealth of knowledge and a singular vision to Maison Étoile.
                  </p>
                  <p>
                    His philosophy is rooted in the belief that the role of the chef is to reveal the soul of the ingredient, not to mask it. Each plate is a testament to this conviction—balanced, elegant, and profoundly flavorful.
                  </p>
                  <p>
                    &quot;Cooking is an act of love and a form of architecture,&quot; says Valois. &quot;It requires both a warm heart and a cool, calculating mind.&quot;
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
      
      <ReservationCTA />
    </div>
  );
}

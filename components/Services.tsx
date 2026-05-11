import { Truck, Leaf, ShieldCheck, ChefHat } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Enjoy our culinary creations from the comfort of your home with our dedicated premium delivery service.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source only the finest seasonal ingredients from trusted local artisans and sustainable farms.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Your seamless online ordering experience is protected with the highest industry standards.",
  },
  {
    icon: ChefHat,
    title: "Chef Quality",
    description: "Every dish is meticulously prepared to meet our exacting standards before it leaves our kitchen.",
  },
];

export default function Services() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <span className="text-gold text-xs font-bold uppercase tracking-widest mb-4 block">Our Commitment</span>
          <h2 className="text-4xl md:text-5xl font-serif text-ivory">We Have Service That You Can Trust</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="glass-card p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500 h-full border border-white/5 hover:border-white/10">
                <div className="w-16 h-16 rounded-full bg-[#17120d] border border-white/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-ivory mb-4">{service.title}</h3>
                <p className="text-sm text-muted font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

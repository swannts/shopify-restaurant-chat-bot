import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function ReservationCTA() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#080706] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,216,77,0.05),_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-5xl md:text-7xl font-serif text-ivory mb-8 leading-tight">
            An unforgettable dining <br /> experience awaits.
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <Link 
              href="/contact" 
              className="px-10 py-4 bg-gold hover:bg-gold-dark text-background text-sm font-bold rounded-full transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Book a Table
            </Link>
            <Link 
              href="/menu" 
              className="px-10 py-4 border border-white/20 hover:border-gold hover:text-gold text-ivory text-sm font-bold rounded-full transition-all duration-300 w-full sm:w-auto text-center"
            >
              Order Online
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

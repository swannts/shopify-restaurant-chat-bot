"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(255,216,77,0.08),_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 pt-12 lg:pt-0 text-center lg:text-left"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gold text-xs font-bold uppercase tracking-widest mb-6">
            Fine Dining Experience
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-[1.1] text-ivory tracking-tight">
            Fresh & Elegant <br className="hidden md:block" />
            <span className="text-gold italic font-light">Food Specialties</span>
          </h1>
          
          <p className="text-base md:text-lg text-muted mb-10 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
            Discover chef-crafted dishes, seasonal ingredients, and refined flavors prepared for unforgettable dining. Delivered with elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link 
              href="/menu" 
              className="px-8 py-4 bg-gold hover:bg-gold-dark text-background text-sm font-bold rounded-full transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Explore Menu
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border border-white/20 text-ivory text-sm font-bold rounded-full hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Reserve a Table
            </Link>
          </div>
        </motion.div>

        {/* Hero Image & Floating Elements */}
        <div className="order-1 lg:order-2 relative aspect-square w-full max-w-xl mx-auto mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-full h-full rounded-full flex items-center justify-center"
          >
            {/* Main Dish */}
            <div className="relative w-[85%] h-[85%] rounded-full shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
                <Image
                  src="/images/hero_dark.png"
                  alt="Elegant Plated Dish"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
            </div>
            
            {/* Floating Decoration 1 */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-[10%] right-[15%] w-16 h-16 rounded-full overflow-hidden border-2 border-[#11100d] shadow-xl"
            >
               <Image
                 src="/images/detail_1.png"
                 alt="Fresh Herb"
                 fill
                 sizes="64px"
                 className="object-cover"
               />
            </motion.div>

            {/* Floating Decoration 2 */}
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] left-[5%] w-20 h-20 rounded-full overflow-hidden border-2 border-[#11100d] shadow-xl"
            >
               <Image
                 src="/images/detail_2.png"
                 alt="Spice"
                 fill
                 sizes="80px"
                 className="object-cover"
               />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

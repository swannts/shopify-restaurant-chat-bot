"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Reservations", href: "/contact" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, setIsOpen } = useCart();

  const totalQuantity = cart?.totalQuantity || 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 py-6 px-6 md:px-12",
        scrolled ? "bg-[#080706]/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl md:text-3xl font-serif tracking-tighter text-ivory">
          Maison Étoile
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-8 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="relative group p-2 text-ivory hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {totalQuantity > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-gold text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link
            href="/menu"
            className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-background text-sm font-bold rounded-full transition-colors duration-300"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center space-x-4">
          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-ivory"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-ivory">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#11100d] border-t border-white/5 p-8 flex flex-col space-y-6 lg:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif text-center text-ivory"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 bg-gold text-background text-center font-bold rounded-full"
            >
              Order Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

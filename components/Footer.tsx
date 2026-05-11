import Link from "next/link";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080706] border-t border-white/5 pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 relative z-10">
        <div className="col-span-1 lg:col-span-1">
          <Link href="/" className="text-2xl font-serif tracking-tighter text-ivory">
            Maison Étoile
          </Link>
          <p className="mt-6 text-sm text-muted leading-relaxed max-w-xs font-light">
            A sanctuary of culinary excellence, where every plate tells a story of passion and precision.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-ivory mb-6 font-bold">Explore</h4>
          <ul className="space-y-4 text-sm font-light text-muted">
            <li><Link href="/menu" className="hover:text-gold transition-colors">Menu</Link></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Reservations</Link></li>
            <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-ivory mb-6 font-bold">Contact</h4>
          <ul className="space-y-4 text-sm text-muted font-light">
            <li>123 Étoile Avenue, Paris</li>
            <li>reservations@maisonetoile.com</li>
            <li>+33 1 23 45 67 89</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-ivory mb-6 font-bold">Newsletter</h4>
          <p className="text-sm text-muted mb-4 font-light">Subscribe to receive updates on seasonal menus and exclusive events.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-ivory placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold text-background rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex space-x-6 mt-8">
            <Link href="#" className="text-muted hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="text-muted hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="text-muted hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative z-10">
        <p className="text-[10px] uppercase tracking-widest text-muted/50">
          © {new Date().getFullYear()} Maison Étoile. All rights reserved.
        </p>
        <p className="text-[10px] uppercase tracking-widest text-muted/50">
          Designed with elegance.
        </p>
      </div>
    </footer>
  );
}

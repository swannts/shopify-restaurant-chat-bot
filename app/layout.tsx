import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import ChatBot from "@/components/ChatBot";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Maison Étoile | Fine Dining & Elegant Gastronomy",
  description: "Experience the art of fine dining at Maison Étoile. Chef-curated menus, premium seasonal ingredients, and refined hospitality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground" suppressHydrationWarning>
        <div className="grain-overlay" />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <ChatBot />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}

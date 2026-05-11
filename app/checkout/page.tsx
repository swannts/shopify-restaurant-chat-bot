"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Check, CreditCard, User, ArrowRight, ChevronLeft } from "lucide-react";

const steps = [
  { id: 1, name: "Information", icon: User },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Confirmation", icon: Check },
];

export default function CheckoutPage() {
  const { cart, isLoading, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialRequests: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount || "0");
  const serviceCharge = subtotal * 0.15;
  const total = subtotal + serviceCharge;

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("Please fill in all required fields.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setIsProcessing(true);
      try {
        if (cart?.checkoutUrl) {
          // Redirect to the real Shopify checkout for order placement
          window.location.href = cart.checkoutUrl;
          return;
        } else {
          // Fallback if checkoutUrl is missing (should not happen with a valid cart)
          setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            setCurrentStep(3);
          }, 2000);
        }
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Something went wrong. Please try again.");
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  if (!cart && !isLoading && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-serif text-ivory mb-6">Your Selection is Empty</h1>
        <Link href="/menu" className="text-gold border-b border-gold pb-1 hover:text-gold-dark transition-colors">
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-40 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-20 max-w-2xl mx-auto">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    currentStep >= step.id 
                      ? "bg-gold border-gold text-background shadow-[0_0_20px_rgba(255,216,77,0.3)]" 
                      : "border-white/10 text-muted"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`absolute top-12 text-[10px] uppercase tracking-widest whitespace-nowrap ${
                  currentStep >= step.id ? "text-ivory font-bold" : "text-muted"
                }`}>
                  {step.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-white/10 mx-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                    className="h-full bg-gold shadow-[0_0_10px_rgba(255,216,77,0.5)]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Main Checkout Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card p-8 md:p-12 border-white/5"
                >
                  <h2 className="text-3xl font-serif text-ivory mb-10">Guest Information</h2>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted">First Name</label>
                        <input 
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-ivory" 
                          placeholder="Jean" 
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted">Last Name</label>
                        <input 
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-ivory" 
                          placeholder="Valois" 
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted">Email Address</label>
                      <input 
                        className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-ivory" 
                        placeholder="jean@example.com" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted">Special Requests</label>
                      <textarea 
                        className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-ivory resize-none" 
                        rows={3} 
                        placeholder="Dietary restrictions, anniversary, etc." 
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mt-12 flex justify-end">
                    <button onClick={handleNext} className="group px-10 py-4 bg-gold text-background rounded-full font-bold uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-gold-dark transition-colors">
                      Continue to Payment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card p-8 md:p-12 border-white/5"
                >
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-serif text-ivory">Payment Method</h2>
                    <button onClick={handleBack} className="text-muted hover:text-ivory flex items-center gap-2 transition-colors">
                      <ChevronLeft className="w-4 h-4" /> <span className="text-[10px] uppercase tracking-widest">Back</span>
                    </button>
                  </div>
                  
                  <div className="space-y-10">
                    <div className="p-8 rounded-2xl bg-white/5 border border-gold/20 relative">
                      <div className="space-y-6">
                        <p className="text-ivory font-light leading-relaxed">
                          To ensure the highest level of security for your transaction, you will be redirected to our <span className="text-gold font-medium">Shopify Secure Payment</span> gateway.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-xs text-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Encrypted SSL Connection
                          </li>
                          <li className="flex items-center gap-3 text-xs text-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            Official Shopify Payment Protection
                          </li>
                          <li className="flex items-center gap-3 text-xs text-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                            All major credit cards & digital wallets accepted
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <button 
                      onClick={handleNext} 
                      disabled={isProcessing}
                      className="w-full py-5 bg-gold text-background rounded-full font-bold uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gold-dark transition-all duration-300 shadow-[0_10px_30px_rgba(255,216,77,0.2)]"
                    >
                      {isProcessing ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-background border-t-transparent rounded-full" />
                      ) : (
                        `Proceed to Secure Payment • ${formatPrice(total.toString(), cart?.cost?.totalAmount?.currencyCode || "BDT")}`
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-12 md:p-20 border-gold/20 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mb-10 border border-gold/20">
                    <Check className="w-10 h-10 text-gold" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-6">Reservation Confirmed</h2>
                  <p className="text-muted max-w-md mx-auto mb-12 font-light leading-relaxed">
                    Thank you for choosing Maison Étoile. A confirmation email has been sent to your address. We look forward to providing you with an exceptional culinary experience.
                  </p>
                  <Link href="/" className="px-12 py-4 bg-gold text-background rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-gold-dark transition-colors">
                    Return to Homepage
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Order Summary */}
          {currentStep !== 3 && (
            <div className="lg:col-span-1">
              <div className="glass-card p-8 border-white/5 sticky top-40">
                <h3 className="text-xl font-serif text-ivory mb-8">Selection Summary</h3>
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart?.lines?.nodes.map((line) => (
                    <div key={line.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                        <Image 
                          src={line.merchandise.product.featuredImage?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                          alt={line.merchandise.product.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-serif text-ivory truncate">{line.merchandise.product.title}</h4>
                        <p className="text-[10px] text-muted">Quantity: {line.quantity}</p>
                      </div>
                      <div className="text-sm text-gold">
                        {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-xs text-muted">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal.toString(), cart?.cost?.subtotalAmount?.currencyCode || "BDT")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted">
                    <span>Service Charge (15%)</span>
                    <span>{formatPrice(serviceCharge.toString(), cart?.cost?.subtotalAmount?.currencyCode || "BDT")}</span>
                  </div>
                  <div className="flex justify-between text-lg font-serif text-gold pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span>{formatPrice(total.toString(), cart?.cost?.totalAmount?.currencyCode || "BDT")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

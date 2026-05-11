"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  return (
    <div className="pt-40 bg-background min-h-screen">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.4em] text-gold mb-6 block">Get in Touch</span>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 tracking-tight">Contact & Reservations</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We are here to assist you with any inquiries or special requests. Reach out to our concierge team to plan your visit.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
          {/* Contact Information */}
          <div className="space-y-16">
            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-serif mb-8 text-gold">Concierge Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Location</h4>
                    <p className="text-sm font-light">123 Étoile Avenue, 75008 Paris, France</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Reservations</h4>
                    <p className="text-sm font-light">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</h4>
                    <p className="text-sm font-light">concierge@maisonetoile.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Service Hours</h4>
                    <div className="text-sm font-light space-y-1">
                      <p>Lunch: Tue – Sat | 12:00 – 14:30</p>
                      <p>Dinner: Tue – Sat | 19:00 – 22:30</p>
                      <p>Closed: Sundays & Mondays</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div>
            <AnimatedSection delay={0.2} className="bg-espresso p-10 md:p-16 border border-white/5">
              <h2 className="text-2xl font-serif mb-10">Inquiry Form</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-sm font-light"
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-sm font-light"
                      placeholder="Valois"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-sm font-light"
                    placeholder="jean@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Subject</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-sm font-light appearance-none">
                    <option className="bg-espresso">Table Reservation</option>
                    <option className="bg-espresso">Private Event Inquiry</option>
                    <option className="bg-espresso">Dietary Requirements</option>
                    <option className="bg-espresso">Press & Media</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors text-sm font-light resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-gold text-background text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-champagne transition-colors mt-8"
                >
                  Send Inquiry
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}

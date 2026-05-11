"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "maison_etoile_chat_history";
const EXPIRY_TIME = 2 * 60 * 60 * 1000;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 1. Initial Load Hook
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    let initialMessages: Message[] = [
      {
        role: "assistant",
        content: "Welcome to **Maison Étoile**. I am your personal concierge. How may I assist you with our gourmet selections today?",
      },
    ];

    if (savedData) {
      try {
        const { messages: savedMessages, timestamp } = JSON.parse(savedData);
        const now = new Date().getTime();
        if (now - timestamp < EXPIRY_TIME) {
          initialMessages = savedMessages;
        }
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    }
    setMessages(initialMessages);
  }, []);

  // 2. Persistence and Scroll Hook
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        messages,
        timestamp: new Date().getTime(),
      }));
    }
    
    if (isOpen) {
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen, scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      if (data.action === "ADD_TO_CART" && data.items) {
        for (const item of data.items) {
          await addItem(item.variantId, item.quantity);
        }
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "I apologize, but I am momentarily indisposed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, transparent, #FFD84D, transparent);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FFD84D;
        }
      `}</style>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gold text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(255,216,77,0.4)] z-[9999]"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[450px] max-w-[calc(100vw-48px)] h-[650px] max-h-[calc(100vh-120px)] bg-[#080706]/fb backdrop-blur-3xl border border-gold/30 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden z-[9999]"
          >
            {/* Header */}
            <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/30">
                  <UtensilsCrossed className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-ivory font-serif text-xl tracking-tight">Maison Concierge</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold">En Service</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-gold/20 border-gold/40" : "bg-white/5 border-white/10"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4 text-gold" /> : <Bot className="w-4 h-4 text-ivory/60" />}
                  </div>
                  <div className={`max-w-[85%] p-5 rounded-3xl ${msg.role === "user" ? "bg-gold text-black rounded-tr-none font-semibold" : "bg-white/[0.04] border border-white/10 text-ivory/95 rounded-tl-none"}`}>
                    <div className={`prose prose-invert prose-sm max-w-none ${msg.role === 'user' ? 'prose-p:text-black' : ''} prose-a:text-gold prose-a:underline prose-a:font-bold prose-strong:text-gold`}>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => {
                            if (props.href?.startsWith("/")) {
                              return <Link {...props} href={props.href} onClick={() => setIsOpen(false)} />;
                            }
                            return <a {...props} target="_blank" rel="noopener noreferrer" />;
                          }
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Bot className="w-4 h-4 text-ivory/60" /></div>
                  <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl rounded-tl-none flex gap-1.5 items-center">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-8 border-t border-gold/10 bg-white/[0.02]">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your concierge..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-7 pr-16 text-sm text-ivory outline-none focus:border-gold/50"
                />
                <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-gold text-black rounded-xl flex items-center justify-center shadow-lg">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

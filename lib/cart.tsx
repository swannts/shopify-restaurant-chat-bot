"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  getCart, 
  createCart, 
  addLinesToCart, 
  updateCartLines, 
  removeCartLines 
} from "@/lib/shopify";
import { Cart } from "@/lib/types";

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    const initCart = async () => {
      const cartId = localStorage.getItem("shopify_cart_id");
      if (cartId) {
        try {
          const existingCart = await getCart(cartId);
          if (existingCart) {
            setCart(existingCart);
          } else {
            localStorage.removeItem("shopify_cart_id");
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          localStorage.removeItem("shopify_cart_id");
        }
      }
    };
    initCart();
  }, []);

  const addItem = async (variantId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const currentCartId = localStorage.getItem("shopify_cart_id");
      let updatedCart;

      if (!currentCartId) {
        updatedCart = await createCart([{ merchandiseId: variantId, quantity }]);
        localStorage.setItem("shopify_cart_id", updatedCart.id);
      } else {
        updatedCart = await addLinesToCart(currentCartId, [{ merchandiseId: variantId, quantity }]);
      }

      setCart(updatedCart);
      setIsOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const currentCartId = localStorage.getItem("shopify_cart_id");
      if (currentCartId) {
        const updatedCart = await updateCartLines(currentCartId, [{ id: lineId, quantity }]);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    setIsLoading(true);
    try {
      const currentCartId = localStorage.getItem("shopify_cart_id");
      if (currentCartId) {
        const updatedCart = await removeCartLines(currentCartId, [lineId]);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("shopify_cart_id");
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      isOpen, 
      setIsOpen, 
      addItem, 
      updateItem, 
      removeItem,
      clearCart,
      isLoading 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

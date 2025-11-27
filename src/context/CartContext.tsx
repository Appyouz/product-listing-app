'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useMemo } from 'react';
import { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      // Check if the product is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);


      if (existingItemIndex > -1) {
        // If product exists increase by 1
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  }, []);

  // clear the cart 
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  // Calculate the total number of items
  const cartCount = useMemo(() =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]);

  // Calculate the total sum
  const cartTotal = useMemo(() =>
    cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
    [cartItems]);


  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

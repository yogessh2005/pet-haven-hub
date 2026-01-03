import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Pet } from '@/types';
import { STORAGE_KEYS } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (pet: Pet, quantity?: number) => void;
  removeFromCart: (petId: string) => void;
  updateQuantity: (petId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  }, [items]);

  const addToCart = (pet: Pet, quantity = 1) => {
    if (pet.status !== 'available') {
      toast({
        title: 'Cannot add to cart',
        description: 'This pet is currently not available.',
        variant: 'destructive'
      });
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.pet.id === pet.id);
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        if (newQuantity > pet.stock) {
          toast({
            title: 'Stock limit reached',
            description: `Only ${pet.stock} available in stock.`,
            variant: 'destructive'
          });
          return prev;
        }
        return prev.map(item =>
          item.pet.id === pet.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...prev, { pet, quantity }];
    });

    toast({
      title: 'Added to cart!',
      description: `${pet.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (petId: string) => {
    setItems(prev => prev.filter(item => item.pet.id !== petId));
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart.',
    });
  };

  const updateQuantity = (petId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(petId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.pet.id === petId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.pet.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

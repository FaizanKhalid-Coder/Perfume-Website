import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CheckoutDetails, Fragrance } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (fragrance: Fragrance, size: '50ml' | '100ml' | 'Discovery Trio', engraving?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isGiftWrapped: boolean;
  setIsGiftWrapped: (wrapped: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  lastAddedItem: CartItem | null;
  notification: string | null;
  dismissNotification: () => void;
  isCheckingOut: boolean;
  setIsCheckingOut: (val: boolean) => void;
  confirmedOrder: { orderId: string; total: number; details: CheckoutDetails } | null;
  completeOrder: (details: CheckoutDetails) => void;
  dismissOrderConfirmation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('quatrea_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isGiftWrapped, setIsGiftWrapped] = useState(true);
  const [giftMessage, setGiftMessage] = useState('');
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ orderId: string; total: number; details: CheckoutDetails } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('quatrea_cart', JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addToCart = (fragrance: Fragrance, size: '50ml' | '100ml' | 'Discovery Trio', engraving?: string, quantity: number = 1) => {
    const price = size === '50ml' ? fragrance.price50ml : size === '100ml' ? fragrance.price100ml : 95;
    const cartItemId = `${fragrance.id}-${size}-${engraving || 'none'}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === cartItemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          fragranceId: fragrance.id,
          fragranceName: fragrance.name,
          season: fragrance.season,
          size,
          price,
          quantity,
          image: fragrance.image,
          engraving
        };
        setLastAddedItem(newItem);
        return [...prevItems, newItem];
      }
    });

    setNotification(`Added ${fragrance.name} (${size}) to your bag`);
    setIsOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const completeOrder = (details: CheckoutDetails) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `QT-${randomNum}`;
    const total = subtotal;
    setConfirmedOrder({ orderId, total, details });
    setItems([]);
    setIsCheckingOut(false);
    setIsOpen(false);
  };

  const dismissOrderConfirmation = () => {
    setConfirmedOrder(null);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isGiftWrapped,
        setIsGiftWrapped,
        giftMessage,
        setGiftMessage,
        lastAddedItem,
        notification,
        dismissNotification,
        isCheckingOut,
        setIsCheckingOut,
        confirmedOrder,
        completeOrder,
        dismissOrderConfirmation
      }}
    >
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

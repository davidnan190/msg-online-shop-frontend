import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICartItem } from '../types/cart/cart-item.interface';
import { ILocation } from '../types/locations/location.interface';
import { IProduct } from '../types/products/product.interface';
import { LocalStorageKey } from '../enums/local-storage-key.enum';

interface ICartContextProps {
  cart: ICartItem[];
  addToCart: (product: IProduct, quantity: number, location: ILocation) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContextProps | undefined>(undefined);

export const useCart = (): ICartContextProps => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<ICartItem[]>(() => {
    const savedCart = localStorage.getItem(LocalStorageKey.SHOPPING_CART);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(LocalStorageKey.SHOPPING_CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: IProduct,
    quantity: number,
    location: ILocation
  ) => {
    const isProductInCart = cart.some((item) => item.product.id === product.id);

    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, { product, quantity, location }]);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    }
  };

  const updateQuantity = (productId: string, quantity: number): void => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string): void => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = (): void => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

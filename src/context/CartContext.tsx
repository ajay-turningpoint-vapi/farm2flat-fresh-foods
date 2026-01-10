import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Product, CartItem } from "@/types/product";

const CART_STORAGE_KEY = "farm2flat_cart_v1";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addAddOnToCart: (addOn: {
    id: string;
    name: string;
    nameHindi: string;
    price: number;
    unit: string;
    image?: string;
  }) => void;
  clearCart: () => void;
  getCartItem: (productId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load cart from localStorage:", e);
  }
  return [];
};

// Save cart to localStorage
const saveCartToStorage = (cartItems: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.warn("Failed to save cart to localStorage:", e);
  }
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadCartFromStorage()
  );

  // Save cart whenever it changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }, []);

  const addAddOnToCart = useCallback(
    (addOn: {
      id: string;
      name: string;
      nameHindi: string;
      price: number;
      unit: string;
      image?: string;
    }) => {
      const product: Product = {
        id: addOn.id,
        name: addOn.name,
        nameHindi: addOn.nameHindi,
        price: addOn.price,
        unit: addOn.unit,
        image: addOn.image || "",
      };
      addToCart(product);
    },
    [addToCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartItem = useCallback(
    (productId: string) => {
      return cartItems.find((item) => item.id === productId);
    },
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        addAddOnToCart,
        clearCart,
        getCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

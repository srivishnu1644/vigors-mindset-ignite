
import { create } from 'zustand';
import { toast } from 'sonner';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const parsePrice = (price: string): number => {
    return parseFloat(price.replace('INR', '').trim());
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) => {
    const { items } = get();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      set({ items: updatedItems });
      toast.success(`${product.name} quantity updated in cart.`);
    } else {
      set({ items: [...items, { ...product, quantity }] });
      toast.success(`${product.name} added to cart.`);
    }
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
    toast.error('Item removed from cart.');
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  getCartTotal: () => {
    return get().items.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  },
  getCartItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  }
}));

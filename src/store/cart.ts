import { create } from 'zustand';
import { getCartDetails } from '@/lib/get-cart-details';
import { apiClient } from '@/services/api-client';
import { CreateCartItemValues } from '@/services/dto/cart';

export type ICartItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  type?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartItem[];
  fetchCartItems: () => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  // Fetch cart items from the server
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await apiClient.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await apiClient.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await apiClient.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },



  // Update item quantity with optimistic updates
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      // Optimistic update: Update the local state immediately
      set((state) => ({
        items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
        ),
      }));

      // Call the API to update the quantity on the server
      const data = await apiClient.cart.updateItemQuantity(id, quantity);

      // Update the state with the server's response
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);

      // Rollback the optimistic update if the API call fails
      set((state) => ({
        items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity } : item
        ),
        error: true,
      }));
    } finally {
      set({ loading: false });
    }
  },
}));
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  size: string;
  color: string;
  price: number;
  image_src: string;
  quantity: number;
}

interface CartState {
  removeFromCart(id: number): void;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: CartItem) => void;
  updateQuantity: (type: "increment" | "decrement", id: number) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      persist: true,
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addToCart: (product) => {
        let existingItem: CartItem | undefined;
        set((state) => {
          existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            existingItem.quantity = existingItem.quantity + product.quantity;
            return {
              items: get().items,
              totalItems: get().totalItems + product.quantity,
              totalPrice: get().totalPrice + product.price * product.quantity,
            };
          }
          return {
            items: [
              ...get().items,
              {
                quantity: product.quantity,
                id: product.id,
                title: product.title,
                size: product.size,
                color: product.color,
                price: product.price,
                image_src: product.image_src,
              },
            ],
            totalItems: get().totalItems + product.quantity,
            totalPrice: get().totalPrice + product.price * product.quantity,
          };
        });

        if (existingItem) {
          console.error("Item Already exists");
        } else {
          console.log("Item Added successfully");
        }
      },
      removeFromCart: (id: number) => {
        const existingItem = get().items.find((item) => item.id === id);
        if (existingItem) {
          set({
            items: get().items.filter((item) => item.id !== id),
            totalItems: get().totalItems - existingItem.quantity,
            totalPrice:
              get().totalPrice - existingItem.price * existingItem.quantity,
          });
          console.log("Item removed");
        }
      },
      updateQuantity: (type: string, id: number) => {
        const item = get().items.find((item) => item.id === id);
        if (!item) {
          return;
        }
        if (item.quantity === 1 && type === "decrement") {
          get().removeFromCart(id);
        } else {
          item.quantity =
            type === "decrement" ? item.quantity - 1 : item.quantity + 1;
          set({
            items: [...get().items],
            totalItems:
              type === "decrement"
                ? get().totalItems - 1
                : get().totalItems + 1,
            totalPrice:
              type === "decrement"
                ? get().totalPrice - item.price
                : get().totalPrice + item.price,
          });
        }
      },
    }),
    {
      name: "cart_storage",
    },
  ),
);

export default useCartStore;

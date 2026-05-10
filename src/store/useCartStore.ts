import { create } from 'zustand'

import { CartItem } from '@/types/storefront'

interface CartState {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (productId: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (item) =>
    set((s) => {
      const exists = s.items.some((i) => i.productId === item.productId)
      if (exists) {
        // Replace existing entry so quantity stays accurate
        return {
          items: s.items.map((i) =>
            i.productId === item.productId ? item : i,
          ),
        }
      }
      return { items: [...s.items, item] }
    }),
  remove: (productId) =>
    set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
  clear: () => set({ items: [] }),
}))

// Selector — derive count from items without storing it as separate state.
// Usage: const count = useCartStore(cartCount)
export const cartCount = (s: CartState): number => s.items.length

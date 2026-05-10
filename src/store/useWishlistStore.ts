import { create } from 'zustand'

import { WishlistItem } from '@/types/storefront'

interface WishlistState {
  items: WishlistItem[]
  toggle: (productId: string) => void
  isWishlisted: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  toggle: (productId) =>
    set((s) => {
      const alreadyWishlisted = s.items.some((i) => i.productId === productId)
      const items = alreadyWishlisted
        ? s.items.filter((i) => i.productId !== productId)
        : [...s.items, { productId }]
      return { items }
    }),
  // isWishlisted reads live state via get() so it is always current.
  isWishlisted: (productId) =>
    get().items.some((i) => i.productId === productId),
}))

export const wishlistCount = (s: WishlistState): number => s.items.length

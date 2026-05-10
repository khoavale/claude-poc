import { beforeEach, describe, expect, it } from 'vitest'

import { useWishlistStore, wishlistCount } from '../useWishlistStore'

beforeEach(() => {
  useWishlistStore.setState({ items: [] })
})

describe('useWishlistStore — initial state', () => {
  it('starts with an empty items array', () => {
    expect(useWishlistStore.getState().items).toEqual([])
  })

  it('starts with count 0', () => {
    expect(wishlistCount(useWishlistStore.getState())).toBe(0)
  })

  it('isWishlisted returns false for any productId', () => {
    expect(useWishlistStore.getState().isWishlisted('p1')).toBe(false)
  })
})

describe('useWishlistStore — toggle adds item', () => {
  it('adds an item when it is not present', () => {
    useWishlistStore.getState().toggle('p1')
    const { items } = useWishlistStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({ productId: 'p1' })
  })

  it('isWishlisted returns true after toggle adds item', () => {
    useWishlistStore.getState().toggle('p1')
    expect(useWishlistStore.getState().isWishlisted('p1')).toBe(true)
  })

  it('count increments to 1 after first toggle', () => {
    useWishlistStore.getState().toggle('p1')
    expect(wishlistCount(useWishlistStore.getState())).toBe(1)
  })
})

describe('useWishlistStore — toggle removes item (idempotent)', () => {
  it('removes an item when toggled a second time', () => {
    useWishlistStore.getState().toggle('p1')
    useWishlistStore.getState().toggle('p1')
    expect(useWishlistStore.getState().items).toEqual([])
  })

  it('isWishlisted returns false after second toggle', () => {
    useWishlistStore.getState().toggle('p1')
    useWishlistStore.getState().toggle('p1')
    expect(useWishlistStore.getState().isWishlisted('p1')).toBe(false)
  })

  it('count returns to 0 after two toggles on the same item', () => {
    useWishlistStore.getState().toggle('p1')
    useWishlistStore.getState().toggle('p1')
    expect(wishlistCount(useWishlistStore.getState())).toBe(0)
  })

  it('toggling a third time adds the item back (triple toggle)', () => {
    useWishlistStore.getState().toggle('p1')
    useWishlistStore.getState().toggle('p1')
    useWishlistStore.getState().toggle('p1')
    expect(useWishlistStore.getState().items).toHaveLength(1)
    expect(wishlistCount(useWishlistStore.getState())).toBe(1)
  })
})

describe('useWishlistStore — count accuracy with multiple items', () => {
  it('count tracks correctly as items are added and removed', () => {
    useWishlistStore.getState().toggle('p1')
    useWishlistStore.getState().toggle('p2')
    useWishlistStore.getState().toggle('p3')
    expect(wishlistCount(useWishlistStore.getState())).toBe(3)

    useWishlistStore.getState().toggle('p2')
    expect(wishlistCount(useWishlistStore.getState())).toBe(2)
    expect(useWishlistStore.getState().isWishlisted('p2')).toBe(false)
    expect(useWishlistStore.getState().isWishlisted('p1')).toBe(true)
  })

  it('toggle on one item does not affect others', () => {
    useWishlistStore.getState().toggle('p1')
    useWishlistStore.getState().toggle('p2')
    useWishlistStore.getState().toggle('p1')
    const { items } = useWishlistStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].productId).toBe('p2')
  })
})

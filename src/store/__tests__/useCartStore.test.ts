import { beforeEach, describe, expect, it } from 'vitest'

import { cartCount, useCartStore } from '../useCartStore'

/** Reset Zustand store to initial state before every test. */
beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('useCartStore — initial state', () => {
  it('starts with an empty items array', () => {
    expect(useCartStore.getState().items).toEqual([])
  })

  it('count selector returns 0 for an empty store', () => {
    expect(cartCount(useCartStore.getState())).toBe(0)
  })
})

describe('useCartStore — add', () => {
  it('adds a new item', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0]).toEqual({ productId: 'p1', quantity: 1 })
  })

  it('replaces an existing item when the same productId is added again', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    useCartStore.getState().add({ productId: 'p1', quantity: 3 })
    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(3)
  })

  it('count selector reflects the number of distinct items', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    useCartStore.getState().add({ productId: 'p2', quantity: 2 })
    expect(cartCount(useCartStore.getState())).toBe(2)
  })
})

describe('useCartStore — remove', () => {
  it('removes an item by productId', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    useCartStore.getState().add({ productId: 'p2', quantity: 2 })
    useCartStore.getState().remove('p1')
    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].productId).toBe('p2')
  })

  it('is a no-op when the productId does not exist', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    useCartStore.getState().remove('does-not-exist')
    expect(useCartStore.getState().items).toHaveLength(1)
  })

  it('count selector decrements after remove', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    useCartStore.getState().add({ productId: 'p2', quantity: 1 })
    useCartStore.getState().remove('p1')
    expect(cartCount(useCartStore.getState())).toBe(1)
  })
})

describe('useCartStore — clear', () => {
  it('empties the items array', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    useCartStore.getState().add({ productId: 'p2', quantity: 2 })
    useCartStore.getState().clear()
    expect(useCartStore.getState().items).toEqual([])
  })

  it('count selector returns 0 after clear', () => {
    useCartStore.getState().add({ productId: 'p1', quantity: 1 })
    useCartStore.getState().clear()
    expect(cartCount(useCartStore.getState())).toBe(0)
  })
})

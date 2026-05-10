import { describe, it, expect, vi, beforeEach } from 'vitest'
import express, { type Express } from 'express'
import request from 'supertest'

vi.mock('../../db', () => ({
  db: {
    heroPromotion: { findFirst: vi.fn() },
    storefrontProduct: { findMany: vi.fn() },
    sportCategory: { findMany: vi.fn() },
    membershipContent: { findFirst: vi.fn() },
  },
}))

import { db } from '../../db'
import { storefrontRouter } from '../storefront'
import { errorHandler } from '../../middleware/error-handler'

function buildApp(): Express {
  const app = express()
  app.use(express.json())
  app.use('/api/storefront', storefrontRouter)
  app.use(errorHandler)
  return app
}

const PRODUCT_ROW = (id: string, hasPrice: boolean) => ({
  id,
  name: `Product ${id}`,
  subtitle: "Men's Shoes",
  imageUrl: `/images/${id}.jpg`,
  price: hasPrice ? { toNumber: () => 115 } : null,
  stock: hasPrice ? 10 : 0,
  arrivedAt: new Date('2026-04-15T00:00:00.000Z'),
})

describe('GET /api/storefront/new-arrivals', () => {
  let app: Express

  beforeEach(() => {
    vi.clearAllMocks()
    app = buildApp()
  })

  it('returns 200 with an array of StorefrontProduct shapes', async () => {
    const rows = [PRODUCT_ROW('p1', true), PRODUCT_ROW('p2', true), PRODUCT_ROW('p3', false)]
    vi.mocked(db.storefrontProduct.findMany).mockResolvedValue(rows)

    const res = await request(app).get('/api/storefront/new-arrivals')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      subtitle: expect.any(String),
      imageUrl: expect.any(String),
      stock: expect.any(Number),
      arrivedAt: expect.any(String),
    })
  })

  it('maps a null price (sold-out) to null in the response', async () => {
    vi.mocked(db.storefrontProduct.findMany).mockResolvedValue([PRODUCT_ROW('sold-out', false)])

    const res = await request(app).get('/api/storefront/new-arrivals')

    expect(res.status).toBe(200)
    expect(res.body[0].price).toBeNull()
  })

  it('maps a Decimal price to a number in the response', async () => {
    vi.mocked(db.storefrontProduct.findMany).mockResolvedValue([PRODUCT_ROW('priced', true)])

    const res = await request(app).get('/api/storefront/new-arrivals')

    expect(res.status).toBe(200)
    expect(typeof res.body[0].price).toBe('number')
    expect(res.body[0].price).toBe(115)
  })

  it('returns an empty array when no products exist (edge case)', async () => {
    vi.mocked(db.storefrontProduct.findMany).mockResolvedValue([])

    const res = await request(app).get('/api/storefront/new-arrivals')

    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it('accepts ?limit=3 query param', async () => {
    vi.mocked(db.storefrontProduct.findMany).mockResolvedValue([PRODUCT_ROW('p1', true)])

    const res = await request(app).get('/api/storefront/new-arrivals?limit=3')

    expect(res.status).toBe(200)
  })

  it('rejects ?limit=4 (exceeds max 3) with 400', async () => {
    const res = await request(app).get('/api/storefront/new-arrivals?limit=4')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
  })

  it('rejects ?limit=0 with 400', async () => {
    const res = await request(app).get('/api/storefront/new-arrivals?limit=0')

    expect(res.status).toBe(400)
  })

  it('returns 500 when the database throws', async () => {
    vi.mocked(db.storefrontProduct.findMany).mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/api/storefront/new-arrivals')

    expect(res.status).toBe(500)
    expect(res.body).toEqual({ message: 'Internal server error' })
  })
})

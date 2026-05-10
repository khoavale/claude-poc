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

const HERO_ROW = {
  headline: 'Just Do It.',
  imageUrl: '/images/hero/campaign.jpg',
  imageAlt: 'Nike hero banner',
  ctaLabel: 'Shop Now',
  ctaHref: '/shop',
}

const SPORT_ROW = (slug: string) => ({
  label: slug.charAt(0).toUpperCase() + slug.slice(1),
  imageUrl: `/images/sports/${slug}.jpg`,
  sportSlug: slug,
})

const MEMBERSHIP_ROW = {
  heading: 'Become a Member',
  body: 'Enjoy exclusive benefits.',
  imageUrl: '/images/membership/banner.jpg',
}

describe('GET /api/storefront/hero', () => {
  let app: Express

  beforeEach(() => {
    vi.clearAllMocks()
    app = buildApp()
  })

  it('returns 200 with HeroPromotion shape when a record exists', async () => {
    vi.mocked(db.heroPromotion.findFirst).mockResolvedValue(HERO_ROW)

    const res = await request(app).get('/api/storefront/hero')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(HERO_ROW)
  })

  it('returns 404 when no hero promotion is configured', async () => {
    vi.mocked(db.heroPromotion.findFirst).mockResolvedValue(null)

    const res = await request(app).get('/api/storefront/hero')

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message')
  })

  it('returns 500 when the database throws', async () => {
    vi.mocked(db.heroPromotion.findFirst).mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/api/storefront/hero')

    expect(res.status).toBe(500)
    expect(res.body).toEqual({ message: 'Internal server error' })
  })
})

describe('GET /api/storefront/sport-categories', () => {
  let app: Express

  beforeEach(() => {
    vi.clearAllMocks()
    app = buildApp()
  })

  it('returns 200 with an ordered array of SportCategory shapes', async () => {
    const rows = [SPORT_ROW('running'), SPORT_ROW('basketball'), SPORT_ROW('training')]
    vi.mocked(db.sportCategory.findMany).mockResolvedValue(rows)

    const res = await request(app).get('/api/storefront/sport-categories')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
    expect(res.body[0]).toMatchObject({ label: expect.any(String), imageUrl: expect.any(String), sportSlug: expect.any(String) })
  })

  it('returns an empty array when no categories exist (edge case)', async () => {
    vi.mocked(db.sportCategory.findMany).mockResolvedValue([])

    const res = await request(app).get('/api/storefront/sport-categories')

    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it('returns 500 when the database throws', async () => {
    vi.mocked(db.sportCategory.findMany).mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/api/storefront/sport-categories')

    expect(res.status).toBe(500)
  })
})

describe('GET /api/storefront/membership', () => {
  let app: Express

  beforeEach(() => {
    vi.clearAllMocks()
    app = buildApp()
  })

  it('returns 200 with MembershipContent shape when a record exists', async () => {
    vi.mocked(db.membershipContent.findFirst).mockResolvedValue(MEMBERSHIP_ROW)

    const res = await request(app).get('/api/storefront/membership')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(MEMBERSHIP_ROW)
  })

  it('returns 404 when no membership content is configured', async () => {
    vi.mocked(db.membershipContent.findFirst).mockResolvedValue(null)

    const res = await request(app).get('/api/storefront/membership')

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message')
  })

  it('returns 500 when the database throws', async () => {
    vi.mocked(db.membershipContent.findFirst).mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/api/storefront/membership')

    expect(res.status).toBe(500)
  })
})

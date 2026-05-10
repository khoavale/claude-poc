/**
 * src/server/routes/storefront.ts
 *
 * Read-only storefront CMS endpoints (LP-003).
 * All content is CMS-driven; no hardcoded values in this layer (ADR-001).
 *
 * Mounted at /api/storefront in src/server/index.ts.
 */

import { Router } from 'express'
import { z } from 'zod'

import { db } from '@/server/db'

import type { HeroPromotion, StorefrontProduct, SportCategory, MembershipContent } from '@/types/storefront'

const router = Router()

// ---------------------------------------------------------------------------
// Query-param schemas
// ---------------------------------------------------------------------------

const NewArrivalsQuerySchema = z.object({
  // default 3, max 3 per LP-003 acceptance criteria
  limit: z
    .string()
    .optional()
    .transform((v) => (v === undefined ? 3 : parseInt(v, 10)))
    .pipe(z.number().int().min(1).max(3)),
})

// ---------------------------------------------------------------------------
// GET /api/storefront/hero
// Returns the most recently created HeroPromotion record.
// ---------------------------------------------------------------------------

router.get('/hero', async (_req, res, next) => {
  try {
    const row = await db.heroPromotion.findFirst({
      orderBy: { createdAt: 'desc' },
      select: {
        headline: true,
        imageUrl: true,
        imageAlt: true,
        ctaLabel: true,
        ctaHref: true,
      },
    })

    if (!row) {
      res.status(404).json({ message: 'No hero promotion configured' })
      return
    }

    const hero: HeroPromotion = row
    res.status(200).json(hero)
  } catch (err) {
    next(err)
  }
})

// ---------------------------------------------------------------------------
// GET /api/storefront/new-arrivals[?limit=3]
// Returns up to `limit` StorefrontProduct objects ordered by arrivedAt desc.
// limit defaults to 3; max is 3 (per spec US-03 / UX A-05).
// ---------------------------------------------------------------------------

router.get('/new-arrivals', async (req, res, next) => {
  try {
    const query = NewArrivalsQuerySchema.parse(req.query)

    const rows = await db.storefrontProduct.findMany({
      orderBy: { arrivedAt: 'desc' },
      take: query.limit,
      select: {
        id: true,
        name: true,
        subtitle: true,
        imageUrl: true,
        price: true,
        stock: true,
        arrivedAt: true,
      },
    })

    // Prisma returns Decimal for nullable price; convert to number | null per type contract (ADR-003)
    const products: StorefrontProduct[] = rows.map((row) => ({
      ...row,
      price: row.price !== null ? row.price.toNumber() : null,
      arrivedAt: row.arrivedAt.toISOString(),
    }))

    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

// ---------------------------------------------------------------------------
// GET /api/storefront/sport-categories
// Returns all SportCategory rows ordered by displayOrder asc (max 3 per UX A-05).
// ---------------------------------------------------------------------------

router.get('/sport-categories', async (_req, res, next) => {
  try {
    const rows = await db.sportCategory.findMany({
      orderBy: { displayOrder: 'asc' },
      take: 3,
      select: {
        label: true,
        imageUrl: true,
        sportSlug: true,
      },
    })

    const categories: SportCategory[] = rows
    res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
})

// ---------------------------------------------------------------------------
// GET /api/storefront/membership
// Returns the most recently created MembershipContent record.
// ---------------------------------------------------------------------------

router.get('/membership', async (_req, res, next) => {
  try {
    const row = await db.membershipContent.findFirst({
      orderBy: { createdAt: 'desc' },
      select: {
        heading: true,
        body: true,
        imageUrl: true,
      },
    })

    if (!row) {
      res.status(404).json({ message: 'No membership content configured' })
      return
    }

    const membership: MembershipContent = row
    res.status(200).json(membership)
  } catch (err) {
    next(err)
  }
})

export { router as storefrontRouter }

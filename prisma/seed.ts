/**
 * prisma/seed.ts — Storefront CMS seed data
 * Ticket: LP-003-DB
 *
 * Run:  npx prisma db seed
 * Reset: npx prisma migrate reset  (runs seed automatically after migration)
 *
 * Seed data mirrors the design assets:
 *  - 1 hero promotion (Nike Air Max campaign)
 *  - 3 sport categories: Running, Basketball, Training
 *  - 3 storefront products: Air Max 90, Air Max 97, Air Jordan 1 Low (sold-out)
 *  - 1 membership content record
 */

import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main(): Promise<void> {
  // ------------------------------------------------------------------
  // Hero promotion — active banner for the Air Max campaign
  // ------------------------------------------------------------------
  await db.heroPromotion.upsert({
    where: { id: 'hero-seed-001' },
    update: {},
    create: {
      id: 'hero-seed-001',
      headline: "Just Do It.\nFind Your Perfect Pair.",
      imageUrl: '/images/hero/nike-air-max-campaign.jpg',
      imageAlt: 'Nike Air Max collection spread across a bold red background',
      ctaLabel: 'Shop Now',
      ctaHref: '/shop',
    },
  })

  // ------------------------------------------------------------------
  // Sport categories — Running, Basketball, Training (display order 1-3)
  // ------------------------------------------------------------------
  const sportCategories = [
    {
      id: 'sport-cat-running-001',
      label: 'Running',
      imageUrl: '/images/sports/running.jpg',
      sportSlug: 'running',
      displayOrder: 1,
    },
    {
      id: 'sport-cat-basketball-001',
      label: 'Basketball',
      imageUrl: '/images/sports/basketball.jpg',
      sportSlug: 'basketball',
      displayOrder: 2,
    },
    {
      id: 'sport-cat-training-001',
      label: 'Training',
      imageUrl: '/images/sports/training.jpg',
      sportSlug: 'training',
      displayOrder: 3,
    },
  ]

  for (const category of sportCategories) {
    await db.sportCategory.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    })
  }

  // ------------------------------------------------------------------
  // Storefront products — new arrivals
  // Air Jordan 1 Low has null price (sold-out) per ADR-003 / UX A-02
  // ------------------------------------------------------------------
  const storefrontProducts = [
    {
      id: 'sf-product-air-max-90',
      name: 'Nike Air Max 90',
      subtitle: 'Men\'s Shoes',
      imageUrl: '/images/products/nike-air-max-90.jpg',
      price: 115.0,
      stock: 42,
      arrivedAt: new Date('2026-04-15T00:00:00.000Z'),
    },
    {
      id: 'sf-product-air-max-97',
      name: 'Nike Air Max 97',
      subtitle: 'Men\'s Shoes',
      imageUrl: '/images/products/nike-air-max-97.jpg',
      price: 175.0,
      stock: 18,
      arrivedAt: new Date('2026-04-20T00:00:00.000Z'),
    },
    {
      id: 'sf-product-air-jordan-1-low',
      name: 'Air Jordan 1 Low',
      subtitle: 'Men\'s Shoes',
      imageUrl: '/images/products/air-jordan-1-low.jpg',
      // null = sold-out; component renders "Sold Out" in place of a price (ADR-003)
      price: null,
      stock: 0,
      arrivedAt: new Date('2026-03-28T00:00:00.000Z'),
    },
  ]

  for (const product of storefrontProducts) {
    await db.storefrontProduct.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    })
  }

  // ------------------------------------------------------------------
  // Membership content — single active record
  // ------------------------------------------------------------------
  await db.membershipContent.upsert({
    where: { id: 'membership-seed-001' },
    update: {},
    create: {
      id: 'membership-seed-001',
      heading: 'Become a Nike Member',
      body: 'Get free delivery, exclusive products, and personalised recommendations. Join millions of members worldwide.',
      imageUrl: '/images/membership/nike-member-banner.jpg',
    },
  })

  console.log('Seed complete.')
}

main()
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
  .finally(() => {
    void db.$disconnect()
  })

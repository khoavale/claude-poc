# LP-003-DB — Prisma schema and migration for storefront CMS tables

## Type
[ ] Feature  [ ] Chore  [ ] Bug  [x] Migration

## Linked spec
docs/specs/storefront-landing-page.md — US-02, US-03, US-05, US-06 (all CMS-driven content sections)

## Linked UX spec (if UI work)
docs/ux/storefront-landing-page.md — A-09, A-05, A-06 (decisions that CMS-driven content requires DB backing)

## Description
Create the Prisma schema models and SQLite migration for the four CMS-driven content tables that back the storefront landing page API. These are lightweight, low-frequency-write tables. Seed data is included so the API and UI tickets can be tested immediately after this migration merges.

## Acceptance Criteria
- [ ] `schema.prisma` extended with four models: `HeroPromotion`, `SportCategory`, `MembershipContent`, and either a new `StorefrontProduct` model or an `arrivedAt DateTime` column added to an existing `Product` model
- [ ] `HeroPromotion` model: `id`, `headline`, `imageUrl`, `imageAlt`, `ctaLabel`, `ctaHref`, `createdAt`, `updatedAt` — mapped to `hero_promotions` table
- [ ] `SportCategory` model: `id`, `label`, `imageUrl`, `sportSlug`, `displayOrder Int`, `createdAt`, `updatedAt` — mapped to `sport_categories` table; index on `displayOrder`
- [ ] `MembershipContent` model: `id`, `heading`, `body`, `imageUrl`, `createdAt`, `updatedAt` — mapped to `membership_contents` table
- [ ] For products: if `products` table exists, add `arrivedAt DateTime @default(now())` via a new `add_arrived_at_to_products` migration; if no table exists, create a minimal `StorefrontProduct` model with `id`, `name`, `subtitle`, `imageUrl`, `price Decimal?` (nullable), `stock Int`, `arrivedAt DateTime`, mapped to `storefront_products`
- [ ] `price` column is nullable (`Decimal?`) to represent sold-out/price-hidden state per UX A-02
- [ ] All tables include `created_at` and `updated_at` columns following SA DB conventions
- [ ] All surrogate keys use `@default(cuid())`
- [ ] `prisma migrate dev` runs without errors on a fresh SQLite database
- [ ] `prisma/seed.ts` (or equivalent) seeds: 1 hero record, 3 sport categories (Running, Basketball, Training), 1 membership record, 3 storefront products (Nike Air Max 90 $115, Nike Air Max 97 $175, Air Jordan 1 Low null price/sold-out)
- [ ] `prisma migrate reset` + `prisma db seed` runs cleanly

## Technical Notes
- Migration name convention: `add_storefront_cms_tables` (or separate per table if changes are independent)
- Never edit a migration that has been applied; always create a new one
- `Decimal?` for price: use `@db.Decimal(10, 2)` and `null` for sold-out products; the API layer converts to `number | null` in the JSON response
- Add a DB index on `sport_categories.display_order` since the API always orders by it
- Rollback plan: the migration is purely additive (new tables / new optional column) — rollback is dropping the new tables; document this in the migration comment

## Out of Scope
- Wishlist or cart tables (LP-005-DB)
- Any write/admin APIs
- PostgreSQL production migration (dev SQLite only for this ticket)

## Dependencies
LP-002 — TypeScript types confirm the shape the migration must produce

# LP-006-DB — Prisma schema and migration for wishlist table

## Type
[ ] Feature  [ ] Chore  [ ] Bug  [x] Migration

## Linked spec
docs/specs/storefront-landing-page.md — US-04 (Wishlist on Product Card)

## Linked UX spec (if UI work)
N/A

## Description
Create the Prisma schema model and SQLite migration for the `wishlist_items` table. This table associates a user with a product; it is the persistence layer for the wishlist feature. The migration is kept separate from LP-003-DB because it introduces a user foreign key dependency and must be able to be rolled back independently.

## Acceptance Criteria
- [ ] `WishlistItem` Prisma model added: `id`, `userId String`, `productId String`, `createdAt DateTime @default(now())` — mapped to `wishlist_items`
- [ ] Composite unique constraint: `@@unique([userId, productId])` — prevents duplicate wishlist entries
- [ ] Index on `userId` (for `GET /api/wishlist` query)
- [ ] Index on `productId` (for join/filter queries)
- [ ] Foreign key `productId` references the `products` (or `storefront_products`) table with `ON DELETE CASCADE`
- [ ] `userId` is a plain `String` (not a FK to a users table at this stage — auth table is out of scope); a `// TODO(sa): add FK to users table when auth schema lands` comment is added in the model
- [ ] `prisma migrate dev` runs without errors
- [ ] `prisma migrate reset` is clean

## Technical Notes
- Migration name: `add_wishlist_items_table`
- `ON DELETE CASCADE` on `productId` ensures wishlist items are cleaned up if a product is removed
- `userId` is intentionally a loose string for now; tighten to an FK when the auth schema is introduced in a later feature
- No seed data required for this table — wishlist items are created by the API at runtime

## Out of Scope
- User authentication table
- Any application code

## Dependencies
LP-003-DB — `products` (or `storefront_products`) table must exist before `wishlist_items` can reference it

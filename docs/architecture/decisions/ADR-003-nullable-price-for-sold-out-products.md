# ADR-003 — Product price is nullable; null represents sold-out / price-hidden state

**Date:** 2026-05-10
**Status:** Accepted
**Feature:** Storefront Landing Page (US-03, UX A-02)
**Decider:** SA agent (claude-sonnet-4-6)

---

## Context

The UX spec (ambiguity resolution A-02) resolved that when a product has no price (e.g. the Air Jordan 1 Low in the design asset) the card renders "Sold Out" in place of a price. The spec attributes this to either `price === null` or `stock === 0`.

A decision is needed on how to represent this in the DB schema, API contract, and component.

## Decision

`price` is stored as a nullable `Decimal?` in Prisma (`NULL` in SQLite / PostgreSQL). The API serialises `NULL` as `null` in the JSON response. The TypeScript interface declares `price: number | null`. The `ProductCard` component renders the price if `price !== null`, otherwise renders "Sold Out".

The `stock` field is also present in the API response to allow future client-side logic (e.g. "Low Stock" badge), but the primary sold-out indicator for the landing page display is `price === null`. These two signals must be kept consistent by the data seeding and any future admin tooling.

## Consequences

**Positive:**
- `null` is the standard sentinel for "no value" in TypeScript — explicit and type-safe
- The component logic is a simple null check, not a complex stock-threshold business rule
- The DB schema is straightforward — `Decimal?` is idiomatic Prisma

**Negative / Risks:**
- `price === null` and `stock === 0` can diverge if not kept in sync — mitigation: add a DB check constraint or application-layer validation that sets `price = NULL` automatically when `stock = 0` in the write path (out of scope for the landing page read-only API, but must be documented for the admin ticket)
- A product with `stock > 0` but `price === null` would show "Sold Out" — this edge case must be guarded in the admin write path

## Alternatives Rejected

- **`price: 0` for sold-out:** Ambiguous — zero is a valid price for free products. Rejected.
- **Use only `stock === 0` as the indicator:** The component would need to check `stock` and show "Sold Out" based on a threshold. This leaks business logic into the UI and makes the rule harder to change. Rejected in favour of the explicit `null` sentinel.
- **Separate `isSoldOut: boolean` field:** Redundant with nullable price. Rejected to keep the schema minimal.

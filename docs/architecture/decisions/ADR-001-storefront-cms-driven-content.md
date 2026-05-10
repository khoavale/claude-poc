# ADR-001 — Storefront landing page content is CMS-driven from day one

**Date:** 2026-05-10
**Status:** Accepted
**Feature:** Storefront Landing Page
**Decider:** SA agent (claude-sonnet-4-6)

---

## Context

The UX spec (ambiguity resolutions A-05, A-06, A-09) resolved that the hero banner content, sport category tiles, and membership section copy must be CMS-driven rather than statically hardcoded. The BA spec shows these sections have content that the Store Manager role needs to update without a code deploy.

For the MVP the "CMS" is seeded data stored in SQLite tables (`hero_promotions`, `sport_categories`, `membership_contents`) served by four read-only Express endpoints. There is no CMS admin UI in this feature's scope.

## Decision

All four storefront content resources (hero, new arrivals, sport categories, membership) are fetched from the API at runtime. No content is hardcoded in React components. The API is the single source of truth.

The content shape is defined by TypeScript interfaces in `src/types/storefront.ts` and enforced by Zod schemas on the Express routes. SQLite seed data provides representative content for development and testing.

## Consequences

**Positive:**
- Content can be updated by seeding/editing the DB without a frontend deploy
- The React components are decoupled from content — they render whatever the API returns
- The contract (TypeScript interface + Zod schema) is explicit and machine-checked
- Migrating to a real headless CMS later only requires changing the API layer — components are unaffected

**Negative / Risks:**
- Four additional API calls on page load (mitigated by `staleTime: 5min` in React Query and future HTTP caching headers)
- No admin UI yet — Store Manager must update content via direct DB seeding (acceptable for MVP)

## Alternatives Rejected

- **Hardcode content in components:** Rejected because it violates the Store Manager persona's need to update promotional content without a code deploy, as called out in the spec.
- **Use a third-party headless CMS immediately:** Rejected to avoid pre-mature infrastructure complexity before the system architecture is proven. Can be adopted post-launch as an upgrade to the API layer.

# ADR-002 — Wishlist uses optimistic Zustand client state synced to server via React Query mutation

**Date:** 2026-05-10
**Status:** Accepted
**Feature:** Storefront Landing Page (US-04)
**Decider:** SA agent (claude-sonnet-4-6)

---

## Context

US-04 requires the wishlist heart icon on product cards to toggle immediately on click with no visible latency, while also persisting the wishlist server-side so items survive page refreshes. The UX spec defines distinct inactive/active/hover states for the heart icon that must update synchronously from the user's perspective.

Two state systems are involved: the Zustand store (`useWishlistStore`) for client-only optimistic state, and the React Query mutation (`useToggleWishlist`) for server persistence.

## Decision

The wishlist toggle follows an **optimistic update** pattern:

1. User clicks the heart icon.
2. `useWishlistStore.toggle(productId)` is called immediately — the icon switches state with no network wait.
3. `useToggleWishlist` mutation fires the appropriate API call (`POST /api/wishlist` or `DELETE /api/wishlist/:id`).
4. On success: React Query invalidates the `['wishlist']` query key to sync the server state into the cache.
5. On error: `useWishlistStore.toggle(productId)` is called again (reverts the optimistic change) and an error toast is shown.

The Zustand store is the source of truth for the icon's visual state during the mutation flight. The React Query cache is the source of truth after settlement.

## Consequences

**Positive:**
- Zero-latency icon feedback — matches the UX spec's `transition-fast` interaction expectation
- Clean separation: Zustand owns transient UI state; React Query owns server-derived data
- Revert-on-error is explicit and predictable

**Negative / Risks:**
- Two state systems must stay in sync — the `useToggleWishlist` hook must be the only place that calls both; components must not call them independently
- On page load (refresh), the Zustand store starts empty and is populated by the `useWishlist()` query — there will be a brief moment where the heart shows inactive before the query resolves. Mitigated by setting `initialData` from the React Query cache where available.

## Alternatives Rejected

- **Server-only state (no Zustand):** The mutation would need to complete before the icon updates, causing perceptible latency. Rejected for UX reasons.
- **Zustand-only (no server persistence):** Wishlist resets on refresh. Rejected because US-04 implies persistence ("return to it later").
- **`useMutation` optimistic update via `onMutate` + React Query cache only (no Zustand):** Would work, but the wishlist badge count in the Navbar also needs the optimistic count. React Query cache updates are scoped to the query client; Zustand makes the count universally accessible to both the card and the Navbar without prop-drilling.

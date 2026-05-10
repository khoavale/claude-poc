# ADR-004 — All design tokens live in tailwind.config.ts backed by CSS custom properties

**Date:** 2026-05-10
**Status:** Accepted
**Feature:** Storefront Landing Page (all UI sections)
**Decider:** SA agent (claude-sonnet-4-6)

---

## Context

The UX spec defines a comprehensive set of colour, spacing, shadow, and typography tokens. These tokens must be consistently available to all Tailwind utility classes and must also be accessible to non-Tailwind contexts (e.g. SVG stroke colours, JS-driven inline styles where absolutely unavoidable).

## Decision

All design tokens are declared as CSS custom properties in a global `src/styles/tokens.css` file (e.g. `--color-brand-sale: #FF0000`). These custom properties are then referenced in `tailwind.config.ts` via `theme.extend` using `var(--token-name)` syntax. This gives two access patterns:

1. **Tailwind classes** — `bg-brand-sale`, `text-neutral-900`, `shadow-nav`, etc.
2. **CSS custom property** — `color: var(--color-brand-sale)` for SVG `fill`/`stroke` or rare non-Tailwind contexts

Rules:
- No hardcoded hex values in component files — always use a Tailwind class or CSS custom property
- `theme` in `tailwind.config.ts` is only extended (`theme.extend`), never overridden, so Tailwind defaults are preserved
- Breakpoints are declared in `theme.extend.screens` to match the UX spec: `sm: '320px'`, `md: '768px'`, `lg: '1024px'`
- The `prefers-reduced-motion` global rule lives in `src/styles/tokens.css` as a `@media` block setting `--transition-fast: 0ms`, `--transition-base: 0ms`, `--transition-slow: 0ms`

## Consequences

**Positive:**
- Single source of truth for all design tokens — changing a token updates all usages
- Tailwind JIT generates only the utility classes that are actually used — no bundle bloat from the full token set
- CSS custom properties make tokens runtime-accessible (theme switching, dynamic overrides)
- Design-to-dev handoff is explicit: every token in the UX spec maps to a named CSS custom property

**Negative / Risks:**
- Token names must be kept in sync between `tokens.css` and `tailwind.config.ts` — a linting rule or CI check should enforce this (post-launch chore)
- JIT `safelist` is needed for dynamically constructed class names (e.g. dynamic grid column count in the sport tiles) — document these in `tailwind.config.ts` comments

## Alternatives Rejected

- **Hardcode all values directly in `tailwind.config.ts`:** Loses the CSS custom property access pattern. Rejected.
- **Use a JS tokens file imported by both Tailwind config and components:** Circular import risks and requires Tailwind to process JS imports — more fragile. Rejected.
- **CSS Modules with scoped tokens:** Inconsistent with the project's Tailwind-only styling convention in `CLAUDE.md`. Rejected.

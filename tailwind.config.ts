/**
 * tailwind.config.ts
 *
 * All design tokens are surfaced here as Tailwind utilities via theme.extend.
 * Values reference CSS custom properties declared in src/styles/tokens.css so
 * that both access patterns are available:
 *   1. Tailwind classes  — bg-brand-sale, text-neutral-900, shadow-nav …
 *   2. CSS custom props  — var(--color-brand-sale) for SVG fill/stroke
 *
 * Rules:
 *   - Only extend theme.extend — never replace theme directly (preserves defaults)
 *   - Breakpoints match the UX responsive spec: sm 320px / md 768px / lg 1024px
 *
 * See: docs/ux/tokens.md, ADR-004-design-tokens-in-tailwind-config.md
 */

import type { Config } from 'tailwindcss'

// TODO(sa): Add a CI lint rule to verify that every --token in tokens.css has
//           a corresponding entry in theme.extend (ADR-004 consequence).

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      // ─── Breakpoints (UX responsive spec) ──────────────────────────────
      // Tailwind defaults (640/768/1024/1280) are preserved; sm is overridden
      // to 320px to match the mobile-first UX spec.  md and lg align with the
      // Tailwind defaults (768 / 1024) so no additional override is required.
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },

      // ─── Colours ────────────────────────────────────────────────────────
      colors: {
        /* Brand */
        'brand-black':  'var(--color-brand-black)',
        'brand-white':  'var(--color-brand-white)',
        'brand-sale':   'var(--color-brand-sale)',

        /* Neutrals */
        'neutral-900':  'var(--color-neutral-900)',
        'neutral-700':  'var(--color-neutral-700)',
        'neutral-600':  'var(--color-neutral-600)',
        'neutral-400':  'var(--color-neutral-400)',
        'neutral-300':  'var(--color-neutral-300)',
        'neutral-100':  'var(--color-neutral-100)',
        'neutral-50':   'var(--color-neutral-50)',
        'white':        'var(--color-white)',

        /* Interactive */
        'primary':           'var(--color-primary)',
        'primary-hover':     'var(--color-primary-hover)',
        'primary-disabled':  'var(--color-primary-disabled)',
        'secondary':         'var(--color-secondary)',
        'secondary-hover':   'var(--color-secondary-hover)',
        'link':              'var(--color-link)',
        'link-hover':        'var(--color-link-hover)',

        /* Semantic */
        'danger':        'var(--color-danger)',
        'danger-light':  'var(--color-danger-light)',
        'success':       'var(--color-success)',
        'warning':       'var(--color-warning)',

        /* Overlay / Surface */
        'hero-overlay':       'var(--color-hero-overlay)',
        'sport-label-bg':     'var(--color-sport-label-bg)',
        'wishlist-active':    'var(--color-wishlist-active)',
        'wishlist-inactive':  'var(--color-wishlist-inactive)',
        'footer-bg':          'var(--color-footer-bg)',
        'footer-text':        'var(--color-footer-text)',
        'footer-link':        'var(--color-footer-link)',
        'footer-link-hover':  'var(--color-footer-link-hover)',
        'footer-legal-bg':    'var(--color-footer-legal-bg)',
        'footer-legal-text':  'var(--color-footer-legal-text)',
      },

      // ─── Font Family ─────────────────────────────────────────────────────
      fontFamily: {
        base: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },

      // ─── Font Size ───────────────────────────────────────────────────────
      // Tailwind's built-in text-xs/sm/base/lg/xl/2xl/3xl are preserved.
      // Only sizes that go beyond the default scale are added here.
      fontSize: {
        // Hero display sizes (responsive variants)
        'hero':    ['64px', { lineHeight: '68px', fontWeight: '900' }],
        'hero-md': ['48px', { lineHeight: '52px', fontWeight: '900' }],
        'hero-sm': ['36px', { lineHeight: '40px', fontWeight: '900' }],
        // Nav logo
        'nav-logo': ['22px', { lineHeight: '1' }],
      },

      // ─── Letter Spacing ──────────────────────────────────────────────────
      letterSpacing: {
        wide:   'var(--letter-spacing-wide)',   // 0.08em
        wider:  'var(--letter-spacing-wider)',  // 0.12em
      },

      // ─── Spacing (layout-level tokens) ──────────────────────────────────
      // Tailwind's default spacing scale (0–96+) is preserved.
      // Named tokens for fixed-size layout primitives are added here.
      spacing: {
        'nav-height':               'var(--nav-height)',               // 56px
        'hero-height-lg':           'var(--hero-height-lg)',           // 560px
        'hero-height-md':           'var(--hero-height-md)',           // 420px
        'hero-height-sm':           'var(--hero-height-sm)',           // 320px
        'product-card-img-height':  'var(--product-card-img-height)',  // 240px
        'product-card-img-height-sm': 'var(--product-card-img-height-sm)', // 180px
        'sport-tile-height':        'var(--sport-tile-height)',        // 360px
        'sport-tile-height-md':     'var(--sport-tile-height-md)',     // 280px
        'sport-tile-height-sm':     'var(--sport-tile-height-sm)',     // 200px
        'membership-section-height': 'var(--membership-section-height)', // 400px
        'max-content-width':        'var(--max-content-width)',        // 1200px
        'footer-legal-height':      'var(--footer-legal-height)',      // 48px
        'footer-main-padding-y':    'var(--footer-main-padding-y)',    // 48px
        'nav-padding-lg':           'var(--nav-horizontal-padding-lg)', // 40px
        'nav-padding-md':           'var(--nav-horizontal-padding-md)', // 24px
      },

      // ─── Box Shadow ──────────────────────────────────────────────────────
      boxShadow: {
        nav: 'var(--shadow-nav)',  // 0 2px 8px rgba(0,0,0,0.08)
        sm:  'var(--shadow-sm)',   // 0 1px 2px rgba(0,0,0,0.05)
        md:  'var(--shadow-md)',   // 0 4px 6px rgba(0,0,0,0.07)
      },

      // ─── Transition Duration & Easing ────────────────────────────────────
      // Expressed as complete shorthand values so a single class encodes both
      // duration and easing function — matching the token definitions exactly.
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        fast: 'ease-out',
        base: 'ease-in-out',
        slow: 'ease-in-out',
      },

      // ─── Border Radius ───────────────────────────────────────────────────
      borderRadius: {
        none: '0px',
        sm:   'var(--radius-sm)',   // 4px
        md:   'var(--radius-md)',   // 8px
        full: 'var(--radius-full)', // 9999px
      },

      // ─── Max Width ────────────────────────────────────────────────────────
      maxWidth: {
        content: 'var(--max-content-width)', // 1200px
      },
    },
  },

  plugins: [],
}

export default config

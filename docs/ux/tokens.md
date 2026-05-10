# Design Tokens — Shoes Selling Management

Last updated: 2026-05-10
Source design: docs/design/dcf1d36e03d865e6fc838f9dcb30e4a0.webp
UX spec: docs/ux/storefront-landing-page.md

---

## Colour Palette

### Brand / Primary
| Token | Hex | Usage |
|-------|-----|-------|
| `color-brand-black` | `#111111` | Logo wordmark, nav text, headings, footer background |
| `color-brand-white` | `#FFFFFF` | Page background, card surfaces, nav background, text-on-dark |
| `color-brand-sale` | `#FF0000` | SALE nav link highlight / underline |

### Interactive
| Token | Hex | Usage |
|-------|-----|-------|
| `color-primary` | `#111111` | Primary buttons (JOIN US, SHOP NEW ARRIVALS) — black fill |
| `color-primary-hover` | `#333333` | Primary button hover state |
| `color-primary-disabled` | `#999999` | Primary button disabled state |
| `color-secondary` | `#FFFFFF` | Secondary buttons (SIGN IN) — white fill, black border |
| `color-secondary-hover` | `#F3F4F6` | Secondary button hover background |
| `color-link` | `#111111` | Footer links |
| `color-link-hover` | `#555555` | Footer link hover |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| `color-danger` | `#DC2626` | Error states, destructive actions |
| `color-danger-light` | `#FEE2E2` | Error input backgrounds |
| `color-success` | `#16A34A` | Success toasts, in-stock indicators |
| `color-warning` | `#D97706` | Low-stock alerts |

### Neutrals
| Token | Hex | Usage |
|-------|-----|-------|
| `color-neutral-900` | `#111111` | Body text, headings, logo |
| `color-neutral-700` | `#404040` | Sub-headings, secondary text |
| `color-neutral-600` | `#4B5563` | Caption text, labels |
| `color-neutral-400` | `#9CA3AF` | Placeholder text |
| `color-neutral-300` | `#D1D5DB` | Borders, dividers, card outlines |
| `color-neutral-100` | `#F3F4F6` | Product card background (light grey wash) |
| `color-neutral-50` | `#F9FAFB` | Page section alternating background |
| `color-white` | `#FFFFFF` | Card surfaces, modal backgrounds, nav background |

### Overlay / Surface
| Token | Value | Usage |
|-------|-------|-------|
| `color-hero-overlay` | `rgba(0,0,0,0.18)` | Subtle darkening over hero image for text legibility |
| `color-sport-label-bg` | `rgba(0,0,0,0.30)` | Semi-transparent band behind sport tile labels |
| `color-wishlist-active` | `#FF0000` | Filled heart icon when product is wishlisted |
| `color-wishlist-inactive` | `#FFFFFF` | Empty heart icon stroke (on card) |
| `color-footer-bg` | `#111111` | Footer background |
| `color-footer-text` | `#FFFFFF` | Footer primary text |
| `color-footer-link` | `#CCCCCC` | Footer navigation links |
| `color-footer-link-hover` | `#FFFFFF` | Footer link hover |
| `color-footer-legal-bg` | `#000000` | Legal bar background (below main footer) |
| `color-footer-legal-text` | `#999999` | Legal bar text |

---

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `font-family-base` | `Helvetica Neue, Helvetica, Arial, sans-serif` | All text (brand standard sans-serif) |
| `text-xs` | `11px / 16px` | Legal bar text, footer small labels |
| `text-sm` | `13px / 20px` | Footer links, product subtitle/category |
| `text-base` | `16px / 24px` | Body copy, membership description, nav links |
| `text-lg` | `18px / 28px` | Product card price |
| `text-xl` | `20px / 28px` | Section headings (NEW ARRIVALS, SHOP BY SPORT) |
| `text-2xl` | `24px / 32px` | Membership heading (NIKE MEMBERSHIP) |
| `text-3xl` | `30px / 36px` | Large display text |
| `text-hero` | `64px / 68px` | Hero headline (WIN ON YOUR OWN TERMS.) |
| `font-normal` | `400` | Body text, footer links, membership copy |
| `font-medium` | `500` | Nav links, product name |
| `font-bold` | `700` | Section headings, product name emphasis, CTA labels, hero headline |
| `font-black` | `900` | Hero headline — maximum weight for impact |
| `letter-spacing-wide` | `0.08em` | Nav category links, section headings, sport labels, button labels (all caps) |
| `letter-spacing-wider` | `0.12em` | Legal bar text |
| `text-transform-upper` | `uppercase` | Nav items, section headings, sport labels, CTA button text |

---

## Spacing Scale

| Token | Value | Common use |
|-------|-------|-----------|
| `space-1` | `4px` | Icon gaps, tight internal padding |
| `space-2` | `8px` | Input internal padding (vertical), badge padding |
| `space-3` | `12px` | Button padding (vertical), nav icon gap |
| `space-4` | `16px` | Card internal padding, form row gap |
| `space-5` | `20px` | Nav horizontal item gap |
| `space-6` | `24px` | Section gap, card gap |
| `space-8` | `32px` | Page section gap |
| `space-10` | `40px` | Nav horizontal padding |
| `space-12` | `48px` | Section vertical padding |
| `space-16` | `64px` | Large section vertical padding |
| `space-20` | `80px` | Hero bottom padding |
| `space-24` | `96px` | Extra-large section padding |

---

## Border & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `border-default` | `1px solid #D1D5DB` | Product card outline |
| `border-nav` | `1px solid #E5E7EB` | Nav bottom border (subtle) |
| `border-btn-secondary` | `1px solid #111111` | SIGN IN button outline |
| `border-focus` | `2px solid #111111` | Keyboard focus ring |
| `radius-none` | `0px` | Hero, sport tiles, footer — no rounding |
| `radius-sm` | `4px` | Badges, small chips |
| `radius-md` | `8px` | Cards (product cards use none per design) |
| `radius-full` | `9999px` | Badge counters (nav cart/wishlist) |

---

## Elevation (Shadows)

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | `none` | Nav (no shadow in design) |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Product card subtle lift |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Modals, dropdowns |
| `shadow-nav` | `0 2px 8px rgba(0,0,0,0.08)` | Sticky nav shadow on scroll |

---

## Layout & Sizing

| Token | Value | Usage |
|-------|-------|-------|
| `nav-height` | `56px` | Global navigation bar height |
| `nav-logo-font-size` | `22px` | Brand wordmark in nav |
| `max-content-width` | `1200px` | Max-width container for all page content |
| `hero-height-lg` | `560px` | Hero banner height on desktop |
| `hero-height-md` | `420px` | Hero banner height on tablet |
| `hero-height-sm` | `320px` | Hero banner height on mobile |
| `product-card-img-height` | `240px` | Product card image container height (desktop) |
| `product-card-img-height-sm` | `180px` | Product card image container height (mobile) |
| `sport-tile-height` | `360px` | Sport category tile height (desktop) |
| `sport-tile-height-md` | `280px` | Sport category tile height (tablet) |
| `sport-tile-height-sm` | `200px` | Sport category tile height (mobile) |
| `membership-section-height` | `400px` | Membership block height (desktop) |
| `footer-main-padding-y` | `48px` | Footer top/bottom padding |
| `footer-legal-height` | `48px` | Legal bar height |

---

## Responsive Breakpoints

| Name | Min width | Layout behaviour |
|------|-----------|-----------------|
| `sm` | `320px` | Single column, stacked layout |
| `md` | `768px` | 2-column grids, tablet optimised |
| `lg` | `1024px` | 3-column grids, full layout |
| `xl` | `1280px` | Max content width `1200px` centred |

---

## Icon Sizes

| Token | Value | Usage |
|-------|-------|-------|
| `icon-sm` | `16×16px` | Footer social icons |
| `icon-md` | `20×20px` | Nav wishlist / cart icons |
| `icon-lg` | `24×24px` | Product card heart icon |

---

## Animation / Transition

| Token | Value | Usage |
|-------|-------|-------|
| `transition-fast` | `150ms ease-out` | Button hover, heart toggle |
| `transition-base` | `200ms ease-in-out` | Nav shadow on scroll, sport tile overlay |
| `transition-slow` | `300ms ease-in-out` | Membership image fade |

---

## Hero Typography Override

The hero headline requires a display size beyond the base scale.

| Token | Value | Usage |
|-------|-------|-------|
| `text-hero` | `64px / 68px` | Desktop hero headline |
| `text-hero-md` | `48px / 52px` | Tablet hero headline |
| `text-hero-sm` | `36px / 40px` | Mobile hero headline |

---

## Component-Specific Dimensions

### Navbar
| Token | Value | Usage |
|-------|-------|-------|
| `nav-height` | `56px` | Global navigation bar height |
| `nav-logo-font-size` | `22px` | Brand wordmark in nav |
| `nav-horizontal-padding-lg` | `40px` | Nav left/right padding on desktop |
| `nav-horizontal-padding-md` | `24px` | Nav left/right padding on tablet/mobile |

### Hero
| Token | Value | Usage |
|-------|-------|-------|
| `hero-height-lg` | `560px` | Hero banner height on desktop |
| `hero-height-md` | `420px` | Hero banner height on tablet |
| `hero-height-sm` | `320px` | Hero banner height on mobile |

### Product Card
| Token | Value | Usage |
|-------|-------|-------|
| `product-card-img-height` | `240px` | Product card image container height (desktop) |
| `product-card-img-height-sm` | `180px` | Product card image container height (mobile) |

### Sport Tiles
| Token | Value | Usage |
|-------|-------|-------|
| `sport-tile-height` | `360px` | Sport category tile height (desktop) |
| `sport-tile-height-md` | `280px` | Sport category tile height (tablet) |
| `sport-tile-height-sm` | `200px` | Sport category tile height (mobile) |

### Membership
| Token | Value | Usage |
|-------|-------|-------|
| `membership-section-height` | `400px` | Membership photograph height (desktop) |

### Footer
| Token | Value | Usage |
|-------|-------|-------|
| `footer-main-padding-y` | `48px` | Footer section top/bottom padding |
| `footer-legal-height` | `48px` | Legal bar height |

---

## Ambiguity Decisions (A-01 to A-10) — Summary

| ID | Decision |
|----|---------|
| A-01 | SALE link always uses `color-brand-sale` (#FF0000) underline as permanent treatment; route-active underline is additive |
| A-02 | Missing price = sold-out state; renders "Sold Out" in `color-neutral-400` |
| A-03 | Landing page shows exactly 3 products; "View All" link right-aligned in section heading row |
| A-04 | Wishlist heart on all cards unconditionally |
| A-05 | Sport categories are CMS-driven; first 3 rendered; 1–2 tiles layout gracefully |
| A-06 | Membership copy is CMS-driven with design text as default fallback |
| A-07 | Authenticated users see "GO TO MY ACCOUNT →" link replacing the two buttons |
| A-08 | Social platforms: YouTube, Instagram, X (Twitter); URLs from config |
| A-09 | Hero content (headline, image, CTA) is CMS-driven; static fallback on outage |
| A-10 | Mobile/tablet responsive specs defined in docs/ux/storefront-landing-page.md |

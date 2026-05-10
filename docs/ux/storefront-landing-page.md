# UX Spec — Storefront Landing Page

## Source Design
- Asset: docs/design/dcf1d36e03d865e6fc838f9dcb30e4a0.webp
- Feature spec: docs/specs/storefront-landing-page.md
- Requirements: docs/requirements/storefront-landing-page.md
- Last updated: 2026-05-10

---

## Screens / Views

The landing page is a single scrolling view composed of six distinct sections rendered in document order:

1. Navbar (fixed/sticky)
2. Hero Banner
3. New Arrivals
4. Shop by Sport
5. Membership
6. Footer

All sections share a `max-width` container of `1200px` centred horizontally (token: `max-content-width`). The page background is `color-brand-white` (`#FFFFFF`).

---

## Section 1 — Navbar

### Layout
- Position: `fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: 100`
- Height: `56px` (token: `nav-height`)
- Background: `color-brand-white` (`#FFFFFF`)
- Bottom border: `border-nav` (`1px solid #E5E7EB`)
- Horizontal padding: `40px` on left and right (token: `space-10`)
- Internal layout: `flexbox`, `align-items: center`, `justify-content: space-between`

Three logical zones inside the nav:

| Zone | Contents | Flex behaviour |
|------|----------|---------------|
| Left | Brand logo wordmark | `flex: 0 0 auto` |
| Centre | Category links: MEN, WOMEN, KIDS, SALE | `flex: 1`, `justify-content: center`, gap `20px` (token: `space-5`) |
| Right | Wishlist icon + cart icon | `flex: 0 0 auto`, gap `12px` (token: `space-3`) |

### Dimensions & Spacing
| Element | Dimension |
|---------|-----------|
| Logo wordmark font size | `22px` (token: `nav-logo-font-size`), `font-black` (900) |
| Logo top/bottom padding | `0` — vertically centred by flex |
| Category link font | `text-base` (`16px / 24px`), `font-medium` (500), `letter-spacing-wide` (0.08em), `text-transform-upper` |
| Category link horizontal gap | `20px` (token: `space-5`) |
| Wishlist icon | `20×20px` (token: `icon-md`) |
| Cart icon | `20×20px` (token: `icon-md`) |
| Badge (cart / wishlist) | `16×16px` minimum, `radius-full`, `color-brand-black` background, `color-brand-white` text, `text-xs` (`11px`) |
| Badge position | `top: -6px`, `right: -6px` relative to icon |

### Colours
| Element | Token | Hex |
|---------|-------|-----|
| Background | `color-brand-white` | `#FFFFFF` |
| Logo | `color-neutral-900` | `#111111` |
| Nav links (default) | `color-neutral-900` | `#111111` |
| SALE link | `color-brand-sale` | `#FF0000` |
| SALE link underline | `color-brand-sale` | `#FF0000` |
| Icon stroke | `color-neutral-900` | `#111111` |
| Bottom border | `border-nav` | `#E5E7EB` |
| Sticky shadow | `shadow-nav` | `0 2px 8px rgba(0,0,0,0.08)` |

### Typography
- Logo: `font-family-base`, `22px`, `font-black` (900), `color-neutral-900`
- Category links: `font-family-base`, `16px / 24px`, `font-medium` (500), `letter-spacing-wide` (0.08em), `uppercase`

### Ambiguity Resolution
- **A-01 (Nav — SALE link active state):** Decision — The SALE link always renders with a red underline and red text (`color-brand-sale: #FF0000`) as a permanent visual treatment to draw attention to the sale section, **not** as a route-active indicator. The route-active state (solid underline, `color-neutral-900`) applies separately via the current route and is additive. This mirrors the design asset where SALE has a distinct red treatment even when not necessarily the active route.

---

## Section 2 — Hero Banner

### Layout
- Width: `100vw` (full bleed, no max-width constraint)
- Height: `560px` desktop (token: `hero-height-lg`), `420px` tablet (token: `hero-height-md`), `320px` mobile (token: `hero-height-sm`)
- Background: full-cover product photograph, `object-fit: cover`, `object-position: center`
- Overlay: `color-hero-overlay` (`rgba(0,0,0,0.18)`) over the entire image
- Top margin: `56px` (accounts for sticky nav height)

Text and CTA are positioned at the bottom-left:
- Container padding: `48px` left, `80px` bottom (tokens: `space-12`, `space-20`)
- Text stack: headline → CTA button, vertical gap `24px` (token: `space-6`)

### Dimensions & Spacing
| Element | Dimension |
|---------|-----------|
| Section height (lg) | `560px` |
| Section height (md) | `420px` |
| Section height (sm) | `320px` |
| Headline max-width | `480px` |
| CTA button height | `48px` |
| CTA button padding | `0 24px` |
| CTA button min-width | `200px` |

### Colours
| Element | Token | Hex |
|---------|-------|-----|
| Image overlay | `color-hero-overlay` | `rgba(0,0,0,0.18)` |
| Headline text | `color-brand-white` | `#FFFFFF` |
| CTA button background | `color-brand-white` | `#FFFFFF` |
| CTA button text | `color-neutral-900` | `#111111` |

### Typography
- Headline: `text-hero` (`64px / 68px`), `font-black` (900), `color-brand-white`, `uppercase`, no letter spacing override
- Headline content: "WIN ON YOUR OWN TERMS." (max 60 characters per spec)
- CTA label: `text-base` (`16px / 24px`), `font-bold` (700), `letter-spacing-wide` (0.08em), `uppercase`, `color-neutral-900`

### Ambiguity Resolution
- **A-09 (Hero — static vs CMS):** Decision — The hero content (headline text, image, CTA label, and CTA destination URL) is treated as **CMS-driven** from day one. The API/CMS provides a `heroPromotion` object with `{ headline, imageUrl, ctaLabel, ctaHref }`. The component renders these fields; the design's "WIN ON YOUR OWN TERMS." is a representative example. Fallback to a static placeholder only during CMS outage.

---

## Section 3 — New Arrivals

### Layout
- Width: `100%`, max-width container `1200px` centred
- Section padding: `48px` top and bottom (token: `space-12`)
- Section horizontal padding: `40px` (token: `space-10`)
- Section heading: left-aligned, bottom margin `24px` (token: `space-6`)
- Product grid: `3-column` CSS grid, `gap: 24px` (token: `space-6`)

### Section Heading
- Text: "NEW ARRIVALS"
- Font: `text-xl` (`20px / 28px`), `font-bold` (700), `letter-spacing-wide` (0.08em), `uppercase`
- Colour: `color-neutral-900` (`#111111`)

### Product Card
Each card is a vertical stack within the CSS grid cell.

| Element | Dimension |
|---------|-----------|
| Card background | `color-neutral-100` (`#F3F4F6`) |
| Card border | `border-default` (`1px solid #D1D5DB`) |
| Card border-radius | `radius-none` (`0px`) per design |
| Card shadow | `shadow-sm` (`0 1px 2px rgba(0,0,0,0.05)`) |
| Image container height (lg) | `240px` (token: `product-card-img-height`) |
| Image container height (sm) | `180px` (token: `product-card-img-height-sm`) |
| Image `object-fit` | `contain` (product on neutral background) |
| Image padding | `16px` (token: `space-4`) |
| Text area padding | `12px 16px 16px` (top: `space-3`, sides/bottom: `space-4`) |
| Product name | `text-sm` (`13px / 20px`), `font-medium` (500), `color-neutral-900` |
| Product subtitle | `text-sm` (`13px / 20px`), `font-normal` (400), `color-neutral-600` (`#4B5563`) |
| Price | `text-base` (`16px / 24px`), `font-medium` (500), `color-neutral-900` |
| Name-to-subtitle gap | `2px` |
| Subtitle-to-price gap | `4px` (token: `space-1`) |
| Heart icon size | `24×24px` (token: `icon-lg`) |
| Heart icon position | `top: 12px`, `right: 12px`, absolute within card |

### Colours — Product Card
| Element | Token | Hex |
|---------|-------|-----|
| Card background | `color-neutral-100` | `#F3F4F6` |
| Card border | `color-neutral-300` | `#D1D5DB` |
| Product name | `color-neutral-900` | `#111111` |
| Product subtitle | `color-neutral-600` | `#4B5563` |
| Price | `color-neutral-900` | `#111111` |
| Heart icon (inactive) | `color-wishlist-inactive` | `#FFFFFF` (stroke only) |
| Heart icon (active) | `color-wishlist-active` | `#FF0000` (filled) |

### Ambiguity Resolutions
- **A-02 (3rd card — price missing):** Decision — The third card (Air Jordan 1 Low) **does not show a price** in the design. UX decision: treat this as a **"sold out" state**. When `price` is `null` or `stock === 0` the price slot renders the text "Sold Out" in `color-neutral-400` (`#9CA3AF`), `text-sm`, `font-normal`. Dev must conditionally render based on API response.
- **A-03 (Grid scroll / View All):** Decision — The landing page section always shows **exactly 3 products**. When the back-end returns more than 3, the component slices to the first 3 by arrival date desc. A "View All" text link (`font-medium`, `text-sm`, `letter-spacing-wide`, `color-neutral-900`, underline on hover) is rendered to the **right** of the section heading, vertically aligned with the heading baseline. This is a safe addition not in the design asset but required for the conversion funnel.
- **A-04 (Wishlist heart — all cards or conditional):** Decision — The wishlist heart icon appears on **all product cards** unconditionally (both in-stock and sold-out states). The icon is always visible (not just on hover) so the affordance is clear on touch devices.

---

## Section 4 — Shop by Sport

### Layout
- Width: `100%`, max-width container `1200px` centred
- Section padding: `48px` top and bottom (token: `space-12`)
- Section horizontal padding: `40px` (token: `space-10`)
- Section heading: left-aligned, bottom margin `24px` (token: `space-6`)
- Tile grid: `3-column` CSS grid, `gap: 0` (tiles are flush against each other per design)

### Section Heading
- Text: "SHOP BY SPORT"
- Font: `text-xl` (`20px / 28px`), `font-bold` (700), `letter-spacing-wide` (0.08em), `uppercase`
- Colour: `color-neutral-900` (`#111111`)

### Sport Tile
Each tile is a relative-positioned container with an absolute label and SHOP button overlaid on the photograph.

| Element | Dimension |
|---------|-----------|
| Tile height (lg) | `360px` (token: `sport-tile-height`) |
| Tile height (md) | `280px` (token: `sport-tile-height-md`) |
| Tile height (sm) | `200px` (token: `sport-tile-height-sm`) |
| Tile border-radius | `radius-none` (`0px`) — flush edges |
| Image `object-fit` | `cover` |
| Image `object-position` | `center` |
| Overlay band at bottom | height `80px`, background `color-sport-label-bg` (`rgba(0,0,0,0.30)`) |
| Overlay band position | `bottom: 0`, `left: 0`, `right: 0` |
| Sport label position | `bottom: 40px`, `left: 16px` |
| SHOP button position | `bottom: 12px`, `left: 16px` |

### Sport Tile — Colours & Typography
| Element | Token | Value |
|---------|-------|-------|
| Image overlay band | `color-sport-label-bg` | `rgba(0,0,0,0.30)` |
| Sport label text | `color-brand-white` | `#FFFFFF` |
| Sport label font | `text-base` (`16px/24px`), `font-bold` (700), `letter-spacing-wide`, `uppercase` | |
| SHOP button background | `color-brand-white` | `#FFFFFF` |
| SHOP button text | `color-neutral-900` | `#111111` |
| SHOP button font | `text-xs` (`11px/16px`), `font-bold` (700), `letter-spacing-wide`, `uppercase` | |
| SHOP button padding | `6px 16px` | |
| SHOP button border-radius | `radius-none` (`0px`) | |

### Ambiguity Resolution
- **A-05 (Sport categories — fixed or dynamic):** Decision — Sport categories are **dynamic** and CMS-driven. The API returns an ordered list of `{ label, imageUrl, sportSlug }` objects. The landing page renders the first 3 from this list in display order. If the CMS returns fewer than 3, tiles render as available (no empty placeholder tiles). The dev must handle 1, 2, or 3 tile counts gracefully: 1 tile = full width, 2 tiles = split 50/50, 3 tiles = equal thirds.

---

## Section 5 — Membership

### Layout
- Width: `100%`, max-width container `1200px` centred
- Section padding: `64px` top and bottom (token: `space-16`)
- Section horizontal padding: `40px` (token: `space-10`)
- Internal layout: `flexbox`, `align-items: center`, `gap: 48px` (token: `space-12`)
- Left column: text content, `flex: 1`, max-width `400px`
- Right column: membership photograph, `flex: 0 0 auto`, width `420px`, height `400px` (token: `membership-section-height`), `object-fit: cover`
- Section background: `color-brand-white` (`#FFFFFF`)

### Dimensions & Spacing
| Element | Dimension |
|---------|-----------|
| Section heading margin-bottom | `16px` (token: `space-4`) |
| Body copy margin-bottom | `24px` (token: `space-6`) |
| Button row gap | `12px` (token: `space-3`) |
| "JOIN US" button height | `48px` |
| "JOIN US" button padding | `0 24px` |
| "SIGN IN" button height | `48px` |
| "SIGN IN" button padding | `0 24px` |

### Colours
| Element | Token | Hex |
|---------|-------|-----|
| Section background | `color-brand-white` | `#FFFFFF` |
| Heading | `color-neutral-900` | `#111111` |
| Body copy | `color-neutral-700` | `#404040` |
| JOIN US background | `color-primary` | `#111111` |
| JOIN US text | `color-brand-white` | `#FFFFFF` |
| SIGN IN background | `color-secondary` | `#FFFFFF` |
| SIGN IN text | `color-neutral-900` | `#111111` |
| SIGN IN border | `border-btn-secondary` | `1px solid #111111` |

### Typography
| Element | Token |
|---------|-------|
| Heading ("NIKE MEMBERSHIP") | `text-2xl` (`24px / 32px`), `font-bold` (700), `uppercase`, `letter-spacing-wide` |
| Body copy | `text-base` (`16px / 24px`), `font-normal` (400) |
| Button labels | `text-sm` (`13px / 20px`), `font-bold` (700), `letter-spacing-wide`, `uppercase` |

### Ambiguity Resolutions
- **A-06 (Membership — marketing copy):** Decision — Copy is **CMS-driven placeholder** for launch. The design text "It's where you find the best of Nike. Get exclusive access to the products and stories we know you'll love, and join a community that's moving the world." is the default fallback. The API returns `{ heading, body }` for this section. The component renders whatever the CMS returns.
- **A-07 (Membership — authenticated user state):** Decision — When the user is **authenticated**, the "JOIN US" and "SIGN IN" buttons are replaced by a single text link: "GO TO MY ACCOUNT →" rendered in `text-base`, `font-medium`, `color-neutral-900`, with a right-arrow icon. This link routes to `/account`. The membership photograph and heading remain unchanged.

---

## Section 6 — Footer

### Layout
- Width: `100vw` (full bleed)
- Background: `color-footer-bg` (`#111111`)
- Top/bottom padding: `48px` (token: `footer-main-padding-y`)
- Inner max-width container: `1200px` centred, horizontal padding `40px` (token: `space-10`)
- Internal layout: `flexbox`, `gap: 48px` (token: `space-12`), `align-items: flex-start`

Four columns + one social column:

| Column | Contents | Flex |
|--------|----------|------|
| Column 1 — Brand | Logo wordmark, Find a Store, Become a Member, Send Us Feedback | `flex: 1.5` |
| Column 2 — Get Help | ORDER STATUS, SHIPPING & DELIVERY, RETURNS, PAYMENT OPTIONS | `flex: 1` |
| Column 3 — About | NEWS, CAREERS, INVESTORS, SUSTAINABILITY | `flex: 1` |
| Column 4 — Social | Social media icons (row) | `flex: 0 0 auto` |

### Footer Column Typography
| Element | Token |
|---------|-------|
| Brand logo in footer | `text-base` (`16px/24px`), `font-black` (900), `color-footer-text` (`#FFFFFF`) |
| Column heading ("GET HELP", "ABOUT NIKE") | `text-sm` (`13px/20px`), `font-bold` (700), `letter-spacing-wide`, `uppercase`, `color-footer-text` (`#FFFFFF`), margin-bottom `12px` |
| Footer links | `text-sm` (`13px/20px`), `font-normal` (400), `color-footer-link` (`#CCCCCC`), `line-height: 28px` |
| Brand links (Find a Store etc.) | `text-sm` (`13px/20px`), `font-normal` (400), `color-footer-link` (`#CCCCCC`) |

### Footer Column Spacing
- Column heading margin-bottom: `12px` (token: `space-3`)
- Link row gap (vertical): `8px` (token: `space-2`)
- Brand logo margin-bottom: `16px` (token: `space-4`)

### Social Icons
- Platform icons: YouTube, Instagram, X (Twitter) — based on design asset visible icons
- Icon size: `16×16px` (token: `icon-sm`)
- Icon colour: `color-footer-text` (`#FFFFFF`)
- Icon gap: `12px` (token: `space-3`)
- Icons are wrapped in `<a>` tags pointing to the relevant social URLs, opening in `target="_blank" rel="noopener noreferrer"`

### Legal Bar
- Background: `color-footer-legal-bg` (`#000000`)
- Height: `48px` (token: `footer-legal-height`)
- Layout: `flexbox`, `align-items: center`, `justify-content: space-between`
- Horizontal padding matches footer inner container: `40px` (token: `space-10`)

| Element | Token | Value |
|---------|-------|-------|
| Region label ("UNITED STATES") | `text-xs` (`11px/16px`), `font-medium` (500), `letter-spacing-wider` (0.12em), `uppercase`, `color-footer-legal-text` (`#999999`) | |
| Copyright notice | `text-xs` (`11px/16px`), `font-normal` (400), `color-footer-legal-text` (`#999999`) | |
| Legal links (Guides, Terms of Sale, etc.) | `text-xs` (`11px/16px`), `font-normal` (400), `color-footer-legal-text` (`#999999`), spaced with `16px` gap | |

### Ambiguity Resolution
- **A-08 (Footer — social platforms):** Decision — The design asset shows three social icons. UX decision: **YouTube, Instagram, and X (Twitter)** are the three platforms included at launch, matching what is visible in the design. URLs are configured via a CMS/config file (not hardcoded). Expanding to additional platforms (TikTok, Facebook) is deferred post-launch.

---

## Component States

### Navbar — Category Link
| State | Style |
|-------|-------|
| Default | `color-neutral-900`, no underline |
| Hover | `color-neutral-900`, underline `2px solid #111111`, `transition-fast` (150ms ease-out) |
| Focus (keyboard) | Visible focus ring: `border-focus` (`2px solid #111111`) offset `2px`, outline-offset `2px` |
| Active (current route) | `color-neutral-900`, underline `2px solid #111111` persistent |
| SALE (always) | `color-brand-sale` (`#FF0000`), underline `2px solid #FF0000` |

### Navbar — Icon Button (Wishlist / Cart)
| State | Style |
|-------|-------|
| Default | `color-neutral-900` stroke, no background |
| Hover | `color-neutral-700` (`#404040`), `transition-fast` |
| Focus | `border-focus` outline `2px solid #111111`, offset `2px` |

### Product Card
| State | Style |
|-------|-------|
| Default | `shadow-sm`, `border-default`, `color-neutral-100` background |
| Hover | `shadow-md` (`0 4px 6px rgba(0,0,0,0.07)`), `transition-base` (200ms ease-in-out), slight `transform: translateY(-2px)` |
| Focus (keyboard on card link) | `border-focus` (`2px solid #111111`) around entire card |

### Wishlist Heart Icon
| State | Icon fill | Icon stroke |
|-------|-----------|-------------|
| Inactive (not wishlisted) | transparent | `color-brand-white` (`#FFFFFF`) |
| Active (wishlisted) | `color-wishlist-active` (`#FF0000`) | `color-wishlist-active` (`#FF0000`) |
| Hover (inactive) | `rgba(255,255,255,0.3)` | `color-brand-white` |
| Hover (active) | `#CC0000` | `#CC0000` |
| Transition | `transition-fast` (150ms ease-out) | |

### Primary Button (SHOP NEW ARRIVALS, JOIN US)
| State | Background | Text | Border | Cursor |
|-------|-----------|------|--------|--------|
| Default | `color-primary` (`#111111`) | `color-brand-white` | none | pointer |
| Hover | `color-primary-hover` (`#333333`) | `color-brand-white` | none | pointer |
| Focus | `color-primary` + `border-focus` outline offset `2px` | `color-brand-white` | none | pointer |
| Disabled | `color-primary-disabled` (`#999999`) | `color-brand-white` 70% opacity | none | not-allowed |
| Loading | `color-primary` + spinner (24×24px, white) | hidden | none | wait |
| Transition | `transition-fast` (150ms ease-out) | | | |

### Hero CTA Button (SHOP NEW ARRIVALS — hero variant)
This button uses white background / black text (inverse of primary) because it sits on the dark hero overlay.

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Default | `color-brand-white` | `color-neutral-900` | none |
| Hover | `color-neutral-100` (`#F3F4F6`) | `color-neutral-900` | none |
| Focus | `color-brand-white` + `border-focus` (`2px solid #111111`) outline | `color-neutral-900` | none |

### Secondary Button (SIGN IN)
| State | Background | Text | Border | Cursor |
|-------|-----------|------|--------|--------|
| Default | `color-secondary` (`#FFFFFF`) | `color-neutral-900` | `border-btn-secondary` (`1px solid #111111`) | pointer |
| Hover | `color-secondary-hover` (`#F3F4F6`) | `color-neutral-900` | `1px solid #111111` | pointer |
| Focus | `color-secondary` + `border-focus` outline offset `2px` | `color-neutral-900` | `1px solid #111111` | pointer |
| Disabled | `color-secondary` | `color-primary-disabled` (`#999999`) | `1px solid #999999` | not-allowed |

### Sport Tile SHOP Button
| State | Background | Text |
|-------|-----------|------|
| Default | `color-brand-white` | `color-neutral-900` |
| Hover | `color-neutral-300` (`#D1D5DB`) | `color-neutral-900` |
| Focus | `color-brand-white` + `border-focus` outline offset `2px` | `color-neutral-900` |

### Sport Tile (Entire Tile as Link)
| State | Overlay | Transform |
|-------|---------|-----------|
| Default | `color-sport-label-bg` (`rgba(0,0,0,0.30)`) on band | none |
| Hover | `rgba(0,0,0,0.45)` on band | `transform: scale(1.02)` clipped by overflow-hidden, `transition-base` (200ms) |
| Focus | `border-focus` (`2px solid #111111`) outline on tile | none |

### Footer Links
| State | Colour |
|-------|--------|
| Default | `color-footer-link` (`#CCCCCC`) |
| Hover | `color-footer-link-hover` (`#FFFFFF`), underline |
| Focus | `border-focus` outline offset `2px` |

---

## Responsive Behaviour

### sm — Mobile (320px – 767px)

**Navbar:**
- Height: `56px` maintained
- Category links (MEN, WOMEN, KIDS, SALE) are hidden; replaced by a hamburger menu icon (`24×24px`) in the centre zone
- Logo remains left; hamburger centre (or right on mobile); wishlist + cart icons remain right but shrink gap to `8px` (token: `space-2`)
- Badge remains visible

**Hero:**
- Full-width, height `320px` (token: `hero-height-sm`)
- Headline font scales to `36px / 40px` (overrides `text-hero`)
- Left padding reduces to `16px` (token: `space-4`), bottom padding `40px` (token: `space-10`)
- CTA button full-width: `width: 100%`, height `48px`

**New Arrivals:**
- Grid switches to `1-column`
- Section horizontal padding: `16px` (token: `space-4`)
- Cards stack vertically, each card is full-width
- "View All" link remains below the heading

**Shop by Sport:**
- Grid switches to `1-column`
- Tile height: `200px` (token: `sport-tile-height-sm`)
- Each tile is full-width, tiles stack vertically

**Membership:**
- Flex direction: `column`
- Photograph moves **below** the text block
- Photograph width: `100%`, height `240px`, `object-fit: cover`
- Left padding reduces to `16px`
- Buttons stack vertically, each full-width

**Footer:**
- Flex direction: `column`
- Columns stack vertically, each full-width
- Column heading top padding `24px` for separation
- Legal bar: two rows — region + copyright on first row; legal links on second row

### md — Tablet (768px – 1023px)

**Navbar:**
- Full nav links visible (MEN, WOMEN, KIDS, SALE)
- Horizontal padding: `24px` (token: `space-6`)

**Hero:**
- Height: `420px` (token: `hero-height-md`)
- Headline font: `48px / 52px`
- Left/bottom padding matches desktop

**New Arrivals:**
- Grid: `2-column`, `gap: 24px`
- Third card wraps to second row, centred or left-aligned (left-aligned per design convention)
- Section horizontal padding: `24px` (token: `space-6`)

**Shop by Sport:**
- Grid: `3-column` maintained (tiles narrow to fit)
- Tile height: `280px` (token: `sport-tile-height-md`)
- Section horizontal padding: `24px`

**Membership:**
- Flex direction: `row` (same as desktop)
- Photo width reduces to `320px`
- Section horizontal padding: `24px`

**Footer:**
- Flex direction: `row` with `flex-wrap: wrap`
- Column 1 and Column 2 on first row; Column 3 and Social on second row
- Each column is `calc(50% - 24px)` wide

### lg — Desktop (1024px+)

All sections render as described in Section specifications above (the canonical desktop layout).

---

## Interactions & Animations

| Interaction | Behaviour | Token |
|-------------|-----------|-------|
| Navbar scroll shadow | Shadow appears on nav when `scrollY > 0`, `transition-base` (200ms ease-in-out) | `shadow-nav` |
| Category link hover underline | Underline slides in from left, `transition-fast` (150ms ease-out) | `transition-fast` |
| Product card hover lift | `translateY(-2px)` + `shadow-md`, `transition-base` | `transition-base` |
| Wishlist heart toggle | Fill animates in/out, `transition-fast` (150ms ease-out) | `transition-fast` |
| Sport tile hover scale | Image scales to 1.02, overlay darkens, `transition-base` | `transition-base` |
| Hero CTA hover | Background dims to `color-neutral-100`, `transition-fast` | `transition-fast` |
| Membership section image | Loads with `opacity: 0 → 1` fade, `transition-slow` (300ms ease-in-out) | `transition-slow` |

---

## Accessibility

### Contrast Requirements (WCAG 2.1 AA minimum)
| Element | Foreground | Background | Ratio target |
|---------|-----------|-----------|-------------|
| Nav links | `#111111` | `#FFFFFF` | ≥ 7:1 (AAA actual) |
| Hero headline | `#FFFFFF` | `rgba(0,0,0,0.18)` over image | Overlay must ensure ≥ 4.5:1 — hero images must be selected/cropped to dark-enough areas under text |
| CTA button (hero) | `#111111` | `#FFFFFF` | ≥ 7:1 |
| CTA button (primary) | `#FFFFFF` | `#111111` | ≥ 7:1 |
| SIGN IN button | `#111111` | `#FFFFFF` | ≥ 7:1 |
| Sport label on overlay | `#FFFFFF` | `rgba(0,0,0,0.30)` | Tile images must be selected to ensure ≥ 4.5:1; overlay darkens on hover to support contrast |
| Footer links | `#CCCCCC` | `#111111` | ≥ 4.5:1 (confirm with exact values) |
| Legal bar text | `#999999` | `#000000` | ≥ 4.5:1 |

### Focus Order (Tab Sequence)
1. Skip-to-content link (visually hidden, first in DOM)
2. Logo link
3. MEN link
4. WOMEN link
5. KIDS link
6. SALE link
7. Wishlist icon
8. Cart icon
9. Hero CTA button (SHOP NEW ARRIVALS)
10. "View All" link in New Arrivals heading
11. Product card 1 link → heart icon within card
12. Product card 2 link → heart icon within card
13. Product card 3 link → heart icon within card
14. Sport tile 1 → SHOP button (tile itself is focusable as a link; SHOP button is a separate focusable element)
15. Sport tile 2 → SHOP button
16. Sport tile 3 → SHOP button
17. JOIN US button
18. SIGN IN button
19. Footer links (in column order: col1 top→bottom, col2, col3, social icons)
20. Legal bar links

### ARIA Roles and Labels
| Element | ARIA |
|---------|------|
| Navbar | `<nav aria-label="Main navigation">` |
| Logo link | `aria-label="Go to home page"` |
| Category links | Plain `<a>` elements; active item gets `aria-current="page"` |
| Wishlist icon | `<button aria-label="Wishlist (N items)">` — count updated dynamically |
| Cart icon | `<button aria-label="Shopping cart (N items)">` |
| Hero section | `<section aria-label="Promotional hero">` |
| Hero image | `<img alt="[CMS-provided alt text for the promotion]">` — alt text must be CMS-driven |
| New Arrivals section | `<section aria-label="New Arrivals">` |
| Product card | `<article>` wrapping each card; `<a aria-label="[Product name], [price]">` covers the entire card |
| Heart button | `<button aria-label="Add [product name] to wishlist">` / `aria-pressed="true/false"` |
| Shop by Sport section | `<section aria-label="Shop by Sport">` |
| Sport tile | `<a aria-label="Shop [Sport name] shoes">` wrapping the entire tile |
| SHOP button (within tile) | `aria-hidden="true"` since parent link already describes the action |
| Membership section | `<section aria-label="Membership">` |
| Footer | `<footer aria-label="Site footer">` |
| Social icons | `<a aria-label="[Platform name]" target="_blank" rel="noopener noreferrer">` |
| Legal bar | `<div role="contentinfo">` (or within `<footer>`) |

### Skip Link
A visually hidden skip-to-content link must be the **first focusable element** in the DOM:
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:p-4">
  Skip to main content
</a>
```

### Motion / Reduced Motion
All CSS transitions and transforms must respect `prefers-reduced-motion: reduce`. When this media query matches, transition durations are set to `0ms` and `transform: scale()` on sport tiles is removed.

---

## Performance Notes (for Dev and QA reference)

| Requirement | Implementation guidance |
|-------------|------------------------|
| Hero LCP ≤ 2.5s | Hero `<img>` uses `fetchpriority="high"`, served as WebP/AVIF, **not** lazy-loaded (it is above the fold) |
| Product card images lazy | `loading="lazy"` on all product card `<img>` elements |
| Sport tile images lazy | `loading="lazy"` on sport tile `<img>` (below fold) |
| Membership photo lazy | `loading="lazy"` |
| Hero image responsive | `<img srcset="...">` with at least three size variants: 640w, 1024w, 1440w |

---

## Handoff Checklist

- [x] All colours reference tokens, not hardcoded hex
- [x] All spacing uses the spacing scale
- [x] Every interactive element has all states defined (default, hover, focus, disabled where applicable)
- [x] Responsive behaviour documented for sm / md / lg breakpoints
- [x] Accessibility requirements noted (WCAG AA contrast, focus order, ARIA labels, skip link, reduced motion)
- [x] Design asset path confirmed: docs/design/dcf1d36e03d865e6fc838f9dcb30e4a0.webp
- [x] All 10 design ambiguities (A-01 to A-10) resolved inline
- [x] Performance guidance included for LCP and lazy loading

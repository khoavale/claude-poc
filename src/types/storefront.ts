/**
 * Storefront landing page API contract types.
 *
 * These interfaces are the contract between the Express API (LP-003) and the
 * React frontend hooks / components (LP-004+). All fields mirror the JSON
 * shapes returned by the four CMS-driven read-only endpoints.
 *
 * ADR-001: storefront content is CMS-driven; no field is hardcoded in components.
 * ADR-003: price is number | null — null is the explicit "sold out" sentinel.
 */

// ---------------------------------------------------------------------------
// Section 2 — Hero Banner
// ---------------------------------------------------------------------------

/** CMS-driven hero promotion object returned by GET /api/storefront/hero. */
export interface HeroPromotion {
  /** Promotional headline text. Max 60 characters per spec (US-02). */
  headline: string;
  /** Full URL of the hero background image. Served as WebP/AVIF. */
  imageUrl: string;
  /** Alt text for the hero image — must be CMS-driven for accessibility (ARIA). */
  imageAlt: string;
  /** Label rendered on the CTA button (e.g. "SHOP NEW ARRIVALS"). */
  ctaLabel: string;
  /** Destination href for the CTA button (e.g. "/products?collection=new-arrivals"). */
  ctaHref: string;
}

// ---------------------------------------------------------------------------
// Section 3 — New Arrivals product cards
// ---------------------------------------------------------------------------

/**
 * Storefront product shape returned by GET /api/storefront/new-arrivals.
 *
 * price is number | null per ADR-003:
 *   - number → render formatted currency string (e.g. "$115")
 *   - null   → render "Sold Out" in color-neutral-400 (UX A-02)
 */
export interface StorefrontProduct {
  /** ULID / CUID primary key. */
  id: string;
  /** Display name of the product (e.g. "Air Jordan 1 Low"). */
  name: string;
  /** Category or subtitle line rendered below the name (e.g. "Men's Shoes"). */
  subtitle: string;
  /** Full URL of the product image. Lazy-loaded below the fold. */
  imageUrl: string;
  /**
   * Retail price in the store's base currency (minor units not used — raw decimal).
   * null indicates sold-out / price hidden (ADR-003, UX A-02).
   */
  price: number | null;
  /**
   * Available stock quantity. Retained for future "Low Stock" badge logic.
   * The primary sold-out indicator for display is price === null (ADR-003).
   */
  stock: number;
  /** ISO-8601 timestamp of when the product arrived in the store. */
  arrivedAt: string;
}

// ---------------------------------------------------------------------------
// Section 4 — Shop by Sport category tiles
// ---------------------------------------------------------------------------

/**
 * CMS-driven sport category returned by GET /api/storefront/sport-categories.
 * The API returns an ordered list; the landing page renders the first 3 (UX A-05).
 */
export interface SportCategory {
  /** Display label overlaid on the tile image (e.g. "RUNNING"). */
  label: string;
  /** Full URL of the sport action photograph. */
  imageUrl: string;
  /**
   * URL slug used to build the filtered product listing href
   * (e.g. "running" → "/products?sport=running").
   */
  sportSlug: string;
}

// ---------------------------------------------------------------------------
// Section 5 — Membership / loyalty sign-up block
// ---------------------------------------------------------------------------

/**
 * CMS-driven membership section content returned by GET /api/storefront/membership.
 * Copy is CMS-driven placeholder for launch (UX A-06, ADR-001).
 */
export interface MembershipContent {
  /** Section heading (e.g. "NIKE MEMBERSHIP"). */
  heading: string;
  /**
   * Body copy — 1–3 sentences describing membership benefits.
   * The component renders whatever the CMS returns.
   */
  body: string;
  /** Full URL of the membership section photograph. Lazy-loaded. */
  imageUrl: string;
}

// ---------------------------------------------------------------------------
// Section 6 — Footer
// ---------------------------------------------------------------------------

/** A single link item within a footer column. */
export interface FooterLink {
  /** Display label for the link. */
  label: string;
  /** Destination href. Relative paths route internally; absolute paths open externally. */
  href: string;
  /** When true, the link opens in a new tab with rel="noopener noreferrer". */
  isExternal: boolean;
}

/** A labelled column of links in the footer (e.g. "GET HELP", "ABOUT"). */
export interface FooterLinkColumn {
  /** Column heading displayed above the link list (e.g. "GET HELP"). */
  heading: string;
  /** Ordered list of links within the column. */
  links: FooterLink[];
}

/** Social platforms supported in the footer (UX A-08). */
export type SocialPlatform = 'youtube' | 'instagram' | 'x';

/** A social media icon link in the footer (UX A-08 — YouTube, Instagram, X). */
export interface FooterSocialLink {
  /** Platform identifier used to select the icon component. */
  platform: SocialPlatform;
  /** Accessible label for the icon link (e.g. "YouTube"). */
  label: string;
  /** Destination URL for the social profile. Always external. */
  href: string;
}

/** Full footer data shape returned by GET /api/storefront/footer. */
export interface FooterContent {
  /** Ordered link columns rendered left-to-right (e.g. Brand, Get Help, About). */
  columns: FooterLinkColumn[];
  /** Social media icon links rendered as the rightmost column. */
  socialLinks: FooterSocialLink[];
  /** Legal bar region label (e.g. "UNITED STATES"). */
  region: string;
  /** Copyright notice text (e.g. "© 2026 Nike, Inc. All Rights Reserved"). */
  copyright: string;
  /** Legal links rendered in the legal bar (e.g. Terms of Sale, Privacy Policy). */
  legalLinks: FooterLink[];
}

// ---------------------------------------------------------------------------
// Wishlist and cart item shapes
// ---------------------------------------------------------------------------

/**
 * Minimal wishlist item type used by the Zustand wishlist store and the
 * wishlist API endpoints. ADR-002: Zustand owns optimistic state; React Query
 * mutation handles server persistence.
 */
export interface WishlistItem {
  productId: string;
}

/** Cart item type used by the Zustand cart store and cart API endpoints. */
export interface CartItem {
  productId: string;
  /** Number of units added to the cart. Must be ≥ 1. */
  quantity: number;
}

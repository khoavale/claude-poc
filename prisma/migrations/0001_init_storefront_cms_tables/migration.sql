-- Migration: 0001_init_storefront_cms_tables
-- Ticket:    LP-003-DB
-- Date:      2026-05-10
-- Author:    Dev agent (claude-sonnet-4-6)
--
-- Description:
--   Creates four CMS-driven content tables that back the storefront landing
--   page API endpoints. All tables are additive (new tables only) — rollback
--   is a straight DROP TABLE for each table listed below, in reverse order.
--
-- Rollback plan:
--   DROP TABLE IF EXISTS "sport_categories";
--   DROP TABLE IF EXISTS "storefront_products";
--   DROP TABLE IF EXISTS "membership_contents";
--   DROP TABLE IF EXISTS "hero_promotions";

-- ----------------------------------------------------------------------------
-- hero_promotions
-- ----------------------------------------------------------------------------
CREATE TABLE "hero_promotions" (
    "id"          TEXT NOT NULL PRIMARY KEY,
    "headline"    TEXT NOT NULL,
    "image_url"   TEXT NOT NULL,
    "image_alt"   TEXT NOT NULL,
    "cta_label"   TEXT NOT NULL,
    "cta_href"    TEXT NOT NULL,
    "created_at"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- membership_contents
-- ----------------------------------------------------------------------------
CREATE TABLE "membership_contents" (
    "id"          TEXT NOT NULL PRIMARY KEY,
    "heading"     TEXT NOT NULL,
    "body"        TEXT NOT NULL,
    "image_url"   TEXT NOT NULL,
    "created_at"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- storefront_products
-- price is NULL for sold-out / price-hidden products (ADR-003)
-- ----------------------------------------------------------------------------
CREATE TABLE "storefront_products" (
    "id"          TEXT NOT NULL PRIMARY KEY,
    "name"        TEXT NOT NULL,
    "subtitle"    TEXT NOT NULL,
    "image_url"   TEXT NOT NULL,
    "price"       DECIMAL(10, 2),
    "stock"       INTEGER NOT NULL DEFAULT 0,
    "arrived_at"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- sport_categories
-- display_order is indexed because the API always orders by it (ORDER BY).
-- sport_slug is UNIQUE to support slug-based route lookups.
-- ----------------------------------------------------------------------------
CREATE TABLE "sport_categories" (
    "id"            TEXT NOT NULL PRIMARY KEY,
    "label"         TEXT NOT NULL,
    "image_url"     TEXT NOT NULL,
    "sport_slug"    TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "created_at"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "sport_categories_sport_slug_key"
    ON "sport_categories"("sport_slug");

CREATE INDEX "sport_categories_display_order_idx"
    ON "sport_categories"("display_order");

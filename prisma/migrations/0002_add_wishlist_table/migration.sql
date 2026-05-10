-- Migration: 0002_add_wishlist_table
-- Ticket:    LP-006-DB
-- Date:      2026-05-10
-- Author:    Dev agent (claude-sonnet-4-6)
--
-- Description:
--   Adds the wishlist_items table to persist anonymous session wishlists.
--   sessionId is a plain string (no FK to a users table — auth is out of scope
--   at this stage; see LP-006-DB technical notes and the TODO in schema.prisma).
--   productId references storefront_products with ON DELETE CASCADE so that
--   wishlist entries are automatically removed when a product is deleted.
--
-- Rollback plan:
--   DROP INDEX IF EXISTS "wishlist_items_product_id_idx";
--   DROP INDEX IF EXISTS "wishlist_items_session_id_idx";
--   DROP INDEX IF EXISTS "wishlist_items_session_product_key";
--   DROP TABLE IF EXISTS "wishlist_items";

-- ----------------------------------------------------------------------------
-- wishlist_items
-- Composite unique constraint prevents duplicate wishlist entries per session.
-- session_id is indexed for fast GET /api/wishlist?sessionId=<x> lookups.
-- ----------------------------------------------------------------------------
CREATE TABLE "wishlist_items" (
    "id"         TEXT     NOT NULL PRIMARY KEY,
    "session_id" TEXT     NOT NULL,
    "product_id" TEXT     NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wishlist_items_product_id_fkey"
        FOREIGN KEY ("product_id")
        REFERENCES "storefront_products" ("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "wishlist_items_session_product_key"
    ON "wishlist_items"("session_id", "product_id");

CREATE INDEX "wishlist_items_session_id_idx"
    ON "wishlist_items"("session_id");

CREATE INDEX "wishlist_items_product_id_idx"
    ON "wishlist_items"("product_id");

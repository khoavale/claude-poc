/**
 * src/server/db.ts — Prisma client singleton.
 *
 * Instantiated once and reused across all route modules to avoid
 * exhausting the SQLite connection pool in development.
 */

import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

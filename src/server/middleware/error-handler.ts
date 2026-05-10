/**
 * src/server/middleware/error-handler.ts
 *
 * Central Express error handler per SA conventions.
 * Zod validation errors → 400 with field-level details.
 * All other errors → 500 with a safe generic message.
 */

import { ZodError } from 'zod'
import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.flatten().fieldErrors })
    return
  }
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
}

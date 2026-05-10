/**
 * src/server/index.ts — Express application entry point.
 *
 * Assembles middleware, mounts routers, and starts the HTTP server.
 * Error handler is registered last so it catches errors from all routes.
 */

import express from 'express'

import { storefrontRouter } from './routes/storefront'
import { errorHandler } from './middleware/error-handler'

const app = express()

app.use(express.json())

// ---------------------------------------------------------------------------
// Route mounting
// ---------------------------------------------------------------------------

app.use('/api/storefront', storefrontRouter)

// ---------------------------------------------------------------------------
// Error handling — must be the last middleware registered
// ---------------------------------------------------------------------------

app.use(errorHandler)

// ---------------------------------------------------------------------------
// Server startup
// ---------------------------------------------------------------------------

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

export { app }

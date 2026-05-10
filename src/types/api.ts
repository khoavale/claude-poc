/**
 * Generic API response wrapper types shared across all Express endpoints.
 *
 * Use these wrappers to type the raw fetch responses before the data is
 * handed to React Query. Components should consume the unwrapped payload
 * types (e.g. StorefrontProduct[]) — not these wrappers directly.
 */

// ---------------------------------------------------------------------------
// Single-item response
// ---------------------------------------------------------------------------

/** Wrapper for an endpoint that returns a single resource. */
export interface ApiResponse<T> {
  data: T;
}

// ---------------------------------------------------------------------------
// Paginated list response
// ---------------------------------------------------------------------------

/** Pagination metadata included in every list response. */
export interface PaginationMeta {
  /** Total number of records matching the query (before pagination). */
  total: number;
  /** Maximum items per page (default 20, max 100 per SA conventions). */
  limit: number;
  /** Zero-based offset of the current page. */
  offset: number;
  /** true if there are more records beyond this page. */
  hasMore: boolean;
}

/** Wrapper for an endpoint that returns a paginated list of resources. */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// ---------------------------------------------------------------------------
// Error response
// ---------------------------------------------------------------------------

/** Standard error payload returned by the Express error handler. */
export interface ApiErrorResponse {
  /** Human-readable error message. */
  message: string;
  /**
   * Field-level validation errors keyed by field name.
   * Present only when the error originates from a Zod validation failure.
   */
  errors?: Record<string, string[]>;
}

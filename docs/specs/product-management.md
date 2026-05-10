# Feature Spec: Product Management

**From**: BA Agent → Dev Agent  
**Date**: 2026-04-20  
**Stories covered**: US-01, US-02, US-03, US-04

## Data Model

```
Product
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String
  imageUrl    String?
  isArchived  Boolean  @default(false)
  createdAt   DateTime @default(now())
  variants    Variant[]

Variant
  id        String  @id @default(cuid())
  productId String
  size      String
  color     String
  sku       String  @unique
  price     Float
  stock     Int     @default(0)
  product   Product @relation(fields:[productId], references:[id])
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/products | List all (non-archived), supports ?q= search |
| POST | /api/products | Create product + variants |
| GET | /api/products/:id | Single product with variants |
| PUT | /api/products/:id | Update product fields |
| DELETE | /api/products/:id | Soft-delete (set isArchived=true) |
| PUT | /api/products/:id/variants/:vid | Update variant stock/price |

## UI Pages & Components

### `/products` — ProductsPage
- `<ProductTable>` — sortable columns: Name, Category, Price range, Total stock
  - Row amber highlight when any variant stock < 5
  - Action buttons: Edit, Archive
- `<ProductSearch>` — debounced input filtering
- `<AddProductButton>` → opens `<ProductFormModal>`

### `<ProductFormModal>`
- Fields: Name*, Category*, Description, Image URL
- Dynamic variant rows: Size*, Color*, SKU*, Price*, Stock (default 0)
- "Add variant" button adds a new row
- Validation: all * fields required; SKU must be unique

## Low-Stock Threshold
Default: 5 units. Store in app config (Zustand), configurable in settings page (P2).

## Dev Notes
- Use React Query `invalidateQueries(['products'])` after mutations
- Archive check: if product has variants used in any PENDING or COMPLETED order → block delete, return 409

# Feature Spec: Sales & POS

**From**: BA Agent → Dev Agent  
**Date**: 2026-04-20  
**Stories covered**: US-10, US-11, US-12, US-13

## Data Model

```
Order
  id          String      @id @default(cuid())
  status      OrderStatus @default(PENDING)
  discount    Float       @default(0)  // absolute amount
  total       Float
  paymentMethod String
  createdAt   DateTime    @default(now())
  items       OrderItem[]

OrderItem
  id        String  @id @default(cuid())
  orderId   String
  variantId String
  qty       Int
  unitPrice Float
  order     Order   @relation(fields:[orderId], references:[id])
  variant   Variant @relation(fields:[variantId], references:[id])

enum OrderStatus { PENDING COMPLETED CANCELLED }
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/orders | List orders, newest first |
| GET | /api/orders/:id | Order detail with items |
| POST | /api/orders | Create order (PENDING) |
| POST | /api/orders/:id/checkout | Complete order, decrement stock |
| DELETE | /api/orders/:id | Cancel PENDING order |

### POST /api/orders body
```json
{
  "items": [{ "variantId": "...", "qty": 2 }],
  "discount": 10,
  "paymentMethod": "cash"
}
```

### Checkout logic (transactional)
1. Validate all items have sufficient stock
2. Calculate `total = sum(unitPrice * qty) - discount`
3. Decrement stock for each variant
4. Set order status = COMPLETED
5. Return order with receipt data

## UI Pages & Components

### `/sales/new` — NewSalePage
- `<ProductSearch>` — live search by name/SKU → dropdown of variants
- `<CartTable>` — line items with qty controls and remove button
- `<DiscountInput>` — percent toggle or fixed amount
- `<OrderSummary>` — subtotal, discount, total
- `<CheckoutButton>` → calls checkout API → redirect to `/sales/:id/receipt`

### `/sales` — SalesHistoryPage
- `<OrderTable>` — Date, Order #, Items count, Total, Status, Actions
- Click row → `<OrderDetailDrawer>` with line items

### `/sales/:id/receipt` — ReceiptPage
- Printable layout: store name, date, items, total, payment method
- "Print" button triggers `window.print()`

## Dev Notes
- Cart state lives in Zustand (not server state — it's ephemeral pre-checkout)
- On checkout success: `invalidateQueries(['products'])` to refresh stock counts
- Stock check in checkout is server-side; also disable qty increment in UI when stock reached

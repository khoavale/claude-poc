# Requirements: Sales & POS

**Author**: BA Agent  
**Date**: 2026-04-20  
**Status**: Approved

## Business Need
Sales staff need a simple point-of-sale interface to process shoe sales, apply discounts,
and generate receipts. Current process uses a manual cash register with no digital record.

## Scope
- Create sales order (select products + quantities)
- Apply discount (percentage or fixed amount)
- Checkout: cash / card payment recording
- Receipt view (printable)
- Order history list

## Out of Scope (v1)
- Online payment gateway integration
- Returns / refunds
- Multi-currency

## User Stories

### US-10 Create Sales Order
As Sales Staff, I want to add products to a cart and create a sale so that I can
process a customer purchase quickly.

**Acceptance Criteria**:
- Given I open /sales/new, When I search for a product, Then matching items appear instantly
- Given I select a product, When I choose size/color and qty, Then it is added to the cart
- Given I remove an item from cart, When I click X, Then total updates immediately
- Given stock is 0 for a variant, Then that variant is not selectable

### US-11 Apply Discount
As Sales Staff, I want to apply a discount to the order so that I can honor promotions.

**Acceptance Criteria**:
- Given I enter a % discount (0–100), When I apply, Then the discounted total is shown
- Given I enter a fixed discount > order total, When I apply, Then I see a validation error

### US-12 Checkout
As Sales Staff, I want to mark an order as paid so that the transaction is recorded.

**Acceptance Criteria**:
- Given the cart is not empty, When I click Checkout and select payment method, Then order is saved as COMPLETED
- Given checkout succeeds, Then stock for each variant is decremented accordingly
- Given checkout succeeds, Then I am shown a receipt screen

### US-13 View Order History
As Store Manager, I want to see all completed orders with totals and dates so that I
can monitor daily sales.

**Acceptance Criteria**:
- Given I open /sales, When the page loads, Then I see orders newest-first
- Given I click an order, When the detail panel opens, Then I see line items and totals

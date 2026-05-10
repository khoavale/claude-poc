# Requirements: Product & Inventory Management

**Author**: BA Agent  
**Date**: 2026-04-20  
**Status**: Approved

## Business Need
The store manager needs a central place to track all shoe products, their variants (size/color),
stock levels, and pricing. Currently done in spreadsheets — error-prone and slow.

## Scope
- Product catalog with images, descriptions, categories
- Variant management (size, color, SKU)
- Stock level tracking with low-stock alerts
- Restock workflow (manual entry)

## Out of Scope (v1)
- Supplier integration / purchase orders
- Barcode scanning
- Multi-location inventory

## User Stories

### US-01 View Product List
As a Store Manager, I want to see all products in a paginated table so that I can quickly
audit the catalog.

**Acceptance Criteria**:
- Given I am logged in as Manager, When I open /products, Then I see a table with Name, SKU, Category, Price, Stock
- Given the table has >20 items, When I scroll or paginate, Then I can access all items
- Given a product is low-stock (< threshold), When I view the list, Then that row is highlighted in amber

### US-02 Add Product
As a Store Manager, I want to add a new shoe product with at least one variant so that
the catalog stays up to date.

**Acceptance Criteria**:
- Given I click "Add Product", When I submit a valid form, Then the product appears in the list
- Given I omit the product name, When I submit, Then I see a validation error
- Given I add a product, When I save, Then stock starts at 0 for each variant

### US-03 Edit Product
As a Store Manager, I want to edit an existing product's details and update stock levels
so that information stays accurate.

**Acceptance Criteria**:
- Given I click Edit on a product, When I update the name, Then the list reflects the change immediately
- Given I update stock for a variant, When I save, Then the new stock level is persisted

### US-04 Delete Product
As a Store Manager, I want to archive a product so that discontinued items don't clutter
the catalog.

**Acceptance Criteria**:
- Given I click Delete, When I confirm the dialog, Then the product is soft-deleted (not shown in list)
- Given a product has open sales orders, When I try to delete, Then I see an error blocking deletion

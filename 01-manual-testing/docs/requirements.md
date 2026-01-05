# Requirements List

This document defines the functional requirements, priorities, and acceptance criteria
for the e-commerce application under test.

---

## REQ-001: Guest Checkout with Inventory Validation

**Priority:** High

### Description
The system must allow users to complete a purchase without creating an account and decrement stock immediately after a successful order.

### Acceptance Criteria
- Guest users can proceed to checkout without logging in or registering.
- Order can be placed successfully using guest checkout.
- Product inventory is reduced immediately after successful payment.
- If the product stock reaches zero, the product status is updated to **Out of Stock**.

---

## REQ-002: Product Comparison

**Priority:** Medium

### Description
Users must be able to compare at least two items side-by-side, and comparison list persistence must be satisfied.

### Acceptance Criteria
- Users can select products to compare from product listing pages or product detail pages.
- Compared products display key attributes (price, brand, rating, availability).
- Users can close and reopen the browser and still access the comparison list with the previously selected products.

---

## REQ-003: Configurable Product Pricing

**Priority:** High

### Description
Users must be able to select a product with multiple variations and see the price and stock status update dynamically.

### Acceptance Criteria
- Product variations (e.g., size, color) are selectable on the product detail page.
- Price updates dynamically when a variation is selected.
- Selected variation details are correctly displayed in the cart.

---

## REQ-004: Tiered Pricing Logic

**Priority:** High

### Description
Users must see discounted unit prices when increasing item quantity in the cart.

### Acceptance Criteria
- Unit price updates automatically when quantity thresholds are reached.
- Discounted unit price is clearly displayed in the cart.
- Total price reflects the discounted unit price.
- Pricing logic is consistent across the product page and the cart.

---

## REQ-005: Advanced Search with Layered Navigation

**Priority:** Medium

### Description
Users must be able to filter and narrow down products using keyword search and layered navigation.

### Acceptance Criteria
- Users can search for products using keywords.
- Users can filter results by price range, brand, and rating.
- Applied filters dynamically update search results.
- Keyword search accuracy must be satisfied for partial or nonsensical keyword searches.



	



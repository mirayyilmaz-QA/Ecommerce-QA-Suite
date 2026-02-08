# API Testing (FakeStoreAPI)

## Postman
This module demonstrates a professional API testing workflow using Postman.

## 🚀 The Business Logic Problem
In a standard e-commerce flow, the backend must maintain data integrity between product pricing and cart totals. 

### Key Features:
* **Dynamic Data Prep**: Fetches the full product list, validates the array schema, and selects a random product for testing.
* **Auth Flow**: Handles JWT token generation and injection using Postman Environments.
* **Mathematical Validation**: Cross-references the "Official Price" of an item against the cart subtotal.

**Note on Findings** Identified that the `POST /carts` endpoint currently lacks a `subtotal` field. I implemented a 'Shadow Calculation' in the test scripts to verify what the subtotal *should* be, demonstrating a proactive approach to identifying missing API requirements.
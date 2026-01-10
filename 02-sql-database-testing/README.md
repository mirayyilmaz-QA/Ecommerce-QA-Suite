# Database Testing – SQL

## Overview
This repository contains the **backend validation** portion of my QA portfolio.  
I designed a custom **relational database schema** to simulate a Magento-like e-commerce environment and executed SQL scripts to verify **data integrity, business rules, and edge cases** through direct database manipulation and querying.

The focus of this project is **database-level testing**, independent of UI, to demonstrate how backend data supports application behavior.

---

## Database Schema (EER Diagram)
The Entity-Relationship (EER) diagram below represents the relationships between **customers, products, orders, and order items** used in this project.

The schema supports:
- Registered customer purchases
- Guest checkout via nullable foreign keys
- One-to-many relationships between orders and order items

*(EER diagram image attached in the repository)*

---

## Database Testing Scenarios

### 1. Inventory & Stock Validation
**Action:**  
Simulated a *“Last Piece”* purchase by updating product inventory quantities to zero.

**Validation:**  
Verified that the database correctly reflects **out-of-stock products** using SQL queries.

**Goal:**  
Ensure inventory logic is accurately enforced at the database level.

---

### 2. Guest Checkout Integrity
**Action:**  
Inserted order records with a `NULL` value for the `customer_id` field to simulate **guest checkout** scenarios.

**Validation:**  
Audited the orders table to confirm that guest orders are stored correctly without requiring a registered customer profile.

**Goal:**  
Validate support for guest checkout while preserving referential integrity.

---

### 3. Pricing Regression & Logic Checks
**Action:**  
Modified catalog prices **after order placement** to simulate real-world price changes (e.g., promotions or price updates).

**Validation:**  
Executed multi-table `JOIN` queries to identify discrepancies between:
- Current catalog prices
- Historical prices recorded at checkout

**Goal:**  
Ensure order data preserves the **price-at-purchase snapshot**, independent of future catalog updates.

---

## File Directory Structure

- **01-schema-setup.sql**  
  Data Definition Language (DDL) scripts and initial data population.

- **02-data-modification.sql**  
  Simulation scripts for inventory changes, guest checkout, and pricing updates.

- **03-validation-test_cases.sql**  
  SQL queries used to audit database integrity and validate business rules.

---

## Key QA Skills Demonstrated
- Relational database modeling
- Backend data validation
- SQL-based test design
- Edge case simulation (guest checkout, zero inventory, price regression)
- Business rule verification at the database level

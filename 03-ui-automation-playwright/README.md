# Playwright E2E Automation Framework

This project is a real-world end-to-end (E2E) automation framework built with **Playwright** for the **Magento 2 Open Source** e-commerce platform. It is part of my QA portfolio and demonstrates how I design **stable, readable, and maintainable** test automation for dynamic web applications.

The focus of this project is not only automation, but also **clean structure, reliability, and real-world usability**.

---

## Architecture & Design

### Page Object Model (POM)
Each page has its own class (e.g., `ProductPage`, `CheckoutPage`). This keeps tests clean and makes UI changes easy to maintain.

### Page Manager
A central manager that controls all page objects. Tests focus on business flows instead of technical setup logic.

### Business Flows
User journeys (such as **Guest Checkout**) are written as readable flow methods. Tests describe real user behavior instead of low-level technical steps.

### Data Factory
Test data (user, address, shipping info) is generated dynamically for each run. This avoids duplicated users and test data conflicts.

---

## Stability Strategy

**Background activity handling** UI waits are based on real visual signals (loaders, masks, spinners), not only network idle states.

**Precise element selection** Prevents wrong element interactions (e.g., `S` vs `XS`) using strict selectors.

**Reliable interactions** Handles overlays, blocked elements, and layout conflicts for stable clicking and typing.

---

## Project Structure

```text
03-ui-automation-playwright/
│
├─ pages/          # Page Objects
├─ components/     # Reusable UI components
├─ core/           # Framework core utilities
├─ tests/          # E2E test scenarios
├─ playwright.config.ts
├─ package.json
└─ README.md

# Playwright E2E Automation Framework

This project is a real-world end-to-end (E2E) automation framework built with Playwright for the Magento 2 Open Source e-commerce platform. It is part of my QA portfolio and demonstrates how I design stable, readable, and maintainable test automation for dynamic web applications.

The focus of this project is not just automation, but clean structure, reliability, and real-world usability.

---

## Key Design

### Page Object Model (POM)
Each page has its own class (e.g. `ProductPage`, `CheckoutPage`).  
This keeps tests clean and makes UI changes easy to maintain.

### Page Manager
Central place that manages all page objects so tests stay focused on user flows, not setup code.

### Business Flows
User journeys (like **Guest Checkout**) are written as simple flow methods.  
Tests read like real user actions instead of technical scripts.

### Data Factory
Generates new user and shipping data for every test run.  
Prevents duplicate accounts and test data conflicts.

---

## Stability Solutions

**Background activity handling**  
Waits for real UI signals (loaders, masks) instead of network silence to avoid flaky tests.

**Exact element selection**  
Prevents wrong clicks like `S` vs `XS` size conflicts using strict matching.

**Click reliability**  
Handles layout overlaps and blocked elements to ensure stable interactions.

---

## Getting Started
cd 03-ui-automation-playwright
npm install
npx playwright test --headed

# View report:
npx allure serve allure-results

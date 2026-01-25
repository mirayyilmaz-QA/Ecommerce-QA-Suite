# Playwright E2E Automation Framework

This project is a real-world end-to-end (E2E) automation framework built with Playwright for the [Magento 2 Open Source](https://magento2-demo.magebit.com/) e-commerce platform.  
It is part of my QA portfolio and demonstrates how I design stable, readable, and maintainable test automation for dynamic web applications.

The focus of this project is not only automation, but also clean structure, reliability, and real-world usability.

---

## Architecture & Design

### Page Object Model (POM)
Each page has its own class (e.g. `ProductPage`, `CheckoutPage`).  
This keeps tests clean and makes UI changes easy to maintain.

### Page Manager
A central manager that controls all page objects.  
Tests focus on business flows instead of technical setup logic.

### Business Flows
User journeys ( **Guest Checkout** , **Registered User Checkout** ) are written as readable flow methods.  
Tests describe real user behavior instead of low-level technical steps.

### Data Factory
Test data (user, address, shipping info) is generated dynamically for each run.  
This avoids duplicated users and test data conflicts.

---

## Stability Strategy

* Background activity handling using real UI signals (loaders, masks, spinners)
* Precise element selection to avoid wrong interactions (e.g. `S` vs `XS`)
* Reliable interactions with overlays and blocked elements

---

## Project Structure

```text
03-ui-automation-playwright/
│
├─ pages/               Page Objects
├─ components/          Reusable UI components
├─ core/                Framework core utilities
├─ tests/               E2E test scenarios
├─ playwright.config.ts
├─ package.json
└─ README.md
```

---

## Getting Started

## Install dependencies
cd 03-ui-automation-playwright
npm install

 ---
 
## Run tests

### Run tests in headless mode
npx playwright test

### Run tests in headed mode
npx playwright test --headed

---

## Reports

### Show Playwright HTML report
npx playwright show-report

### Serve Allure results
allure serve allure-results

---

## CI Integration
This project includes GitHub Actions integration. Tests are automatically executed in CI when code is pushed to the repository using:

.github/workflows/playwright.yml

## Purpose
This project is part of my QA engineering portfolio and demonstrates:

* Real-world automation design
* Scalable framework structure
* Maintainability
* Stability-focused testing
* CI-ready automation

This is not a tutorial-style demo project.  It is designed as a production-style automation framework following real-world QA practices.











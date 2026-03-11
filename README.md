# E-Commerce Quality Engineering Portfolio
[![Sanity Suite](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/sanity.yml/badge.svg)](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/sanity.yml)

## A Comprehensive Full-Stack Testing Ecosystem

This repository is a professional showcase of my transition from **IT Recruitment to Software Quality Engineering.** Rather than testing a "toy" application, I built a modular testing suite that addresses real-world business risks across the entire e-commerce stack.

## The Problem I Solved
In a fast-paced e-commerce environment, manual regression testing for the "Golden Path" (Search → Cart → Checkout) can take hours. I engineered this suite to reduce that effort to **under 60 seconds** while ensuring data integrity from the **UI** down to the **Database.**

## The Modern Tech Stack (JS/TS Focused)
I chose a **JavaScript-heavy stack** to ensure high execution speed, maintainability, and deep integration with modern web architectures.

* **UI Automation:** Playwright (TypeScript) with Page Object Model (POM).
* **API Testing:** Playwright API & Postman (testing the DummyJson API).
* **Mobile Testing:** Appium + WebdriverIO (JavaScript).
* **Performance:** k6 (JavaScript-based Load Testing).
* **Database:** MySQL (Relational Data Validation).
* **CI/CD:** GitHub Actions (Automated test execution on every push).

## Repository Structure
* ```01-manual-testing/:``` Test Plans, Traceability Matrix, and high-fidelity Bug Reports (Jira/Xray style).
* ```02-database-sql/:``` CRUD and Join-heavy validation scripts for data integrity.
* ```03-playwright-automation/:``` The E2E "Golden Path" regression suite.
* ```04-api-testing/:``` Hybrid suite covering Schema validation and Request Chaining.
* ```07-performance-k6/:``` Stress tests and Load scripts with SLO thresholds.
* ```mobile-extension/:``` [mobile-repo](https://github.com/mirayyilmaz-QA/mobile-automation-portfolio) Cross-platform mobile sanity checks.

## AI-Assisted Quality Engineering
I don't just use tools; I leverage **Generative AI** to act as a force multiplier in my QA process:

* **Test Data Generation:** Used AI to create thousands of synthetic user profiles and JSON payloads.
* **Edge Case Brainstorming:** Prompted AI to identify "unhappy paths" for complex discount and tax logic.
* **Code Optimization:** Leveraged AI for refactoring Page Objects into more readable, DRY (Don't Repeat Yourself) code.

## Continuous Integration (CI/CD)
This project is **production-ready.** Every code change triggers a **GitHub Action** that runs a core "Sanity Suite," ensuring that new updates never break existing functionality. Look for the **"Passed"** badge on my latest commits!

### Pipeline Status

| Layer | Status | Description |
| :--- | :--- | :--- |
| **UI Automation** | [![Playwright Tests](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/playwright.yml)| Full Regression (Playwright) |
| **API Testing** | [![API Regression Suite](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/api-tests.yml/badge.svg)](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/api-tests.yml) | Integration & Schema Validation |
| **Performance** | [![Performance Load Tests (k6)](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/performance.yml/badge.svg)](https://github.com/mirayyilmaz-QA/Ecommerce-QA-Suite/actions/workflows/performance.yml)| Load Testing (k6) |

 **Note:** The Sanity Suite at the top of this page runs on every commit to ensure core business flows (Login, Checkout) are never broken.
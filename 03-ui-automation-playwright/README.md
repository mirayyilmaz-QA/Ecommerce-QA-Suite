# Playwright E2E Automation Framework

This project is a production-style end-to-end (E2E) automation suite built for the[Magento 2 Open Source](https://magento2-demo.magebit.com/) platform.  

The goal of this project is not only to produce passing tests, but to design a stable, maintainable automation framework capable of detecting real functional defects.

---

## Key Highlights

* Structured Page Object Model (POM)
* Flow-based business logic abstraction
* Hybrid UI + API validation
* Resilient synchronization strategy
* CI-ready (GitHub Actions)
* Real defect detection & documentation

---

## Architecture & Design

* **Page Object Model (POM):** Each page has its own class. This keeps tests clean and makes UI changes easy to maintain.

* **Page Manager:** A central manager that controls all page objects.  Tests focus on business flows instead of technical setup logic.

* **Business Flows:** User journeys (e.g, Guest Checkout) are written as readable flow methods. Tests describe real user behaviors.

* **Data Factory:** Test data is generated dynamically to avoid account conflicts and ensure every run is fresh

* **Hybrid Testing (UI + API Validation):** In addition to UI automation, the framework validates backend integrity using direct API calls.

---

## Resilience & Stability Strategy

Magento is a dynamic, JavaScript-heavy platform. To prevent flaky tests, the framework uses:

* State-based synchronization (instead of fixed waits)
* waitForResponse for backend readiness
* UI loader monitoring
* Intelligent retry logic using toPass
* Actionability checks before interactions

---

## Defect Tracking

The framework has detected real functional defects.

Example: BUG-004 – Incorrect price sorting (ASC & DESC)
→ Documented in GitHub Issues
→ Tracked under /bugs/

## Project Structure

```text
03-ui-automation-playwright/
│
├─ pages/               Page Objects
├─ components/          Reusable UI components
├─ core/                Framework core utilities
├─ tests/               Test scenarios
├─ bugs/                Report links directing to the GitHub Issues tab
├─ playwright.config.ts
├─ package.json
└─ README.md
```

---

## Tech Stack

- **Language:** TypeScript  
- **Framework:** Playwright  
- **Test Architecture:** Page Object Model (POM), Flow-based design  
- **Reporting:** Playwright HTML Report, Allure  
- **CI:** GitHub Actions  
- **Data Handling:** Dynamic test data generation (Data Factory pattern)  
- **Api Validation:** Playwright request Api

--- 

## Getting Started

### Install dependencies
```npm install```

### Run tests in headless mode
```npx playwright test```

### View the report
```npx playwright show-report```

---

## Behavior-Driven Development (BDD) Extension
This project features a standalone BDD layer implemented with Cucumber.js and TypeScript. It is designed as a "wrapper" that leverages the existing Page Object Model (POM) without compromising the integrity of the core UI automation framework.

### Architecture & Design
The BDD implementation follows a Three-Layer Architecture:

* **Requirement Layer (.feature):** Scenarios written in Gherkin (Given/When/Then) to bridge the communication gap between technical and non-technical stakeholders.
* **Glue Layer (.steps.ts):** Step definitions that map Gherkin steps to technical execution.
* **Core Logic Layer (POM/Flows):** The BDD layer imports and reuses the PageManager and Flows from the main framework, demonstrating high reusability and loose coupling.

### Key Technical Implementations
Separation of Concerns: The BDD folder (/bdd-tests) remains independent of the standard Playwright runner.

* **Context Sharing:** Utilizes a custom hooks.ts to manage the Playwright browser lifecycle and BrowserContext for isolated test execution.

* **Custom Reporting:** Integrated cucumber-html-reporter to generate stakeholder-friendly visual dashboards.

* **Strict Type Checking:** Configured a dedicated tsconfig.json to ensure type safety across the BDD and Core layers.

### How to Run & View Reports
To execute the BDD scenarios and generate the visual report, run the following commands:

### Run BDD Tests
```npx cucumber-js --config bdd-tests/cucumber.mjs```

### Generate HTML Report
```node generate-report.cjs```

This is not a tutorial-style demo project.  It is designed as a production-style automation framework following real-world QA practices.









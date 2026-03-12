# Playwright E2E Automation Framework

This project is a production-style end-to-end (E2E) automation suite built for the [Magento 2 Open Source](https://magento2-demo.magebit.com/) platform.  

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

This project uses a layered automation architecture:

* **Page Object Model (POM):** Each page has its own class. This keeps tests clean and makes UI changes easy to maintain.

* **Page Manager:** A central manager that controls all page objects.  Tests focus on business flows instead of technical setup logic.

* **Business Flows:** User journeys (e.g, Guest Checkout) are written as readable flow methods. Tests describe real user behaviors.

* **Data Factory:** Test data is generated dynamically to avoid account conflicts and ensure every run is fresh

* **Hybrid Testing (UI + API Validation):** In addition to UI automation, the framework validates backend integrity using direct API calls.

```text
Tests (Playwright + BDD)
      ↓
Flows (Business workflows)
      ↓
PageManager (Page orchestration)
      ↓
Page Objects
      ↓
Reusable Components
      ↓
Playwright Browser Automation
```

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

## How to Run Tests

* Clone the repository.
* Install dependencies: ```npm install```
* Run tests in headless mode: ```npx playwright test```
* View the report: ```npx playwright show-report```

---

##  BDD & Cucumber Integration

This repository integrates a full Behavior-Driven Development (BDD) layer on top of the existing Playwright E2E architecture, allowing scenarios to be written in business-readable Gherkin syntax without duplicating core page objects.

### Key Technical Implementations
* **Separation of Concerns:** The BDD layer (`/bdd-tests`) remains strictly independent of the standard Playwright runner, ensuring zero interference with existing E2E specs.
* **Dual-Runner Compatibility:** Configured seamless TypeScript execution across both Playwright (CommonJS) and Cucumber using `ts-node/register` and runtime transpilation (`TS_NODE_TRANSPILE_ONLY`) to bypass strict compilation loops and optimize execution speed.
* **Context Sharing:** Utilizes custom `hooks.ts` to natively manage the Playwright `Browser` and `BrowserContext` lifecycles, ensuring pristine, isolated state for every Cucumber scenario.
* **Custom Reporting:** Integrated `cucumber-html-reporter` to automatically parse JSON outputs into stakeholder-friendly visual dashboards.

#### How to Run & View Reports
To execute the BDD scenarios and generate the visual report, utilize the custom npm scripts configured in `package.json`:

* **Run BDD Tests:** ```npm run test:bdd```
* **Generate Html Report:**```npm run report:bdd```

This is not a tutorial-style demo project.  It is designed as a production-style automation framework following real-world QA practices.









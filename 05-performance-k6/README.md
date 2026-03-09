## E-Commerce Performance Testing Framework (k6)

This project is a professional-grade performance testing framework built with k6 to evaluate the scalability and reliability of an e-commerce API (DummyJSON). This repository follows a Layered Architecture (Services, Config, Data) to ensure maintainability and reusability.

## Tech Stack
* **Load Testing Tool:** k6
* **Language:** JavaScript (ES6+)
* **Reporting:** k6-reporter (HTML Summary)
* **Target API:** DummyJSON

## Project Structure
I designed this framework to be modular, separating test logic from configuration and data:

* config/: Centralized environment URLs and load profiles (Smoke, Average, Mixed Traffic).
* data/: JSON-driven test data for users and products to ensure realistic variability.
* services/: Abstraction layer for API calls (Product and Search services).
* scripts/:

    * api/: Atomic tests for individual endpoints (Login, Search, Product).
    * flows/: End-to-end user journeys (Shopping Flow).
    * mixed-traffic.js: Advanced parallel scenario execution.
* reports/: Automated HTML report generation.

## Performance Thresholds (SLA)
To ensure Quality Engineering standards, every test must pass these strict criteria:
* **Latency:** $P(95) < 500ms$ (95% of requests must be faster than 0.5s).
* **Reliability:** Error rate must be $< 1\%$.

## How to Run

* Clone the repository.
* Run the Shopping Flow:
    ``` k6 run scripts/flows/shopping-flow.js ```
* Run Mixed Traffic (Parallel Scenarios):
    ``` k6 run scripts/mixed-traffic.js ```

## Key Highlights for the Portfolio
* **Data-Driven:** Uses randomized search terms and user credentials from JSON.
* **Auth Handling:** Implements setup() to handle OAuth token generation once per test run.
* **Parallel Execution:** Uses k6 scenarios to run different user behaviors simultaneously.
* **DRY Principle:** API endpoints are encapsulated in the services/ layer for easy updates.

### Note on Test Data: 
This project uses a randomized user selection logic. Currently, it is optimized for the emilys account as it provides the most stable authentication tokens for the DummyJSON environment.

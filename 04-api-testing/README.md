# API Testing Suite (FakeStoreAPI)

## Project Overview & Strategy
Originally planned as a Magento-specific suite, I transitioned this module to the **FakeStoreAPI** to its clear structure & stable endpoints and focus on core **API Business Logic** rather than platform-specific configurations. 

This project follows a tool-agnostic approach, where I first designed the testing logic in **Postman** for exploration and then ported it into a programmatic **Playwright + TypeScript** suite for automated regression.

### The Business Logic Problem
In a robust e-commerce system, the backend must ensure data integrity between product catalog pricing and cart calculations. I designed this suite to validate if the system correctly maintains the "Official Price" throughout the checkout lifecycle.

---

## Implementation 1: Postman (Exploration & Design)
Postman was used to map out the API's behavior and define the "Contract" between requests.

* **Dynamic Data Prep**: Fetches the full product list, validates the array schema, and picks a random product to ensure the suite is not hardcoded.
* **Auth Flow**: Handles JWT token generation and automated injection using Postman Environments.
* **Key Finding (Bug Documentation)**: Identified that the `POST /carts` endpoint lacks a `subtotal` field. I implemented a 'Shadow Calculation' in the test scripts to verify what the math *should* be, demonstrating a proactive approach to identifying missing API requirements.

---

## Implementation 2: Playwright & TypeScript (Automation)
I ported the Postman logic into a programmatic suite to show I can scale testing into a modern CI/CD pipeline.



* **Asynchronous State Management**: Uses TypeScript variables to pass dynamic data (JWT Tokens, IDs, and Prices) between test blocks.
* **Defensive Assertions**: Implemented conditional logic to handle and document the identified "Missing Subtotal" bug, preventing the suite from failing while still flagging the issue.
* **CI/CD Ready**: Integrated with GitHub Actions to run automatically on every push, ensuring zero regression for the API logic.

---

## Technical Decision: Why Playwright/TS?
 I chose **Playwright with TypeScript** for this portfolio to align with the industry shift toward unified testing frameworks. This demonstrates my ability to contribute to a "Full-Stack" QA environment where UI and API tests share the same language and ecosystem.

---

## 🏁 How to Run
### Postman:
1. Import `postman/FakeStore_Collection.json`.
2. Import `postman/FakeStore_Environment.json`.
3. Select the `FakeStore-Prod` environment and run the collection.

### Playwright:
1. `cd playwright-api`
2. `npm install`
3. `npx playwright test`


---

## What This Project Demonstrates

* API contract validation
* Business logic testing beyond happy paths
* Bug detection through calculated expectations
* Migration from manual API testing to scalable automation
* CI/CD-ready API regression testing
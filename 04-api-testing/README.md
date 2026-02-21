# Playwright API Automation Project

This project demonstrates end-to-end API testing starting with manual validation in Postman and evolving into automated API testing using Playwright with TypeScript.

The API used for testing is: **DummyJSON**

The goal of this project is to show:

**API testing fundamentals**

* Structured validation
* Business logic verification
* Clean automation architecture
* Network interception and mocking

## Project Scope

This repository contains two main parts:

## 1.Postman API Testing

The initial API exploration and validation were done using Postman. This phase demonstrates understanding of API behavior before automation.

Included in this repository:
* Exported Postman Collection (JSON)
* Exported Postman Environment (JSON)

Covered in Postman:
* Authentication (/auth/login)
* Fetching user profile
* Retrieving product list
* Creating carts
* Status code validation
* Basic response structure validation


## 2.Playwright API Automation (TypeScript)

The same API logic was then automated using Playwright. This phase expands testing to a higher level by adding:

* Reusable utilities
* Typed interfaces
* Business logic validation
* Negative testing
* Network mocking

### Tech Stack

* Node.js
* Playwright
* TypeScript
* Postman

### Project Structure

```text
tests/           → API flow tests & mocking tests
utils/           → Helper functions & TypeScript interfaces
testData/        → Test user credentials
auth.setup.ts    → Authentication setup (storage state)
postman/         → Exported collection & environment
```

## Key Features

### Authentication Setup

A setup project logs in once and saves authentication state for reuse across tests. This avoids repeated login logic and keeps tests clean.

### Typed API Responses

This prevents runtime mistakes and improves maintainability. Custom TypeScript interfaces:
* User
* Product
* Cart

### Business Logic Validation

Cart totals are verified using calculated expected values:

```(price × quantity)```

This ensures backend calculations are correct — not just status codes.

### Negative & Edge Case Testing

The project documents real API behavior, including:
* Zero quantity acceptance
* Checkout exceeding available stock
* These tests highlight business rule gaps.

### Network Interception & Mocking

Demonstrates how to:
* Simulate 500 Internal Server Errors
* Mock empty cart responses
* Validate frontend resilience behavior
* This shows understanding beyond simple API validation.

### How to Run

Install dependencies: ```npm install```

Run all tests: ```npx playwright test```

Run in UI mode: ```npx playwright test --ui```

### What This Project Demonstrates

* API testing fundamentals
* Transition from manual to automated testing
* Clean test architecture
* Reusable utilities
* Typed API validation
* Business-focused testing
* Controlled mocking strategies

### Notes

* Uses predefined seeded users provided by DummyJSON.
* Designed as a structured portfolio-level API automation project.
* Focused on clarity, maintainability, and realistic testing practices.
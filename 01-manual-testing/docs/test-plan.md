# [cite_start]Test Plan – E2E Manual Testing [cite: 2]

---

## [cite_start]1. Objective [cite: 3]
[cite_start]To validate core end-to-end business flows of an e-commerce system, ensuring correct behavior across UI, backend logic, and integrations. [cite: 4]

---

## [cite_start]2. In Scope [cite: 5]
* [cite_start]Guest checkout with inventory validation [cite: 6]
* [cite_start]Product comparison [cite: 7]
* [cite_start]Configurable product pricing [cite: 8]
* [cite_start]Tiered pricing logic [cite: 9]
* [cite_start]Advanced search & layered navigation [cite: 10]

---

## [cite_start]3. Out of Scope [cite: 11]
* [cite_start]Performance testing [cite: 12]
* [cite_start]Security testing [cite: 13]
* [cite_start]Real payment gateway integration [cite: 14]

---

## [cite_start]4. Test Approach [cite: 15]
* [cite_start]Black-box testing [cite: 16]
* [cite_start]E2E scenario-based testing [cite: 17]
* [cite_start]Boundary value and negative testing [cite: 18]
* [cite_start]Conditional logic validation [cite: 19]

---

## [cite_start]5. Test Environment [cite: 20]
* [cite_start]**URL:** [Magento 2 Commerce Demo](https://magento2-demo.magebit.com/) [cite: 21]
* [cite_start]**Browsers:** Chrome, Firefox (Latest versions). [cite: 22]
* [cite_start]**Device:** Desktop (macOS). [cite: 23]
* [cite_start]**Payment:** Simulated payment gateway [cite: 24]
* [cite_start]**Inventory:** Mock inventory system [cite: 25]

---

## [cite_start]6. Test Data [cite: 26]
[cite_start]Please check the `Test-Data.md` file for specific SKUs and login details. [cite: 27]

---

## [cite_start]7. Entry Criteria [cite: 28]
* [cite_start]Stable build deployed [cite: 29]
* [cite_start]Test data available [cite: 30]
* [cite_start]Requirements finalized [cite: 31]

---

## [cite_start]8. Exit Criteria [cite: 32]
* [cite_start]All high-priority cases executed [cite: 33]
* [cite_start]No open Critical or High severity defects [cite: 34]
* [cite_start]Test Summary Report is completed and reviewed. [cite: 35]

---

## [cite_start]9. Risks [cite: 36]

| Identified Risk | Potential Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Inventory Race Conditions** | High | [cite_start]Test simultaneous cart updates in multiple browser sessions (Incognito vs. Regular). [cite: 37] |
| **Pricing Calculation Discrepancies** | High | [cite_start]Use a "Price Matrix" (Excel) to manually calculate expected results before verifying on-site. [cite: 37] |
| **Filter/Search Inconsistencies** | Medium | [cite_start]Conduct "Smoke Tests" on search functionality after every site reset/cache clear. [cite: 37] |
| **Demo Environment Reset** | Low | [cite_start]Perform data-sensitive tests (like inventory stock changes) immediately after the demo site refresh. [cite: 37] |

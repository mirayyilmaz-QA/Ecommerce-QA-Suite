# Test Plan – E2E Manual Testing 

---

## 1. Objective 
To validate core end-to-end business flows of an e-commerce system, ensuring correct behavior across UI, backend logic, and integrations. 

---

## 2. In Scope 
* Guest checkout with inventory validation 
* Product comparison 
* Configurable product pricing 
* Tiered pricing logic 
* Advanced search & layered navigation 

---

## 3. Out of Scope 
* Performance testing 
* Security testing 
* Real payment gateway integration 

---

## 4. Test Approach 
* Black-box testing 
* E2E scenario-based testing 
* Boundary value and negative testing 
* Conditional logic validation 

---

## 5. Test Environment 
* **URL:** [Magento 2 Commerce (Enterprise) Demo - Magebit](https://magento2-demo.magebit.com/) 
* **Browsers:** Chrome, Firefox (Latest versions). 
* **Device:** Desktop (macOS). 
* **Payment:** Simulated payment gateway 
* **Inventory:** Mock inventory system 

---

## 6. Test Data 
Please check the `Test-Data.md` file for specific SKUs and login details. 

---

## 7. Entry Criteria 
* Stable build deployed 
* Test data available 
* Requirements finalized 

---

## 8. Exit Criteria 
* All high-priority cases executed 
* No open Critical or High severity defects 
* Test Summary Report is completed and reviewed. 

---

## 9. Risks 

| Identified Risk | Potential Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Inventory Race Conditions** | High | Test simultaneous cart updates in multiple browser sessions (Incognito vs. Regular).  |
| **Pricing Calculation Discrepancies** | High | Use a "Price Matrix" (Excel) to manually calculate expected results before verifying on-site.  |
| **Filter/Search Inconsistencies** | Medium | Conduct "Smoke Tests" on search functionality after every site reset/cache clear.  |
| **Demo Environment Reset** | Low | Perform data-sensitive tests (like inventory stock changes) immediately after the demo site refresh.  |


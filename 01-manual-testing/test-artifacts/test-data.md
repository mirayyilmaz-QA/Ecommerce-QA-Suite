# Test Data - Magento E-commerce Project

## 1. Environment URLs
* **Admin Panel:** https://magento2-demo.magebit.com/admin/
* **Storefront URL:** https://magento2-demo.magebit.com/

---

## 2. Administrative Credentials
* **Username:** `magebit`
* **Password:** `demo123`

---

## 3. Test Products
| SKU | Product Name | Category |
| :--- | :--- | :--- |
| **24-MB02** | Fusion Backpack | Gear > Bags |
| **WJ01** | Stellar Solar Jacket | Women > Tops > Jackets |
| **MS11** | Radiant Tee | Men > Tops > Tees |
| **MS08** | Gobi Heat Tee | Men > Tops > Tees |

---

## 4. Customer Personas (Guest & Registered)
The following personas are used to validate different checkout flows and account-based features.

| Detail | Guest User | Registered User |
| :--- | :--- | :--- |
| **Full Name** | Miray Yilmaz | Testy McTester |
| **Email** | guest_tester@example.com | registered_qa@example.com |
| **Address** | 123 Testing Lane, Suite 101 | 456 Bug Street |
| **City/State/Zip** | Austin, TX, 78701 | Los Angeles, CA, 90210 |
| **Phone** | 555-010-9999 | 555-010-8888 |

---

## 5. Payment Information (Industry Standard)
These card numbers are used for testing successful and declined transactions in the Braintree/Stripe sandbox environments.

| Card Type | Card Number | Expiry | CVV |
| :--- | :--- | :--- | :--- |
| **Visa (Success)** | 4111 1111 1111 1111 | 12/2030 | 123 |
| **Mastercard (Success)** | 5105 1051 0510 5105 | 12/2030 | 123 |
| **Visa (Declined)** | 4000 0000 0000 0002 | 12/2030 | 123 |

> **Note:** These are standard dummy test numbers used for demo environments and do not represent real financial data.

---

## 6. Promotion & Discount Codes
Used to validate the "Cart Price Rules" and discount application logic.

| Code | Type | Expected Effect |
| :--- | :--- | :--- |
| **20OFF** | Valid Percentage | 20% discount on subtotal |
| **60OFF** | Expired/Inactive | Error: "The coupon code is not valid." |
| **FREESHIP** | Valid Shipping | Shipping cost becomes $0.00 |

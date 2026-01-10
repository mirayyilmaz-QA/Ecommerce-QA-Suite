
-- SIMULATING QA ACTIONS (DATA MODIFICATION)


-- Action: Simulate purchase of the last item in stock

SELECT * FROM catalog_product_entity;

UPDATE catalog_product_entity
SET qty_in_stock = 0
WHERE sku = 'UA-SPORT-BACKPACK';

SELECT * FROM catalog_product_entity;

-- Action: Simulate a Guest Checkout purchase

SELECT * FROM sales_order;

INSERT INTO sales_order
(customer_id, increment_id, status, grand_total, shipping_method, created_at)
VALUES
(NULL, '1000004', 'complete', 70.0000, 'flatrate_flatrate', '2026-01-11 12:00:00');

-- Action: Simulate a catalog price change to test price mismatch regression 
-- This item was previously bought for $25, but the catalog price is being raised to $75

SELECT * FROM catalog_product_entity;

UPDATE catalog_product_entity
SET price = 75.000
WHERE sku = 'ADIDAS-CAP-WHITE';





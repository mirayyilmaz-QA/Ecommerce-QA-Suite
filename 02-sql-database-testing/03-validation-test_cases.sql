
-- QA VALIDATION QUERIES (TEST CASES)

-- Verify products that are out of stock
SELECT 
    entity_id AS product_id,
    sku,
    name,
    qty_in_stock
FROM catalog_product_entity
WHERE qty_in_stock = 0;

-- Guest Checkout Audit: Orders placed without a registered customer
SELECT
    entity_id AS order_id,
    created_at AS order_date,
    grand_total AS total_amount
FROM sales_order
WHERE customer_id IS NULL;

-- Order price validation: product vs price at purchase
SELECT
    so.entity_id AS order_id,
    soi.name AS product_name,
    soi.price AS price_at_purchase
FROM sales_order_item soi
JOIN sales_order so
ON soi.order_id = so.entity_id;
    
-- Detect price mismatches between catalog and order
SELECT
    so.entity_id AS order_id,
    p.name AS product_name,
    p.price AS current_catalog_price,
    soi.price AS price_paid
FROM sales_order_item soi
JOIN catalog_product_entity p
    ON soi.product_id = p.entity_id
JOIN sales_order so
    ON soi.order_id = so.entity_id
WHERE p.price <> soi.price;





-- PROJECT: E-commerce QA Portfolio - Database Testing Suite

DROP DATABASE IF EXISTS magento_qa_db;
CREATE DATABASE magento_qa_db;
USE magento_qa_db;

CREATE TABLE customer_entity (
    entity_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    PRIMARY KEY (entity_id)
);
INSERT INTO customer_entity (email, firstname, lastname) 
VALUES
('j.doe@example.com', 'John', 'Doe'),
('tech_tester@qa.org', 'Sarah', 'Smith'),
('emma.runner@gmail.com', 'Emma', 'Brown'),
('mike.travels@yahoo.com', 'Mike', 'Johnson'),
('lisa.fitness@outlook.com', 'Lisa', 'Taylor');


CREATE TABLE catalog_product_entity (
    entity_id INT NOT NULL AUTO_INCREMENT,
    sku VARCHAR(64) NOT NULL UNIQUE, 
    name VARCHAR(255) NOT NULL,
    category_path VARCHAR(255),
    price DECIMAL(12,4) NOT NULL,
    qty_in_stock INT DEFAULT 0,
    attribute_set VARCHAR(50), 
    PRIMARY KEY (entity_id)
);
INSERT INTO catalog_product_entity 
(sku, name, category_path, price, qty_in_stock, attribute_set)
VALUES
('NIKE-AIR-MAX-270', 'Nike Air Max 270', 'Apparel > Shoes > Sneakers', 150.0000, 120, 'Apparel'),
('ADIDAS-ULTRABOOST', 'Adidas Ultraboost Running Shoes', 'Apparel > Shoes > Running', 180.0000, 80, 'Apparel'),
('PUMA-HOODIE-BLK', 'Puma Essential Hoodie Black', 'Apparel > Men > Hoodies', 65.0000, 60, 'Apparel'),
('NIKE-DRY-FIT-TEE', 'Nike Dri-FIT Training T-Shirt', 'Apparel > Men > T-Shirts', 35.0000, 200, 'Apparel'),
('UA-SPORT-BACKPACK', 'Under Armour Sport Backpack', 'Gear > Bags > Backpacks', 55.0000, 90, 'Gear'),
('ADIDAS-CAP-WHITE', 'Adidas Baseball Cap White', 'Accessories > Caps', 25.0000, 150, 'Accessories'),
('NIKE-LEGGINGS-W', 'Nike Women Training Leggings', 'Apparel > Women > Leggings', 70.0000, 75, 'Apparel');


CREATE TABLE sales_order (
    entity_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT,
    increment_id VARCHAR(50) NOT NULL UNIQUE, 
    status VARCHAR(20) DEFAULT 'pending',
    grand_total DECIMAL(12,4),
    shipping_method VARCHAR(100),
    created_at DATETIME,
    PRIMARY KEY (entity_id),
    FOREIGN KEY (customer_id) REFERENCES customer_entity(entity_id)
);

INSERT INTO sales_order 
(customer_id, increment_id, status, grand_total, shipping_method, created_at)
VALUES
(1, '1000001', 'processing', 185.0000, 'flatrate_flatrate', '2026-01-08 14:30:00'),
(3, '1000002', 'complete', 215.0000, 'tablerate_bestway', '2026-01-09 10:15:00'),
(4, '1000003', 'pending', 55.0000, 'flatrate_flatrate', '2026-01-10 16:45:00');


CREATE TABLE sales_order_item (
    item_id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    sku VARCHAR(64),
    name VARCHAR(255),
    qty_ordered INT DEFAULT 1,
    price DECIMAL(12,4),
    row_total DECIMAL(12,4), -- qty * price
    PRIMARY KEY (item_id),
    FOREIGN KEY (order_id) REFERENCES sales_order(entity_id),
    FOREIGN KEY (product_id) REFERENCES catalog_product_entity(entity_id)
);

INSERT INTO sales_order_item 
(order_id, product_id, sku, name, qty_ordered, price, row_total)
VALUES
-- Order 1000001
(1, 1, 'NIKE-AIR-MAX-270', 'Nike Air Max 270', 1, 150.0000, 150.0000),
(1, 6, 'ADIDAS-CAP-WHITE', 'Adidas Baseball Cap White', 1, 25.0000, 25.0000),

-- Order 1000002
(2, 2, 'ADIDAS-ULTRABOOST', 'Adidas Ultraboost Running Shoes', 1, 180.0000, 180.0000),
(2, 4, 'NIKE-DRY-FIT-TEE', 'Nike Dri-FIT Training T-Shirt', 1, 35.0000, 35.0000),

-- Order 1000003
(3, 5, 'UA-SPORT-BACKPACK', 'Under Armour Sport Backpack', 1, 55.0000, 55.0000);







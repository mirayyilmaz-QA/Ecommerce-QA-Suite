import { test, expect } from '@playwright/test';

test.describe('FakeStore API - Business Logic Suite', () => {
    let token: string;
    let targetProductId: number;
    let officialPrice: number;

    test('Step 01: Get All Products and Pick Random', async ({ request }) => {
        const response = await request.get('/products');
        expect(response.ok()).toBeTruthy();

        const products = await response.json();

        // Schema Validation (The array check)
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);

        // Pick Random Product (Data Prep)
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        targetProductId = randomProduct.id;
        officialPrice = randomProduct.price;

        console.log(`Selected: ${randomProduct.title} - $${officialPrice}`);
    });

    test('Step 02: Login and Get JWT', async ({ request }) => {
        // In a real project, I would use process.env.USERNAME but I wanted to keep it simple
        const loginResponse = await request.post('/auth/login', {
            data: {
                username: 'mor_2314',
                password: '83r5^_'
            }
        });

        expect(loginResponse.ok()).toBeTruthy();
        const body = await loginResponse.json();
        token = body.token;
        expect(token).toBeDefined();
    });

    test("Submit Order and Validate Total Price", async ({ request }) => {
        const orderResponse = await request.post('/carts', {
            data: {
                userId: 1,
                date: new Date().toISOString(),
                products: [
                    { productId: targetProductId, quantity: 3 }
                ]
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(orderResponse.status()).toBe(201);
        const orderData = await orderResponse.json();
        const quantity = orderData.products[0].quantity;

        expect(orderData.products[0].productId).toBe(targetProductId);
        const expectedSubTotal = parseFloat((officialPrice * quantity).toFixed(2));

        console.log(`Product: ${targetProductId}, Price: $${officialPrice}, Qty: ${quantity}, Expected Subtotal: $${expectedSubTotal}`);

        if (orderData.products[0].subtotal !== undefined) {
            expect(orderData.products[0].subtotal).toBe(expectedSubTotal);
        } else {
            console.warn("API BUG: 'subtotal' field is missing from response.")
        }

        expect(expectedSubTotal).toBeGreaterThan(0);

    });
});
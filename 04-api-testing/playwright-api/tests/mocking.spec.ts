import { test, expect } from '@playwright/test';

test.describe('Network Interception & Mocking', () => {

    test('Simulate 500 Internal Server Error (Resilience Testing)', async ({ page }) => {

        // I force the API to return a 500 error instead of the real products
        await page.route('**/products*', async (route) => {

            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ message: "Simulated Critical Server Crash" })
            });
        });

        // I simulate a frontend trying to fetch the products
        const responseStatus = await page.evaluate(async () => {
            const res = await fetch('https://dummyjson.com/products');
            return res.status;
        });

        // interception successfully hijacked the call
        expect(responseStatus).toBe(500);

    });


    test('Mock Data: Force an Empty Cart State', async ({ page }) => {
        //Intercept the cart fetch request
        await page.route('**/carts/user/**', async (route) => {

            // Overwrite the real database response with fake "Empty Cart" JSON
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    carts: [],
                    total: 0,
                    skip: 0,
                    limit: 0
                })
            });
        });

        // The browser asking for User 1's cart
        const cartData = await page.evaluate(async () => {
            const res = await fetch('https://dummyjson.com/carts/user/1');
            return await res.json();
        });

        // Verify the mock 
        expect(cartData.carts).toHaveLength(0);
        expect(cartData.total).toBe(0);

    });
});
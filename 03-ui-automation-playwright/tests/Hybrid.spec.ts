import { test, expect } from '@playwright/test';
import { PageManager } from '../core/PageManager';
import { createCheckoutData } from '../core/data/dataFactory';

test.describe('Hybrid Tests', () => {
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
    });

    test('Hybrid Validation: UI Addition -> API Backend Check', async () => {
        const checkoutData = createCheckoutData();
        const { base, product, cart, search } = pm;

        await base.goto('/');
        await search.search(checkoutData.product.name);
        await base.waitForPageToSettle();

        await product.configureAndAddToCart(
            checkoutData.product.name,
            checkoutData.product.size,
            checkoutData.product.color,
            checkoutData.product.price
        );

        await expect(async () => {
            const cartData = await cart.getCartDataApi();
            const firstItem = cartData.items[0];

            expect(cartData.summary_count).toBe(1);

            expect(firstItem.product_name).toBe(checkoutData.product.name);

            expect(firstItem.product_price_value).toBe(checkoutData.product.price);

            console.log(`Integrity Confirmed: ${firstItem.product_name} is exactly $${firstItem.product_price_value}`);
        }).toPass({ timeout: 10000 });

    });

});
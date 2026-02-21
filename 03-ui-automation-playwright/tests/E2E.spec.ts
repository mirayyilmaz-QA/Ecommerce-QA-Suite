import { test, expect } from '@playwright/test';
import { PageManager } from '../core/PageManager';
import { Flows } from '../core/Flows';

test.describe('Magento Checkout', () => {

    let pm: PageManager;
    let flows: Flows;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        flows = new Flows(pm);

    });

    test('Guest checkout flow', async () => {

        await flows.guestCheckout();

        await expect(pm.checkout.orderId).toBeVisible({ timeout: 20000 });
        console.log('Guest Order:', await pm.checkout.orderId.textContent());

    });

    test('Registered checkout flow', async () => {

        await flows.registeredCheckout();

        await expect(pm.checkout.orderId).toBeVisible({ timeout: 20000 });
        console.log('Registered Order:', await pm.checkout.orderId.textContent());

    });
});

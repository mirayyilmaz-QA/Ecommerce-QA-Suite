import { test, expect } from '@playwright/test';
import { PageManager } from '../core/PageManager';
import { Flows } from '../core/Flows';

test.describe('Magento Checkout', () => {

    test('Guest checkout flow', async ({ page }) => {
        const pm = new PageManager(page);
        const flows = new Flows(pm);

        await flows.guestCheckout();

        await expect(pm.checkout.orderId).toBeVisible({ timeout: 20000 });
        console.log('Guest Order:', await pm.checkout.orderId.textContent());
    });

    test('Registered checkout flow', async ({ page }) => {
        const pm = new PageManager(page);
        const flows = new Flows(pm);

        await flows.registeredCheckout();

        const orderIdLocator = pm.checkout.orderId;

        await expect(pm.checkout.orderId).toBeVisible({ timeout: 20000 });

        const orderNumber = await orderIdLocator.textContent();
        console.log('Registered Order:', orderNumber?.trim());
        //console.log('Registered Order:', await pm.checkout.orderId.textContent());
    });
});

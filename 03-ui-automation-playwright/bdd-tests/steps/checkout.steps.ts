import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './hooks';
import { PageManager } from '../../core/PageManager';
import { Flows } from '../../core/Flows';


let pm: PageManager;
let flows: Flows;

Given('I navigate to the Magento home page', async function () {
    pm = new PageManager(page);
    flows = new Flows(pm);
    await page.goto('/');
});

When('the user completes the {string} checkout flow', async function (userType: string) {
    if (userType === 'guest') {
        await flows.guestCheckout();
    } else if (userType === 'registered') {
        await flows.registeredCheckout();
    }
});

Then('a success message with an order ID should be displayed', async function () {
    await expect(pm.checkout.orderId).toBeVisible({ timeout: 20000 });
    const orderId = await pm.checkout.orderId.textContent();
    console.log('Order ID created:', orderId);
});
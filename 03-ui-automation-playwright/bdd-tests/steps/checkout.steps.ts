import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './hooks';
import { PageManager } from '../../core/PageManager';
import { Flows } from '../../core/Flows';

let pm: PageManager;
let flows: Flows;

Given('the user is on the Magento store home page', async function () {
    pm = new PageManager(page);
    flows = new Flows(pm);
    await page.goto('/');

});

When('the user completes the guest checkout flow', async function () {
    await flows.guestCheckout();
});

When('the user completes the registered checkout flow', async function () {
    await flows.registeredCheckout();
});

Then('a success message with an order ID should be displayed', async function () {
    await expect(pm.checkout.orderId).toBeVisible({ timeout: 20000 });
    const orderId = await pm.checkout.orderId.textContent();
    console.log('Order ID created:', orderId);
});
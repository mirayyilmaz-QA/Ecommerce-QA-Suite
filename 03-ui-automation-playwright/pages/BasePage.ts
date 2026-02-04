import { Page, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    private readonly loadingMask;

    constructor(page: Page) {
        this.page = page;
        this.loadingMask = this.page.locator('.loader img, .loading-mask');
    }

    async goto(url: string) {
        // 'commit' is faster and less prone to timeout than 'domcontentloaded'
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async openMiniCartAndCheckout() {
        const cartIcon = this.page.locator('.action.showcart');
        const checkoutBtn = this.page.locator('#top-cart-btn-checkout');

        // Wait for potential loading masks to clear before clicking the cart
        await this.page.locator('.loading-mask').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });

        // Magento's cart is stubborn. I use a retry loop to ensure it's open.
        await expect(async () => {
            await cartIcon.click();
            await expect(checkoutBtn).toBeVisible({ timeout: 3000 });
        }).toPass({ intervals: [1000], timeout: 15000 });


        await checkoutBtn.click();
    }

    async waitForPageToSettle() {

        // Wait for loaders to disappear
        await this.loadingMask.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });

        //Wait for the body to be visible and stable
        await this.page.locator('body').waitFor({ state: 'visible' });

        // wait for a specific state indicating page load completion
        await this.page.waitForLoadState('load');
    }


}
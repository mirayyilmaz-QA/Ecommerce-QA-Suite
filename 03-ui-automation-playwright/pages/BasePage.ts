import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        // 'commit' is faster and less prone to timeout than 'domcontentloaded'
        await this.page.goto(url, { waitUntil: 'commit' });
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


        await checkoutBtn.click({ force: true });
    }

    async waitForPageToSettle() {
        const loader = this.page.locator('.loader img, .loading-mask');

        // Wait for loaders to disappear
        await loader.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });

        //Wait for the body to be visible and stable
        await this.page.locator('body').waitFor({ state: 'visible' });

        // wait for a specific 'state' indicator 
        // A short 500ms sleep is more reliable than a 30s networkidle timeout.
        await this.page.waitForTimeout(500);
    }


}
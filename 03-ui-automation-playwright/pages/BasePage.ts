import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    private readonly loadingMask: Locator;
    private readonly cartIcon: Locator;
    private readonly checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loadingMask = this.page.locator('.loader img, .loading-mask');
        this.cartIcon = this.page.locator('.action.showcart');
        this.checkoutBtn = this.page.locator('#top-cart-btn-checkout');
    }

    async goto(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async openMiniCartAndCheckout() {
        // Wait for potential loading masks to clear before clicking the cart
        await this.page.locator('.loading-mask').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });

        // Magento's cart is stubborn/quite flaky, I use a retry loop until checkout visible.
        await expect(async () => {
            await this.cartIcon.click();
            await expect(this.checkoutBtn).toBeVisible({ timeout: 3000 });
        }).toPass({ intervals: [1000], timeout: 15000 });

        await this.checkoutBtn.click();
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
import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private productByName(productName: string): Locator {

        return this.page.locator('.product-item').filter({
            has: this.page.locator('.product-item-link', { hasText: productName })
        });
    }

    //Actions

    async selectSizeAndColor(productName: string, size: string, color: string) {
        const productCard = this.productByName(productName).first();

        await productCard.scrollIntoViewIfNeeded();
        await expect(productCard).toBeVisible({ timeout: 10000 });

        // I use getByText with exact: true to distinguish "S" from "XS"
        const sizeOption = productCard.getByText(size, { exact: true });

        // For color, aria-label is usually safer as it's a unique attribute
        const colorOption = productCard.locator(`.swatch-option.color[aria-label="${color}"]`);

        // Click with force to handle that 'div.columns' interception we saw earlier
        await sizeOption.click({ force: true });
        await colorOption.click({ force: true });
    }


    async addToCart(productName: string) {
        const productCard = this.productByName(productName).first();
        const addToCartBtn = productCard.getByRole('button', { name: /Add to Cart/i });

        // Is the button actually interactive?
        await productCard.hover();
        await expect(addToCartBtn).toBeEnabled({ timeout: 10000 });

        // Listener before the click
        const responsePromise = this.page.waitForResponse(resp =>
            resp.url().includes('checkout/cart/add') && resp.status() === 200,
            { timeout: 20000 }
        );

        // I tried a standard click first. If it fails, then fallback to force.
        try {
            await addToCartBtn.click({ timeout: 5000 });
        } catch (e) {
            await addToCartBtn.click({ force: true });
        }

        // network confirmation
        await responsePromise;

        // success confirmation
        await this.page.locator('.message-success').waitFor({ state: 'visible' });
    }


    async configureAndAddToCart(productName: string, size: string, color: string) {
        await this.selectSizeAndColor(productName, size, color);
        await this.addToCart(productName);
    }
}
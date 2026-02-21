import { Page, Locator, expect } from '@playwright/test';

export class ProductToolBarComponent {
    private readonly sortByDropdown: Locator;
    private readonly directionSwitcher: Locator;

    constructor(private page: Page) {
        this.sortByDropdown = page.locator('#sorter').first();
        this.directionSwitcher = page.locator('.sorter-action').first();
    }

    async sortBy(option: string): Promise<void> {
        await this.sortByDropdown.waitFor({ state: 'visible' });

        // Start waiting for network BEFORE action
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('product_list_order') && response.status() === 200
            ),
            this.sortByDropdown.selectOption(option)
        ]);

        // Wait until products are visible again
        await this.page.locator('.price-wrapper .price').first().waitFor({ state: 'visible' });

    }


    async setSortDirection(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('product_list_dir') &&
                response.status() === 200
            ),
            this.directionSwitcher.click()
        ]);

        await this.page.locator('.price-wrapper .price')
            .first()
            .waitFor({ state: 'visible' });
    }

    async getAllProductPrices(): Promise<number[]> {

        await this.page.locator('.loader img')
            .waitFor({ state: 'hidden', timeout: 5000 })
            .catch(() => { });

        const priceElements = this.page.locator('.price-wrapper .price');
        await priceElements.first().waitFor({ state: 'visible' });

        const priceTexts = await priceElements.allTextContents();

        return priceTexts.map(text =>
            parseFloat(text.replace(/[^0-9.]+/g, ''))
        );
    }

    async verifyPriceSorting(direction: 'asc' | 'desc'): Promise<void> {
        const prices = await this.getAllProductPrices();
        expect(prices.length).toBeGreaterThan(1); //There are prices to compare

        const sortedPrices = [...prices].sort((a, b) =>
            direction === 'desc' ? b - a : a - b
        );

        expect.soft(
            prices,
            `Prices to be sorted by price in ${direction} order`
        ).toEqual(sortedPrices);

    }


}    
import { Page, Locator } from '@playwright/test';

export class SearchComponent {
    private page: Page;
    private searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search');
    }

    async search(productName: string) {
        await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');

        // Wait for product grid page
        await this.page.waitForSelector('.products-grid', { timeout: 15000 });
    }
}

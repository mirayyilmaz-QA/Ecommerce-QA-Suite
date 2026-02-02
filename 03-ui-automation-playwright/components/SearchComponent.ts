import { Page, Locator } from '@playwright/test';

export class SearchComponent {
    private page: Page;
    private searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search');
    }

    async search(productName: string): Promise<void> {
        await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');

        // Wait for product grid page, if no-result: added css class for "no result" container
        await this.page.waitForSelector('.products-grid, .message.notice', { timeout: 15000 });

        //await this.page.locator('.products-grid').waitFor({ state: 'visible' }); flaky
    }
}

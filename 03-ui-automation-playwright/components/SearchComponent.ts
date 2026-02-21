import { Page, Locator, expect } from '@playwright/test';

export class SearchComponent {
    private page: Page;
    private searchInput: Locator;
    private messageNotice: Locator;
    // Magento's "no results" message has a unique class, I target it directly.

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search');
        this.messageNotice = page.locator('.message.notice');

    }

    async search(productName: string): Promise<void> {

        await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
        await this.page.locator('.products-grid, .message.notice').waitFor({ state: 'visible' });
        // Wait for product grid page, if no-result; css class for "no result" container added.

    }


    async expectNoResultsMessage(): Promise<void> {

        await expect(this.messageNotice).toBeVisible({ timeout: 10000 });
        await expect(this.messageNotice).toContainText('Your search returned no results.');
    }


}

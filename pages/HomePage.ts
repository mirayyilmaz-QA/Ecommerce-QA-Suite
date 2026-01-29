import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/');
    }

    async searchProduct(productName: string) {
        await this.page.fill('#search', productName);
        await this.page.press('#search', 'Enter');
    }

    async openCreateAccount() {
        await this.page.click('text=Create an Account');
    }
}
import { Locator, Page } from '@playwright/test';

export class HomePage {

    private readonly marketingBanners: Record<string, Locator>;

    constructor(private page: Page) {

        this.marketingBanners = {
            performance: page.getByText('Science meets performance'),
            founder: page.getByText('Take it from Erin'),
            newCollection: page.getByText('New Luma Yoga Collection')
        };

    }


    async goto() {
        await this.page.goto('/');
    }


    async openCreateAccount() {
        await this.page.click('text=Create an Account');
    }


    async clickMarketingBanners(bannerName: 'performance' | 'founder' | 'newCollection'): Promise<void> {

        const banner = this.marketingBanners[bannerName];

        if (!banner) {
            throw new Error(`Marketing banner '${bannerName}' not found`);
        }

        await banner.waitFor({ state: 'visible' });
        await banner.click();
        await this.page.waitForLoadState('load');

    }


    async validateMarketingBanner(banners: Array<{ name: any, urlPattern: RegExp }>): Promise<void> {

        for (const banner of banners) {
            await this.clickMarketingBanners(banner.name);
            await this.page.waitForURL(banner.urlPattern, { timeout: 10000 });
            await this.goto();

        }

    }


}
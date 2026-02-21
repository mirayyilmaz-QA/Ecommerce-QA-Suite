import { test } from '@playwright/test';
import { PageManager } from '../core/PageManager';

test.describe('Search and Navigation', () => {
    let pm: PageManager;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page);
        await pm.home.goto();
    });

    test('Show "No Results" for invalid searches', async () => {

        await pm.search.search('NonExistentProduct123');
        await pm.search.expectNoResultsMessage();

    });

    test('Marketing Banners Validations', async () => {

        const banners = [
            { name: 'performance', urlPattern: /collections\/performance-fabrics/ },
            { name: 'founder', urlPattern: /collections\/erin-recommends/ },
            { name: 'newCollection', urlPattern: /collections\/yoga-new/ }
        ]
        await pm.home.validateMarketingBanner(banners);


    });

    test('Price sorting should work in both ASC and DESC directions', async () => {
        test.fail(true, 'Regression: Sorting logic fails. See Issue #4 for details.');
        await pm.home.clickMarketingBanners('performance');

        await pm.productToolBar.sortBy('price'); // sort by price, default is asc
        await pm.productToolBar.verifyPriceSorting('asc');

        await pm.productToolBar.setSortDirection();
        await pm.productToolBar.verifyPriceSorting('desc');


    });


});
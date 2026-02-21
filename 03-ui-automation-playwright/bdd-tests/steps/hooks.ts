import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';


setDefaultTimeout(30000);

// These are shared variables
export let browser: Browser;
export let page: Page;
let context: BrowserContext;

BeforeAll(async function () {
    // Launch browser once for the whole test suite to save time
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    // Create a fresh tab (context) for every single scenario
    context = await browser.newContext({
        baseURL: 'https://magento2-demo.magebit.com/'

    });
    page = await context.newPage();
});

After(async function () {
    // Clean up after the scenario is done
    await page.close();
    await context.close();
});

AfterAll(async function () {
    // Close the browser entirely at the end
    await browser.close();
});
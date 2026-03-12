import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';


setDefaultTimeout(30000);


export let browser: Browser;
export let page: Page;
let context: BrowserContext;

BeforeAll(async function () {

    const isCI = process.env.CI === 'true';
    browser = await chromium.launch({
        headless: isCI
    });
});

Before(async function () {

    context = await browser.newContext({
        baseURL: 'https://magento2-demo.magebit.com/'

    });
    page = await context.newPage();
});

After(async function () {

    await page.close();
    await context.close();
});

AfterAll(async function () {

    await browser.close();
});
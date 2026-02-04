import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// Data Model:
export interface ShippingDetails {
    email?: string;
    fName?: string;
    lName?: string;
    street: string;
    country: string;
    region: string;
    city: string;
    zip: string;
    phone: string;
}



export class CheckoutPage extends BasePage {


    private readonly loadingOverlay: Locator;

    private readonly emailInput: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly street0: Locator;
    private readonly city: Locator;
    private readonly postcode: Locator;
    private readonly telephone: Locator;

    private readonly nextBtn: Locator;
    private readonly placeOrderBtn: Locator;
    readonly orderId: Locator;

    constructor(page: Page) {
        super(page);

        // Magento has multiple loaders → scope first
        this.loadingOverlay = page.locator('.loading-mask').first();

        // Guest email
        this.emailInput = page.locator('#customer-email-fieldset #customer-email');

        // Shipping form
        this.firstName = page.locator('[name="firstname"]');
        this.lastName = page.locator('[name="lastname"]');
        this.street0 = page.locator('[name="street[0]"]');
        this.city = page.locator('[name="city"]');
        this.postcode = page.locator('[name="postcode"]');
        this.telephone = page.locator('[name="telephone"]');

        // Actions
        this.nextBtn = page.getByRole('button', { name: 'Next' });
        this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });

        // Success
        this.orderId = page.locator('.checkout-success span, .checkout-success strong').first();
    }

    //State Guards

    private async waitForMagentoReady() {
        await this.loadingOverlay.waitFor({ state: 'hidden', timeout: 15000 });
    }

    private async isGuestUser(): Promise<boolean> {
        try {
            return await this.emailInput.isVisible({ timeout: 5000 });
        } catch {
            return false;
        }
    }

    //Actions

    async fillShippingDetails(details: ShippingDetails) {

        //To overcome firefox from looking for #shipping on previous page

        await expect(this.page).toHaveURL(/checkout\/#/i, { timeout: 10000 });

        //Wait for the checkout container 
        await this.page.waitForSelector('#shipping', { state: 'visible' });
        await this.waitForMagentoReady();

        // Guest Detection 
        if (await this.isGuestUser()) {
            if (details.email) {
                await this.emailInput.fill(details.email);
                // Magento's Knockout.js needs a blur or delay to register the email
                await this.emailInput.blur();
            }
        }

        // Name Fields 
        // Only fill if empty (Registered user has these pre-filled)
        if (await this.firstName.isVisible()) {
            const currentVal = await this.firstName.inputValue();
            if (!currentVal && details.fName && details.lName) {
                await this.firstName.fill(details.fName);
                await this.lastName.fill(details.lName);
            }
        }

        //Address & Country
        await this.street0.fill(details.street);
        await this.page.selectOption('select[name="country_id"]', details.country);


        await this.waitForMagentoReady();

        //Region Handling 
        const regionSelect = this.page.locator('select[name="region_id"]');
        if (await regionSelect.isVisible({ timeout: 3000 })) {
            await regionSelect.selectOption({ label: details.region });
        } else {
            await this.page.locator('input[name="region"]').fill(details.region);
        }

        // Remaining Fields 
        await this.city.fill(details.city);
        await this.postcode.fill(details.zip);
        await this.telephone.fill(details.phone);

        //Shipping Method: Wait for at least one shipping method to be available  
        const shippingRadio = this.page.locator('.table-checkout-shipping-method input[type="radio"]').first();
        await shippingRadio.waitFor({ state: 'visible', timeout: 10000 });


        // I use expect().toPass() to retry the click if the site "flickers"
        await expect(async () => {
            await shippingRadio.check({ force: true }); // I try to check it

            // To verify it stayed checked. If this fails, the loop runs again until it passes or times out.
            await expect(shippingRadio).toBeChecked({ timeout: 1000 });
        }).toPass({
            intervals: [500], // Wait 500ms between attempts
            timeout: 10000    // Give up after 10 seconds
        });

        await this.waitForMagentoReady();
    }

    async completeCheckout() {

        await this.waitForMagentoReady(); ////loaders are gone before we even look at 'Next'

        await expect(async () => {
            await this.nextBtn.scrollIntoViewIfNeeded(); //helps Firefox
            await expect(this.nextBtn).toBeEnabled({ timeout: 2000 });

            await this.nextBtn.click();

            await expect(this.placeOrderBtn).toBeVisible({ timeout: 5000 });
        }).toPass({
            intervals: [2000],
            timeout: 15000
        });

        await this.waitForMagentoReady();
        await this.placeOrderBtn.click();

        // Wait for order confirmation
        await expect(this.orderId).toBeVisible({ timeout: 20000 });

    }

}

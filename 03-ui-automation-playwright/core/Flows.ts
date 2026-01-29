import { PageManager } from "./PageManager";
import { createCheckoutData } from '../core/data/dataFactory';

export class Flows {
    constructor(private pm: PageManager) { }

    async guestCheckout() {
        const { base, product, checkout } = this.pm;
        const checkoutData = createCheckoutData();

        await base.goto('/');
        await this.pm.search.search(checkoutData.product.name);

        //Wait for the search results to physically appear and settle
        await base.waitForPageToSettle();

        await product.configureAndAddToCart(
            checkoutData.product.name,
            checkoutData.product.size,
            checkoutData.product.color
        );

        await base.openMiniCartAndCheckout();
        await checkout.fillShippingDetails(checkoutData.guest.shipping);
        await checkout.completeCheckout();
    }

    async registeredCheckout() {
        const { home, base, product, checkout, account } = this.pm;
        const checkoutData = createCheckoutData();

        await base.goto('/');
        await home.openCreateAccount();

        //Create account usually involves a form submit and a redirect
        await account.createAccount(checkoutData.registered.account);

        //Ensure we are fully logged in and the 'My Account' dashboard is ready
        await base.waitForPageToSettle();

        await this.pm.search.search(checkoutData.product.name);

        //Again, wait for search results to be stable
        await base.waitForPageToSettle();

        await product.configureAndAddToCart(
            checkoutData.product.name,
            checkoutData.product.size,
            checkoutData.product.color
        );

        await base.openMiniCartAndCheckout();
        await checkout.fillShippingDetails(checkoutData.registered.shipping);
        await checkout.completeCheckout();
    }
}

import { Page } from '@playwright/test';

export class CartComponent {

    constructor(private page: Page) { }

    async getCartDataApi(): Promise<any> {
        const response = await this.page.request.get('/customer/section/load/?sections=cart');
        const body = await response.json();

        return body.cart || {};


    }

}
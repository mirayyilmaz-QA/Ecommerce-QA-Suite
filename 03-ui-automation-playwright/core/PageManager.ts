import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AccountPage } from '../pages/AccountPage';
import { SearchComponent } from '../components/SearchComponent';

export class PageManager {

    private readonly page: Page;

    private _basePage?: BasePage;
    private _homePage?: HomePage;
    private _productPage?: ProductPage;
    private _checkoutPage?: CheckoutPage;
    private _accountPage?: AccountPage;
    private _searchComponent?: SearchComponent;

    constructor(page: Page) {
        this.page = page;
    }

    get base() {
        if (!this._basePage) this._basePage = new BasePage(this.page);
        return this._basePage;
    }

    get home() {
        if (!this._homePage) this._homePage = new HomePage(this.page);
        return this._homePage;

    }

    get product() {
        if (!this._productPage) this._productPage = new ProductPage(this.page);
        return this._productPage;
    }

    get checkout() {
        if (!this._checkoutPage) this._checkoutPage = new CheckoutPage(this.page);
        return this._checkoutPage;
    }

    get account() {
        if (!this._accountPage) this._accountPage = new AccountPage(this.page);
        return this._accountPage;
    }

    get search() {
        if (!this._searchComponent) this._searchComponent = new SearchComponent(this.page);
        return this._searchComponent
    }

}
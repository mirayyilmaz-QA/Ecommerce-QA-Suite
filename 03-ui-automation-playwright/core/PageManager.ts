import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AccountPage } from '../pages/AccountPage';
import { SearchComponent } from '../components/SearchComponent';
import { ProductToolBarComponent } from '../components/ProductToolBarComponent';
import { CartComponent } from '../components/CartComponent';

export class PageManager {

    private readonly page: Page;

    private _basePage?: BasePage;
    private _homePage?: HomePage;
    private _productPage?: ProductPage;
    private _checkoutPage?: CheckoutPage;
    private _accountPage?: AccountPage;
    private _searchComponent?: SearchComponent;
    private _productToolBarComponent?: ProductToolBarComponent;
    private _cartComponent?: CartComponent;


    constructor(page: Page) {
        this.page = page;
    }

    get base(): BasePage {
        if (!this._basePage) this._basePage = new BasePage(this.page);
        return this._basePage;
    }

    get home(): HomePage {
        if (!this._homePage) this._homePage = new HomePage(this.page);
        return this._homePage;

    }

    get product(): ProductPage {
        if (!this._productPage) this._productPage = new ProductPage(this.page);
        return this._productPage;
    }

    get checkout(): CheckoutPage {
        if (!this._checkoutPage) this._checkoutPage = new CheckoutPage(this.page);
        return this._checkoutPage;
    }

    get account(): AccountPage {
        if (!this._accountPage) this._accountPage = new AccountPage(this.page);
        return this._accountPage;
    }

    get search(): SearchComponent {
        if (!this._searchComponent) this._searchComponent = new SearchComponent(this.page);
        return this._searchComponent
    }

    get productToolBar(): ProductToolBarComponent {
        if (!this._productToolBarComponent) this._productToolBarComponent = new ProductToolBarComponent(this.page);
        return this._productToolBarComponent;
    }

    get cart(): CartComponent {
        if (!this._cartComponent) this._cartComponent = new CartComponent(this.page);
        return this._cartComponent;
    }

}
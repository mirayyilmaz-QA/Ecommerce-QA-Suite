import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/* ----------- Data Model ----------- */

export interface AccountData {
    fName: string;
    lName: string;
    email: string;
    password: string;
}

export class AccountPage extends BasePage {

    private readonly registrationForm: Locator;

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly createAccountBtn: Locator;

    constructor(page: Page) {
        super(page);

        // Scoped form → avoids Magento DOM ambiguity
        this.registrationForm = page.locator('#form-validate');

        this.firstNameInput = this.registrationForm.getByLabel('First Name');
        this.lastNameInput = this.registrationForm.getByLabel('Last Name');
        this.emailInput = this.registrationForm.getByLabel('Email');

        // Direct IDs to avoid multi-password ambiguity
        this.passwordInput = this.registrationForm.locator('#password');
        this.confirmPasswordInput = this.registrationForm.locator('#password-confirmation');

        this.createAccountBtn = this.registrationForm.getByRole('button', { name: 'Create an Account' });
    }

    //State Guards

    private async waitForFormReady() {
        await this.registrationForm.waitFor({ state: 'visible' });
    }

    //Actions:

    async createAccount(user: AccountData) {

        await this.waitForFormReady();

        await this.firstNameInput.fill(user.fName);
        await this.lastNameInput.fill(user.lName);
        await this.emailInput.fill(user.email);

        // Wake JS validation bindings
        await this.passwordInput.click();
        await this.passwordInput.fill(user.password);

        await this.confirmPasswordInput.click();
        await this.confirmPasswordInput.fill(user.password);

        await this.createAccountBtn.click();


    }
}

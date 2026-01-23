import { Locator, Page } from '@playwright/test';
import { LoginConstants } from './login-constants';

export class LoginLocators {
    public userNameInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;
    public loginModal: Locator;

    constructor(private page: Page) {
        this.userNameInput = this.page.locator('#loginusername');
        this.passwordInput = this.page.locator('#loginpassword');
        this.loginButton = this.page.getByRole('button', { name: LoginConstants.loginButton });
        this.loginModal = this.page.locator('#logInModal');
    }
}

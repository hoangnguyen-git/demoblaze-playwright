import { Locator, Page } from '@playwright/test';
import { CommonConstants } from './common-constants';

export class CommonLocators {
    public logo: Locator;
    public welcome: Locator;

    constructor(private page: Page) {
        this.logo = this.page.getByRole('link', { name: CommonConstants.productStore });
        this.welcome = this.page.locator('#nameofuser');
    }
}

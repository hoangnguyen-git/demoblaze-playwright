import { Page } from '@playwright/test';
import { CommonLocators } from './common-locators';

export class CommonPage {
    public page: Page;
    public commonLocators: CommonLocators;

    constructor(page: Page) {
        this.page = page;
        this.commonLocators = new CommonLocators(page);
    }

    /**
   * Open menu by clicking on the menu button
   * @param menu
   */
    async openMenu(menu: string, isExact: boolean = true): Promise<void> {
        const menuLocator = this.page.getByRole('link', { name: menu, exact: isExact });
        await menuLocator.click();
        await this.page.waitForLoadState();
    }

    /**
   * Wait for seconds
   * @param seconds
   */
    async waitForSeconds(seconds: number): Promise<void> {
        await this.page.waitForTimeout(seconds * 1000);
    }
}

import { Page } from '@playwright/test';
import { step } from '../../utilities/logging';
import { HomeLocators } from './home-locators';
import { CommonPage } from '../common-page/common-page';
import { expect } from '../base-page';
import { CommonConstants } from '../common-page/common-constants';
import { HomeConstants } from './home-constants';

export class HomePage extends CommonPage {
    public locators: HomeLocators;

    constructor(page: Page) {
        super(page);
        this.locators = new HomeLocators(page);
    }

    /**
     * Clicks on the specified category.
     * @param category
     */
    @step('Click on category')
    async clickCategory(category: string): Promise<void> {
        await this.locators.lnkCategory(category).click();
        await this.page.waitForLoadState();
    }

    /**
     * Gets all product names displayed on the home page.
     * @returns Array of product names.
     */
    @step('Get all product names')
    async getAllProductNames(): Promise<string[]> {
        await this.locators.allProductNames.last().waitFor();
        return this.locators.allProductNames.allTextContents();
    }

    /**
     * Click on Next button.
     */
    @step('Click on Next button')
    async clickNextButton(): Promise<void> {
        await this.locators.nextButton.click();
        await this.page.waitForLoadState();
    }

    /**
     * Click on Previous button.
     */
    @step('Click on Previous button')
    async clickPreviousButton(): Promise<void> {
        await this.locators.previousButton.click();
        await this.page.waitForLoadState();
    }

    /**
     * Selects a product by name.
     * @param name The name of the product to select.
     */
    @step('Select product by name')
    async selectProduct(name: string): Promise<void> {
        await this.locators.productName(name).click();
        await expect(this.locators.addToCartButton).toBeVisible();
    }

    /**
     * Adds the selected product to the cart.
     * */
    @step('Add product to cart')
    async addToCart(): Promise<void> {
        this.page.once('dialog', dialog => dialog.accept());
        await this.locators.addToCartButton.click();
    }

    /**
     * Navigate back to home page
     */
    @step('Navigate back to home page')
    async backToHome(): Promise<void> {
        await this.openMenu(CommonConstants.menuNames.home, false);
        await expect(this.locators.lnkCategory(HomeConstants.phones)).toBeVisible();
    }
}

import { Page } from '@playwright/test';
import { step } from '../../utilities/logging';
import { HomeLocators } from './home-locators';
import { CommonPage } from '../common-page/common-page';

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
    await this.waitForSeconds(2);
  }

  /**
   * Gets all product names displayed on the home page.
   * @returns Array of product names.
   */
  @step('Get all product names')
  async getAllProductNames(): Promise<string[]> {
    return this.locators.allProductNames.allTextContents();
  }

  /**
   * Click on Next button.
   */
  @step('Click on Next button')
  async clickNextButton(): Promise<void> {
    await this.locators.nextButton.click();
    await this.page.waitForLoadState();
    await this.waitForSeconds(2);
  }

  /**
   * Click on Previous button.
   */
  @step('Click on Previous button')
  async clickPreviousButton(): Promise<void> {
    await this.locators.previousButton.click();
    await this.page.waitForLoadState();
    await this.waitForSeconds(2);
  }
}

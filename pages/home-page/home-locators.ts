import { Locator, Page } from '@playwright/test';

export class HomeLocators {
  public lnkCategory: (categoryName: string) => Locator;
  public allProductNames: Locator;
  public nextButton: Locator;
  public previousButton: Locator;

  constructor(private page: Page) {
    this.lnkCategory = (categoryName: string): Locator => this.page.getByRole('link', { name: categoryName });
    this.allProductNames = this.page.locator('.card-title a');
    this.nextButton = this.page.locator('#next2');
    this.previousButton = this.page.locator('#prev2');
  }
}

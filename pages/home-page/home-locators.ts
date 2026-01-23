import { Locator, Page } from '@playwright/test';
import { HomeConstants } from './home-constants';

export class HomeLocators {
  public lnkCategory: (categoryName: string) => Locator;
  public allProductNames: Locator;
  public nextButton: Locator;
  public previousButton: Locator;
  public productName: (productName: string) => Locator;
  public addToCartButton: Locator;

  constructor(private page: Page) {
    this.lnkCategory = (categoryName: string): Locator => this.page.getByRole('link', { name: categoryName });
    this.allProductNames = this.page.locator('.card-title a');
    this.nextButton = this.page.locator('#next2');
    this.previousButton = this.page.locator('#prev2');
    this.productName = (productName: string): Locator => this.page.getByText(productName, { exact: true });
    this.addToCartButton = this.page.getByRole('link', { name: HomeConstants.addToCart } );
  }
}

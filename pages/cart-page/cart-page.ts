import { Page } from '@playwright/test';
import { step } from '../../utilities/logging';
import { CommonPage } from '../common-page/common-page';
import { CartLocators } from './cart-locators';
import { CommonConstants } from '../common-page/common-constants';
import { expect } from '../base-page';
import { OrderInfo } from '../../modal/order';

export class CartPage extends CommonPage {
    public locators: CartLocators;

    constructor(page: Page) {
        super(page);
        this.locators = new CartLocators(page);
    }

  /**
   * Open cart page
   */
  @step('Open cart page')
    async openCart(): Promise<void> {
        await this.openMenu(CommonConstants.menuNames.cart);
        await expect(this.page).toHaveURL(/cart.html/);
        await expect(this.locators.btnPlaceOrder).toBeVisible();
    }

  /**
   * Get product list in cart
   */
  @step('Get product list in cart')
  async getAllProductsInCart(): Promise<string[]> {
      return await this.locators.cartRows.allTextContents();
  }

  /**
   * Delete item by product name from cart
   * @param name
   */
  @step('Delete item by product name from cart')
  async deleteItemByName(name: string): Promise<void> {
      await this.locators.deleteProductButton(name).click();
      await this.page.waitForLoadState();
      await this.locators.deleteProductButton(name).waitFor({ state: 'hidden' });
  }

  /**
   * Click on Place Order button
   */
  @step('Click on Place Order button')
  async clickPlaceOrderButton(): Promise<void> {
      await this.locators.btnPlaceOrder.click();
      await expect(this.locators.orderModal).toBeVisible();
  }

  /**
 * Click on Purchase button
 */
  @step('Click on Purchase button')
  async clickPurchaseButton(): Promise<void> {
      await this.locators.btnPurchase.click({ force: true });
  }

  /**
   * Place order with provided information
   * @param orderData
   */
  @step('Place order with provided information')
  async placeOrder(orderData: OrderInfo): Promise<void> {
      await this.locators.name.fill(orderData.name);
      await this.locators.country.fill(orderData.country);
      await this.locators.city.fill(orderData.city);
      await this.locators.creditCard.fill(orderData.card);
      await this.locators.month.fill(orderData.month);
      await this.locators.year.fill(orderData.year);
      await this.clickPurchaseButton();
  }

  /**
   * Click on Ok button in order confirmation modal
   */
  @step('Click on Ok button in order confirmation modal')
  async clickOkButton(): Promise<void> {
      await this.locators.okButton.click({ force: true });
      await this.locators.okButton.waitFor({ state: 'hidden' });
  }

  /**
   * Click on Close button in order confirmation modal
   */
  @step('Click on Close button in order confirmation modal')
  async clickCloseButton(): Promise<void> {
      await this.locators.closeButton.click({ force: true });
      await this.locators.closeButton.waitFor({ state: 'hidden' });
  }
}

import { Locator, Page } from '@playwright/test';
import { CartConstants } from './cart-constants';

export class CartLocators {
  public btnPlaceOrder: Locator;
  public cartRows: Locator;
  public deleteProductButton: (productName: string) => Locator;
  public orderModal: Locator;
  public name: Locator;
  public country: Locator;
  public city: Locator;
  public creditCard: Locator;
  public month: Locator;
  public year: Locator;
  public btnPurchase: Locator;
  public thankYouMessage: Locator;
  public okButton: Locator;
  public closeButton: Locator;

  constructor(private page: Page) {
    this.btnPlaceOrder = this.page.getByRole('button', { name: CartConstants.placeOrder });
    this.cartRows = this.page.locator('tbody tr');
    this.deleteProductButton = (productName: string): Locator => this.page.locator(`tr:has-text("${productName}")`).locator('td a').filter({ hasText: CartConstants.delete });
    this.orderModal = this.page.locator('#orderModal');
    this.name = this.page.locator('#name');
    this.country = this.page.locator('#country');
    this.city = this.page.locator('#city');
    this.creditCard = this.page.locator('#card');
    this.month = this.page.locator('#month');
    this.year = this.page.locator('#year');
    this.btnPurchase = this.page.getByRole('button', { name: CartConstants.purchase });
    this.thankYouMessage = this.page.getByRole('heading', { name: CartConstants.thankYouMessage });
    this.okButton = this.page.getByRole('button', { name: CartConstants.ok }); 
    this.closeButton = this.orderModal.locator('div.modal-footer').getByRole('button', { name: CartConstants.close }); 
  }
}

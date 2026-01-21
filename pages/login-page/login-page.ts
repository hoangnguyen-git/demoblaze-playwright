import { expect, Page } from '@playwright/test';
import { LoginLocators } from './login-locators';
import { step } from '../../utilities/logging';
import { CommonPage } from '../common-page/common-page';
import { CommonConstants } from '../common-page/common-constants';
import { Constants } from '../../utilities/constants';

export class LoginPage extends CommonPage {
  public locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  /**
   * Navigates to the login page.
   */
  @step('Navigate to the page')
  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveTitle(/STORE/);
    await expect(this.commonLocators.logo).toBeVisible();
  }

  /**
   * Click on Login button on the menu.
   */
  @step('Click on Login button')
  async clickLoginOnMenuBar(): Promise<void> {
    await this.openMenu(CommonConstants.menuNames.login);
  }

  /**
   * Logs in the user with the provided credentials.
   * @param username
   * @param password
   */
  @step('Enter username, password and login')
  async login(username: string, password: string): Promise<void> {
    await this.locators.userNameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
  }

  /**
   * Navigates to the login page and logs in with the provided credentials.
   * @param username
   * @param password
   */
  @step('Navigate and login with valid credentials')
  async navigateAndLogin(username: string = Constants.USERNAME, password: string = Constants.PASSWORD): Promise<void> {
    await this.goto();
    await this.clickLoginOnMenuBar();
    await this.login(username, password);
  }
}

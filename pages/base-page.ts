import { ApiAction } from './../api/api-action';
import { expect as baseExpect, test as baseTest } from '@playwright/test';
import { LoginPage } from './login-page/login-page';
import { CommonPage } from './common-page/common-page';
import { ApiHelper } from '../api/api-helper';
import { HomePage } from './home-page/home-page';
import { CartPage } from './cart-page/cart-page';

export const test = baseTest.extend<{
    apiHelper: ApiHelper;
    commonPage: CommonPage;
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage;
    apiAction: ApiAction;
}>({
    apiHelper: async ({ request }, use) => {
        await use(new ApiHelper(request));
    },
    apiAction: async ({ apiHelper }, use) => {
        await use(new ApiAction(apiHelper));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

export const expect = baseExpect;

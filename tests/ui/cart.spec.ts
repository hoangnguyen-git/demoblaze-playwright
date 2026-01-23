import { orderData } from './../../data/order-data';
import { OrderInfo } from './../../modal/order';
import { expect, test } from '../../pages/base-page';
import { Utility } from '../../utilities/utils';
import { CartConstants } from '../../pages/cart-page/cart-constants';

test.describe('Cart feature', {
    tag: ['@cart', '@regression'],
}, () => {
    test.describe.configure({ mode: 'parallel' });

    test.beforeEach('Login', async ({ page, loginPage }) => {
        await loginPage.navigateAndLogin();
    });

    test.afterEach('Clear local storage', async ({ apiAction }) => {
        await apiAction.clearCart();
    });

    test('Add single product to cart and validate', {
        tag: ['@smoke'],
    }, async ({ homePage, cartPage, apiAction }) => {
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify phone products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        const selectedProduct = Utility.getRandomElement(productNames);
        await homePage.selectProduct(selectedProduct);
        await homePage.addToCart();

        await cartPage.openCart();
        await test.step('Verify product is added to cart', async () => {
            await expect(cartPage.locators.cartRows).toHaveCount(1);
            await expect(cartPage.locators.cartRows).toContainText(selectedProduct);
        });
    });

    test('Add multiple products and validate cart count', async ({ homePage, cartPage }) => {
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify phone products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        const selectedProduct1 = Utility.getRandomElement(productNames);
        await homePage.selectProduct(selectedProduct1);
        await homePage.addToCart();
        await homePage.backToHome();

        const selectedProduct2 = Utility.getRandomElement(productNames);
        await homePage.selectProduct(selectedProduct2);
        await homePage.addToCart();

        await cartPage.openCart();
        await test.step('Verify product is added to cart', async () => {
            await expect(cartPage.locators.cartRows).toHaveCount(2);
            const allProductNames = await cartPage.getAllProductsInCart();
            expect(allProductNames).toContainEqual(
                expect.stringContaining(selectedProduct1)
            );
            expect(allProductNames).toContainEqual(
                expect.stringContaining(selectedProduct2)
            );
        });
    });

    test('Delete product from cart', {
        tag: ['@smoke'],
    }, async ({ homePage, cartPage, apiAction }) => {
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify phone products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        const selectedProduct = Utility.getRandomElement(productNames);
        await homePage.selectProduct(selectedProduct);
        await homePage.addToCart();

        await cartPage.openCart();
        await test.step('Verify product is added to cart', async () => {
            await expect(cartPage.locators.cartRows).toHaveCount(1);
            await expect(cartPage.locators.cartRows).toContainText(selectedProduct);
        });

        await cartPage.deleteItemByName(selectedProduct);
        await test.step('Verify product is deleted from cart', async () => {
            await expect(cartPage.locators.cartRows).toHaveCount(0);
        });
    });

    test('Place order successfully', {
        tag: ['@smoke'],
    }, async ({ homePage, cartPage, apiAction }) => {
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify phone products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        const selectedProduct = Utility.getRandomElement(productNames);
        await homePage.selectProduct(selectedProduct);
        await homePage.addToCart();

        await cartPage.openCart();
        await test.step('Verify product is added to cart', async () => {
            await expect(cartPage.locators.cartRows).toHaveCount(1);
            await expect(cartPage.locators.cartRows).toContainText(selectedProduct);
        });

        await cartPage.clickPlaceOrderButton();
        await cartPage.placeOrder(orderData as OrderInfo);
        await test.step('Verify order is placed successfully', async () => {
            await expect(cartPage.locators.thankYouMessage).toBeVisible();
        });

        await cartPage.clickOkButton();
        await cartPage.clickCloseButton();
        await cartPage.openCart();
        await cartPage.page.reload();
        await test.step('Verify cart is empty after placing order', async () => {
            await expect(cartPage.locators.cartRows).toHaveCount(0);
        });
    });

    test('Edge Case: Place order with empty form', async ({ homePage, cartPage, apiAction }) => {
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify phone products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        const selectedProduct = Utility.getRandomElement(productNames);
        await homePage.selectProduct(selectedProduct);
        await homePage.addToCart();

        await cartPage.openCart();
        await test.step('Verify product is added to cart', async () => {
            await expect(cartPage.locators.cartRows).toHaveCount(1);
            await expect(cartPage.locators.cartRows).toContainText(selectedProduct);
        });

        await cartPage.clickPlaceOrderButton();
        await cartPage.clickPurchaseButton();
        await test.step('Verify alert is shown for empty form submission', async () => {
            cartPage.page.once('dialog', async dialog => {
                expect(dialog.message()).toContain(CartConstants.emptyFormMessage);
                await dialog.accept();
            });
        });
    });
});
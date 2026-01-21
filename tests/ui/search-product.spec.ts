import { expect, test } from '../../pages/base-page';
import { HomeConstants } from '../../pages/home-page/home-constants';

test.describe('Search product', {
    tag: ['@search-product', '@regression'],
}, () => {
    test.describe.configure({ mode: 'parallel' });

    test('Search using Phone category', {
        tag: ['@smoke'],
    }, async ({ loginPage, homePage }) => {
        await loginPage.navigateAndLogin();
        await homePage.clickCategory(HomeConstants.phones);
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify phone products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        await test.step('Verify all product names are valid as phones', async () => {
            for (const name of productNames) {
                const lowerName = name.toLowerCase();
                const isPhone = HomeConstants.phoneKeywords.some((k) => lowerName.includes(k));
                expect(isPhone).toBeTruthy();
            }
        });

        await test.step('Verify no cross-category leakage', async () => {
            expect(productNames).not.toContain(HomeConstants.macbookAir);
            expect(productNames).not.toContain(HomeConstants.appleMonitor24);
        });
    },
    );

    test('Search using Laptop category', async ({ loginPage, homePage }) => {
        await loginPage.navigateAndLogin();
        await homePage.clickCategory(HomeConstants.laptops);
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify laptop products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        await test.step('Verify all product names are valid as laptops', async () => {
            for (const name of productNames) {
                const lowerName = name.toLowerCase();
                const isLaptop = HomeConstants.laptopKeywords.some((k) => lowerName.includes(k));
                expect(isLaptop).toBeTruthy();
            }
        });

        await test.step('Verify no cross-category leakage', async () => {
            expect(productNames).not.toContain(HomeConstants.nokiaLumia1520);
            expect(productNames).not.toContain(HomeConstants.appleMonitor24);
        });
    });

    test('Search using Monitor category', async ({ loginPage, homePage }) => {
        await loginPage.navigateAndLogin();
        await homePage.clickCategory(HomeConstants.monitors);
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify monitor products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        await test.step('Verify all product names are valid as monitors', async () => {
            for (const name of productNames) {
                const lowerName = name.toLowerCase();
                const isMonitor = HomeConstants.monitorKeywords.some((k) => lowerName.includes(k));
                expect(isMonitor).toBeTruthy();
            }
        });

        await test.step('Verify no cross-category leakage', async () => {
            expect(productNames).not.toContain(HomeConstants.nokiaLumia1520);
            expect(productNames).not.toContain(HomeConstants.macbookAir);
        });
    });

    test('Search without login', async ({ loginPage, homePage }) => {
        await loginPage.goto();
        await expect(homePage.locators.lnkCategory(HomeConstants.phones)).toBeVisible();
        await homePage.clickCategory(HomeConstants.phones);
        const productNames = await homePage.getAllProductNames();
        await test.step('Verify monitor products are displayed', async () => {
            expect(productNames.length).toBeGreaterThan(0);
        });

        await test.step('Verify all product names are valid as phone', async () => {
            for (const name of productNames) {
                const lowerName = name.toLowerCase();
                const isMonitor = HomeConstants.phoneKeywords.some((k) => lowerName.includes(k));
                expect(isMonitor).toBeTruthy();
            }
        });

        await test.step('Verify no cross-category leakage', async () => {
            expect(productNames).not.toContain(HomeConstants.appleMonitor24);
            expect(productNames).not.toContain(HomeConstants.macbookAir);
        });
    });
},
);

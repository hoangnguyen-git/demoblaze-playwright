import { expect, test } from '../../pages/base-page';
import { LoginConstants } from '../../pages/login-page/login-constants';
import { Constants } from '../../utilities/constants';
import { Utility } from '../../utilities/utils';

test.describe(
    'Login',
    {
        tag: ['@login', '@regression'],
    },
    () => {
        test.describe.configure({ mode: 'parallel' });

        test(
            'Login with valid credentials',
            {
                tag: ['@smoke'],
            },
            async ({ loginPage }) => {
                await loginPage.goto();
                await loginPage.clickLoginOnMenuBar();
                await loginPage.login(Constants.USERNAME, Constants.PASSWORD);
                await test.step('Verify welcome message is displayed after login successfully', async () => {
                    await expect(loginPage.commonLocators.welcome).toHaveText(`Welcome ${Constants.USERNAME}`);
                });
            }
        );

        test('Login with wrong username', async ({ loginPage }) => {
            await loginPage.goto();
            await loginPage.clickLoginOnMenuBar();
            loginPage.page.once('dialog', (dialog) => {
                expect(dialog.message()).toContain(LoginConstants.wrongUsernameMessage);
                dialog.accept();
            });
            await loginPage.login(Utility.generateRandomString(10), Constants.PASSWORD);
        });

        test('Login with wrong password', async ({ loginPage }) => {
            await loginPage.goto();
            await loginPage.clickLoginOnMenuBar();
            loginPage.page.once('dialog', (dialog) => {
                expect(dialog.message()).toContain(LoginConstants.wrongPasswordMessage);
                dialog.accept();
            });
            await loginPage.login(Constants.USERNAME, Utility.generateRandomString(10));
        });
    }
);

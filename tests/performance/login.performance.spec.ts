import { expect, test } from '../../pages/base-page';

test.describe('Login performance', {
    tag: ['@performance'],
}, () => {

    test('Verify that the Homepage loads quickly', {
        tag: ['@smoke'],
    }, async ({ loginPage }) => {
        const startTime = Date.now();
        await loginPage.goto();
        const duration = Date.now() - startTime;
        console.log(`Homepage load time: ${duration} ms`);
        expect(duration).toBeLessThan(2000); // Expect homepage to load in under 2 seconds
    },
    );
});
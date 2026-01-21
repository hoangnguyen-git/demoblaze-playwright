import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 */

// dotenv.config();
const env = process.env.ENV ?? 'qa';
dotenv.config({ path: path.resolve(__dirname, 'profiles', `.env.${env.toLocaleLowerCase()}`) });

// const dateTime = new Date().toISOString().replace(/:/g, '-');
// const reportPath = process.env.CI ? `playwright-report-${dateTime}` : "playwright-report"; // Dynamic only in CI
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    globalSetup: require.resolve('./configs/global.setup'),
    globalTeardown: require.resolve('./configs/global.teardown'),
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 0 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 2 : 4,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    timeout: 60 * 60 * 1000,

    reporter: [
        ['html', { open: 'never' }],
        ['list'],
        [
            'allure-playwright',
            {
                detail: true,
                outputFolder: 'allure-results',
                suiteTitle: false,
                environmentInfo: {
                    ENVIRONMENT: env.toLocaleUpperCase(),
                    BROWSER: 'chromium',
                    HEADLESS: 'true',
                    EXECUTOR: 'GitHub Actions',
                },
            },
        ],
        ['junit', { outputFile: 'results.xml' }],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL || 'https://www.demoblaze.com',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        actionTimeout: 10 * 1000,
        navigationTimeout: 20 * 1000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-all-retries',
        headless: true,
        launchOptions: {
            slowMo: 0,
        },
        viewport: { width: 1920, height: 1200 },
    },

    expect: {
        // Maximum time expect() should wait for the condition to be met.
        timeout: 10 * 1000,

        toHaveScreenshot: {
            // An acceptable amount of pixels that could be different, unset by default.
            maxDiffPixelRatio: 0.01,
            maxDiffPixels: 200,
        },

        toMatchSnapshot: {
            // An acceptable ratio of pixels that are different to the total amount of pixels, between 0 and 1.
            maxDiffPixelRatio: 0.1,
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                // ...devices['Desktop Chrome'],
                browserName: 'chromium',
                baseURL: process.env.BASE_URL,
                launchOptions: {
                    args: [
                        '--disable-web-security',
                        '--allow-running-insecure-content',
                        '--ignore-https-errors',
                        '--disable-popup-blocking',
                        // '--start-maximized'
                    ],
                    slowMo: 0,
                },
                viewport: { width: 1920, height: 1200 },
                contextOptions: {
                    ignoreHTTPSErrors: true,
                },
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'retain-on-failure',
            },
            fullyParallel: true,
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                baseURL: process.env.BASE_API_URL,
                launchOptions: {
                    args: ['--disable-web-security', '--allow-running-insecure-content', '--ignore-https-errors', '--disable-popup-blocking'],
                },
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'retain-on-failure',
                contextOptions: {
                    ignoreHTTPSErrors: true,
                },
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                launchOptions: {
                    args: ['--disable-web-security', '--allow-running-insecure-content', '--disable-popup-blocking'],
                },
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'retain-on-failure',
                contextOptions: {
                    ignoreHTTPSErrors: true,
                },
            },
        },
        {
            name: 'edge',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
                launchOptions: {
                    args: ['--disable-web-security', '--allow-running-insecure-content', '--disable-popup-blocking'],
                },
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'retain-on-failure',
                contextOptions: {
                    ignoreHTTPSErrors: true,
                },
            },
        },
    ],
});

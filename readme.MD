# Project: Playwright Automated Testing Framework

## Testing Report

![Automation Testing](https://github.com/hoangnguyen-git/demoblaze-playwright/actions/workflows/playwright.yml/badge.svg)

## Introduction

The primary goal of this project is to develop a robust and scalable automated testing framework to enhance the efficiency, accuracy, and coverage of our software testing processes. By automating repetitive and time-consuming testing tasks, we aim to accelerate our release cycles and improve product quality.

## Features

- **Cross-Platform Support:** Test applications across multiple platforms and browsers.
- **Multi-Languages Support:** Test applications across multiple languages.
- **Scalable Architecture:** Easily add and manage a growing number of test cases.
- **CI/CD Integration:** Automate testing as part of the continuous integration and deployment process.
- **Comprehensive Reporting:** Generate detailed test reports with insights and analytics.
- **Easy Configuration:** Simple setup and configuration to get started quickly.

## Framework Structure and Rationale

This automated testing framework is built using **Playwright**, a modern end-to-end testing framework for web applications. The choice of Playwright provides robust cross-browser testing capabilities, excellent performance, and strong community support. The framework follows the **Page Object Model (POM)** design pattern to ensure maintainability, reusability, and scalability.

### Key Components:

- **`pages/`**: Contains page object classes that encapsulate the elements and actions for each page of the application. This includes:
  - Each page will include 3 separate files in a folder, example for login-page
    `login-page/`: Folder for login page contains 3 files below: - `login-constants.ts`: Constants specific to the login page. - `login-locators.ts`: Element locators (selectors) for the login page. - `login-page.ts`: Page object class with login actions and methods.
  - `common-page/`: Shared components and utilities for common.
  - `home-page/`: Home page specific elements and methods.
  - `cart-page/`: Cart page specific elements and methods.
  - `base-page.ts`: Base class with fixture.

- **`data/`**: Contains test data:

- **`modal/`**: Define interface using in the framework:

- **`tests/`**: Test specifications organized by type:
  - `api/`: API-focused tests.
  - `perfomance/`: Performance tests. (Using K6)
  - `ui/`: User interface tests.

- **`utilities/`**: Helper functions and utilities:
  - `constants.ts`: Application constants.
  - `logging.ts`: Logging utilities.
  - `utils.ts`: General utility functions.

- **`configs/`**: Configuration files for setup and teardown:
  - `global.setup.ts`: Global test setup.
  - `global.teardown.ts`: Global test cleanup.

- **`api/`**: API-related helpers and paths:
  - `api-action.ts`: API endpoints call.
  - `api-helper.ts`: API utility functions.
  - `api-path.ts`: API endpoint definitions.

- **`profiles/`**: Environment-specific configuration profiles.

- **`playwright.config.ts`**: Main Playwright configuration file.

- **`tsconfig.json`**: TypeScript configuration.

- **`eslint.config.mjs`**: ESLint configuration for code quality.

### Project File Folder Structure

```
.
├── .eslintrc.json
├── .github/
│   └── workflows/
├── .gitignore
├── .prettierignore
├── .prettierrc
├── JavaScriptStandardStyle.md
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── playwright.config.ts
├── readme.MD
├── tsconfig.json
├── api/
│   ├── api-helper.ts
│   └── api-path.ts
├── configs/
│   ├── global.setup.ts
│   └── global.teardown.ts
├── data/
│   └── order-data.ts
├── modal/
│   └── order.ts
├── pages/
│   ├── base-page.ts
│   ├── common-page/
│   │   ├── common-constants.ts
│   │   ├── common-locators.ts
│   │   └── common-page.ts
│   ├── home-page/
│   │   ├── home-constants.ts
│   │   ├── home-locators.ts
│   │   └── home-page.ts
│   └── login-page/
│       ├── login-constants.ts
│       ├── login-locators.ts
│       └── login-page.ts
├── profiles/
├── tests/
│   ├── api/
│   │   └── login.spec.ts
│   ├── performance/
│   │   └── login.test.ts
│   └── ui/
│       ├── login.spec.ts
│       └── search-product.spec.ts
└── utilities/
    ├── constants.ts
    ├── logging.ts
    └── utils.ts
```

### Rationale:

- **Page Object Model**: Separates test logic from page-specific code, making tests easier to maintain and reducing code duplication.
- **TypeScript**: Provides type safety, better IDE support, and catches errors at compile time.
- **Modular Structure**: Organized folders allow for easy navigation and scaling as the test suite grows.
- **Configuration Management**: Environment-specific profiles enable testing across different setups without code changes.
- **Reporting Integration**: Allure and Playwright reports provide comprehensive insights into test results.
- **CI/CD Ready**: Designed to integrate seamlessly with continuous integration pipelines.

## Installation

1. **Prerequisites Installation:**

- Install [Node.js](https://nodejs.org/en/download/package-manager) (**Note:** We should you the latest version.)
- Install [Java JDK](https://www.oracle.com/java/technologies/downloads/) ([Allure Report](https://allurereport.org/docs/playwright/) is required Java to generated reports.)
- Install [Visual Studio Code (VS Code)](https://code.visualstudio.com/) for your Code Editor
- Install [Git Version Control](https://git-scm.com/download/)

2. **Clone the Repository:**

   ```bash
   git clone https://github.com/hoangnguyen-git/demoblaze-playwright.git
   cd demoblaze-playwright
   ```

3. **Install Dependencies:**

   ```bash
   cd demoblaze-playwright
   npm install
   npx playwright install
   ```

4. Using npx (so you don't have to install a global package):

   ```bash
   npx npm-check-updates -u
   npm install
   ```

## Steps to Execute the Demo Scripts

The demo scripts are the test files located in the `tests/` directory. These include UI tests, API tests, and performance tests that demonstrate the framework's capabilities.

### Prerequisites:

- Ensure all dependencies are installed as per the Installation section.
- Configure your environment variables in the appropriate `.env` file (e.g., `profiles/.env.qa`).

### Running Demo Scripts:

1. **Run All Tests:**

   ```bash
   npm run test
   ```

2. **Run Specific Test File:**

   ```bash
   npm run test tests/ui/login.spec.ts
   ```

3. **Run Tests by Tag:**

   ```bash
   npm run test -- --grep "@smoke"
   ```

4. **Run API Tests:**

   ```bash
   npm run test tests/api/
   ```

5. **Run UI Tests:**

   ```bash
   npm run test tests/ui/
   ```

6. **Run Performance Tests:** (Recommendations for using k6 in performance testing.)

   ```bash
   npm run test tests/performance/
   ```

7. **Generate and View Reports:**
   ```bash
   npm run allure-report  # Generates Allure report and starts server
   npx playwright show-report  # Opens Playwright HTML report
   ```

### Debugging:

- Use `npx playwright test --debug` to run tests in debug mode.
- Open tests in VS Code with the Playwright extension for step-through debugging.

### CI/CD Execution:

- Tests are configured to run in CI/CD pipelines (see GitHub Actions badge).
- Ensure environment variables are set in your CI/CD system.

## Adding Profiles

- it locates on `profiles` folder
- Here is the sample profile for `QA` env, all the key in `.env.example` must have value to make sure no error during running test
  `profiles/.env.qa`
  ```bash
      BASE_URL
      API_BASE_URL
      USERNAME
      PASSWORD
  ```

## Guideline How to use Playwright

1. [Installing Playwright](https://playwright.dev/docs/intro#installing-playwright)
2. [Writing tests](https://playwright.dev/docs/writing-tests)
3. [Generating tests](https://playwright.dev/docs/codegen-intro)
4. [Running and debugging tests](https://playwright.dev/docs/running-tests)
5. [Using VS Code Extension for exploring Playwright](https://playwright.dev/docs/getting-started-vscode)
6. [Test configuration](https://playwright.dev/docs/test-configuration)
7. [Command line](https://playwright.dev/docs/test-cli)
8. [Parameterize tests](https://playwright.dev/docs/test-parameterize)
9. [Reporters](https://playwright.dev/docs/test-reporters)
10. [Best Practices](https://playwright.dev/docs/best-practices)

## Additional Resources

1. [Playwright Documentation](https://playwright.dev/)
2. [Azure DevOps Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/?view=azure-devops)
3. [Visual Studio Code](https://code.visualstudio.com/download)
4. [Allure Playwright](https://allurereport.org/docs/playwright/)
5. [Node.js](https://nodejs.org/en/download/package-manager)
6. [Java JDK](https://www.oracle.com/java/technologies/downloads/)

## Executing Tests

1. `npm run test <file name> or npm run test <tag name>` it is setup alias on `package.json`
2. `npm run allure-report` it will generate allure report and start report server
3. `npm run lint` ESLint statically analyzes your code to quickly find problems.
4. `npx playwright show-report` Open Playwright html report

## Report

### Playwright report
![alt text](<images/playwright-report.png>)

### Allure report
![alt text](<images/allure1-report.png>)
![alt text](<images/allure1-report.png>)

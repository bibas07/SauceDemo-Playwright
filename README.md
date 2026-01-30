# Playwright Automation Framework

This project is an automated testing framework, built using [Playwright](https://playwright.dev/) and TypeScript. It follows the Page Object Model (POM) design pattern for maintainability and scalability.

## 🚀 Features

- **Page Object Model (POM)**: Organized structure separating page selectors and actions.
- **Custom Fixtures**: Extended Playwright test fixtures for reusable setup logic (e.g., authentication).
- **Session Reuse**: Optimized login flow by reusing storage state to speed up tests.
- **Environment Management**: Configuration via `.env` files for secure credential handling.
- **Logging**: Integration with `js-logger` for step-by-step logging.
- **Data Generation**: Uses `@faker-js/faker` for dynamic data creation.

## 🛠️ Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bibas07/SauceDemo.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

## ⚙️ Configuration

1.  **Environment Variables**:
    Copy `.env.example` to `.env` and configure your credentials.
    ```bash
    cp .env.expample .env
    ```
    Update `.env` with valid credentials:
    ```env
    TEST_USERNAME=your_username
    TEST_PASSWORD=your_password
    ```

2.  **Playwright Config**:
    Configuration is managed in `playwright.config.ts`. You can adjust settings like browser, viewport, and base URL here.

## 🏃 Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI Mode (Interactive)
```bash
npm run test:ui
```

### Run specific test file
```bash
npx playwright test tests/inventory.spec.ts
```

### Run in debug mode
```bash
npx playwright test --debug
```

## 📂 Project Structure

```
├── core/
│   ├── constant/       # API routes and constants
│   ├── decorators/     # Custom decorators (e.g., @step)
│   ├── fixtures/       # Test fixtures (e.g., login fixture)
│   ├── helpers/        # Helper classes (FilterHelper, FormHelper, etc.)
│   └── utils/          # Utility functions
├── data/               # Static test data
├── pages/              # Page Object Models (InventoryPage, LoginPage, etc.)
├── storage/            # Session storage files (admin.json)
├── tests/              # Test specifications (*.spec.ts)
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
└── playwright.config.ts # Playwright configuration
```

## 📄 License

This project is licensed under the ISC License.

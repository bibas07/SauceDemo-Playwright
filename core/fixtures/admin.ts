import test, { Page } from "playwright/test";
import { LoginPage } from "../../pages/login.page";
import fs from "fs";
import path from "path";

const statePath = path.resolve("./storage/admin.json")
if (fs.existsSync(statePath)) {
    test.use({
        storageState: statePath,
    })
}

export const PROCESS_TEST = test.extend<{ login: void }>({
    login: [
        async ({ page }: { page: Page }, use: () => any) => {
            const loginPage = new LoginPage(page)
            await loginPage.navigateToLogin()
            await loginPage.expectHeading()
            await loginPage.submitValidFormInformation()

            await page.context().storageState({ path: statePath });
            await use();
        },
        {
            auto: true,
        },
    ],
});
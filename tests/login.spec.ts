import test from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login", async () => {

    test("Invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLogin()
        await loginPage.expectHeading()
        await loginPage.submitInvalidFormInformation()
        await loginPage.expectErrorMessage()
    })

    test("Valid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLogin()
        await loginPage.expectHeading()
        await loginPage.submitValidFormInformation()
        await loginPage.expectInventoryPage()
    })
})
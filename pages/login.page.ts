import { expect, Page } from "@playwright/test";
import { step } from "../core/decorators/step";
import { URL_ROUTES } from "../core/constant/api.constant";
import { FormHelper } from "../core/helpers/form.helper";
import { LOGIN_CREDENTIALS } from "../data/login";
import { AlertHelper } from "../core/helpers/alert.helper";

export class LoginPage {
    private readonly page: Page
    private readonly usernameId: string
    private readonly passwordId: string
    private readonly pageHeading: string
    private readonly textLoginButton: string
    private readonly errorMessage: string

    private readonly formHelper: FormHelper
    private readonly alertHelper: AlertHelper

    constructor(page: Page) {
        this.page = page
        this.pageHeading = "Swag Labs"
        this.usernameId = "username"
        this.passwordId = "password"
        this.textLoginButton = "Login"
        this.errorMessage = "Username and password do not match any user in this service"

        this.formHelper = new FormHelper(page)
        this.alertHelper = new AlertHelper(page)
    }

    @step("Navigate to login")
    public async navigateToLogin() {
        await this.page.goto(URL_ROUTES.LOGIN, { waitUntil: "domcontentloaded" });
    }

    @step("Expect heading")
    public async expectHeading() {
        const element = this.page.locator(".login_logo")
        await expect(element).toHaveText(this.pageHeading)
    }

    @step("Fill form information")
    private async fillFormInformation({ username, password }: { username: string, password: string }) {
        await this.formHelper.fillInput(this.usernameId, username)
        await this.formHelper.fillInput(this.passwordId, password)
    }

    @step("Submit invalid form information")
    public async submitInvalidFormInformation() {
        await this.fillFormInformation(LOGIN_CREDENTIALS.INVALID_PASSWORD)
        await this.formHelper.submitButton(this.textLoginButton)
    }

    @step("Submit valid form information")
    public async submitValidFormInformation() {
        await this.fillFormInformation(LOGIN_CREDENTIALS.VALID_CREDENTIALS)
        await this.formHelper.submitButton(this.textLoginButton)
    }

    @step('Expect error message')
    public async expectErrorMessage() {
        await this.alertHelper.expectErrorMessage(this.errorMessage)
    }

    @step("Expect inventory page")
    public async expectInventoryPage() {
        await expect(this.page).toHaveURL(URL_ROUTES.INVENTORY)
    }
}
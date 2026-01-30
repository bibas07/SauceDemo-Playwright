import { expect, Locator, Page } from "@playwright/test";
import { step } from "../core/decorators/step";
import { URL_ROUTES } from "../core/constant/api.constant";
import { FormHelper } from "../core/helpers/form.helper";
import { faker } from "@faker-js/faker";

interface CheckoutInformation {
    firstName: string
    lastName: string
    postalCode: string
}
export class Checkout {
    private readonly page: Page
    private readonly buttonCheckoutLocator: Locator
    private readonly formHelper: FormHelper
    private readonly headingText: string
    private readonly buttonContinue: string
    private readonly buttonCheckout: string
    private readonly buttonFinish: string
    private readonly titleOverview: string
    private readonly titleCheckoutComplete: string
    private readonly titleYourInformation: string
    private readonly headingTextThankYou: string

    constructor(page: Page) {
        this.page = page
        this.buttonCheckoutLocator = this.page.getByRole("button", { name: "Checkout" })
        this.formHelper = new FormHelper(page)
        this.headingText = "Your Cart"
        this.buttonContinue = "Continue"
        this.titleOverview = "Checkout: Overview"

        this.buttonCheckout = "Checkout"
        this.buttonFinish = "Finish"
        this.titleCheckoutComplete = "Checkout: Complete!"
        this.titleYourInformation = "Checkout: Your Information"
        this.headingTextThankYou = "Thank you for your order!"
    }

    @step("Navigate to checkout")
    public async navigateToCheckout() {
        await this.page.goto(URL_ROUTES.CART)
    }

    @step("Expect cart page")
    public async expectCartPage() {
        await expect(this.page).toHaveURL(URL_ROUTES.CART)
    }

    private async getHeadingText() {
        const locateElement = this.page.locator("[data-test='title']")
        const heading = await locateElement.textContent()
        return heading
    }

    @step("Expect cart heading")
    public async expectCartHeading() {
        const heading = await this.getHeadingText()
        expect(heading).toBe(this.headingText)
    }

    @step("Click checkout")
    public async clickCheckout() {
        await expect(this.buttonCheckoutLocator, `Checkout button is not visible`).toBeVisible()
        await this.buttonCheckoutLocator.click()
    }

    private async fillCheckoutInformation(info: CheckoutInformation) {
        await this.formHelper.fillInput("firstName", info.firstName)
        await this.formHelper.fillInput("lastName", info.lastName)
        await this.formHelper.fillInput("postalCode", info.postalCode)
    }

    @step("Continue checkout")
    public async continueCheckout() {
        await this.formHelper.submitButton(this.buttonCheckout)
    }

    @step("Expect checkout page")
    public async expectCheckoutPage() {
        await expect(this.page).toHaveURL(URL_ROUTES.CHECKOUT)
    }

    @step("Expect checkout heading")
    public async expectCheckoutHeading() {
        const heading = await this.getHeadingText()
        expect(heading).toBe(this.titleOverview)
    }

    @step("Expect checkout items")
    public async expectCheckoutItems(items: string[]) {
        for (let i = 0; i < items.length; i++) {
            const item = this.page.locator("[data-test='inventory-item-name']").filter({ hasText: items[i] })
            await expect(item, `Item ${items[i]} is not visible`).toBeVisible()
        }
    }

    @step("Checkout")
    public async checkout() {
        const heading = await this.getHeadingText()
        expect(heading).toBe(this.titleYourInformation)

        await this.fillCheckoutInformation({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.string.numeric(5)
        })
        await this.formHelper.submitButton(this.buttonContinue)
    }

    @step("Finish Checkout")
    public async finishCheckout() {
        await this.formHelper.submitButton(this.buttonFinish)
    }

    @step("Expect checkout complete Url")
    public async expectCheckoutCompleteUrl() {
        await expect(this.page).toHaveURL(URL_ROUTES.CHECKOUT_COMPLETE)
    }

    @step("Expect checkout complete")
    public async expectCheckoutComplete() {
        const heading = await this.getHeadingText()
        expect(heading).toBe(this.titleCheckoutComplete)

        const headingTitle = this.page.getByRole("heading", { name: this.headingTextThankYou })
        await expect(headingTitle).toBeVisible()
    }
}
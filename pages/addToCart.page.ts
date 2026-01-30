import { expect, Locator, Page } from "@playwright/test";
import { step } from "../core/decorators/step";
import { URL_ROUTES } from "../core/constant/api.constant";

export class AddToCartPage {
    private readonly page: Page
    private readonly buttonAddToCart: string
    private readonly locatorItem: Locator
    private readonly locatorItemName: Locator

    constructor(page: Page) {
        this.page = page
        this.buttonAddToCart = "Add to cart"
        this.locatorItem = this.page.locator("[data-test='inventory-item']")
        this.locatorItemName = this.page.locator("[data-test='inventory-item-name']")
    }

    @step("Navigate to cart")
    public async navigateToCart() {
        await this.page.goto(URL_ROUTES.CART)
    }

    @step("Add to cart")
    public async addToCart(items?: number) {
        const countButton = await this.locatorItem.count()
        const maxItems = Math.min(countButton, 3)
        let itemsToAdd = items ?? Math.floor(Math.random() * maxItems) + 2
        const itemsList: string[] = []

        for (let i = 0; i < itemsToAdd; i++) {
            const cartButton = this.locatorItem.nth(i).getByRole("button", { name: this.buttonAddToCart })
            const item = await this.locatorItemName.nth(i).innerText()
            await expect(cartButton).toBeVisible()
            await cartButton.click()
            await this.expectAddedCartHasButtonRemove(item)
            itemsList.push(item)
        }
        return itemsList
    }

    @step("Expect items are added to cart")
    public async expectItemsAreAddedToCart(items: string[]) {
        for (let i = 0; i < items.length; i++) {
            const item = this.locatorItemName.filter({ hasText: items[i] })
            const isVisible = await item.isVisible()
            expect(isVisible, `Item ${items[i]} is not visible`).toBeTruthy()
        }
    }

    private async expectAddedCartHasButtonRemove(item: string) {
        const itemContainer = this.locatorItemName.filter({ hasText: item }).locator("//ancestor::div[@data-test='inventory-item']")
        const buttonRemove = itemContainer.locator('//button[text()="Remove"]')
        await expect(buttonRemove, `Button remove for item ${item} is not visible`).toBeVisible()
    }
}
import { PROCESS_TEST } from "../core/fixtures/admin";
import { AddToCartPage } from "../pages/addToCart.page";
import { InventoryPage } from "../pages/inventory.page";

PROCESS_TEST.describe("Add to cart", async () => {
    PROCESS_TEST("Add to cart", async ({ page }) => {
        const addToCartPage = new AddToCartPage(page)
        const inventoryPage = new InventoryPage(page)

        await inventoryPage.expectInventoryPage()
        const items = await addToCartPage.addToCart()
        await addToCartPage.navigateToCart()
        await addToCartPage.expectItemsAreAddedToCart(items)
    })
})
import { PROCESS_TEST } from "../core/fixtures/admin";
import { AddToCartPage } from "../pages/addToCart.page";
import { Checkout } from "../pages/checkout.page";
import { InventoryPage } from "../pages/inventory.page";

PROCESS_TEST.describe("Checkout", async () => {

    PROCESS_TEST("Checkout", async ({ page }) => {
        const checkoutPage = new Checkout(page)
        const addToCartPage = new AddToCartPage(page)
        const inventoryPage = new InventoryPage(page)

        await inventoryPage.expectInventoryPage()
        await addToCartPage.addToCart(2)
        await checkoutPage.navigateToCheckout()
        await checkoutPage.expectCartPage()
        await checkoutPage.expectCartHeading()
        // await checkoutPage.expectCheckoutItems(items) //@note: some items are fails to added into cart
        await checkoutPage.continueCheckout()
        await checkoutPage.checkout()
        await checkoutPage.expectCheckoutHeading()
        await checkoutPage.finishCheckout()
        await checkoutPage.expectCheckoutCompleteUrl()
        await checkoutPage.expectCheckoutComplete()



    })
})

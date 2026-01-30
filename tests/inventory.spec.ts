import { PROCESS_TEST } from "../core/fixtures/admin";
import { InventoryPage } from "../pages/inventory.page";

PROCESS_TEST.describe("Inventory", async () => {
    PROCESS_TEST("Filter Name (decending order)", async ({ page }) => {
        const inventoryPage = new InventoryPage(page)
        await inventoryPage.expectInventoryPage()
        await inventoryPage.filterNameDescending()
        await inventoryPage.expectItemsSortedDescending()


    })

    PROCESS_TEST("Filter Price (low to high)", async ({ page }) => {
        const inventoryPage = new InventoryPage(page)
        await inventoryPage.expectInventoryPage()
        await inventoryPage.filterPriceLowToHigh()
        await inventoryPage.expectItemsPriceSortedLowToHigh()
    })
})
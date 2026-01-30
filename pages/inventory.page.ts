import { expect, Page } from "@playwright/test";
import { FilterHelper } from "../core/helpers/filter.helper";
import { step } from "../core/decorators/step";
import { URL_ROUTES } from "../core/constant/api.constant";
import { isArraySorted } from "../core/utils/common.utils";

export class InventoryPage {
    private readonly page: Page
    private readonly filterHelper: FilterHelper

    constructor(page: Page) {
        this.page = page
        this.filterHelper = new FilterHelper(page)
    }

    @step("Expect inventory page")
    public async expectInventoryPage() {
        await expect(this.page).toHaveURL(URL_ROUTES.INVENTORY)
    }

    @step("Filter name to descending order")
    public async filterNameDescending() {
        await this.filterHelper.selectFilter('za')
        await this.filterHelper.expectActiveOption('za')
    }

    @step("Filter price to low to high")
    public async filterPriceLowToHigh() {
        await this.filterHelper.selectFilter("lohi")
        await this.filterHelper.expectActiveOption('lohi')
    }

    @step("Expect items sorted descending")
    public async expectItemsSortedDescending() {
        const itemsText = await this.filterHelper.locatorItemName.allTextContents()
        expect(isArraySorted(itemsText, 'desc')).toBeTruthy()
    }

    @step("Expect items price sorted low to high")
    public async expectItemsPriceSortedLowToHigh() {
        const itemsText = await this.filterHelper.locatorItemPrice.allTextContents()
        const itemsPrice = itemsText.map(price => parseFloat(price.replace('$', '')))
        expect(isArraySorted(itemsPrice, 'asc')).toBeTruthy()
    }
}
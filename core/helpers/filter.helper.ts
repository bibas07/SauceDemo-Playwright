import { expect, Locator, Page } from "@playwright/test";


/**
 * Type definition for sorting options.
 * @typedef {"az" | "za" | "lohi" | "hilo"} FilterType
 */
export type FilterType = "az" | "za" | "lohi" | "hilo"

/**
 * Helper class for handling filter/sorting operations on the product list.
 */
export class FilterHelper {
    private readonly page: Page
    private readonly locatorFilter: Locator
    private readonly locatorActiveOption: Locator
    public readonly locatorItemName: Locator
    public readonly locatorItemPrice: Locator

    constructor(page: Page) {
        this.page = page
        this.locatorFilter = this.page.locator("[data-test='product-sort-container']")
        this.locatorActiveOption = this.page.locator("[data-test='active-option']")
        this.locatorItemName = this.page.locator("[data-test='inventory-item-name']")
        this.locatorItemPrice = this.page.locator("[data-test='inventory-item-price']")
    }

    /**
     * Maps the filter option code to its display text.
     * @private
     * @param {FilterType} option - The filter option code.
     * @returns {string} The display text of the sort option.
     */
    private switchOptionSort(option: FilterType) {
        switch (option) {
            case "az":
                return "Name (A to Z)"
            case "za":
                return "Name (Z to A)"
            case "lohi":
                return "Price (low to high)"
            case "hilo":
                return "Price (high to low)"
        }
    }

    /**
     * Retrieves the currently active sort option text.
     * @private
     * @returns {Promise<string>} The text of the active option.
     */
    private async getActiveOption() {
        const element = this.locatorActiveOption
        return element.innerText()
    }

    /**
     * Selects a filter option from the dropdown.
     * @param {FilterType} filter - The filter option to select.
     * @returns {Promise<void>}
     */
    public async selectFilter(filter: FilterType) {
        await this.locatorFilter.selectOption({ value: filter });
    }

    /**
     * Verifies that the expected filter option is active.
     * Retries until the assertion passes or times out.
     * @param {FilterType} filter - The expected active filter option.
     * @returns {Promise<void>}
     */
    public async expectActiveOption(filter: FilterType) {
        await expect.poll(async () => {
            return await this.getActiveOption()
        }, { intervals: [100, 300, 500, 1000, 1200, 1500, 2000] }).toBe(this.switchOptionSort(filter))
    }

}
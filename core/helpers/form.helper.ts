import { expect, Page } from "@playwright/test";

/**
 * Helper class for handling form interactions and validations.
 */
export class FormHelper {
    private readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    /**
     * Locates an input field by its test ID.
     * @private
     * @param {string} testId - The data-test attribute value of the input.
     * @returns {Locator} The locator for the input element.
     */
    private locateInput(testId: string) {
        const element = this.page.locator(`input[data-test="${testId}"]`)
        return element
    }

    /**
     * Locates a button by its name.
     * @private
     * @param {string} buttonName - The exact text of the button.
     * @returns {Locator} The locator for the button element.
     */
    private locateButton(buttonName: string) {
        const element = this.page.getByRole("button").getByText(buttonName, { exact: true })
        return element
    }

    /**
     * Checks if an input field is visible.
     * @param {string} testId - The data-test attribute value of the input.
     * @returns {Promise<boolean>} True if the input is visible, false otherwise.
     */
    public async isInputVisible(testId: string) {
        const element = this.locateInput(testId)
        return element.isVisible()
    }

    /**
     * Asserts that an input field is visible.
     * @private
     * @param {string} testId - The data-test attribute value of the input.
     * @returns {Promise<void>}
     */
    private async expectInputIsVisible(testId: string) {
        const isVisible = await this.isInputVisible(testId)
        expect(isVisible).toBeTruthy()
    }

    /**
     * Asserts that an input field is editable.
     * @param {string} testId - The data-test attribute value of the input.
     * @returns {Promise<void>}
     */
    public async expectInputIsEditable(testId: string) {
        const element = this.locateInput(testId)
        await expect(element).toBeEditable()
    }

    /**
     * Fills an input field with the specified value after ensuring it is visible and focused.
     * Verifies that the input contains the value after filling.
     * @param {string} testId - The data-test attribute value of the input.
     * @param {string} value - The value to fill into the input.
     * @returns {Promise<void>}
     */
    public async fillInput(testId: string, value: string) {
        await this.expectInputIsVisible(testId)
        const element = this.locateInput(testId)
        await element.focus()
        await element.fill(value)

        await expect(element).toHaveValue(value)
    }

    /**
     * Clicks a submit button identified by its name.
     * @param {string} buttonName - The name of the button to click.
     * @returns {Promise<void>}
     */
    public async submitButton(buttonName: string) {
        const element = this.locateButton(buttonName)
        await element.click()
    }

}
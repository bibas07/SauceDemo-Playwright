import { expect, Page } from "@playwright/test";

/**
 * Helper class for interacting with and asserting on alert/error messages.
 */
export class AlertHelper {
    private readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    /**
     * Locates the error message element, ensures it is visible, and retrieves its text.
     * @private
     * @returns {Promise<string>} The text content of the error message.
     */
    private async locateErrorMessage() {
        const element = this.page.locator("h3[data-test='error']")
        await expect(element, `Error message is not visible`).toBeVisible()
        const message = await element.innerText()
        return message
    }

    /**
     * Asserts that the visible error message contains the expected text.
     * @param {string} message - The expected error message substring.
     * @returns {Promise<void>}
     */
    public async expectErrorMessage(message: string) {
        const errorMessage = await this.locateErrorMessage()
        expect(errorMessage).toContain(message)
    }

    /**
     * Closes the error message by clicking the close button.
     * @returns {Promise<void>}
     */
    public async closeErrorMessage() {
        const element = this.page.locator("button[data-test='error-button']")
        await element.click()
    }
}
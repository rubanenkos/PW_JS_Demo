import { expect, test } from "@playwright/test";

export class BasePage {
  pageTitle;
  /**
   * Creates an instance of the BasePage class.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = "";
    this.pageHeader = this.page.getByTestId("title");
  }

  /**
   * Gets the current URL of the page.
   *
   * @returns {Promise<string>} A promise that resolves to the current URL of the page.
   */
  async getCurrentUrl() {
    return await test.step(`Get the current url`, async () => {
      return this.page.url();
    });
  }

  /**
   * Navigates to a specified URL.
   * Waits for the page to fully load before resolving.
   *
   * @param {string} [url="/"] - The URL to navigate to (defaults to the homepage).
   * @returns {Promise<void>} Resolves once the navigation is complete and the page is loaded.
   */
  async goto(url = "/") {
    await test.step(`Navigate to '${url}'`, async () => {
      const waitForLoadState = this.page.waitForLoadState("load");
      await this.page.goto(url);
      await waitForLoadState;
    });
  }

  /**
   * Verifies that the page title matches the expected text.
   *
   * @param {string} pageName - The expected name of the page title.
   * @returns {Promise<void>} Resolves once the page title is validated.
   */
  async checkPageTitle(pageName) {
    await test.step(`Check the page title is '${pageName}'`, async () => {
      await expect(this.pageHeader).toHaveText(pageName);
    });
  }
}

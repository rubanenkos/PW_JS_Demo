import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutCompletePage } from "./checkout-complete-page";

export class CheckoutStepTwoPage extends BasePage {
  static pageLink = "checkout-step-two.html";
  pageTitle = "Checkout: Overview";

  /**
   * Creates an instance of the CheckoutStepTwoPage.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);
    this.finishButton = this.page.getByTestId("finish");
  }

  /**
   * Clicks the 'Finish' button and waits for the Checkout Complete page to load.
   *
   * @returns {Promise<void>} Resolves once the button is clicked and the next page is loaded.
   */
  async clickFinish() {
    await test.step(`Click 'Finish' button`, async () => {
      await this.finishButton.click();
      await this.page.waitForURL(`**/${CheckoutCompletePage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }
}

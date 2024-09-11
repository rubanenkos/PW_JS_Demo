import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { TEXT_MARKERS } from "constants/text-markers";
import { ProductsPage } from "./products-page";

export class CheckoutCompletePage extends BasePage {
  static pageLink = "checkout-complete.html";
  pageTitle = "Checkout: Complete!";

  /**
   * Creates an instance of the CheckoutCompletePage.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);
    this.backHomeButton = this.page.getByTestId("back-to-products");
    this.completeHeader = this.page.getByTestId("complete-header");
    this.completeMessage = this.page.getByTestId("complete-text");
  }

  /**
   * Clicks the "Back Home" button and waits for the Products page to load.
   *
   * @returns {Promise<void>} Resolves once the navigation to the Products page is complete.
   */
  async clickBackHome() {
    await test.step(`Click Back Home button`, async () => {
      await this.backHomeButton.click();
      await this.page.waitForURL(`**/${ProductsPage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }

  /**
   * Checks if the order complete messages (header and text) are displayed correctly.
   *
   * @returns {Promise<void>} Resolves once the messages have been validated.
   */
  async checkIsOrderCompleteMessagesShown() {
    await test.step(`Check order complete messages are shown`, async () => {
      const headerMessage = TEXT_MARKERS.MESSAGES.ORDER_COMPLETE;
      await test.step(`Check the header message '${headerMessage}' is shown`, async () => {
        await expect.soft(this.completeHeader).toHaveText(headerMessage);
      });
      const textMessage = TEXT_MARKERS.MESSAGES.ORDER_DISPATCHED;
      await test.step(`Check the text message '${textMessage}' is shown`, async () => {
        await expect.soft(this.completeMessage).toHaveText(textMessage);
      });
    });
  }
}

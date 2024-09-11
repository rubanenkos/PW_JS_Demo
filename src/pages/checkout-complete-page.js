import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { TEXT_MARKERS } from "constants/text-markers";
import { ProductsPage } from "./products-page";

export class CheckoutCompletePage extends BasePage {
  static pageLink = "checkout-complete.html";
  pageTitle = "Checkout: Complete!";

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.backHomeButton = this.page.getByTestId("back-to-products");
    this.completeHeader = this.page.getByTestId("complete-header");
    this.completeMessage = this.page.getByTestId("complete-text");
  }
  async clickBackHome() {
    await test.step(`Click Back Home button`, async () => {
      await this.backHomeButton.click();
      await this.page.waitForURL(`**/${ProductsPage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }

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

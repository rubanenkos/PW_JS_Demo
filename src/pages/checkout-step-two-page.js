import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutCompletePage } from "./checkout-complete-page";

export class CheckoutStepTwoPage extends BasePage {
  static pageLink = "checkout-step-two.html";
  pageTitle = "Checkout: Overview";

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.finishButton = this.page.getByTestId("finish");
  }
  async clickFinish() {
    await test.step(`Click 'Finish' button`, async () => {
      await this.finishButton.click();
      await this.page.waitForURL(`**/${CheckoutCompletePage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }
}

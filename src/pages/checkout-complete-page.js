import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class CheckoutCompletePage extends BasePage {
  static pageLink = "checkout-complete.html";
  pageTitle = "Checkout: Complete!";

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.backHomeButton = this.page.getByTestId("back-to-products");
  }
  async clickBackHome() {
    await test.step(`Click Back Home button`, async () => {
      await this.backHomeButton.click();
      // await this.page.waitForURL(`**/${CheckoutStepTwoPage.pageLink}`, {
      //   waitUntil: "domcontentloaded",
      // });
    });
  }
}

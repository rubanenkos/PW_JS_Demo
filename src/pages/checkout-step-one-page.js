import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutStepTwoPage } from "./checkout-step-two-page";

export class CheckoutStepOnePage extends BasePage {
  static pageLink = "checkout-step-one.html";
  pageTitle = "Checkout: Your Information";

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.firstNameField = this.page.getByTestId("firstName");
    this.lastNameField = this.page.getByTestId("lastName");
    this.postalCodeField = this.page.getByTestId("postalCode");
    this.continueButton = this.page.getByTestId("continue");
  }

  async fillCheckoutForm(itemName) {
    await test.step(`Fill checkout form`, async () => {});
  }

  async fillFirstName(value) {
    await test.step(`Fill first name`, async () => {
      await this.firstNameField.fill(value);
    });
  }
  async fillLastName(value) {
    await test.step(`Fill last name`, async () => {
      await this.lastNameField.fill(value);
    });
  }
  async fillPostalCode(value) {
    await test.step(`Fill zip code`, async () => {
      await this.postalCodeField.fill(value);
    });
  }

  async fillOutCheckoutForm({
    firstName = "DefaultFirstName",
    lastName = "DefaultLastName",
    postalCode = "11111",
  } = {}) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  async clickContinue() {
    await test.step(`Click Continue button`, async () => {
      await this.continueButton.click();
      await this.page.waitForURL(`**/${CheckoutStepTwoPage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }
}

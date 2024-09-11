import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutStepTwoPage } from "./checkout-step-two-page";

export class CheckoutStepOnePage extends BasePage {
  static pageLink = "checkout-step-one.html";
  pageTitle = "Checkout: Your Information";

  /**
   * Creates an instance of the CheckoutStepOnePage.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);
    this.firstNameField = this.page.getByTestId("firstName");
    this.lastNameField = this.page.getByTestId("lastName");
    this.postalCodeField = this.page.getByTestId("postalCode");
    this.continueButton = this.page.getByTestId("continue");
  }

  /**
   * Fills in the first name field with the provided value.
   *
   * @param {string} value - The first name to enter in the field.
   * @returns {Promise<void>} Resolves once the field is filled.
   */
  async fillFirstName(value) {
    await test.step(`Fill the first name with '${value}'`, async () => {
      await this.firstNameField.fill(value);
    });
  }

  /**
   * Fills in the last name field with the provided value.
   *
   * @param {string} value - The last name to enter in the field.
   * @returns {Promise<void>} Resolves once the field is filled.
   */
  async fillLastName(value) {
    await test.step(`Fill the last name with '${value}'`, async () => {
      await this.lastNameField.fill(value);
    });
  }

  /**
   * Fills in the postal code field with the provided value.
   *
   * @param {string} value - The postal code to enter in the field.
   * @returns {Promise<void>} Resolves once the field is filled.
   */
  async fillPostalCode(value) {
    await test.step(`Fill the zip code with '${value}'`, async () => {
      await this.postalCodeField.fill(value);
    });
  }

  /**
   * Fills out the checkout form with the provided values or defaults.
   *
   * @param {Object} [options] - The options for filling out the form.
   * @param {string} [options.firstName="DefaultFirstName"] - The first name to enter (default: "DefaultFirstName").
   * @param {string} [options.lastName="DefaultLastName"] - The last name to enter (default: "DefaultLastName").
   * @param {string} [options.postalCode="11111"] - The postal code to enter (default: "11111").
   * @returns {Promise<void>} Resolves once the form is filled.
   */
  async fillOutCheckoutForm({
    firstName = "DefaultFirstName",
    lastName = "DefaultLastName",
    postalCode = "11111",
  } = {}) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  /**
   * Clicks the 'Continue' button and waits for the Checkout Step Two page to load.
   *
   * @returns {Promise<void>} Resolves once the button is clicked and the page is loaded.
   */
  async clickContinue() {
    await test.step(`Click 'Continue' button`, async () => {
      await this.continueButton.click();
      await this.page.waitForURL(`**/${CheckoutStepTwoPage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }
}

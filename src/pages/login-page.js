import { expect, test } from "@playwright/test";
import { BasePage } from "./base-page";
import { PLACEHOLDERS } from "constants/placeholders";
import { getElementPropertyValue } from "../utils/utils";

export class LoginPage extends BasePage {
  usernameField = this.page.getByTestId("username");
  passwordField = this.page.getByTestId("password");
  loginButton = this.page.getByTestId("login-button");
  failLoginMessage = this.page.getByTestId("error");

  /**
   * Creates an instance of the LoginPage.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);
  }

  /**
   * Verifies which field corresponds to the provided placeholder name.
   *
   * @param {string} placeholderName - The placeholder name to verify.
   * @returns {import('@playwright/test').Locator} The locator for the field with the specified placeholder.
   * @throws {Error} If the placeholder name is not recognized.
   */
  #verifyPlaceholderName(placeholderName) {
    let errorIconByField;
    if (placeholderName === PLACEHOLDERS.USERNAME) {
      errorIconByField = this.usernameField;
    } else if (placeholderName === PLACEHOLDERS.PASSWORD) {
      errorIconByField = this.passwordField;
    } else {
      throw new Error(
        `Invalid parameter. Expected '${PLACEHOLDERS.USERNAME}' or '${PLACEHOLDERS.PASSWORD}'.`
      );
    }
    return errorIconByField;
  }

  /**
   * Retrieves the error icon element for the field with the specified placeholder.
   *
   * @param {string} placeholderName - The placeholder name to get the error icon for.
   * @returns {import('@playwright/test').Locator} The locator for the error icon associated with the field.
   */
  #getErrorIcon(placeholderName) {
    const errorIconByField = this.#verifyPlaceholderName(placeholderName);
    return errorIconByField.locator(
      "xpath=/following-sibling::*[contains(@class, 'error_icon')]"
    );
  }

  /**
   * Enters the specified username into the username field.
   *
   * @param {string} text - The username to enter.
   * @returns {Promise<void>} Resolves once the username is entered.
   */
  async enterUserName(text) {
    await test.step(`Fill in the field 'Username' with data: ${text}`, async () => {
      await this.usernameField.fill(text);
    });
  }

  /**
   * Enters the specified password into the password field.
   *
   * @param {string} text - The password to enter.
   * @returns {Promise<void>} Resolves once the password is entered.
   */
  async enterUserPassword(text) {
    await test.step(`Fill in the field 'Password'`, async () => {
      await this.passwordField.fill(text);
    });
  }

  /**
   * Clicks the 'Login' button.
   *
   * @returns {Promise<void>} Resolves once the button is clicked.
   */
  async clickLoginButton() {
    await test.step(`Click 'Login' button`, async () => {
      await this.loginButton.click();
    });
  }

  /**
   * Logs in with the specified user credentials.
   *
   * @param {Object} user - The user credentials.
   * @param {string} user.username - The username for login.
   * @param {string} user.password - The password for login.
   * @param {string} user.title - The title of the user for logging.
   * @returns {Promise<void>} Resolves once the login process is completed.
   */
  async userLogin(user) {
    await test.step(`Login with user: ${user.title}`, async () => {
      await this.enterUserName(user.username);
      await this.enterUserPassword(user.password);
      await this.clickLoginButton();
    });
  }

  /**
   * Checks if the login failure message matches the expected text.
   *
   * @param {string} message - The expected failure message.
   * @returns {Promise<void>} Resolves once the message is checked.
   */
  async checkFailLoginMassage(message) {
    await test.step(`Check the message of failed login: ${message}`, async () => {
      await expect(this.failLoginMessage).toHaveText(new RegExp(message, "i"));
    });
  }

  /**
   * Checks if the error icon is shown for the specified field.
   *
   * @param {string} fieldPlaceholder - The placeholder name of the field to check.
   * @returns {Promise<void>} Resolves once the visibility of the error icon is verified.
   */
  async checkErrorIconIsShown(fieldPlaceholder) {
    await test.step(`Check if the '${fieldPlaceholder}' field has error icon'`, async () => {
      const errorIconByField = this.#getErrorIcon(fieldPlaceholder);
      await expect(errorIconByField).toBeVisible();
    });
  }

  /**
   * Checks if the field with the specified placeholder is highlighted with the given color.
   *
   * @param {string} fieldPlaceholder - The placeholder name of the field to check.
   * @param {string} color - The expected highlight color in CSS format.
   * @returns {Promise<void>} Resolves once the field's highlight color is checked.
   */
  async checkIsFieldHighlighted(fieldPlaceholder, color) {
    await test.step(`Check if '${fieldPlaceholder}' field is highlighted in '${color}'`, async () => {
      let field = this.#verifyPlaceholderName(fieldPlaceholder);
      expect(await getElementPropertyValue(field, "border-bottom-color")).toBe(
        color
      );
    });
  }
}

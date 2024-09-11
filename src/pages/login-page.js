import { expect, test } from "@playwright/test";
import { BasePage } from "./base-page";
import { PLACEHOLDERS } from "constants/placeholders";
import { getElementPropertyValue } from "../utils/utils";

export class LoginPage extends BasePage {
  usernameField = this.page.getByTestId("username");
  passwordField = this.page.getByTestId("password");
  loginButton = this.page.getByTestId("login-button");
  failLoginMessage = this.page.getByTestId("error");

  constructor(page) {
    super(page);
  }

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

  #getErrorIcon(placeholderName) {
    const errorIconByField = this.#verifyPlaceholderName(placeholderName);
    return errorIconByField.locator(
      "xpath=/following-sibling::*[contains(@class, 'error_icon')]"
    );
  }

  async enterUserName(text) {
    await test.step(`Fill in the field 'Username' with data: ${text}`, async () => {
      await this.usernameField.fill(text);
    });
  }

  async enterUserPassword(text) {
    await test.step(`Fill in the field 'Password'`, async () => {
      await this.passwordField.fill(text);
    });
  }

  async clickLoginButton() {
    await test.step(`Click 'Login' button`, async () => {
      await this.loginButton.click();
    });
  }

  async userLogin(user) {
    await test.step(`Login with user: ${user.title}`, async () => {
      await this.enterUserName(user.username);
      await this.enterUserPassword(user.password);
      await this.clickLoginButton();
    });
  }

  async checkFailLoginMassage(message) {
    await test.step(`Check the message of failed login: ${message}`, async () => {
      await expect(this.failLoginMessage).toHaveText(new RegExp(message, "i"));
    });
  }

  async checkErrorIconIsShown(fieldPlaceholder) {
    await test.step(`Check if the '${fieldPlaceholder}' field has error icon'`, async () => {
      const errorIconByField = this.#getErrorIcon(fieldPlaceholder);
      await expect(errorIconByField).toBeVisible();
    });
  }

  async checkIsFieldHighlighted(fieldPlaceholder, color) {
    await test.step(`Check if '${fieldPlaceholder}' field is highlighted in '${color}'`, async () => {
      let field = this.#verifyPlaceholderName(fieldPlaceholder);
      expect(await getElementPropertyValue(field, "border-bottom-color")).toBe(
        color
      );
    });
  }
}

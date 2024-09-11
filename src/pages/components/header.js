import { test, expect } from "@playwright/test";
import { CartPage } from "pages/cart-page";

export class Header {
  /**
   * Creates an instance of the Header component.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    this.page = page;
    this.cartLink = this.page.getByTestId("shopping-cart-link");
    this.burgerMenu = this.page.getByTestId("open-menu");
  }

  /**
   * Opens the product cart by clicking on the cart link.
   * Waits for the Cart page to load.
   *
   * @returns {Promise<void>} Resolves once the cart is opened and the page is loaded.
   */
  async openCart() {
    await test.step(`Open the product cart`, async () => {
      await this.cartLink.click();
      await this.page.waitForURL(`**/${CartPage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }

  /**
   * Opens the burger menu by clicking on the menu button.
   *
   * @returns {Promise<void>} Resolves once the burger menu is opened.
   */
  async openBurgerMenu() {
    await test.step(`Open the menu`, async () => {
      await this.burgerMenu.click();
    });
  }
}

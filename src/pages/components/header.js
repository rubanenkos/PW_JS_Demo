import { test, expect } from "@playwright/test";
import { CartPage } from "pages/cart-page";

export class Header {
  constructor(page) {
    this.page = page;
    this.cartLink = this.page.getByTestId("shopping-cart-link");
    this.burgerMenu = this.page.getByTestId("open-menu");
  }

  async openCart() {
    await test.step(`Open the product cart`, async () => {
      await this.cartLink.click();
      await this.page.waitForURL(`**/${CartPage.pageLink}`, {
        waitUntil: "domcontentloaded",
      });
    });
  }

  async openBurgerMenu() {
    await test.step(`Open the menu`, async () => {
      await this.burgerMenu.click();
    });
  }
}

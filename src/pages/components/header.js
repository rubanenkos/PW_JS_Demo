import { test, expect } from "@playwright/test";

export class Header {
  cartLink;
  constructor(page) {
    this.page = page;
    this.cartLink = this.page.getByTestId("title");
  }

  async openCart() {
    await test.step(`Open the product cart`, async () => {
      await this.cartLink.click();
    });
  }
}

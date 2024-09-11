import { test, expect } from "@playwright/test";

export class ProductCard {
  /**
   * Creates an instance of the ProductCard component.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   * @param {string} itemName - The name of the product to interact with.
   */
  constructor(page, itemName) {
    this.page = page;
    this.itemName = itemName;
    this.card = page
      .getByTestId("inventory-item")
      .filter({ hasText: itemName });
  }

  /**
   * Retrieves the price of the product.
   *
   * @returns {Promise<string>} A promise that resolves to the price of the product.
   */
  async getPrice() {
    return await this.card.getByTestId("inventory-item-price").textContent();
  }

  /**
   * Clicks the "Add to Cart" button for the product.
   *
   * @returns {Promise<void>} Resolves once the button is clicked.
   */
  async clickAddToCart() {
    await test.step(`Click the "Add to Cart" button`, async () => {
      await this.card.getByRole("button").click();
    });
  }

  /**
   * Checks if the product card is visible on the page.
   *
   * @returns {Promise<void>} Resolves once the visibility of the product card is confirmed.
   */
  async checkIsCardVisible() {
    await expect(this.card).toBeVisible();
  }
}

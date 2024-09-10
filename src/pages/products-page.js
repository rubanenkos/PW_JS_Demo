import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { Header } from "./components/header";

export class ProductsPage extends BasePage {
  static pageLink = "inventory.html";

  constructor(page) {
    super(page);
    this.header = new Header(page);
  }
  /**
   * @param {string} itemName - The name of the item to pick for purchase
   * @returns {Promise<string>} The price of the product
   */
  async pickPurchase(itemName) {
    return await test.step(`Pick the '${itemName}' item`, async () => {
      const card = this.page
        .getByTestId("inventory-item")
        .filter({ hasText: itemName });
      const price = await card
        .getByTestId("inventory-item-price")
        .textContent();
      await card.getByRole("button").click();
      return price;
    });
  }
}

import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class CartPage extends BasePage {
  cardContainer = this.page.getByTestId("inventory-item");
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  /**
   * @param {string} itemName
   * @returns {Promise<void>}
   */
  async checkIsPurchaseInCart(itemName) {
    await test.step(`Check the '${itemName}' item is in the Cart`, async () => {
      const card = this.cardContainer.filter({ hasText: itemName });
      await expect(card).toBeVisible();
    });
  }

  /**
   * @param {string} itemName
   * @param {string} expectedPrice
   * @returns {Promise<void>}
   */
  async checkIsPurchaseHasCorrectPrice(itemName, expectedPrice) {
    await test.step(`Check the '${itemName}' item's price is '${expectedPrice}'`, async () => {
      const card = this.cardContainer.filter({ hasText: itemName });
      const actualPrice = await card
        .getByTestId("inventory-item-price")
        .textContent();
      expect(expectedPrice).toEqual(actualPrice);
    });
  }
}

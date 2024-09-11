import { test, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { ProductCard } from "./components/product-card";

export class CartPage extends BasePage {
  static pageLink = "cart.html";
  pageTitle = "Your Cart";

  /**
   * Creates an instance of the CartPage class.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);
    this.checkoutBtn = this.page.getByTestId("checkout");
  }

  /**
   * @param {string} itemName
   * @returns {Promise<void>}
   */
  async checkIsPurchaseInCart(itemName) {
    await test.step(`Check the '${itemName}' item is in the Cart`, async () => {
      const productCard = new ProductCard(this.page, itemName);
      await productCard.checkIsCardVisible();
    });
  }

  /**
   * @param {string} itemName
   * @param {string} expectedPrice
   * @returns {Promise<void>}
   */
  async checkIsPurchaseHasCorrectPrice(itemName, expectedPrice) {
    await test.step(`Check the '${itemName}' item's price is '${expectedPrice}'`, async () => {
      const productCard = new ProductCard(this.page, itemName);
      const actualPrice = await productCard.getPrice();
      expect(expectedPrice).toEqual(actualPrice);
    });
  }

  /**
   * Proceeds to the checkout process by clicking the Checkout button.
   *
   * @returns {Promise<void>} Resolves once the checkout button is clicked.
   */
  async checkout() {
    await test.step(`Click 'Checkout' button`, async () => {
      await this.checkoutBtn.click();
    });
  }
}

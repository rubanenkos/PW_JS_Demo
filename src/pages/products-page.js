import { test } from "@playwright/test";
import { BasePage } from "./base-page";
import { Header } from "./components/header";
import { ProductCard } from "./components/product-card";

export class ProductsPage extends BasePage {
  static pageLink = "inventory.html";

  /**
   * Creates an instance of the ProductsPage.
   *
   * @param {import('@playwright/test').Page} page - The Playwright page object.
   */
  constructor(page) {
    super(page);
    this.header = new Header(page);
  }

  /**
   * Picks a product for purchase and returns its price.
   *
   * @param {string} itemName - The name of the item to pick for purchase.
   * @returns {Promise<string>} The price of the product.
   */
  async pickPurchase(itemName) {
    return await test.step(`Pick the '${itemName}' item`, async () => {
      const productCard = new ProductCard(this.page, itemName);
      const price = await productCard.getPrice();
      await productCard.clickAddToCart();
      return price;
    });
  }
}

import { test as base, expect } from "@playwright/test";
import { LoginPage } from "pages/login-page";
import { ProductsPage } from "pages/products-page";
import { CartPage } from "pages/cart-page";
import playwrightConfig from "playwright.config";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await page.goto(playwrightConfig.use.baseURL);
    const loginPage = new LoginPage(page);
    await use(loginPage);
    await page.close();
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
    await page.close();
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
    await page.close();
  },
});

export { expect };

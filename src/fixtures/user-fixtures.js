// @ts-nocheck
import { test as base, expect } from "@playwright/test";
import { LoginPage } from "pages/login-page";
import { ProductsPage } from "pages/products-page";
import { CartPage } from "pages/cart-page";
import { CheckoutStepOnePage } from "pages/checkout-step-one-page";
import { CheckoutStepTwoPage } from "pages/checkout-step-two-page";
import { CheckoutCompletePage } from "pages/checkout-complete-page";
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
  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
    await page.close();
  },
  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
    await page.close();
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
    await page.close();
  },

  app: async ({ page }, use) => {
    await page.goto(playwrightConfig.use.baseURL);
    const pages = {
      loginPage: new LoginPage(page),
      productsPage: new ProductsPage(page),
      cartPage: new CartPage(page),
      checkoutStepOnePage: new CheckoutStepOnePage(page),
      checkoutStepTwoPage: new CheckoutStepTwoPage(page),
      checkoutCompletePage: new CheckoutCompletePage(page),
    };
    await use(pages);
    await page.close();
  },
});

export { expect };

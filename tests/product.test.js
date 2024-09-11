import { test } from "../src/fixtures/user-fixtures";
import { USERS } from "../src/constants/users";
import { PRODUCTS } from "../src/constants/products";

test.describe("Product tests", () => {
  test("Check the purchase has a correct price", async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    const itemToBuy = PRODUCTS.BACKPACK;
    await loginPage.userLogin(USERS.STANDARD_USER);
    const productPrice = await productsPage.pickPurchase(itemToBuy);
    await productsPage.header.openCart();
    await cartPage.checkIsPurchaseInCart(itemToBuy);
    await cartPage.checkIsPurchaseHasCorrectPrice(itemToBuy, productPrice);
  });

  test("Check that the product can be purchased (using fixtures)", async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    const itemToBuy = PRODUCTS.T_SHORT;
    await loginPage.userLogin(USERS.STANDARD_USER);
    await productsPage.pickPurchase(itemToBuy);
    await productsPage.header.openCart();
    await cartPage.checkIsPurchaseInCart(itemToBuy);
    await cartPage.checkout();
    await checkoutStepOnePage.fillOutCheckoutForm();
    await checkoutStepOnePage.clickContinue();
    await checkoutStepTwoPage.clickFinish();
    await checkoutCompletePage.checkIsOrderCompleteMessagesShown();
    await checkoutCompletePage.clickBackHome();
  });

  test("Check that the product can be purchased (using a god fixture)", async ({
    app,
  }) => {
    const itemToBuy = PRODUCTS.T_SHORT;
    await app.loginPage.userLogin(USERS.STANDARD_USER);
    await app.productsPage.pickPurchase(itemToBuy);
    await app.productsPage.header.openCart();
    await app.cartPage.checkIsPurchaseInCart(itemToBuy);
    await app.cartPage.checkout();
    await app.checkoutStepOnePage.fillOutCheckoutForm();
    await app.checkoutStepOnePage.clickContinue();
    await app.checkoutStepTwoPage.clickFinish();
    await app.checkoutCompletePage.checkIsOrderCompleteMessagesShown();
    await app.checkoutCompletePage.clickBackHome();
  });
});

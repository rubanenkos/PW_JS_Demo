import { test } from "../src/fixtures/user-fixtures";
import { users } from "../src/constants/users";
import { products } from "../src/constants/products";

test.describe("Product tests", () => {
  test("Check the purchase has a correct price", async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    const itemToBuy = products.productBackpack;
    await loginPage.userLogin(users.standard_user);
    const productPrice = await productsPage.pickPurchase(itemToBuy);
    await productsPage.header.openCart();
    await cartPage.checkIsPurchaseInCart(itemToBuy);
    await cartPage.checkIsPurchaseHasCorrectPrice(itemToBuy, productPrice);
  });

  test("Check that the product can be purchased", async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    const itemToBuy = products.productTShort;
    await loginPage.userLogin(users.standard_user);
    await productsPage.pickPurchase(itemToBuy);
    await productsPage.header.openCart();
    await cartPage.checkIsPurchaseInCart(itemToBuy);
    await cartPage.checkout();
    await checkoutStepOnePage.fillOutCheckoutForm();
    await checkoutStepOnePage.clickContinue();
    await checkoutStepTwoPage.clickFinish();
    await checkoutCompletePage.clickBackHome();
  });
});

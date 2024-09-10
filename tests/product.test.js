import { test } from "../src/fixtures/user-fixtures";
import { users } from "../src/constants/users";

test.describe("Product tests", () => {
  test.only("Check the purchase has a correct price", async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    const itemToBuy = "Sauce Labs Backpack";
    await loginPage.page.pause();
    await loginPage.userLogin(users.standard_user);
    const productPrice = await productsPage.pickPurchase(itemToBuy);
    await productsPage.header.openCart();
    await cartPage.checkIsPurchaseInCart(itemToBuy);
    await cartPage.checkIsPurchaseHasCorrectPrice(itemToBuy, productPrice);
  });
});

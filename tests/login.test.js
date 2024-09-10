import { test } from "../src/fixtures/user-fixtures";
import { users } from "../src/constants/users";
import { placeholders } from "../src/constants/placeholders";
import { colors } from "../src/constants/colors";
import { markers } from "../src/constants/text-markers";
import { LoginPage } from "../src/pages/login-page";
import { ProductsPage } from "../src/pages/products-page";
import playwrightConfig from "playwright.config";

test.describe("Login tests", () => {
  test("Successfully login - Option 1", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(playwrightConfig.use.baseURL);
    await loginPage.userLogin(users.standard_user);
    const productsPage = new ProductsPage(page);
    await productsPage.checkPageTitle(markers.PageTitles.Products);
  });

  test("Successfully login - Option 2", async ({ loginPage, productsPage }) => {
    await loginPage.userLogin(users.standard_user);
    await productsPage.checkPageTitle(markers.PageTitles.Products);
  });

  const usersList = [
    { user: users.unregistered_user, message: markers.Messages.FailLogin },
    { user: users.locked_out_user, message: markers.Messages.UserLocked },
  ];
  for (const userData of usersList) {
    test(`Failed login for user: ${userData.user.title}`, async ({
      loginPage,
    }) => {
      await loginPage.userLogin(userData.user);
      await loginPage.checkFailLoginMassage(userData.message);
      await loginPage.checkErrorIconIsShown(placeholders.username);
      await loginPage.checkErrorIconIsShown(placeholders.password);
      await loginPage.checkIsFieldHighlighted(
        placeholders.username,
        colors.red226_35_26
      );
      await loginPage.checkIsFieldHighlighted(
        placeholders.password,
        colors.red226_35_26
      );
    });
  }
});

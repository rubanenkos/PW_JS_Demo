import { test } from "../src/fixtures/user-fixtures";
import { USERS } from "../src/constants/users";
import { PLACEHOLDERS } from "../src/constants/placeholders";
import { COLORS } from "../src/constants/colors";
import { TEXT_MARKERS } from "../src/constants/text-markers";
import { LoginPage } from "../src/pages/login-page";
import { ProductsPage } from "../src/pages/products-page";
import playwrightConfig from "playwright.config";

test.describe("Login tests", () => {
  test("Successfully login - Option 1: without using fixtures", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(playwrightConfig.use.baseURL);
    await loginPage.userLogin(USERS.STANDARD_USER);
    const productsPage = new ProductsPage(page);
    await productsPage.checkPageTitle(TEXT_MARKERS.PAGE_TITLES.PRODUCTS);
  });

  test("Successfully login - Option 2: using fixtures", async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.userLogin(USERS.STANDARD_USER);
    await productsPage.checkPageTitle(TEXT_MARKERS.PAGE_TITLES.PRODUCTS);
  });

  const usersList = [
    {
      user: USERS.UNREGISTERED_USER,
      message: TEXT_MARKERS.MESSAGES.FAIL_LOGIN,
    },
    { user: USERS.LOCKED_OUT_USER, message: TEXT_MARKERS.MESSAGES.USER_LOCKED },
  ];
  for (const userData of usersList) {
    test(`Failed login for user: ${userData.user.title}`, async ({
      loginPage,
    }) => {
      await loginPage.userLogin(userData.user);
      await loginPage.checkFailLoginMassage(userData.message);
      await loginPage.checkErrorIconIsShown(PLACEHOLDERS.USERNAME);
      await loginPage.checkErrorIconIsShown(PLACEHOLDERS.PASSWORD);
      await loginPage.checkIsFieldHighlighted(
        PLACEHOLDERS.USERNAME,
        COLORS.RED_226_35_26
      );
      await loginPage.checkIsFieldHighlighted(
        PLACEHOLDERS.PASSWORD,
        COLORS.RED_226_35_26
      );
    });
  }
});

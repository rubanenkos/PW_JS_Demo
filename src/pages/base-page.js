import { expect, test } from "@playwright/test";

export class BasePage {
  pageTitle;

  constructor(page) {
    this.page = page;
    this.pageTitle = this.page.getByTestId("title");
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async goto(url = "/") {
    await test.step(`Navigate to '${url}'`, async () => {
      const waitForLoadState = this.page.waitForLoadState("load");
      await this.page.goto(url);
      await waitForLoadState;
    });
  }

  async checkPageTitle(pageName) {
    await test.step(`Check the page title is '${pageName}'`, async () => {
      await expect(this.pageTitle).toHaveText(pageName);
    });
  }
}

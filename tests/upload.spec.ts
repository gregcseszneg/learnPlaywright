import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { CartPage } from "../pages/cart.page";
import path from "path";

test.describe("Upload file", () => {
  let cartPage: CartPage;

  const fileName= ['bigone.jpg','test.png']

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await page.goto("/cart/");
  })

  for (const name of fileName) {
    test(`upload a ${name} file`, async ({ page }) => {
        
        await expect(page.locator(".zak-page-title")).toContainText("Cart");
        const filePath = path.join(__dirname, `../data/${name}`);

        await cartPage.uploadComponent.uploadFile(filePath);

        await expect(cartPage.uploadComponent.uploadSuccessResLoc).toContainText(
          "uploaded successfully",
          { timeout: 10000 },
        );
      });
  }

  test.skip("upload file test with DOM manipulation", async ({ page }) => {
    await page.goto("/cart/");
    await expect(page.locator(".zak-page-title")).toContainText("Cart");
    const filePath = path.join(__dirname, "../data/test.png");

    //DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    await cartPage.uploadComponent.uploadFile(filePath);

    await expect(cartPage.uploadComponent.uploadSuccessResLoc).toContainText(
      "uploaded successfully",
    );
  });
});

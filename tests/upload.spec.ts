import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { CartPage } from "../pages/cart.page";
import path from "path";

test.describe("Upload file", () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test("upload file test", async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);

    await page.goto("/cart/");
    await expect(page.locator(".zak-page-title")).toContainText("Cart");
    const filePath = path.join(__dirname, "../data/bigone.jpg");

    cartPage.uploadComponent.uploadFile(filePath);

    await expect(cartPage.uploadComponent.uploadSuccessResLoc).toContainText(
      "uploaded successfully",
      { timeout: 10000 },
    );
  });

  test("upload file test with DOM manipulation", async ({ page }) => {
    homePage = new HomePage(page);
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

    cartPage.uploadComponent.uploadFile(filePath);

    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
    );
  });
});

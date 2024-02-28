import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
const path = require("path");

test.describe("", () => {
  let homePage: HomePage;
  test("upload file test", async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto(homePage.pageUrl + "cart/");
    await expect(page.locator(".zak-page-title")).toContainText("Cart");
    const filePath = path.join(__dirname, "../data/bigone.jpg");

    await page.setInputFiles("input#upfile_1", filePath);

    await page.locator("#upload_1").click();

    //await page.locator('#wfu_messageblock_header_1_1').waitFor({state: 'visible', timeout: 10000}) //timeout is in ms

    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
      { timeout: 10000 },
    );
  });

  test("upload file test with DOM manipulation", async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto(homePage.pageUrl + "cart/");
    await expect(page.locator(".zak-page-title")).toContainText("Cart");
    const filePath = path.join(__dirname, "../data/test.png");

    //DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    await page.setInputFiles("input#upfile_1", filePath);

    await page.locator("#upload_1").click();

    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
    );
  });
});

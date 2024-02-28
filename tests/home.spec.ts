import { test, expect, Locator, ElementHandle } from "@playwright/test";

const path = require("path");
const url: string = "https://practice.sdetunicorns.com/";
test.describe("Home page", () => {
  test("Go to get started", async ({ page }) => {
    await page.goto(url);
    await page.locator("#get-started").click();
    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible ", async ({ page }) => {
    await page.goto(url);
    const headingText = page.locator("text=Think different. Make different.");
    await expect(headingText).toBeVisible();
  });

  test("Verify home link is enabled using text and css selector ", async ({
    page,
  }) => {
    await page.goto(url);
    const homeText = page.locator("#zak-primary-menu >> text=About"); //look for the text inside the primary-menu
    await expect(homeText).toBeEnabled();
  });

  test("Verify nav links ", async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    await page.goto(url);
    const navLinks = page.locator("#zak-primary-menu li[id*=menu]");
    expect(await navLinks.allTextContents()).toEqual(expectedLinks);

    //only verify blog button
    const blogLink = page.locator("#zak-primary-menu li[id*=menu]").nth(3);
    expect(await blogLink.textContent()).toEqual(expectedLinks[3]);

    //loop trough elements
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent());
    }
  });

  test("Contact form fill out test", async ({ page }) => {
    await page.goto(url);
    await page.locator("#zak-primary-menu >> text=Contact").click();

    const name = "test user";
    const email = "tester@gmail.com";
    const phoneNumber = "+2334534533";
    const message = "hi there";

    await page.locator("//input[@type='text']").nth(0).fill(name);
    await page.locator("//input[@type='email']").fill(email);
    await page.locator("//input[@type='text']").nth(1).fill(phoneNumber);
    await page.locator("//textarea").fill(message);
    await page.locator("//button[@type='submit']").click();
    const successMessage = page.locator("//div[contains(@class, '--success')]");
    expect(await successMessage.innerText()).toEqual(
      "Thanks for contacting us! We will be in touch with you shortly",
    );
  });

  test("Check recent posts number test", async ({ page }) => {
    await page.goto(url);
    await page.locator("#zak-primary-menu >> text=Blog").click();
    await expect(page).toHaveURL(url + "blog/");
    const recentPosts = page.locator("#recent-posts-3 ul li");

    await expect(recentPosts).toHaveCount(5);

    for (const el of await recentPosts.elementHandles()) {
      expect((await el.textContent())?.length).toBeGreaterThan(15);
    }
  });

  test("upload file test", async ({ page }) => {
    await page.goto(url + "cart/");
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
    await page.goto(url + "cart/");
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

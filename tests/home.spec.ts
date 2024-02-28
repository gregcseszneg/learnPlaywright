import { test, expect, Locator, ElementHandle } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Home page", () => {
  let homePage: HomePage;
  test("Go to get started", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.getStartedLoc.click();
    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible ", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await expect(homePage.headingText).toBeVisible();
  });

  test("Verify home link is enabled using text and css selector ", async ({
    page,
  }) => {
    homePage = new HomePage(page);
    await homePage.navigate();

    await expect(homePage.aboutMenuLink).toBeEnabled();
  });

  test("Verify nav links ", async ({ page }) => {
    homePage = new HomePage(page);
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    await homePage.navigate();
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
    homePage = new HomePage(page);
    await homePage.navigate();
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
    homePage = new HomePage(page);
    await homePage.navigate();
    await page.locator("#zak-primary-menu >> text=Blog").click();
    await expect(page).toHaveURL(homePage.pageUrl + "blog/");
    const recentPosts = page.locator("#recent-posts-3 ul li");

    await expect(recentPosts).toHaveCount(5);

    for (const el of await recentPosts.elementHandles()) {
      expect((await el.textContent())?.length).toBeGreaterThan(15);
    }
  });
});

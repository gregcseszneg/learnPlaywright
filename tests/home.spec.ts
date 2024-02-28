import { test, expect} from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Home page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  })
  
  test("Go to get started", async ({ page }) => {
    await homePage.getStartedLoc.click();
    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible", async () => {
    await expect(homePage.headingText).toBeVisible();
  });

  test("Verify home link is enabled using text and css selector", async () => {
    await expect(homePage.aboutMenuLink).toBeEnabled();
  });

  test("Verify nav links", async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    const navLinks = page.locator("#zak-primary-menu li[id*=menu]");
    expect(await navLinks.allTextContents()).toEqual(expectedLinks);

    //only verify blog button
    const blogLink = page.locator("#zak-primary-menu li[id*=menu]").nth(3);
    await expect(blogLink).toHaveText(expectedLinks[3]);

    //loop trough elements
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent());
    }
  });

  test("Check recent posts number test", async ({ page }) => {
    await page.locator("#zak-primary-menu >> text=Blog").click();
    await expect(page).toHaveURL("/blog/");
    const recentPosts = page.locator("#recent-posts-3 ul li");

    await expect(recentPosts).toHaveCount(5);

    for (const el of await recentPosts.elementHandles()) {
      expect((await el.textContent())?.length).toBeGreaterThan(15);
    }
  });
});

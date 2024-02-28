import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly pageUrl: string;
  readonly getStartedLoc: Locator;
  readonly headingText: Locator;
  readonly aboutMenuLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.getStartedLoc = page.locator("#get-started");
    this.headingText = page.locator("text=Think different. Make different.");
    this.aboutMenuLink = page.locator("#zak-primary-menu >> text=About");
    this.pageUrl = "https://practice.sdetunicorns.com/";
  }

  async navigate() {
    await this.page.goto(this.pageUrl);
  }
}

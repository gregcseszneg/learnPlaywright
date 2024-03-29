import { Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  readonly getStartedLoc: Locator;
  readonly headingText: Locator;
  readonly aboutMenuLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.getStartedLoc = page.locator("#get-started");
    this.headingText = page.locator("text=Think different. Make different.");
    this.aboutMenuLink = page.locator("#zak-primary-menu >> text=About");
  }

  async navigate() {
    await this.page.goto('/');
  }
}

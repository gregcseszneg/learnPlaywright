import { Locator, Page } from "@playwright/test";

export class ContactPage {
    readonly page: Page;
    readonly contactMenuLinkLoc: Locator;
    readonly nameInputLoc: Locator;
    readonly emailInputLoc: Locator;
    readonly phoneInputLoc: Locator;
    readonly messageTextareaLoc: Locator;
    readonly submitButtonLoc: Locator;
    readonly successMessage: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.contactMenuLinkLoc = page.locator("#zak-primary-menu >> text=Contact");
        this.nameInputLoc = page.locator("//input[@type='text']").nth(0);
        this.emailInputLoc = page.locator("//input[@type='email']");
        this.phoneInputLoc = page.locator("//input[@type='text']").nth(1);
        this.messageTextareaLoc = page.locator("//textarea");
        this.submitButtonLoc = page.locator("//button[@type='submit']");
        this.successMessage = page.locator("//div[contains(@class, '--success')]");
    }
}
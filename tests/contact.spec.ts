import { faker } from '@faker-js/faker';
import test, { expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';

test.describe('Contact page tests', () => {
    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        await page.goto('/contact');
    })
    
  test("Contact form fill out test", async () => {
    await contactPage.contactMenuLinkLoc.click();

    const name = faker.person.fullName();
    const email = faker.internet.email();
    const phoneNumber = faker.phone.number();
    const message = faker.lorem.paragraph(1);

    await contactPage.nameInputLoc.fill(name);
    await contactPage.emailInputLoc.fill(email);
    await contactPage.phoneInputLoc.fill(phoneNumber);
    await contactPage.messageTextareaLoc.fill(message);
    await contactPage.submitButtonLoc.click();
    await expect(contactPage.successMessage).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly",
    );
  });  
});


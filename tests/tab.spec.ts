import test, { expect } from "@playwright/test";

test.describe('Multiple windows test', () => {
    test.use({ baseURL: ''});
    test('Verify new tab and assert title', async ({ page }) => {
        await page.goto('https://playwright.dev/');

        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.locator('a[class*="github-link"]').click()
        ]);

        await newPage.waitForLoadState();
        
        //assertion
        await expect(newPage).toHaveTitle("GitHub - microsoft/playwright: Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API.");
    
        //close the new tab
        await newPage.close();
    })
    
})

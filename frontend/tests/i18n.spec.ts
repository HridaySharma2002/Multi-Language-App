import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n) Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:5173');
    // For CI, this will be the built static server URL, which can be configured in playwright.config.ts
  });

  test('String Localization: No raw keys are visible', async ({ page }) => {
    // English is the default
    await expect(page.locator('h1')).toHaveText('Global Ready Application');
    
    // Switch to French
    await page.getByRole('button', { name: 'Français' }).click();
    await expect(page.locator('h1')).toHaveText('Application Prête pour le Monde');

    // Ensure no raw brackets or keys
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toMatch(/\{.*\}/);
    expect(bodyText).not.toContain('app.title');
  });

  test('Locale Fallback: Missing specific keys fallback seamlessly', async ({ page }) => {
    // Simulate setting browser language to a specific locale, let's say fr-CA (Canadian French)
    // In our i18n setup, fr-CA falls back to fr, then en.
    // Assuming fr-CA bundle doesn't exist, it should load 'fr' and show French text without breaking.
    await page.evaluate(() => {
      window.localStorage.setItem('i18nextLng', 'fr-CA');
    });
    await page.reload();

    // Should display French text as fallback
    await expect(page.locator('h1')).toHaveText('Application Prête pour le Monde');
  });

  test('Data Formatting: Adapts to standard libraries', async ({ page }) => {
    // In English
    await page.getByRole('button', { name: 'English' }).click();
    const enText = await page.locator('.format-grid').innerText();
    expect(enText).toContain('$1,234.56'); // Standard US format
    
    // In French
    await page.getByRole('button', { name: 'Français' }).click();
    const frText = await page.locator('.format-grid').innerText();
    // French uses comma for decimal and space for thousand separator, and often the symbol at the end
    expect(frText).toMatch(/1\s?234,56\s?\$US|1\s?234,56\s?US\$/); 
  });

  test('Layout & RTL: Mirrors correctly', async ({ page }) => {
    // English is LTR
    const htmlDirEn = await page.locator('html').getAttribute('dir');
    expect(htmlDirEn).toBe('ltr');
    
    // Arabic is RTL
    await page.getByRole('button', { name: 'العربية (RTL)' }).click();
    
    const htmlDirAr = await page.locator('html').getAttribute('dir');
    expect(htmlDirAr).toBe('rtl');
    
    // Check if the title actually changed
    await expect(page.locator('h1')).toHaveText('تطبيق جاهز عالمياً');
  });

  test('Pluralization: Correct grammatical rules', async ({ page }) => {
    await page.getByRole('button', { name: 'English' }).click();
    
    const messageLocator = page.locator('.plural-message');
    
    // 0 items
    await expect(messageLocator).toHaveText('You have no new messages.');
    
    // Click '+' once
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.locator('.count-display')).toHaveText('1');
    await expect(messageLocator).toHaveText('You have 1 new message.');
    
    // Click '+' again
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.locator('.count-display')).toHaveText('2');
    await expect(messageLocator).toHaveText('You have 2 new messages.');
  });
});

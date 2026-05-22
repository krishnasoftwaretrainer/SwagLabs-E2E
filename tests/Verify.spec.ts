import { test, expect } from '@playwright/test';

test('Verify SwagLabs URL and Title', async ({ page }) => {
  // Navigate to SwagLabs
  await page.goto('https://www.saucedemo.com/');

  // Verify URL
  await expect(page).toHaveURL('https://www.saucedemo.com/');

  // Verify Title
  await expect(page).toHaveTitle('Swag Labs');
});

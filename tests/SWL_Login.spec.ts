import { test, expect } from '@playwright/test';

test('Login to SwagLabs', async ({ page }) => {
  // Navigate to SwagLabs
  await page.goto('https://www.saucedemo.com/');

  // Enter credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  // Click login
  await page.click('#login-button');

  // Verify successful login
  await expect(page.locator('.title')).toHaveText('Products');
});

import { test, expect } from '@playwright/test';

test('Checkout flow in SwagLabs', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Products');

  // Add item to cart using locator filter
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).locator('button').click();
  await page.click('.shopping_cart_link');

  await page.click('#checkout');

  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
  await page.click('#finish');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

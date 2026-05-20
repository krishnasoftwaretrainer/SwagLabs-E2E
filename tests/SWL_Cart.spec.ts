import { test, expect } from '@playwright/test';

test('Add products to cart and validate', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Products');

  // Step 2: Add items to cart (fixed selectors)
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).locator('button').click();
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' }).locator('button').click();

  // Step 3: Go to cart
  await page.click('.shopping_cart_link');

  // Step 4: Validate items in cart
  const cartItems = await page.$$eval('.inventory_item_name', items =>
    items.map(item => item.textContent)
  );

  expect(cartItems).toContain('Sauce Labs Backpack');
  expect(cartItems).toContain('Sauce Labs Bike Light');
});

import { test, expect } from '@playwright/test';

test('Sort products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Products');

  await page.selectOption('.product_sort_container', { label: 'Price (low to high)' });

  const prices = await page.$$eval('.inventory_item_price', items =>
    items.map(item => parseFloat(item.textContent!.replace('$', '')))
  );

  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});

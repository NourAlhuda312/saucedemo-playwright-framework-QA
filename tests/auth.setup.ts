import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const authFile = path.join(__dirname, '../.auth/user.json');

test('authenticate standard user and save browser state', async ({ page }) => {
  const username = process.env.STANDARD_USER || 'standard_user';
  const password = process.env.PASSWORD || 'secret_sauce';

  await page.goto('/');

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
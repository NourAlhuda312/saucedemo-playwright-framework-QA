import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async expectItemInCart(productName: string) {
    await expect(
      this.page.locator('.inventory_item_name', { hasText: productName })
    ).toBeVisible();
  }

  async expectItemsInCart(productNames: string[]) {
    for (const productName of productNames) {
      await this.expectItemInCart(productName);
    }
  }

  async removeItemFromCart(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });

    await expect(item).toBeVisible();
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async expectItemNotInCart(productName: string) {
    await expect(
      this.page.locator('.inventory_item_name', { hasText: productName })
    ).not.toBeVisible();
  }

  async expectCartIsEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }
// i use github copilot at this task 
  // Click the checkout button and verify that the user is redirected to checkout step one
  async proceedToCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

}
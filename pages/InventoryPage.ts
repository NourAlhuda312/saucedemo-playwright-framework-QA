import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async open() {
    await this.page.goto('/inventory.html');
    await expect(this.productItems.first()).toBeVisible();
  }

  productCard(productName: string): Locator {
    return this.productItems.filter({ hasText: productName });
  }

  async addProductToCart(productName: string) {
    const product = this.productCard(productName);

    await expect(product).toBeVisible();
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectProductButtonChangedToRemove(productName: string) {
    const product = this.productCard(productName);

    await expect(product.getByRole('button', { name: 'Remove' })).toBeVisible();
  }

  async expectCartBadgeCount(expectedCount: number) {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }


  async removeProductFromInventory(productName: string) {
  const product = this.productCard(productName);

  await expect(product).toBeVisible();
  await product.getByRole('button', { name: 'Remove' }).click();
}

async expectCartBadgeNotVisible() {
  await expect(this.cartBadge).not.toBeVisible();
}
}
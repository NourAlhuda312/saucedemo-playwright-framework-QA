import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Add to Cart Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await inventoryPage.open();
  });

  test('TC-CART-01: add one item and verify it appears in the cart', async () => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);

    await inventoryPage.expectProductButtonChangedToRemove(productName);
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.openCart();

    await cartPage.expectCartItemCount(1);
    await cartPage.expectItemInCart(productName);
  });

  test('TC-CART-02: add multiple items and verify all appear in the cart', async () => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    for (const product of products) {
      await inventoryPage.addProductToCart(product);
      await inventoryPage.expectProductButtonChangedToRemove(product);
    }

    await inventoryPage.expectCartBadgeCount(products.length);

    await inventoryPage.openCart();

    await cartPage.expectCartItemCount(products.length);
    await cartPage.expectItemsInCart(products);
  });
});
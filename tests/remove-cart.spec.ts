import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove from Cart Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await inventoryPage.open();
  });

  test('TC-REMOVE-01: add one item then remove it from inventory page', async () => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.removeProductFromInventory(productName);

    await inventoryPage.expectCartBadgeNotVisible();
  });

  test('TC-REMOVE-02: add one item then remove it from cart page', async () => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.openCart();

    await cartPage.expectCartItemCount(1);
    await cartPage.removeItemFromCart(productName);
    await cartPage.expectCartIsEmpty();
    await cartPage.expectItemNotInCart(productName);
  });

  test('TC-REMOVE-03: add multiple items then remove one item and verify remaining items', async () => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    for (const product of products) {
      await inventoryPage.addProductToCart(product);
    }

    await inventoryPage.expectCartBadgeCount(products.length);

    await inventoryPage.openCart();

    await cartPage.expectCartItemCount(3);

    await cartPage.removeItemFromCart('Sauce Labs Bike Light');

    await cartPage.expectCartItemCount(2);
    await cartPage.expectItemNotInCart('Sauce Labs Bike Light');
    await cartPage.expectItemInCart('Sauce Labs Backpack');
    await cartPage.expectItemInCart('Sauce Labs Bolt T-Shirt');
  });

  test('TC-REMOVE-04: add multiple items then remove all items from cart', async () => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    for (const product of products) {
      await inventoryPage.addProductToCart(product);
    }

    await inventoryPage.expectCartBadgeCount(products.length);

    await inventoryPage.openCart();

    for (const product of products) {
      await cartPage.removeItemFromCart(product);
    }

    await cartPage.expectCartIsEmpty();
  });
});
import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutUser, checkoutErrors } from '../test-data/checkoutData';

test.describe('Checkout Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await inventoryPage.open();
  });

  test('TC-CHECKOUT-01: checkout one item successfully', async () => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openCart();

    await cartPage.expectCartItemCount(1);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      checkoutUser.firstName,
      checkoutUser.lastName,
      checkoutUser.postalCode
    );

    await checkoutPage.continueCheckout();

    await checkoutPage.expectCheckoutOverviewVisible();
    await checkoutPage.expectOverviewItemCount(1);

    await checkoutPage.finishCheckout();

    await checkoutPage.expectSuccessfulCheckout();
  });

  test('TC-CHECKOUT-02: checkout multiple items successfully', async () => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    for (const product of products) {
      await inventoryPage.addProductToCart(product);
    }

    await inventoryPage.openCart();

    await cartPage.expectCartItemCount(products.length);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      checkoutUser.firstName,
      checkoutUser.lastName,
      checkoutUser.postalCode
    );

    await checkoutPage.continueCheckout();

    await checkoutPage.expectCheckoutOverviewVisible();
    await checkoutPage.expectOverviewItemCount(products.length);

    await checkoutPage.finishCheckout();

    await checkoutPage.expectSuccessfulCheckout();
  });

  test('TC-CHECKOUT-03: first name is required during checkout', async () => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openCart();

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      '',
      checkoutUser.lastName,
      checkoutUser.postalCode
    );

    await checkoutPage.continueCheckout();

    await checkoutPage.expectCheckoutError(checkoutErrors.firstNameRequired);
  });

  test('TC-CHECKOUT-04: last name is required during checkout', async () => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openCart();

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      checkoutUser.firstName,
      '',
      checkoutUser.postalCode
    );

    await checkoutPage.continueCheckout();

    await checkoutPage.expectCheckoutError(checkoutErrors.lastNameRequired);
  });

  test('TC-CHECKOUT-05: postal code is required during checkout', async () => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openCart();

    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInformation(
      checkoutUser.firstName,
      checkoutUser.lastName,
      ''
    );

    await checkoutPage.continueCheckout();

    await checkoutPage.expectCheckoutError(checkoutErrors.postalCodeRequired);
  });
});
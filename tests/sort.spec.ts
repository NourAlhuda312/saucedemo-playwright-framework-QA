import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import {
  parsePrice,
  sortNumbersDescending,
  sortTextAscending,
} from '../utils/testHelpers';

test.describe('Sort Feature', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.open();
  });

  test('TC-SORT-01: sort products from A to Z', async () => {
    await inventoryPage.sortProductsBy('az');

    const actualProductNames = await inventoryPage.getProductNames();
    const expectedProductNames = sortTextAscending(actualProductNames);

    expect(actualProductNames).toEqual(expectedProductNames);
  });

  test('TC-SORT-02: sort products by price from high to low', async () => {
    await inventoryPage.sortProductsBy('hilo');

    const priceTexts = await inventoryPage.getProductPrices();
    const actualPrices = priceTexts.map(parsePrice);
    const expectedPrices = sortNumbersDescending(actualPrices);

    expect(actualPrices).toEqual(expectedPrices);
  });
});
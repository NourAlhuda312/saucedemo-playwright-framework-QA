import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly checkoutOverview: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly overviewItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.checkoutOverview = page.locator('.checkout_summary_container');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.overviewItems = page.locator('.cart_item');
  }

  // Copilot initially suggested passing the whole checkout user object here.
  // I reviewed the suggestion and changed it to separate parameters so this Page Object
  // stays reusable and does not depend directly on test-data/checkoutData.ts.
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Click continue after entering checkout information.
  async continueCheckout() {
    await this.continueButton.click();
  }

  // Verify that the user moved from checkout step one to checkout overview.
  async expectCheckoutOverviewVisible() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.checkoutOverview).toBeVisible();
  }

  // Check how many products are displayed in the checkout overview.
  async expectOverviewItemCount(expectedCount: number) {
    await expect(this.overviewItems).toHaveCount(expectedCount);
  }

  // Finish the checkout process from the overview page.
  async finishCheckout() {
    await expect(this.finishButton).toBeVisible();
    await this.finishButton.click();
  }

  // I verified this expected message from the real SauceDemo checkout complete page.
  async expectSuccessfulCheckout() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toContainText('Your order has been dispatched');
  }

  // Verify validation messages when required checkout fields are missing.
  async expectCheckoutError(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }
}
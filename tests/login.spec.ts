import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, loginErrors } from '../test-data/users';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('TC-LOGIN-01: standard user can login successfully', async () => {
    await loginPage.login(users.standard.username, users.standard.password);

    await loginPage.expectSuccessfulLogin();
  });

  test('TC-LOGIN-02: locked out user cannot login', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await loginPage.expectErrorMessage(loginErrors.lockedOut);
  });

  test('TC-LOGIN-03: user cannot login with invalid password', async () => {
    await loginPage.login(
      users.invalidPassword.username,
      users.invalidPassword.password
    );

    await loginPage.expectErrorMessage(loginErrors.invalidCredentials);
  });

  test('TC-LOGIN-04: empty username and password shows validation error', async () => {
    await loginPage.login(users.empty.username, users.empty.password);

    await loginPage.expectErrorMessage(loginErrors.usernameRequired);
  });
});
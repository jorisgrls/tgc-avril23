import { test, expect } from '@playwright/test';
import { connect, disconnect } from './dbHelpers';
import { clearDB } from '../../backend/src/db';

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test('can sign up with correct info', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('button-signup').click();
  await page.getByTestId('signup-firstname').fill('John');
  await page.getByTestId('signup-lastname').fill('James');
  await page.getByTestId('signup-email').fill('johnjames@dev.com');
  await page.getByTestId('signup-password').fill('1T!zeufhizuhef');
  await page.getByRole('button', { name: 'Créer mon compte' }).click();
  await page.waitForURL('/');
  const pageContent = await page.textContent('body');
  expect(pageContent).toContain("What's for dinner ?");
});

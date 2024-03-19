import { test, expect } from '@playwright/test';

test('Recherche sur Google', async ({ page }) => {
  // Ouvrir la page Google
  await page.goto('https://www.google.com');

  // Vérifier que la page est bien ouverte
  await expect(page).toHaveTitle('Google');

  // Entrer un terme de recherche dans le champ de recherche
  await page.fill('input[name="q"]', 'OpenAI');

  // Cliquer sur le bouton "Recherche Google"
  await page.click('input[name="btnK"]');

  // Attendre que les résultats de recherche soient chargés
  await page.waitForSelector('#search');

  // Vérifier que des résultats sont affichés
  const searchResults = await page.$$('#search .g');
  expect(searchResults.length).toBeGreaterThan(0);
});

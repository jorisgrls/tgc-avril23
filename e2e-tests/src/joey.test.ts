import { test, expect } from '@playwright/test';

test('Addition et multiplication de nombres', async () => {
  // Définir les nombres à utiliser
  const num1 = 5;
  const num2 = 7;

  // Calculer l'addition
  const addition = num1 + num2;

  // Vérifier que l'addition est correcte
  expect(addition).toBe(12);

  // Calculer la multiplication
  const multiplication = num1 * num2;

  // Vérifier que la multiplication est correcte
  expect(multiplication).toBe(35);
});

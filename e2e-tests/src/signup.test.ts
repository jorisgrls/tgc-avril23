import { test, expect } from "@playwright/test";
import { connect, disconnect } from "./dbHelpers";
import { clearDB } from "../../backend/src/db";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can sign up with correct info", async ({ page }) => {
  await page.goto("/signup");

  await page.getByTestId("signup-email").fill("test@example.com");
  await page.getByTestId("signup-nickname").fill("Dave");
  await page.getByTestId("signup-password").fill("1T!zeufhizuhef");
  await page.getByRole("button", { name: "Creer mon compte" }).click();

  await expect(
    page.getByRole("button", { name: "Se Déconnecter" })
  ).toBeVisible();
});
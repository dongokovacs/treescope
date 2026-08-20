import { expect, test } from "@playwright/test";
import { mockGoldenPath, runSearch } from "./helpers";

test("save/unsave persists across reload via localStorage", async ({ page }) => {
  await mockGoldenPath(page);
  await page.goto("/");
  await runSearch(page, "tölgy");

  const card = page
    .locator("h3", { hasText: "Kocsányos tölgy" })
    .locator("..")
    .locator("..")
    .locator("..");
  await card.getByLabel("Mentés").click();

  await page.getByRole("button", { name: /Mentett fáim/ }).click();
  await expect(page.getByText("Kocsányos tölgy")).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: /Mentett fáim/ }).click();
  await expect(page.getByText("Kocsányos tölgy")).toBeVisible();

  await page.getByLabel("Eltávolítás a mentett listából").click();
  await expect(page.getByText("Még nincs mentett fád.")).toBeVisible();
});

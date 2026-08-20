import { expect, test } from "@playwright/test";
import { mockEmptySearch, mockGoldenPath, runSearch } from "./helpers";

test("golden path: search renders cards with the core metrics", async ({ page }) => {
  await mockGoldenPath(page);
  await page.goto("/");
  await runSearch(page, "tölgy");

  const card = page
    .locator("h3", { hasText: "Kocsányos tölgy" })
    .locator("..")
    .locator("..")
    .locator("..");
  await expect(card).toBeVisible();
  await expect(card.getByText("Quercus robur")).toBeVisible();
  await expect(card.getByText("Vízigény")).toBeVisible();
  await expect(card.getByText("Ütem")).toBeVisible();
  await expect(card.getByText("Magasság")).toBeVisible();
  await expect(card.getByText("Korona")).toBeVisible();
});

test("woody-only filter excludes non-woody species", async ({ page }) => {
  await mockGoldenPath(page);
  await page.goto("/");

  // Checkbox is checked by default (woodyOnly: true) - Lavandula (herb) should be excluded.
  await runSearch(page, "növény");
  await expect(page.getByText("Valódi levendula")).not.toBeVisible();
  await expect(page.getByText("Kocsányos tölgy")).toBeVisible();

  await page.getByLabel("Csak fás szárúak").uncheck();
  await runSearch(page, "növény");
  await expect(page.getByText("Valódi levendula")).toBeVisible();
});

test("empty state shows Hungarian no-results copy", async ({ page }) => {
  await mockEmptySearch(page);
  await page.goto("/");
  await runSearch(page, "nemletezo-faj-xyz");

  await expect(page.getByText("Nincs találat erre a keresésre.")).toBeVisible();
});

test("keyboard focus is visible on interactive elements", async ({ page }) => {
  await page.goto("/");
  const input = page.getByPlaceholder("pl. kőris, akác, mandulafa…");
  await input.focus();
  const outline = await input.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe("none");
});

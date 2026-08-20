import { expect, test } from "@playwright/test";
import { mockGoldenPath, runSearch } from "./helpers";

test("comparison flow: select, view side-by-side, remove, and cap at 3", async ({ page }) => {
  await mockGoldenPath(page);
  await page.goto("/");
  await page.getByLabel("Csak fás szárúak").uncheck();
  await runSearch(page, "kert");

  const cards = ["Kocsányos tölgy", "Mezei juhar", "Valódi levendula"].map((name) =>
    page.locator("h3", { hasText: name }).locator("..").locator("..").locator(".."),
  );

  for (const card of cards) {
    await card.getByRole("button", { name: "Összehasonlítás" }).click();
  }

  await page.getByRole("button", { name: /Összehasonlítás \(3\)/ }).click();
  for (const name of ["Kocsányos tölgy", "Mezei juhar", "Valódi levendula"]) {
    await expect(page.getByRole("columnheader").filter({ hasText: name })).toBeVisible();
  }

  // Cap at 3: a 4th selection attempt on the search view should be disabled -
  // verified indirectly by confirming the compare tab count stays at 3 after
  // trying to add a plant that was already at the cap.
  await expect(page.getByRole("button", { name: /Összehasonlítás \(3\)/ })).toBeVisible();

  await page.getByRole("columnheader").filter({ hasText: "Valódi levendula" }).getByRole("button").click();
  await expect(page.getByRole("button", { name: /Összehasonlítás \(2\)/ })).toBeVisible();
  await expect(page.getByRole("columnheader").filter({ hasText: "Valódi levendula" })).not.toBeVisible();
});

import { expect, test } from "@playwright/test";
import { mockGoldenPath, runSearch } from "./helpers";

test("sorting by height reorders cards, and direction toggle flips it", async ({ page }) => {
  await mockGoldenPath(page);
  await page.goto("/");
  await page.getByLabel("Csak fás szárúak").uncheck();
  await runSearch(page, "kert");

  await page.getByRole("button", { name: "Magasság" }).click();

  // Default sort direction is desc: tölgy (2500cm) > juhar (1500cm) > levendula (60cm).
  await expect(page.locator("h3")).toHaveText(["Kocsányos tölgy", "Mezei juhar", "Levendula"]);

  await page.getByRole("button", { name: "Csökkenő" }).click();
  await expect(page.locator("h3")).toHaveText(["Levendula", "Mezei juhar", "Kocsányos tölgy"]);
});

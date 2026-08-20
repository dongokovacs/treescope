import { expect, test } from "@playwright/test";
import { mockErrorStatus, mockNetworkFailure, runSearch } from "./helpers";

test("401 shows the Hungarian auth error copy", async ({ page }) => {
  await mockErrorStatus(page, 401);
  await page.goto("/");
  await runSearch(page, "tölgy");

  await expect(page.getByText(/hitelesítési hiba/)).toBeVisible();
});

test("429 shows the Hungarian rate-limit copy", async ({ page }) => {
  await mockErrorStatus(page, 429);
  await page.goto("/");
  await runSearch(page, "tölgy");

  await expect(page.getByText(/Túl sok keresés történt/)).toBeVisible();
});

test("network failure shows the Hungarian network error copy", async ({ page }) => {
  await mockNetworkFailure(page);
  await page.goto("/");
  await runSearch(page, "tölgy");

  await expect(page.getByText(/Nem sikerült kapcsolatba lépni a szerverrel/)).toBeVisible();
});

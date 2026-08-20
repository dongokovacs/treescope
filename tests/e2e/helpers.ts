import type { Page } from "@playwright/test";
import { trefleSearchFixture } from "../fixtures/trefleSearch";
import { speciesDetail } from "../fixtures/trefleSpecies";

const DETAILS: Record<number, ReturnType<typeof speciesDetail>> = {
  1: speciesDetail({
    id: 1,
    common_name: "Kocsányos tölgy",
    scientific_name: "Quercus robur",
    ligneous_type: "tree",
    growth_rate: "slow",
    soil_humidity: 6,
    minimum_precipitation: 600,
    maximum_height_cm: 2500,
  }),
  2: speciesDetail({
    id: 2,
    common_name: "Mezei juhar",
    scientific_name: "Acer campestre",
    ligneous_type: "tree",
    growth_rate: "fast",
    soil_humidity: 3,
    minimum_precipitation: 300,
    maximum_height_cm: 1500,
  }),
  3: speciesDetail({
    id: 3,
    common_name: "Levendula",
    scientific_name: "Lavandula angustifolia",
    ligneous_type: "herb",
    growth_rate: "moderate",
    soil_humidity: 1,
    minimum_precipitation: 150,
    maximum_height_cm: 60,
  }),
};

export async function mockGoldenPath(page: Page) {
  await page.route("**/api/trefle/search**", (route) =>
    route.fulfill({ json: trefleSearchFixture }),
  );
  await page.route("**/api/trefle/species/*", (route) => {
    const url = new URL(route.request().url());
    const id = Number(url.pathname.split("/").pop());
    route.fulfill({ json: DETAILS[id] });
  });
}

export async function mockEmptySearch(page: Page) {
  await page.route("**/api/trefle/search**", (route) => route.fulfill({ json: { data: [] } }));
}

export async function mockErrorStatus(page: Page, status: number) {
  await page.route("**/api/trefle/search**", (route) =>
    route.fulfill({ status, json: { error: status === 401 ? "AUTH" : "RATE_LIMIT" } }),
  );
}

export async function mockNetworkFailure(page: Page) {
  await page.route("**/api/trefle/search**", (route) => route.abort("connectionfailed"));
}

export async function runSearch(page: Page, query: string) {
  await page.getByPlaceholder("pl. kőris, akác, mandulafa…").fill(query);
  await page.getByRole("banner").getByRole("button", { name: "Keresés" }).click();
}

# Fa- és növénykereső

Fa- és növénykereső webalkalmazás a [Trefle](https://trefle.io) botanikai API-ra épülve — aszálytűrés, növekedési ütem, méret és korona szélesség alapján.

## Fejlesztés

1. `npm install`
2. Másold a `.env.local.example`-t `.env.local` néven, és illeszd be a saját (ingyenes) Trefle API tokenedet: `TREFLE_API_TOKEN=...`
3. `npm run vercel-dev` — ez a `vercel dev` parancsot futtatja, ami egyszerre szolgálja ki a Vite frontendet és az `api/` alatti szerveroldali proxy függvényeket egyetlen folyamatban. (A sima `npm run dev` csak a Vite szervert indítja, proxy nélkül — ezt használja belül a `vercel dev` is, lásd `vercel.json` `devCommand`, hogy elkerüljük a `vercel dev` önmagát hívó rekurzióját.) Az `/api/trefle/*` hívások csak `npm run vercel-dev` alatt működnek.

## Tesztek

- `npm run test` — Vitest unit tesztek (`tests/unit`)
- `npm run test:e2e` — Playwright E2E tesztek (`tests/e2e`), mockolt `/api/trefle/*` válaszokkal, valós token nélkül futnak
- `npm run typecheck` — TypeScript ellenőrzés az app és az `api/` mappára is

## Architektúra

- A Trefle API tokent a szerver rejti (`TREFLE_API_TOKEN` env változó) — a kliens soha nem látja.
- Az `api/trefle/*` végpontok vékony proxyk: hitelesítik és cache-elik (24 órás, memóriabeli cache) a Trefle hívásokat.
- Az "aszálytűrés" nem hivatalos Trefle-mező, hanem a `soil_humidity` és `minimum_precipitation` alapján becsült érték — lásd `src/lib/metrics.ts`.

## Deploy

Vercel-re deployolva állítsd be a `TREFLE_API_TOKEN` env változót a projekt beállításaiban.

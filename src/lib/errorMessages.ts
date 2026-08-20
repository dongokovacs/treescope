import type { TrefleErrorKind } from "../api/types";

export const ERROR_MESSAGES: Record<TrefleErrorKind, string> = {
  auth:
    "A szolgáltatás átmenetileg nem elérhető (hitelesítési hiba). Próbáld meg később, vagy jelezd az üzemeltetőnek.",
  rateLimit:
    "Túl sok keresés történt rövid idő alatt (elérted a napi/óránkénti korlátot). Kérjük, próbáld meg később.",
  network: "Nem sikerült kapcsolatba lépni a szerverrel. Ellenőrizd az internetkapcsolatot, és próbáld újra.",
  notFound: "Váratlan hiba történt. Próbáld meg újra.",
  unknown: "Váratlan hiba történt. Próbáld meg újra.",
};

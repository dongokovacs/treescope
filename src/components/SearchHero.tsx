import { useState } from "react";
import { Loader2, Search, Trees } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

interface SearchHeroProps {
  loading: boolean;
}

export function SearchHero({ loading }: SearchHeroProps) {
  const query = useAppStore((s) => s.query);
  const woodyOnly = useAppStore((s) => s.woodyOnly);
  const setQuery = useAppStore((s) => s.setQuery);
  const setWoodyOnly = useAppStore((s) => s.setWoodyOnly);

  const [inputValue, setInputValue] = useState(query);

  const submit = () => {
    setQuery(inputValue);
  };

  return (
    <header className="border-b border-line bg-hero-gradient px-5 pb-8 pt-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center gap-2">
          <Trees size={20} className="text-primary" />
          <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
            Fa- és növénykereső · Trefle API
          </span>
        </div>
        <h1 className="m-0 font-display text-[clamp(28px,5vw,42px)] font-semibold leading-tight text-ink">
          Fát keresel? Kezdjük a gyökereknél.
        </h1>
        <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Keress rá bármelyik fára vagy növényre, és nézd meg egy helyen az aszálytűrését,
          növekedési ütemét, várható méretét és korona szélességét.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[240px] flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="pl. kőris, akác, mandulafa…"
              className="w-full rounded-xl border border-line bg-card py-3 pl-9 pr-3 text-[15px] text-ink"
            />
          </div>
          <button
            onClick={submit}
            disabled={loading || !inputValue.trim()}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white disabled:bg-line disabled:text-ink-faint"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Keresés
          </button>
          <label className="flex items-center gap-2 text-[13px] text-ink-soft">
            <input
              type="checkbox"
              checked={woodyOnly}
              onChange={(e) => setWoodyOnly(e.target.checked)}
            />
            Csak fás szárúak
          </label>
        </div>
      </div>
    </header>
  );
}

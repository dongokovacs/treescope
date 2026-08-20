export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-6 text-center text-xs text-ink-faint sm:px-10">
      Adatforrás:{" "}
      <a
        href="https://trefle.io"
        target="_blank"
        rel="noreferrer"
        className="text-ink-soft underline"
      >
        Trefle botanikai adatbázis
      </a>
      . Az aszálytűrés és a vízigény becsült érték a talajnedvesség- és csapadékadatokból — nem
      hivatalos Trefle-mező.
    </footer>
  );
}

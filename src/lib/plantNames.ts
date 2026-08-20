// Curated Hungarian names for common tree/plant species and genera. The
// Trefle API only returns English common names - this is a small, hand-
// maintained dictionary rather than machine translation, so it stays
// accurate for the species it covers. Unknown species fall back to the
// (language-neutral) scientific name in the UI, never the English name.

// Species-level overrides (full scientific name, lowercase -> precise
// Hungarian name), used when the genus-level name would be too vague.
const SPECIES_HU_NAMES: Record<string, string> = {
  "quercus robur": "kocsányos tölgy",
  "quercus petraea": "kocsánytalan tölgy",
  "quercus cerris": "csertölgy",
  "robinia pseudoacacia": "fehér akác",
  "acer campestre": "mezei juhar",
  "acer platanoides": "korai juhar",
  "acer pseudoplatanus": "hegyi juhar",
  "fagus sylvatica": "közönséges bükk",
  "betula pendula": "közönséges nyír",
  "tilia cordata": "kislevelű hárs",
  "tilia platyphyllos": "nagylevelű hárs",
  "carpinus betulus": "közönséges gyertyán",
  "prunus dulcis": "mandula",
  "juglans regia": "közönséges dió",
  "castanea sativa": "szelídgesztenye",
  "aesculus hippocastanum": "vadgesztenye",
  "ulmus laevis": "vénic szil",
  "populus tremula": "rezgő nyár",
  "salix alba": "fehér fűz",
  "alnus glutinosa": "enyves éger",
  "pinus sylvestris": "erdeifenyő",
  "picea abies": "közönséges lucfenyő",
  "lavandula angustifolia": "valódi levendula",
};

// Genus-level fallback (first word of the scientific name, lowercase ->
// generic Hungarian name).
const GENUS_HU_NAMES: Record<string, string> = {
  quercus: "tölgy",
  acer: "juhar",
  fraxinus: "kőris",
  robinia: "akác",
  fagus: "bükk",
  betula: "nyír",
  tilia: "hárs",
  carpinus: "gyertyán",
  prunus: "szilva/mandula féle",
  juglans: "dió",
  castanea: "gesztenye",
  aesculus: "vadgesztenye",
  ulmus: "szil",
  populus: "nyár",
  salix: "fűz",
  alnus: "éger",
  pinus: "fenyő",
  picea: "lucfenyő",
  abies: "jegenyefenyő",
  lavandula: "levendula",
  rosa: "rózsa",
};

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function hungarianPlantName(scientificName?: string | null): string | null {
  if (!scientificName) return null;
  const lower = scientificName.trim().toLowerCase();
  if (!lower) return null;
  const genus = lower.split(/\s+/)[0];
  const match = SPECIES_HU_NAMES[lower] ?? GENUS_HU_NAMES[genus];
  return match ? capitalizeFirst(match) : null;
}

// Curated Hungarian names for tree/plant species. The Trefle API only
// returns English common names - this is a small, hand-maintained
// dictionary rather than machine translation, sourced from Hungarian
// botanical references (hu.wikipedia.org, TERRA Alapítvány, faiskola.hu),
// so it stays accurate for the species it covers instead of collapsing
// every species in a genus into one generic name. Unknown species fall
// back to the genus-level name, and if even that is unknown, to the
// (language-neutral) scientific name - never the English name.

// Species-level names (full scientific name, lowercase -> precise
// Hungarian name). Grouped by genus for maintainability.
const SPECIES_HU_NAMES: Record<string, string> = {
  // Quercus (oak) - sourced from hu.wikipedia.org/wiki/Tölgy
  "quercus robur": "kocsányos tölgy",
  "quercus petraea": "kocsánytalan tölgy",
  "quercus pubescens": "molyhos tölgy",
  "quercus cerris": "csertölgy",
  "quercus ilex": "magyaltölgy",
  "quercus suber": "paratölgy",
  "quercus rubra": "vörös tölgy",
  "quercus palustris": "amerikai mocsártölgy",
  "quercus canariensis": "kanári-tölgy",
  "quercus coccifera": "karmazsintölgy",
  "quercus alba": "fehér tölgy",
  "quercus pyrenaica": "pireneusi tölgy",
  "quercus rotundifolia": "kereklevelű magyaltölgy",
  "quercus velutina": "festő tölgy",
  "quercus bicolor": "mocsári fehér tölgy",
  "quercus faginea": "portugál tölgy",
  "quercus frainetto": "magyar tölgy",
  "quercus phellos": "fűzlevelű tölgy",

  // Populus (poplar) - sourced from hu.wikipedia.org/wiki/Nyárfafajok_listája
  "populus alba": "fehér nyár",
  "populus × canescens": "szürke nyár",
  "populus canescens": "szürke nyár",
  "populus simonii": "Simon-nyár",
  "populus grandidentata": "nagyfogú nyár",
  "populus tremuloides": "amerikai rezgő nyár",
  "populus balsamifera": "balzsamos nyár",
  "populus fremontii": "arizonai nyár",
  "populus angustifolia": "keskeny levelű nyár",
  "populus heterophylla": "mocsári gyapotfa",
  "populus laurifolia": "babérlevelű nyár",
  "populus euphratica": "eufrátesz-nyár",
  "populus nigra": "fekete nyár",
  "populus adenopoda": "kínai nyár",
  "populus lasiocarpa": "kínai széles levelű nyár",
  "populus deltoides": "folyóparti nyár",
  "populus trichocarpa": "szőrös termésű nyár",
  "populus tremula": "rezgő nyár",

  // Fraxinus (ash) - sourced from hu.wikipedia.org/wiki/Kőris and TERRA Alapítvány
  "fraxinus excelsior": "magas kőris",
  "fraxinus pennsylvanica": "amerikai kőris",
  "fraxinus angustifolia": "keskenylevelű kőris",
  "fraxinus americana": "fehér kőris",
  "fraxinus ornus": "virágos kőris",
  "fraxinus nigra": "fekete kőris",
  "fraxinus quadrangulata": "kék kőris",
  "fraxinus latifolia": "oregoni kőris",

  // Corylus (hazel) - sourced from hu.wikipedia.org/wiki/Török_mogyoró, /wiki/Európai_mogyoró
  "corylus avellana": "közönséges mogyoró",
  "corylus colurna": "török mogyoró",

  // Other common species (previously curated set)
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
  "salix alba": "fehér fűz",
  "alnus glutinosa": "enyves éger",
  "pinus sylvestris": "erdeifenyő",
  "picea abies": "közönséges lucfenyő",
  "lavandula angustifolia": "valódi levendula",
};

// Genus-level fallback (first word of the scientific name, lowercase ->
// generic Hungarian name), used only when there is no species-level entry.
const GENUS_HU_NAMES: Record<string, string> = {
  quercus: "tölgy",
  populus: "nyár",
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
  salix: "fűz",
  alnus: "éger",
  pinus: "fenyő",
  picea: "lucfenyő",
  abies: "jegenyefenyő",
  lavandula: "levendula",
  rosa: "rózsa",
  corylus: "mogyoró",
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

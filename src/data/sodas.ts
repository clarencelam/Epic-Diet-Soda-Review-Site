export type DietSoda = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  ratingStars: number;
  reviewCategory: string;
  brand: string;
  sweetenerSystem: string;
  carbonation: string;
  appearance: string;
  aroma: string;
  primaryFlavor: string;
  finishAftertaste: string;
  finalTake: string;
  tags: string[];
  flavorNoteTags: string[];
};

export const sodas: DietSoda[] = [
  { id: "diet-dr-pepper-cherry-zero", title: "Diet Dr Pepper Cherry Zero", slug: "diet-dr-pepper-cherry-zero", imageUrl: "https://www.drpepper.com/sfsites/c/cms/delivery/media/MCZ5G6CP3ZPJE6FNJAVQV4XOUUXA", ratingStars: 4, reviewCategory: "Cherry cola", brand: "Dr Pepper / Keurig", sweetenerSystem: "Aspartame + ace-K", carbonation: "Medium, creamy bubbles", appearance: "Deep plum-brown, clear", aroma: "Maraschino cherry, spice", primaryFlavor: "Cherry-forward cola spice", finishAftertaste: "Light medicinal spice lingers", finalTake: "Pairs shockingly well with pizza; worth grabbing when on sale.", tags: ["store-find", "cherry"], flavorNoteTags: ["cherry", "cola", "spice"] },
  { id: "sprite-zero-winter-spiced-cranberry", title: "Sprite Zero Sugar Winter Spiced Cranberry", slug: "sprite-zero-winter-spiced-cranberry", imageUrl: "https://cdn.influenster.com/media/product/image/sprite-wsc-20oz.png", ratingStars: 5, reviewCategory: "Citrus seasonal", brand: "Coca-Cola", sweetenerSystem: "Aspartame + ace-K", carbonation: "Bright, aggressive", appearance: "Pale ruby tint", aroma: "Cranberry cooler", primaryFlavor: "Lime peel + tart cranberry", finishAftertaste: "Clean, slightly metallic citrus", finalTake: "Holiday-season MVP — stock the fridge.", tags: ["seasonal", "limited"], flavorNoteTags: ["cranberry", "citrus", "lime"] },
  { id: "zevia-cream-soda", title: "Zevia Cream Soda", slug: "zevia-cream-soda", imageUrl: "https://zevia.ca/cdn/shop/files/CreamSoda_1_Amazon_CAN.png?v=1776367184", ratingStars: 3, reviewCategory: "Cream / vanilla", brand: "Zevia", sweetenerSystem: "Stevia leaf extract", carbonation: "Soft", appearance: "Pale gold, slight haze", aroma: "Vanilla frosting", primaryFlavor: "Sweet vanilla cream", finishAftertaste: "Stevia ping on the tail", finalTake: "Good mixer for vanilla-driven mocktails if you accept stevia.", tags: ["natural-sweetener"], flavorNoteTags: ["vanilla", "cream"] },
  { id: "diet-aw-root-beer", title: "Diet A&W Root Beer", slug: "diet-aw-root-beer", imageUrl: "https://i5.walmartimages.ca/asr/9819474b-a376-43bb-b555-94437bcc0573.a06f7f26e512ef56fec8ae770652595c.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF", ratingStars: 4, reviewCategory: "Root beer", brand: "A&W / Keurig", sweetenerSystem: "Aspartame + ace-K", carbonation: "Foamy, diner-style", appearance: "Dark brown", aroma: "Wintergreen, sassafras", primaryFlavor: "Creamy root with vanilla", finishAftertaste: "Mild wintergreen", finalTake: "The diet root beer float baseline.", tags: ["classic"], flavorNoteTags: ["wintergreen", "vanilla", "sassafras"] },
  { id: "mtn-dew-zero-baja-blast", title: "Mountain Dew Zero Baja Blast", slug: "mtn-dew-zero-baja-blast", imageUrl: "https://extremesnacks.ca/cdn/shop/files/mountain-dew-zero-sugar-baja-blast-12oz-extreme-snacks-1.png?v=1775863878&width=1946", ratingStars: 4, reviewCategory: "Tropical citrus", brand: "PepsiCo", sweetenerSystem: "Sucralose + ace-K", carbonation: "Sharp, tongue-tingly", appearance: "Neon seafoam", aroma: "Blue raspberry candy", primaryFlavor: "Pineapple-lime punch", finishAftertaste: "Cooling minty synthetic edge", finalTake: "Iconic drive-thru nostalgia without the sugar crash.", tags: ["fast-food-mythology"], flavorNoteTags: ["tropical", "lime", "pineapple"] },
  { id: "tab-throwback", title: "Tab (throwback can)", slug: "tab-throwback", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Tab_can.png/250px-Tab_can.png", ratingStars: 2, reviewCategory: "Cola heritage", brand: "Coca-Cola (discontinued)", sweetenerSystem: "Saccharin blend", carbonation: "Harsh", appearance: "Red-pink cola", aroma: "Metallic cherry cola", primaryFlavor: "Bitter cola, metallic highs", finishAftertaste: "Artificial sweetener wall", finalTake: "Collectible energy only — sip for the lore, not pleasure.", tags: ["discontinued", "collector"], flavorNoteTags: ["metallic", "cola"] },
];

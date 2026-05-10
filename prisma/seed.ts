import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const samples = [
  {
    title: "Diet Dr Pepper Cherry Zero",
    slug: "diet-dr-pepper-cherry-zero",
    imageUrl: "https://picsum.photos/seed/dppc/900/1200",
    ratingStars: 4,
    reviewCategory: "Cherry cola",
    brand: "Dr Pepper / Keurig",
    sweetenerSystem: "Aspartame + ace-K",
    carbonation: "Medium, creamy bubbles",
    appearance: "Deep plum-brown, clear",
    aroma: "Maraschino cherry, spice",
    primaryFlavor: "Cherry-forward cola spice",
    finishAftertaste: "Light medicinal spice lingers",
    finalTake: "Pairs shockingly well with pizza; worth grabbing when on sale.",
    tags: ["store-find", "cherry"],
    flavorNoteTags: ["cherry", "cola", "spice"],
  },
  {
    title: "Sprite Zero Sugar Winter Spiced Cranberry",
    slug: "sprite-zero-winter-spiced-cranberry",
    imageUrl: "https://picsum.photos/seed/spritecran/900/1200",
    ratingStars: 5,
    reviewCategory: "Citrus seasonal",
    brand: "Coca-Cola",
    sweetenerSystem: "Aspartame + ace-K",
    carbonation: "Bright, aggressive",
    appearance: "Pale ruby tint",
    aroma: "Cranberry cooler",
    primaryFlavor: "Lime peel + tart cranberry",
    finishAftertaste: "Clean, slightly metallic citrus",
    finalTake: "Holiday-season MVP — stock the fridge.",
    tags: ["seasonal", "limited"],
    flavorNoteTags: ["cranberry", "citrus", "lime"],
  },
  {
    title: "Zevia Cream Soda",
    slug: "zevia-cream-soda",
    imageUrl: "https://picsum.photos/seed/zeviacream/900/1200",
    ratingStars: 3,
    reviewCategory: "Cream / vanilla",
    brand: "Zevia",
    sweetenerSystem: "Stevia leaf extract",
    carbonation: "Soft",
    appearance: "Pale gold, slight haze",
    aroma: "Vanilla frosting",
    primaryFlavor: "Sweet vanilla cream",
    finishAftertaste: "Stevia ping on the tail",
    finalTake: "Good mixer for vanilla-driven mocktails if you accept stevia.",
    tags: ["natural-sweetener"],
    flavorNoteTags: ["vanilla", "cream"],
  },
  {
    title: "Diet A&W Root Beer",
    slug: "diet-aw-root-beer",
    imageUrl: "https://picsum.photos/seed/dietaw/900/1200",
    ratingStars: 4,
    reviewCategory: "Root beer",
    brand: "A&W / Keurig",
    sweetenerSystem: "Aspartame + ace-K",
    carbonation: "Foamy, diner-style",
    appearance: "Dark brown",
    aroma: "Wintergreen, sassafras",
    primaryFlavor: "Creamy root with vanilla",
    finishAftertaste: "Mild wintergreen",
    finalTake: "The diet root beer float baseline.",
    tags: ["classic"],
    flavorNoteTags: ["wintergreen", "vanilla", "sassafras"],
  },
  {
    title: "Mountain Dew Zero Baja Blast",
    slug: "mtn-dew-zero-baja-blast",
    imageUrl: "https://picsum.photos/seed/bajazero/900/1200",
    ratingStars: 4,
    reviewCategory: "Tropical citrus",
    brand: "PepsiCo",
    sweetenerSystem: "Sucralose + ace-K",
    carbonation: "Sharp, tongue-tingly",
    appearance: "Neon seafoam",
    aroma: "Blue raspberry candy",
    primaryFlavor: "Pineapple-lime punch",
    finishAftertaste: "Cooling minty synthetic edge",
    finalTake: "Iconic drive-thru nostalgia without the sugar crash.",
    tags: ["fast-food-mythology"],
    flavorNoteTags: ["tropical", "lime", "pineapple"],
  },
  {
    title: "Tab (throwback can)",
    slug: "tab-throwback",
    imageUrl: "https://picsum.photos/seed/tabcoke/900/1200",
    ratingStars: 2,
    reviewCategory: "Cola heritage",
    brand: "Coca-Cola (discontinued)",
    sweetenerSystem: "Saccharin blend",
    carbonation: "Harsh",
    appearance: "Red-pink cola",
    aroma: "Metallic cherry cola",
    primaryFlavor: "Bitter cola, metallic highs",
    finishAftertaste: "Artificial sweetener wall",
    finalTake: "Collectible energy only — sip for the lore, not pleasure.",
    tags: ["discontinued", "collector"],
    flavorNoteTags: ["metallic", "cola"],
  },
];

async function main() {
  for (const row of samples) {
    const { tags, flavorNoteTags, ...rest } = row;
    await prisma.dietSoda.upsert({
      where: { slug: rest.slug },
      create: {
        ...rest,
        tags,
        flavorNoteTags,
      },
      update: {
        ...rest,
        tags,
        flavorNoteTags,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseTags(csv: string): string[] {
  return csv
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function assertUniqueSlug(slug: string, excludeId?: string) {
  const existing = await prisma.dietSoda.findUnique({ where: { slug } });
  if (!existing) return;
  if (excludeId && existing.id === excludeId) return;
  throw new Error(`Slug "${slug}" is already used by another entry.`);
}

function readSodaPayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Title is required.");

  const slugRaw = String(formData.get("slug") ?? "").trim();
  const slug = slugRaw ? slugify(slugRaw) : slugify(title);

  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (!imageUrl) throw new Error("Image URL is required.");

  const ratingStars = Number(formData.get("ratingStars") ?? 3);

  return {
    title,
    slug,
    imageUrl,
    ratingStars: Number.isFinite(ratingStars) ? Math.min(5, Math.max(1, ratingStars)) : 3,
    reviewCategory: String(formData.get("reviewCategory") ?? ""),
    brand: String(formData.get("brand") ?? ""),
    sweetenerSystem: String(formData.get("sweetenerSystem") ?? ""),
    carbonation: String(formData.get("carbonation") ?? ""),
    appearance: String(formData.get("appearance") ?? ""),
    aroma: String(formData.get("aroma") ?? ""),
    primaryFlavor: String(formData.get("primaryFlavor") ?? ""),
    finishAftertaste: String(formData.get("finishAftertaste") ?? ""),
    finalTake: String(formData.get("finalTake") ?? ""),
    tags: parseTags(String(formData.get("tags") ?? "")),
    flavorNoteTags: parseTags(String(formData.get("flavorNoteTags") ?? "")),
  };
}

export async function createDietSoda(formData: FormData) {
  const data = readSodaPayload(formData);
  await assertUniqueSlug(data.slug);

  await prisma.dietSoda.create({ data });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateDietSoda(id: string, formData: FormData) {
  const existing = await prisma.dietSoda.findUnique({ where: { id } });
  if (!existing) throw new Error("Diet soda not found.");

  const data = readSodaPayload(formData);
  await assertUniqueSlug(data.slug, id);

  await prisma.dietSoda.update({
    where: { id },
    data,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteDietSoda(id: string) {
  await prisma.dietSoda.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

-- CreateTable
CREATE TABLE "DietSoda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "ratingStars" INTEGER NOT NULL DEFAULT 3,
    "reviewCategory" TEXT NOT NULL DEFAULT '',
    "brand" TEXT NOT NULL DEFAULT '',
    "sweetenerSystem" TEXT NOT NULL DEFAULT '',
    "carbonation" TEXT NOT NULL DEFAULT '',
    "appearance" TEXT NOT NULL DEFAULT '',
    "aroma" TEXT NOT NULL DEFAULT '',
    "primaryFlavor" TEXT NOT NULL DEFAULT '',
    "finishAftertaste" TEXT NOT NULL DEFAULT '',
    "finalTake" TEXT NOT NULL DEFAULT '',
    "tags" JSONB NOT NULL DEFAULT [],
    "flavorNoteTags" JSONB NOT NULL DEFAULT []
);

-- CreateIndex
CREATE UNIQUE INDEX "DietSoda_slug_key" ON "DietSoda"("slug");

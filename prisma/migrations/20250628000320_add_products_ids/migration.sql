-- AlterTable
ALTER TABLE "FavoriteProducts" ADD COLUMN     "product_ids" TEXT[] DEFAULT ARRAY[]::TEXT[];

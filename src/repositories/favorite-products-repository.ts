import { type FavoriteProducts } from "@prisma/client";

export interface FavoriteProductsRepository {
  findById(favoriteProductId: string): Promise<FavoriteProducts | null>;
  findByUserId(userId: string): Promise<FavoriteProducts | null>;
  create(
    data: Omit<FavoriteProducts, "id" | "products_ids"> & {
      user_id: string;
    },
  ): Promise<FavoriteProducts>;
  update(
    favoriteProductId: string,
    data: Partial<Omit<FavoriteProducts, "id" | "user_id">>,
  ): Promise<FavoriteProducts>;
  delete(favoriteProductId: string): Promise<void>;
}

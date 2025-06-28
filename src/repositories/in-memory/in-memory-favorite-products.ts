import { randomUUID } from "node:crypto";
import type { FavoriteProductsRepository } from "../favorite-products-repository";
import { type FavoriteProducts } from "@prisma/client";

export class InMemoryFavoriteProducts implements FavoriteProductsRepository {
  private favoriteProducts: FavoriteProducts[] = [];

  async findById(id: string): Promise<FavoriteProducts | null> {
    return this.favoriteProducts.find((fav) => fav.id === id) || null;
  }

  async findByUserId(userId: string): Promise<FavoriteProducts | null> {
    return this.favoriteProducts.find((fav) => fav.user_id === userId) || null;
  }

  async create(
    data: Omit<FavoriteProducts, "id"> & { user_id: string },
  ): Promise<FavoriteProducts> {
    const newFavoriteProducts: FavoriteProducts = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      user_id: data.user_id,
      product_ids: [],
    };

    this.favoriteProducts.push(newFavoriteProducts);
    return newFavoriteProducts;
  }

  async update(
    favoriteProductsId: string,
    data: Partial<Omit<FavoriteProducts, "id" | "user_id">>,
  ): Promise<FavoriteProducts> {
    const index = this.favoriteProducts.findIndex(
      (fav) => fav.id === favoriteProductsId,
    );
    if (index === -1) throw new Error("FavoriteProducts not found");

    this.favoriteProducts[index] = {
      ...this.favoriteProducts[index],
      ...data,
    };

    return this.favoriteProducts[index];
  }

  async delete(favoriteProductsId: string): Promise<void> {
    this.favoriteProducts = this.favoriteProducts.filter(
      (fav) => fav.id !== favoriteProductsId,
    );
  }
}

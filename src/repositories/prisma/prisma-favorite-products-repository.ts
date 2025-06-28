import type { FavoriteProducts } from "@prisma/client";
import type { FavoriteProductsRepository } from "../favorite-products-repository";
import { prisma } from "../../lib/prisma";

export class PrismaFavoriteProductsRepository
  implements FavoriteProductsRepository
{
  async findById(favoriteProductId: string): Promise<FavoriteProducts | null> {
    const favoriteProducts = await prisma.favoriteProducts.findUnique({
      where: {
        id: favoriteProductId,
      },
    });

    return favoriteProducts;
  }

  async findByUserId(userId: string): Promise<FavoriteProducts | null> {
    const favoriteProducts = await prisma.favoriteProducts.findUnique({
      where: {
        userId,
      },
    });

    return favoriteProducts;
  }

  async create(
    data: Omit<FavoriteProducts, "id" | "products_ids"> & {
      user_id: string;
    },
  ): Promise<FavoriteProducts> {
    const favoriteProducts = await prisma.favoriteProducts.create({
      data: {
        ...data,
      },
    });

    return favoriteProducts;
  }

  async update(
    favoriteProductId: string,
    data: Partial<Omit<FavoriteProducts, "id" | "user_id">>,
  ): Promise<FavoriteProducts> {
    const favoriteProducts = await prisma.favoriteProducts.update({
      where: {
        id: favoriteProductId,
      },
      data,
    });

    return favoriteProducts;
  }

  async delete(favoriteProductId: string): Promise<void> {
    await prisma.favoriteProducts.delete({
      where: {
        id: favoriteProductId,
      },
    });
  }
}

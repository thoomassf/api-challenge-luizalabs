import type { FavoriteProducts } from "@prisma/client";
import type { FavoriteProductsRepository } from "../repositories/favorite-products-repository";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";

interface UpdateFavoriteProductsRequest {
  favoriteProductsId: string;
  title?: string;
  description?: string;
}

interface UpdateFavoriteProductsResponse {
  favoriteProducts: FavoriteProducts;
}

export class UpdateFavoriteProductsUseCase {
  constructor(private favoriteProductsRepository: FavoriteProductsRepository) {}

  async execute({
    favoriteProductsId,
    title,
    description,
  }: UpdateFavoriteProductsRequest): Promise<UpdateFavoriteProductsResponse> {
    const favoritesListAlreadyExists =
      await this.favoriteProductsRepository.findById(favoriteProductsId);

    if (!favoritesListAlreadyExists) {
      throw new FavoriteProductsNotFound();
    }

    const favoriteProducts = await this.favoriteProductsRepository.update(
      favoriteProductsId,
      { title, description },
    );
    return { favoriteProducts };
  }
}

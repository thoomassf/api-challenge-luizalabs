import type { FavoriteProductsRepository } from "../repositories/favorite-products-repository";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";

interface DeleteFavoriteProductsRequest {
  favoriteProductsId: string;
}

export class DeleteFavoriteProductsUseCase {
  constructor(private favoriteProductsRepository: FavoriteProductsRepository) {}

  async execute({
    favoriteProductsId,
  }: DeleteFavoriteProductsRequest): Promise<void> {
    const favoritesListAlreadyExists =
      await this.favoriteProductsRepository.findById(favoriteProductsId);

    if (!favoritesListAlreadyExists) {
      throw new FavoriteProductsNotFound();
    }

    await this.favoriteProductsRepository.delete(favoriteProductsId);
  }
}

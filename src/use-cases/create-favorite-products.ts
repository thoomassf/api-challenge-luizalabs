import type { FavoriteProducts } from "@prisma/client";
import type { FavoriteProductsRepository } from "../repositories/favorite-products-repository";
import { FavoritesListAlreadyExistsForThisUser } from "./errors/favorites-list-already-exists-for-this-user";

interface CreateFavoriteProductsRequest {
  userId: string;
  title: string;
  description?: string;
  product_ids?: string[];
}

interface CreateFavoriteProductsResponse {
  favoriteProducts: FavoriteProducts;
}

export class CreateFavoriteProductsUseCase {
  constructor(private favoriteProductsRepository: FavoriteProductsRepository) {}

  async execute({
    userId,
    title,
    description,
    product_ids,
  }: CreateFavoriteProductsRequest): Promise<CreateFavoriteProductsResponse> {
    const favoriteProductsAlreadyExists =
      await this.favoriteProductsRepository.findByUserId(userId);

    if (favoriteProductsAlreadyExists) {
      throw new FavoritesListAlreadyExistsForThisUser();
    }

    const favoriteProducts = await this.favoriteProductsRepository.create({
      user_id: userId,
      title,
      description: description ?? null,
      product_ids: product_ids ?? [],
    });

    return { favoriteProducts };
  }
}

import type { FavoriteProducts } from "@prisma/client";
import type { FavoriteProductsRepository } from "../repositories/favorite-products-repository";

interface GetFavoriteProductsRequest {
  userId: string;
}

interface GetFavoriteProductsResponse {
  favoriteProducts: FavoriteProducts | null;
}

export class GetFavoriteProductsUseCase {
  constructor(private favoriteProductsRepository: FavoriteProductsRepository) {}

  async execute({
    userId,
  }: GetFavoriteProductsRequest): Promise<GetFavoriteProductsResponse> {
    const favoriteProducts =
      await this.favoriteProductsRepository.findByUserId(userId);
    return { favoriteProducts };
  }
}

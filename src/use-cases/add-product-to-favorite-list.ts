import type { FavoriteProductsRepository } from "../repositories/favorite-products-repository";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";
import { ProductAlreadyExistsInFavoriteList } from "./errors/product-already-exists-in-favorite-list";

interface AddProductToFavoriteListRequest {
  favoriteProductsId: string;
  productId: string;
}

export class AddProductToFavoriteListUseCase {
  constructor(private favoriteProductsRepository: FavoriteProductsRepository) {}

  async execute({
    favoriteProductsId,
    productId,
  }: AddProductToFavoriteListRequest): Promise<void> {
    const favoriteProducts =
      await this.favoriteProductsRepository.findById(favoriteProductsId);

    if (!favoriteProducts) {
      throw new FavoriteProductsNotFound();
    }

    if (favoriteProducts.product_ids.includes(productId)) {
      throw new ProductAlreadyExistsInFavoriteList();
    }

    favoriteProducts.product_ids.push(productId);

    await this.favoriteProductsRepository.update(favoriteProductsId, {
      product_ids: favoriteProducts.product_ids,
    });
  }
}

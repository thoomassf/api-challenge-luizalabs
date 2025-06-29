import type { FavoriteProductsRepository } from "../repositories/favorite-products-repository";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";
import { ProductNotInFavoriteList } from "./errors/product-not-in-favorite-list";

interface RemoveProductToFavoriteListRequest {
  favoriteProductsId: string;
  productId: string;
}

export class RemoveProductToFavoriteListUseCase {
  constructor(private favoriteProductsRepository: FavoriteProductsRepository) {}

  async execute({
    favoriteProductsId,
    productId,
  }: RemoveProductToFavoriteListRequest): Promise<void> {
    const favoriteProducts =
      await this.favoriteProductsRepository.findById(favoriteProductsId);

    if (!favoriteProducts) {
      throw new FavoriteProductsNotFound();
    }

    if (!favoriteProducts.product_ids.includes(productId)) {
      throw new ProductNotInFavoriteList();
    }

    favoriteProducts.product_ids = favoriteProducts.product_ids.filter(
      (id) => id !== productId,
    );

    await this.favoriteProductsRepository.update(favoriteProductsId, {
      product_ids: favoriteProducts.product_ids,
    });
  }
}

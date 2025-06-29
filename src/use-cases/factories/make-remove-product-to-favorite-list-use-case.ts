import { PrismaFavoriteProductsRepository } from "../../repositories/prisma/prisma-favorite-products-repository";
import { RemoveProductToFavoriteListUseCase } from "../remove-product-to-favorite-list";

export function makeRemoveProductToFavoriteListUseCase() {
  const favoriteProductsRepository = new PrismaFavoriteProductsRepository();
  const useCase = new RemoveProductToFavoriteListUseCase(
    favoriteProductsRepository,
  );

  return useCase;
}

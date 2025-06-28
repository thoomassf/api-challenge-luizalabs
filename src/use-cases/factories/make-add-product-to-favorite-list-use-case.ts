import { PrismaFavoriteProductsRepository } from "../../repositories/prisma/prisma-favorite-products-repository";
import { AddProductToFavoriteListUseCase } from "../add-product-to-favorite-list";

export function makeAddProductToFavoriteListUseCase() {
  const favoriteProductsRepository = new PrismaFavoriteProductsRepository();
  const useCase = new AddProductToFavoriteListUseCase(
    favoriteProductsRepository,
  );

  return useCase;
}

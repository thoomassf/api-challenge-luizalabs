import { PrismaFavoriteProductsRepository } from "../../repositories/prisma/prisma-favorite-products-repository";
import { UpdateFavoriteProductsUseCase } from "../update-favorite-products";

export function makeUpdateFavoriteProductsUseCase() {
  const favoriteProductsRepository = new PrismaFavoriteProductsRepository();
  const useCase = new UpdateFavoriteProductsUseCase(favoriteProductsRepository);

  return useCase;
}

import { PrismaFavoriteProductsRepository } from "../../repositories/prisma/prisma-favorite-products-repository";
import { DeleteFavoriteProductsUseCase } from "../delete-favorite-products";

export function makeDeleteFavoriteProductsUseCase() {
  const favoriteProductsRepository = new PrismaFavoriteProductsRepository();
  const useCase = new DeleteFavoriteProductsUseCase(favoriteProductsRepository);

  return useCase;
}

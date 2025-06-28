import { PrismaFavoriteProductsRepository } from "../../repositories/prisma/prisma-favorite-products-repository";
import { CreateFavoriteProductsUseCase } from "../create-favorite-products";

export function makeCreateFavoriteProductsUseCase() {
  const favoriteProductsRepository = new PrismaFavoriteProductsRepository();
  const useCase = new CreateFavoriteProductsUseCase(favoriteProductsRepository);

  return useCase;
}

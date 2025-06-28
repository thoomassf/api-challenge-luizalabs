import { PrismaFavoriteProductsRepository } from "../../repositories/prisma/prisma-favorite-products-repository";
import { GetFavoriteProductsUseCase } from "../get-favorite-products";

export function makeGetFavoriteProductsUseCase() {
  const favoriteProductsRepository = new PrismaFavoriteProductsRepository();
  const useCase = new GetFavoriteProductsUseCase(favoriteProductsRepository);

  return useCase;
}

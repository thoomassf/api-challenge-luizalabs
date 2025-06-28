import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteProducts } from "../repositories/in-memory/in-memory-favorite-products";
import { DeleteFavoriteProductsUseCase } from "./delete-favorite-products";
import { CreateFavoriteProductsUseCase } from "./create-favorite-products";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";
import { GetFavoriteProductsUseCase } from "./get-favorite-products";

let favoriteProductsRepository: InMemoryFavoriteProducts;
let createFavoriteProductsUseCase: CreateFavoriteProductsUseCase;
let getFavoriteProductsUseCase: GetFavoriteProductsUseCase;
let sut: DeleteFavoriteProductsUseCase;

describe("Delete Favorite Products Use Case", () => {
  beforeEach(() => {
    favoriteProductsRepository = new InMemoryFavoriteProducts();
    getFavoriteProductsUseCase = new GetFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    createFavoriteProductsUseCase = new CreateFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    sut = new DeleteFavoriteProductsUseCase(favoriteProductsRepository);
  });

  it("should be able to delete a favorite products list", async () => {
    const { favoriteProducts } = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
      product_ids: ["prod-1"],
    });

    await sut.execute({ favoriteProductsId: favoriteProducts.id });

    const result = await getFavoriteProductsUseCase.execute({
      userId: "user-01",
    });

    expect(result.favoriteProducts).toBeNull();
  });

  it("should be able to return error when trying to delete a product list that does not exist", async () => {
    await expect(() =>
      sut.execute({ favoriteProductsId: "favorite-products-01" }),
    ).rejects.toBeInstanceOf(FavoriteProductsNotFound);
  });
});

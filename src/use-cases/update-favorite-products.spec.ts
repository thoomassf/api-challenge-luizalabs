import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteProducts } from "../repositories/in-memory/in-memory-favorite-products";
import { UpdateFavoriteProductsUseCase } from "./update-favorite-products";
import { CreateFavoriteProductsUseCase } from "./create-favorite-products";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";

let favoriteProductsRepository: InMemoryFavoriteProducts;
let createFavoriteProductsUseCase: CreateFavoriteProductsUseCase;
let sut: UpdateFavoriteProductsUseCase;

describe("Update Favorite Products Use Case", () => {
  beforeEach(() => {
    favoriteProductsRepository = new InMemoryFavoriteProducts();
    createFavoriteProductsUseCase = new CreateFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    sut = new UpdateFavoriteProductsUseCase(favoriteProductsRepository);
  });

  it("should be able to update a favorite products list", async () => {
    const { favoriteProducts } = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
      product_ids: ["prod-1"],
    });

    const { favoriteProducts: result } = await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      title: "Favorite list 1 updated",
      description: "Favorite list description updated",
    });

    expect(result.title).toEqual("Favorite list 1 updated");
    expect(result.description).toEqual("Favorite list description updated");
  });

  it("should be able to return error when trying to update a product list that does not exist", async () => {
    await expect(() =>
      sut.execute({
        favoriteProductsId: "favorite-products-01",
        title: "Favorite list 1 updated",
        description: "Favorite list description updated",
      }),
    ).rejects.toBeInstanceOf(FavoriteProductsNotFound);
  });
});

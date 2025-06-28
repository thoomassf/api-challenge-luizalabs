import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteProducts } from "../repositories/in-memory/in-memory-favorite-products";
import { CreateFavoriteProductsUseCase } from "./create-favorite-products";
import { GetFavoriteProductsUseCase } from "./get-favorite-products";

let favoriteProductsRepository: InMemoryFavoriteProducts;
let createFavoriteProductsUseCase: CreateFavoriteProductsUseCase;
let sut: GetFavoriteProductsUseCase;

describe("Get Favorite Products Use Case", () => {
  beforeEach(() => {
    favoriteProductsRepository = new InMemoryFavoriteProducts();
    createFavoriteProductsUseCase = new CreateFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    sut = new GetFavoriteProductsUseCase(favoriteProductsRepository);
  });

  it.skip("should be able to return the favorite products for a user", async () => {
    const favoriteProductsMock = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
      product_ids: ["prod-1", "prod-2"],
    });

    const result = await sut.execute({
      userId: "user-01",
    });

    expect(result.favoriteProducts).toEqual(favoriteProductsMock);
  });

  it("should be able to return null if the user has no favorites", async () => {
    const result = await sut.execute({
      userId: "user-01",
    });

    expect(result.favoriteProducts).toBeNull();
  });
});

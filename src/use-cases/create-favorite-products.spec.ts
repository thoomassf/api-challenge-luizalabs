import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteProducts } from "../repositories/in-memory/in-memory-favorite-products";
import { CreateFavoriteProductsUseCase } from "./create-favorite-products";
import { FavoritesListAlreadyExistsForThisUser } from "./errors/favorites-list-already-exists-for-this-user";

let favoriteProductsRepository: InMemoryFavoriteProducts;
let sut: CreateFavoriteProductsUseCase;

describe("Create Favorite Products Use Case", () => {
  beforeEach(() => {
    favoriteProductsRepository = new InMemoryFavoriteProducts();
    sut = new CreateFavoriteProductsUseCase(favoriteProductsRepository);
  });

  it("should be able to create a favorite products list", async () => {
    const { favoriteProducts } = await sut.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
    });

    expect(favoriteProducts.id).toEqual(expect.any(String));
  });

  it("should be able not create a favorite products list with same title", async () => {
    await sut.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        title: "Favorite list 2",
        description: "Favorite list description",
        userId: "user-01",
      }),
    ).rejects.toBeInstanceOf(FavoritesListAlreadyExistsForThisUser);
  });
});

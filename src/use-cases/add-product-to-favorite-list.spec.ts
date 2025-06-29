import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteProducts } from "../repositories/in-memory/in-memory-favorite-products";
import { CreateFavoriteProductsUseCase } from "./create-favorite-products";
import { AddProductToFavoriteListUseCase } from "./add-product-to-favorite-list";
import { GetFavoriteProductsUseCase } from "./get-favorite-products";
import { ProductAlreadyExistsInFavoriteList } from "./errors/product-already-exists-in-favorite-list";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";
import { MaximumLimitProductsInFavoritesList } from "./errors/maximum-limit-products-in-favorites-list";

let favoriteProductsRepository: InMemoryFavoriteProducts;
let createFavoriteProductsUseCase: CreateFavoriteProductsUseCase;
let getFavoriteProductsUseCase: GetFavoriteProductsUseCase;
let sut: AddProductToFavoriteListUseCase;

describe("Add Product To Favorite List Use Case", () => {
  beforeEach(() => {
    favoriteProductsRepository = new InMemoryFavoriteProducts();
    getFavoriteProductsUseCase = new GetFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    createFavoriteProductsUseCase = new CreateFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    sut = new AddProductToFavoriteListUseCase(favoriteProductsRepository);
  });

  it("should add a product to the favorite list if it does not exist", async () => {
    const { favoriteProducts } = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-1",
    });

    const result = await getFavoriteProductsUseCase.execute({
      userId: favoriteProducts.user_id,
    });

    expect(result.favoriteProducts?.product_ids).toContain("prod-1");
  });

  it("should not add the product if it already exists in the list", async () => {
    const { favoriteProducts } = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-1",
    });

    await expect(() =>
      sut.execute({
        favoriteProductsId: favoriteProducts.id,
        productId: "prod-1",
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsInFavoriteList);
  });

  it("should throw FavoriteProductsNotFound if list does not exist", async () => {
    await expect(
      sut.execute({
        favoriteProductsId: "favorites-999",
        productId: "prod-1",
      }),
    ).rejects.toBeInstanceOf(FavoriteProductsNotFound);
  });

  it("should not add the product if it already exists in the list", async () => {
    const { favoriteProducts } = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-1",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-2",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-3",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-4",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-5",
    });

    await expect(() =>
      sut.execute({
        favoriteProductsId: favoriteProducts.id,
        productId: "prod-6",
      }),
    ).rejects.toBeInstanceOf(MaximumLimitProductsInFavoritesList);
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteProducts } from "../repositories/in-memory/in-memory-favorite-products";
import { CreateFavoriteProductsUseCase } from "./create-favorite-products";
import { RemoveProductToFavoriteListUseCase } from "./remove-product-to-favorite-list";
import { GetFavoriteProductsUseCase } from "./get-favorite-products";
import { FavoriteProductsNotFound } from "./errors/favorite-products-not-found";
import { AddProductToFavoriteListUseCase } from "./add-product-to-favorite-list";
import { ProductNotInFavoriteList } from "./errors/product-not-in-favorite-list";

let favoriteProductsRepository: InMemoryFavoriteProducts;
let createFavoriteProductsUseCase: CreateFavoriteProductsUseCase;
let addProductToFavoriteListUseCase: AddProductToFavoriteListUseCase;
let getFavoriteProductsUseCase: GetFavoriteProductsUseCase;
let sut: RemoveProductToFavoriteListUseCase;

describe("Remove Product To Favorite List Use Case", () => {
  beforeEach(() => {
    favoriteProductsRepository = new InMemoryFavoriteProducts();
    addProductToFavoriteListUseCase = new AddProductToFavoriteListUseCase(
      favoriteProductsRepository,
    );
    getFavoriteProductsUseCase = new GetFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    createFavoriteProductsUseCase = new CreateFavoriteProductsUseCase(
      favoriteProductsRepository,
    );
    sut = new RemoveProductToFavoriteListUseCase(favoriteProductsRepository);
  });

  it("should remove a product from the favorite list", async () => {
    const { favoriteProducts } = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
    });

    await addProductToFavoriteListUseCase.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-1",
    });

    await sut.execute({
      favoriteProductsId: favoriteProducts.id,
      productId: "prod-1",
    });

    const result = await getFavoriteProductsUseCase.execute({
      userId: favoriteProducts.user_id,
    });

    expect(result.favoriteProducts?.product_ids).not.toContain("prod-1");
  });

  it("should throw ProductNotInFavoriteList if product is not in the list", async () => {
    const { favoriteProducts } = await createFavoriteProductsUseCase.execute({
      title: "Favorite list 1",
      description: "Favorite list description",
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        favoriteProductsId: favoriteProducts.id,
        productId: "prod-1",
      }),
    ).rejects.toBeInstanceOf(ProductNotInFavoriteList);
  });

  it("should throw FavoriteProductsNotFound if list does not exist", async () => {
    await expect(() =>
      sut.execute({
        favoriteProductsId: "non-existent-id",
        productId: "prod-1",
      }),
    ).rejects.toBeInstanceOf(FavoriteProductsNotFound);
  });
});

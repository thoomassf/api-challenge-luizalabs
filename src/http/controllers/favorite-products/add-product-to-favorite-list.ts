import { FavoriteProductsNotFound } from "@/use-cases/errors/favorite-products-not-found";
import { MaximumLimitProductsInFavoritesList } from "@/use-cases/errors/maximum-limit-products-in-favorites-list";
import { ProductAlreadyExistsInFavoriteList } from "@/use-cases/errors/product-already-exists-in-favorite-list";
import { makeAddProductToFavoriteListUseCase } from "@/use-cases/factories/make-add-product-to-favorite-list-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function addProductToFavoriteList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const bodySchema = z.object({
    product_id: z.string(),
  });

  const { id } = paramsSchema.parse(request.params);
  const { product_id } = bodySchema.parse(request.body);

  try {
    const addProductToFavoriteListUseCase =
      makeAddProductToFavoriteListUseCase();

    await addProductToFavoriteListUseCase.execute({
      favoriteProductsId: id,
      productId: product_id,
    });
    return reply.status(201).send();
  } catch (error) {
    if (error instanceof MaximumLimitProductsInFavoritesList) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof ProductAlreadyExistsInFavoriteList) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof FavoriteProductsNotFound) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}

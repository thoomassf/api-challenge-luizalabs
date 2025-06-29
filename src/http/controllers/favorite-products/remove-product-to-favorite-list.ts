import { FavoriteProductsNotFound } from "@/use-cases/errors/favorite-products-not-found";
import { ProductNotInFavoriteList } from "@/use-cases/errors/product-not-in-favorite-list";
import { makeRemoveProductToFavoriteListUseCase } from "@/use-cases/factories/make-remove-product-to-favorite-list-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function removeProductFromFavoriteList(
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
    const removeProductFromFavoriteListUseCase =
      makeRemoveProductToFavoriteListUseCase();

    await removeProductFromFavoriteListUseCase.execute({
      favoriteProductsId: id,
      productId: product_id,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ProductNotInFavoriteList) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof FavoriteProductsNotFound) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}

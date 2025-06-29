import { FavoriteProductsNotFound } from "@/use-cases/errors/favorite-products-not-found";
import { makeDeleteFavoriteProductsUseCase } from "@/use-cases/factories/make-delete-favorite-products-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteFavoriteProductsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const deleteFavoriteProductsUseCase = makeDeleteFavoriteProductsUseCase();

    await deleteFavoriteProductsUseCase.execute({
      favoriteProductsId: id,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof FavoriteProductsNotFound) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}

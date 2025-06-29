import { FavoriteProductsNotFound } from "@/use-cases/errors/favorite-products-not-found";
import { makeUpdateFavoriteProductsUseCase } from "@/use-cases/factories/make-update-favorite-products-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateFavoriteProductsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const bodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
  });

  const { id } = paramsSchema.parse(request.params);
  const { title, description } = bodySchema.parse(request.body);

  try {
    const updateFavoriteProductsUseCase = makeUpdateFavoriteProductsUseCase();

    await updateFavoriteProductsUseCase.execute({
      favoriteProductsId: id,
      title,
      description: description ?? "",
    });

    return reply.status(204).send({
      favoriteProducts: 201,
    });
  } catch (error) {
    if (error instanceof FavoriteProductsNotFound) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}

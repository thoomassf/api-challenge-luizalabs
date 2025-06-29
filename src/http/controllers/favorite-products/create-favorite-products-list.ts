import { FavoritesListAlreadyExistsForThisUser } from "@/use-cases/errors/favorites-list-already-exists-for-this-user";
import { makeCreateFavoriteProductsUseCase } from "@/use-cases/factories/make-create-favorite-products-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createFavoriteProductsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    user_id: z.string().uuid(),
  });

  const { title, description, user_id } = bodySchema.parse(request.body);

  try {
    const createFavoriteProductsUseCase = makeCreateFavoriteProductsUseCase();

    await createFavoriteProductsUseCase.execute({
      title,
      description: description ?? "",
      userId: user_id,
    });

    return reply.status(201).send({ message: "Favorite list created." });
  } catch (error) {
    if (error instanceof FavoritesListAlreadyExistsForThisUser) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}

import { makeGetFavoriteProductsUseCase } from "@/use-cases/factories/make-get-favorite-products-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getFavoriteProductsList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    user_id: z.string().uuid(),
  });

  const { user_id } = paramsSchema.parse(request.params);

  console.log(user_id);

  const getFavoriteProductsUseCase = makeGetFavoriteProductsUseCase();

  const { favoriteProducts } = await getFavoriteProductsUseCase.execute({
    userId: user_id,
  });

  return reply.status(200).send({
    favoriteProducts,
  });
}

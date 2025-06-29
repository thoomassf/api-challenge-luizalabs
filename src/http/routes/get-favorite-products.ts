import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getFavoriteProducts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/favorite-products",
    {
      schema: {
        tags: ["favorite-products"],
        summary: "Get favorite products list",
        response: {
          200: z.object({
            id: z.string().uuid(),
            title: z.string(),
            description: z.string().nullable(),
            product_ids: z.array(
              z.object({
                product_id: z.string(),
              }),
            ),
            user: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const {} = request;

      const favoriteProducts = await prisma.favoriteProducts.findUnique({
        select,
      });
    },
  );
}

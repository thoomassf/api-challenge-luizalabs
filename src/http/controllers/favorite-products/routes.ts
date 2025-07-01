import type { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { createFavoriteProductsList } from "./create-favorite-products-list";
import { getFavoriteProductsList } from "./get-favorite-products-list";
import { deleteFavoriteProductsList } from "./delete-favorite-products-list";
import { updateFavoriteProductsList } from "./update-favorite-products-list";
import { addProductToFavoriteList } from "./add-product-to-favorite-list";
import { removeProductFromFavoriteList } from "./remove-product-to-favorite-list";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function FavoriteProductsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.withTypeProvider<ZodTypeProvider>().post(
    "/favorite-products",
    {
      schema: {
        tags: ["Favorite Products List"],
        summary: "Create a new favorite products list",
        body: z.object({
          title: z.string(),
          description: z.string().nullable(),
          user_id: z.string().uuid(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    createFavoriteProductsList,
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/favorite-products/:user_id",
    {
      schema: {
        tags: ["Favorite Products List"],
        summary: "Create a new favorite products list",
        params: z.object({
          user_id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            favoriteProducts: z
              .object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                user_id: z.string(),
                product_ids: z.array(z.string()),
              })
              .nullable(),
          }),
        },
      },
    },
    getFavoriteProductsList,
  );

  app.withTypeProvider<ZodTypeProvider>().patch(
    "/favorite-products/:id",
    {
      schema: {
        tags: ["Favorite Products List"],
        summary: "Create a new favorite products list",
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          title: z.string(),
          description: z.string().nullable(),
        }),
        response: {
          204: z.object({}),
        },
      },
    },
    updateFavoriteProductsList,
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    "/favorite-products/:id",
    {
      schema: {
        tags: ["Favorite Products List"],
        summary: "Create a new favorite products list",
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: z.object({}),
        },
      },
    },
    deleteFavoriteProductsList,
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/favorite-products/:id/add",
    {
      schema: {
        tags: ["Favorite Products List"],
        summary: "Create a new favorite products list",
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          product_id: z.string(),
        }),
      },
    },
    addProductToFavoriteList,
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/favorite-products/:id/remove",
    {
      schema: {
        tags: ["Favorite Products List"],
        summary: "Create a new favorite products list",
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          product_id: z.string(),
        }),
      },
    },
    removeProductFromFavoriteList,
  );
}

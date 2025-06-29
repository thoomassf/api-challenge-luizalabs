import type { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
import { verifyJWT } from "../../middlewares/verify-jwt";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function UserRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Create a new user",
        body: z.object({
          username: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        201: z.object({
          message: z.string(),
        }),
      },
    },
    register,
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/me",
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ["Users"],
        summary: "Get user profile",
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              username: z.string(),
              email: z.string().email(),
              created_at: z.date(),
            }),
          }),
        },
      },
    },
    profile,
  );
}

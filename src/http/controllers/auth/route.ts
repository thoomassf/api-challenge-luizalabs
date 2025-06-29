import type { FastifyInstance } from "fastify";

import { authenticate } from "./authenticate";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function AuthRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticate with e-mail & password",
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    authenticate,
  );
}

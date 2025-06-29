import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { BadRequestError } from "../_errors/bad-request-error";
import { hash } from "bcryptjs";

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Create a new account",
        body: z.object({
          username: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { username, email, password } = request.body;

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (userWithSameEmail) {
        throw new BadRequestError("user with same email already exists.");
      }

      const passwordHash = await hash(password, 6);

      await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
        },
      });

      return reply.status(201).send();
    },
  );
}

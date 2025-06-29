import fastify from "fastify";
// import { ZodError } from "zod";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { UserRoutes } from "./http/controllers/users/route";
import fastifyCookie from "@fastify/cookie";
import { AuthRoutes } from "./http/controllers/auth/route";
import { FavoriteProductsRoutes } from "./http/controllers/favorite-products/routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "",
      description: "",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "30m", // 30 minutes
  },
});

app.register(fastifyCookie);
app.register(fastifyCors);

app.register(AuthRoutes);
app.register(UserRoutes);
app.register(FavoriteProductsRoutes);

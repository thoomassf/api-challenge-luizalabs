import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sign: {
        sub: string;
      };
    }; // user type is return type of `request.user` object
  }
}

import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign({
    sign: {
      sub: request.user.sign.sub,
    },
  });

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: request.user.sign.sub,
      expiresIn: "7d",
    },
  });

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}

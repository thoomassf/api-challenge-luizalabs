import { beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "@/app";

declare global {
  var authToken: string;
  var userId: string;
}

beforeAll(async () => {
  await app.ready();

  const email = `e2e-${Date.now()}@example.com`;
  const password = "123456";

  await request(app.server).post("/users").send({
    username: "e2e_user",
    email,
    password,
  });

  const res = await request(app.server)
    .post("/login")
    .send({ email, password });
  global.authToken = res.body.token;

  const payload = JSON.parse(
    Buffer.from(global.authToken.split(".")[1], "base64url").toString(),
  );

  global.userId = payload.sign.sub;
});

afterAll(async () => {
  await app.close();
});

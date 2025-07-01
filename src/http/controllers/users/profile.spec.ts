import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch the profile of an authenticated user", async () => {
    await request(app.server).post("/users").send({
      username: "john_doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/login").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);

    expect(profileResponse.body).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
        username: "john_doe",
        email: "johndoe@example.com",
        created_at: expect.any(String),
      }),
    });

    expect(profileResponse.body.user).not.toHaveProperty("password_hash");
  });
});

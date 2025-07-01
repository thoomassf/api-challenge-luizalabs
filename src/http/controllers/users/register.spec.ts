import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new user", async () => {
    const response = await request(app.server).post("/users").send({
      username: "john_doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      message: "User created",
    });
  });

  it("should not allow registering with an email that already exists", async () => {
    await request(app.server).post("/users").send({
      username: "jane_doe",
      email: "janedoe@example.com",
      password: "123456",
    });

    const secondResponse = await request(app.server).post("/users").send({
      username: "jane_different",
      email: "janedoe@example.com",
      password: "anotherpass",
    });

    expect(secondResponse.statusCode).toEqual(409);
    expect(secondResponse.body).toEqual({
      message: expect.stringContaining("E-mail already exists."),
    });
  });
});

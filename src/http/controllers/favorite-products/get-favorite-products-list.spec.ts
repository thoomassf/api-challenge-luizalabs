import request from "supertest";
import { app } from "@/app";
import { describe, it, expect } from "vitest";

describe("Get Favorite Products List (e2e)", () => {
  it("should return the favorite products list for the user", async () => {
    await request(app.server)
      .post("/favorite-products")
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        title: "Minha lista",
        description: "Meus produtos favoritos",
        user_id: global.userId,
      });

    const res = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    expect(res.statusCode).toBe(200);

    expect(res.body.favoriteProducts).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: "Minha lista",
        description: "Meus produtos favoritos",
        user_id: global.userId,
        product_ids: expect.any(Array),
      }),
    );
  });

  it("should return null if user has no favorite list", async () => {
    const randomUUID = "aeeeeeee-eeee-eeee-eeee-aaaaaaaaaaaa";

    const res = await request(app.server)
      .get(`/favorite-products/${randomUUID}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.favoriteProducts).toBeNull();
  });
});

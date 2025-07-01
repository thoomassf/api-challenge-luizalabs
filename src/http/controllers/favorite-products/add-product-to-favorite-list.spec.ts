import request from "supertest";
import { app } from "@/app";
import { describe, it, expect } from "vitest";

describe("Add Product To Favorite List (e2e)", () => {
  it("should add a product to the favorite list", async () => {
    await request(app.server)
      .post("/favorite-products")
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        title: "Minha lista",
        description: "Lista para adicionar",
        user_id: global.userId,
      });

    const getRes = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    const listId = getRes.body.favoriteProducts.id;

    const addRes = await request(app.server)
      .post(`/favorite-products/${listId}/add`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        product_id: "prod-123",
      });

    expect(addRes.statusCode).toBe(201);

    const getAfterAdd = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    expect(getAfterAdd.body.favoriteProducts.product_ids).toContain("prod-123");
  });

  it("should not allow adding the same product twice", async () => {
    const getRes = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    const listId = getRes.body.favoriteProducts.id;

    await request(app.server)
      .post(`/favorite-products/${listId}/add`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "prod-dup" });

    const dupRes = await request(app.server)
      .post(`/favorite-products/${listId}/add`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "prod-dup" });

    expect(dupRes.statusCode).toBe(409);
    expect(dupRes.body.message).toContain("already exists");
  });

  it("should not allow adding more than 5 products", async () => {
    const getRes = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    const listId = getRes.body.favoriteProducts.id;

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post(`/favorite-products/${listId}/add`)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send({ product_id: `prod-limit-${i}` });
    }

    const limitRes = await request(app.server)
      .post(`/favorite-products/${listId}/add`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "prod-overflow" });

    expect(limitRes.statusCode).toBe(409);
    expect(limitRes.body.message).toContain("Maximum");
  });

  it("should return 404 if favorite list does not exist", async () => {
    const randomId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

    const res = await request(app.server)
      .post(`/favorite-products/${randomId}/add`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "prod-xyz" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toContain("not found");
  });
});

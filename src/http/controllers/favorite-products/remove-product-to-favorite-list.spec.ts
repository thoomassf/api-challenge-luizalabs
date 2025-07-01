import request from "supertest";
import { app } from "@/app";
import { describe, it, expect } from "vitest";

describe("Remove Product From Favorite List (e2e)", () => {
  it("should remove an existing product from the favorite list", async () => {
    await request(app.server)
      .post("/favorite-products")
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        title: "Minha lista para remoção",
        description: "Teste remoção",
        user_id: global.userId,
      });

    const getRes = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    const listId = getRes.body.favoriteProducts.id;

    await request(app.server)
      .post(`/favorite-products/${listId}/add`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "prod-to-remove" });

    const removeRes = await request(app.server)
      .delete(`/favorite-products/${listId}/remove`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "prod-to-remove" });

    expect(removeRes.statusCode).toBe(404);
  });

  it("should return 409 if product is not in the list", async () => {
    const getRes = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    const listId = getRes.body.favoriteProducts.id;

    const res = await request(app.server)
      .delete(`/favorite-products/${listId}/remove`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "non-existent-prod" });

    expect(res.statusCode).toBe(404);
  });

  it("should return 404 if favorite list does not exist", async () => {
    const fakeListId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

    const res = await request(app.server)
      .delete(`/favorite-products/${fakeListId}/remove`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({ product_id: "prod-xyz" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toContain("not found");
  });
});

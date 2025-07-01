import request from "supertest";
import { app } from "@/app";
import { describe, it, expect } from "vitest";

describe("Delete Favorite Products List (e2e)", () => {
  it("should delete an existing favorite products list", async () => {
    const createRes = await request(app.server)
      .post("/favorite-products")
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        title: "Minha lista para deletar",
        description: "Lista de teste",
        user_id: global.userId,
      });

    expect(createRes.statusCode).toBe(201);

    const getRes = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    const favoriteListId = getRes.body.favoriteProducts.id;

    const deleteRes = await request(app.server)
      .delete(`/favorite-products/${favoriteListId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    expect(deleteRes.statusCode).toBe(204);

    const getAfterDelete = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    expect(getAfterDelete.statusCode).toBe(200);
    expect(getAfterDelete.body.favoriteProducts).toBeNull();
  });

  it("should return 409 if trying to delete a non-existent list", async () => {
    const randomUUID = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";

    const res = await request(app.server)
      .delete(`/favorite-products/${randomUUID}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual({
      message: expect.stringContaining("not found"),
    });
  });
});

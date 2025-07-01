import request from "supertest";
import { app } from "@/app";
import { describe, it, expect } from "vitest";

describe("Update Favorite Products List (e2e)", () => {
  it("should update the favorite list for the user", async () => {
    const createRes = await request(app.server)
      .post("/favorite-products")
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        title: "Lista Original",
        description: "Descrição original",
        user_id: global.userId,
      });

    expect(createRes.statusCode).toBe(201);

    const getRes = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    const favoriteProductsId = getRes.body.favoriteProducts.id;
    expect(favoriteProductsId).toBeDefined();

    const updateRes = await request(app.server)
      .patch(`/favorite-products/${favoriteProductsId}`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        title: "Lista Atualizada",
        description: "Descrição atualizada",
      });

    expect(updateRes.statusCode).toBe(204);

    const updatedGet = await request(app.server)
      .get(`/favorite-products/${global.userId}`)
      .set("Authorization", `Bearer ${global.authToken}`);

    expect(updatedGet.statusCode).toBe(200);
    expect(updatedGet.body.favoriteProducts).toEqual(
      expect.objectContaining({
        id: favoriteProductsId,
        title: "Lista Atualizada",
        description: "Descrição atualizada",
      }),
    );
  });

  it("should return 404 if trying to update a non-existent list", async () => {
    const randomUUID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

    const res = await request(app.server)
      .patch(`/favorite-products/${randomUUID}`)
      .set("Authorization", `Bearer ${global.authToken}`)
      .send({
        title: "Deveria falhar",
        description: "Não existe",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      message: expect.stringContaining("not found"),
    });
  });
});

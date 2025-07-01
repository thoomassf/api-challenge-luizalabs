import { describe, expect, it } from "vitest";
import { authRequest } from "@/utils/test/auth-request";

describe("Create Favorite Products List (e2e)", () => {
  it("should create a favorite list for the user", async () => {
    const res = await authRequest().post("/favorite-products").send({
      title: "Minha lista de favoritos",
      description: "Produtos que amo",
      user_id: global.userId,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ message: "Favorite list created." });
  });

  it("should not allow creating more than one list for the same user", async () => {
    await authRequest().post("/favorite-products").send({
      title: "Primeira lista",
      description: null,
      user_id: global.userId,
    });

    const dup = await authRequest().post("/favorite-products").send({
      title: "Outra lista",
      description: "Não deveria permitir",
      user_id: global.userId,
    });

    expect(dup.statusCode).toBe(409);
    expect(dup.body).toEqual({
      message: expect.stringContaining("already exists"),
    });
  });
});

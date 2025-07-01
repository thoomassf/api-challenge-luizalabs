import request from "supertest";
import { app } from "@/app";

type Methods = "get" | "post" | "put" | "patch" | "delete" | "head";

export function authRequest() {
  const base = request(app.server);

  const wrapper = {} as Record<Methods, (url: string) => request.Test>;

  (["get", "post", "put", "patch", "delete"] as Methods[]).forEach((method) => {
    wrapper[method] = (url: string) =>
      base[method](url).set("Authorization", `Bearer ${global.authToken}`);
  });

  return wrapper;
}

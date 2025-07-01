import { defineConfig } from "vitest/config";
import tsconfigPath from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPath()],
  test: {
    dir: "src",
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
    testTimeout: 20_000, // 20 segundos
    setupFiles: ["src/tests/setup.e2e.ts"],
  },
});

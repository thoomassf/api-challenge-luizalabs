import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  OTEL_SERVICE_NAME: z.string(),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables.", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;

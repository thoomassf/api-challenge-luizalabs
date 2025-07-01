import { env } from "../env";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";

if (!env.OTEL_SERVICE_NAME) {
  throw new Error("OTEL_SERVICE_NAME must be configured.");
}

const sdk = new NodeSDK({
  serviceName: env.OTEL_SERVICE_NAME,
  traceExporter: new OTLPTraceExporter({
    url: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log("✅ Tracing initialized (sync start)");

process.on("SIGTERM", () => {
  sdk.shutdown();
  console.log("Tracing terminated");
});

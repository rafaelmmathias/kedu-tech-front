import { isDev } from "@/config";

if (isDev()) {
  await import("./dev-server");
}

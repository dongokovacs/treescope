import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.spec.ts"],
    // "forks" pool hangs on this Windows setup; threads works reliably.
    pool: "threads",
  },
});

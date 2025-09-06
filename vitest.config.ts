import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.ts",
    include: ["**/*.test.{ts,tsx}", "**/*.test.{js,jsx}"],
    exclude: [
      ...configDefaults.exclude,
      "tests/e2e/**/*",
      "**/e2e/**/*",
      "**/*.e2e.*",
      "**/*.spec.{ts,tsx}",
      "**/*.spec.{js,jsx}",
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: [
        "components/**/*.{ts,tsx}",
        "app/**/*.{ts,tsx}",
        "actions/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
        "types/**/*.{ts,tsx}",
        "constants.ts",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/*.config.{ts,tsx}",
        "**/node_modules/**",
        "**/coverage/**",
        "**/dist/**",
        "**/build/**",
        "**/.next/**",
        "**/generated/**",
        "tests/e2e/**/*",
        "**/e2e/**/*",
      ],
      reportsDirectory: "./coverage",
      all: true,
      thresholds: {
        global: {
          branches: 0,
          functions: 0,
          lines: 0,
          statements: 0,
        },
      },
    },
  },
});

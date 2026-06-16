import type { UserConfig } from "vite-plus";

export const pack = {
  entry: ["src/index.ts", "src/cli/index.ts"],
  outDir: "dist",
  format: "esm",
  clean: true,
  exports: true,
} satisfies NonNullable<UserConfig["pack"]>;

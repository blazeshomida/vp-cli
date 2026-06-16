import type { UserConfig } from "vite-plus";

export const test = {
  include: ["src/**/*.test.ts"],
  reporters: ["tree"],
} satisfies NonNullable<UserConfig["test"]>;

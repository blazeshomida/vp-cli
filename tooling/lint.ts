import type { UserConfig } from "vite-plus";

import { generatedPatterns, localToolPatterns, outputPatterns } from "./patterns";

type LintOptions = NonNullable<UserConfig["lint"]>;

const basePlugins = ["eslint", "typescript", "unicorn", "oxc"] satisfies LintOptions["plugins"];
const testPlugins = [...basePlugins, "vitest"] satisfies LintOptions["plugins"];

export const lint = {
  plugins: basePlugins,

  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "warn",
  },

  env: {
    es2022: true,
    node: true,
  },

  ignorePatterns: [...outputPatterns, ...localToolPatterns, ...generatedPatterns],

  jsPlugins: [
    {
      name: "vite-plus",
      specifier: "vite-plus/oxlint-plugin",
    },
  ],

  rules: {
    "vite-plus/prefer-vite-plus-imports": "error",
  },

  options: {
    reportUnusedDisableDirectives: "error",
    typeAware: true,
    typeCheck: true,
  },

  overrides: [
    {
      files: ["src/**/*.test.ts"],

      // Test files keep the base TypeScript rules and add Vitest-specific
      // rules/globals on top.
      plugins: testPlugins,

      env: {
        vitest: true,
      },
    },
  ],
} satisfies LintOptions;

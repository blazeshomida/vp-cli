import type { UserConfig } from "vite-plus";

import {
  buildOutputPatterns,
  dependencyPatterns,
  generatedPatterns,
  localToolPatterns,
  outputPatterns,
} from "./patterns";

type TaskInput = { auto: true } | string;

function ignoredDirectoryInput(pattern: string): string[] {
  return [`!**/${pattern}`, `!**/${pattern}/**`];
}

function ignoredFileInput(pattern: string): string {
  return `!**/${pattern}`;
}

function outputDirectory(pattern: string): string[] {
  return [pattern, `${pattern}/**`];
}

// Automatic input tracking keeps task cache keys accurate without manually
// listing every source/config file. The exclusions remove dependency, generated,
// output, and tool-owned paths that can be read and rewritten during a task.
const taskInput = [
  { auto: true },
  ...dependencyPatterns.flatMap(ignoredDirectoryInput),
  ...localToolPatterns.flatMap(ignoredDirectoryInput),
  ...outputPatterns.flatMap(ignoredDirectoryInput),
  ...generatedPatterns.map(ignoredFileInput),
] satisfies TaskInput[];

// Environment variables that can affect package output.
const taskEnv = ["NODE_ENV"];

export const tasks = {
  "task:dev": {
    command: "tsx src/cli/index.ts",
    cache: false,
  },

  // Formatting mutates source files, so it should always run instead of using a
  // cached result.
  "task:fmt": {
    command: "vp fmt",
    cache: false,
  },

  "task:lint": {
    command: "vp lint",
    env: taskEnv,
    input: taskInput,
  },

  // Vite+ check already includes formatting/linting behavior, so ready can call
  // check instead of repeating fmt/lint as separate steps.
  "task:check": {
    command: "vp check",
    env: taskEnv,
    input: taskInput,
  },

  "task:test": {
    command: "vp test",
    env: taskEnv,
    input: taskInput,
  },

  "task:pack": {
    command: "vp pack",
    env: taskEnv,
    input: taskInput,
    output: buildOutputPatterns.flatMap(outputDirectory),
  },

  "task:ready": {
    command: ["vp run task:check", "vp run task:test", "vp run task:pack"],
  },
} satisfies NonNullable<NonNullable<UserConfig["run"]>["tasks"]>;

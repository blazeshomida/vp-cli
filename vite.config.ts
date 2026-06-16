import { defineConfig } from "vite-plus";

import { fmt } from "./tooling/format";
import { lint } from "./tooling/lint";
import { pack } from "./tooling/pack";
import { tasks } from "./tooling/tasks";
import { test } from "./tooling/test";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  fmt,
  lint,
  pack,
  test,

  run: {
    tasks,
  },
});

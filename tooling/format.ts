import type { UserConfig } from "vite-plus";

import { generatedPatterns, localToolPatterns, outputPatterns } from "./patterns";

export const fmt = {
  ignorePatterns: [...outputPatterns, ...localToolPatterns, ...generatedPatterns],

  sortImports: {
    customGroups: [
      {
        groupName: "project-alias",
        elementNamePattern: ["#/**"],
      },
    ],

    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "project-alias",
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },

  sortPackageJson: {
    sortScripts: true,
  },
} satisfies NonNullable<UserConfig["fmt"]>;

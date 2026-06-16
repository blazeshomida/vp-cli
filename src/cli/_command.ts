import type { Args } from "./_args";

import { createGreeting } from "#/index";

export function run(args: Args): void {
  console.log(createGreeting({ name: args.name }));
}

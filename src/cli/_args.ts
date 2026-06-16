import { parseArgs } from "node:util";

export interface Args {
  readonly name: string;
}

export function parse(argv: readonly string[]): Args {
  const { values } = parseArgs({
    args: [...argv],
    options: {
      name: {
        type: "string",
        short: "n",
      },
    },
    strict: true,
    allowPositionals: false,
  });

  return {
    name: values.name ?? "world",
  };
}

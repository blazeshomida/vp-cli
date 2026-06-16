import { parse } from "./_args";
import { run } from "./_command";

const args = parse(process.argv.slice(2));

run(args);

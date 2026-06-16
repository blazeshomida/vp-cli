import { describe, expect, it } from "vite-plus/test";

import { parse } from "./_args";

describe("parse", () => {
  it("defaults the name", () => {
    expect(parse([])).toEqual({
      name: "world",
    });
  });

  it("parses a long name option", () => {
    expect(parse(["--name", "Blaze"])).toEqual({
      name: "Blaze",
    });
  });

  it("parses a short name option", () => {
    expect(parse(["-n", "Blaze"])).toEqual({
      name: "Blaze",
    });
  });
});

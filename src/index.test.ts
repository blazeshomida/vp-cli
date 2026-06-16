import { describe, expect, it } from "vite-plus/test";

import { createGreeting } from "#/index";

describe("createGreeting", () => {
  it("creates a default greeting", () => {
    expect(createGreeting()).toBe("Hello, world.");
  });

  it("creates a named greeting", () => {
    expect(createGreeting({ name: "Blaze" })).toBe("Hello, Blaze.");
  });
});

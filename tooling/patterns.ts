// Dependency directories are restored by the package manager, not maintained as
// source.
export const dependencyPatterns = ["node_modules", ".pnpm-store"];

// Local cache/temp directories are not source inputs.
export const localToolPatterns = [".vite", ".vite-temp", ".cache", ".temp", "tmp"];

// Generated files are derived from source files. They can be committed for
// starter/template convenience, but tools should not format, lint, or use them as
// independent task cache inputs.
export const generatedPatterns: string[] = [];

// Output directories are tool-owned and can be deleted/recreated by commands.
export const outputPatterns = ["dist", ".output", "coverage"];

// Build only writes package output. Coverage belongs to test coverage tasks.
export const buildOutputPatterns = ["dist", ".output"];

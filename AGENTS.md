# Agent Instructions

## Project Overview

This repository is a TypeScript CLI/package starter built with Vite+, TypeScript, Vitest, OXC linting/formatting, GitHub Actions, GitHub planning templates, and pnpm catalogs.

The template is intentionally minimal. Keep starter code focused on durable CLI/package infrastructure, not product-specific behavior. The starter `src/index.ts`, `src/index.test.ts`, and `src/cli` fixture may stay tiny unless the task explicitly asks for a stronger package or CLI shape.

This repository follows Blaze's engineering handbook for reusable coding, documentation, workflow, and release standards.

Use this file for repository-specific instructions. Use the handbook as the canonical source for reusable standards unless this repository explicitly overrides them.

## Handbook References

Primary handbook:

- Handbook: https://github.com/blazeshomida/handbook
- Standards: https://github.com/blazeshomida/handbook/tree/main/standards
- Templates: https://github.com/blazeshomida/handbook/tree/main/templates
- TypeScript: https://github.com/blazeshomida/handbook/blob/main/standards/code/typescript.md

Use the most relevant standard before making broad changes:

- TypeScript Standard: https://github.com/blazeshomida/handbook/blob/main/standards/code/typescript.md
- JavaScript Standard: https://github.com/blazeshomida/handbook/blob/main/standards/code/javascript.md
- Code Documentation Standard: https://github.com/blazeshomida/handbook/blob/main/standards/code/documentation.md
- Tooling Standard: https://github.com/blazeshomida/handbook/blob/main/standards/tooling.md
- Commit Standard: https://github.com/blazeshomida/handbook/blob/main/standards/workflow/commits.md
- Pull Request Standard: https://github.com/blazeshomida/handbook/blob/main/standards/workflow/pull-requests.md

If internet access is unavailable, follow the critical rules in this file.

## Project Layout

```txt
src/
  cli/
    _args.test.ts
    _args.ts
    _command.ts
    index.ts
  index.test.ts
  index.ts

tooling/
.github/
```

## Project Boundaries

- `vite.config.ts` is the Vite+ composition point.
- `tooling/format.ts` owns formatting config.
- `tooling/lint.ts` owns lint config.
- `tooling/patterns.ts` owns generated and output path patterns.
- `tooling/tasks.ts` owns the Vite+ task graph.
- `tooling/test.ts` owns Vitest config.
- `src/index.ts` is the starter public module boundary.
- `src/index.test.ts` verifies the starter public module fixture.
- `src/cli/index.ts` is the starter CLI entrypoint.
- `src/cli/_*.ts` files are private implementation files for the CLI vertical.
- `.github/` owns CI, PR, and issue templates.
- `AGENTS.md` owns repo-specific coding agent instructions.

## File and Folder Conventions

Prefer vertical structure over horizontal structure.

Use the vertical codebase approach as the default reference:

https://tkdodo.eu/blog/the-vertical-codebase

Group code by feature, command, package concern, or workflow instead of by technical file type. Code that changes together should usually live together.

The starting layout is intentionally tiny:

```txt
src/
  cli/
    index.ts
    _args.ts
    _command.ts
    _args.test.ts
  index.ts
  index.test.ts
```

Prefer this shape when commands become meaningful:

```txt
src/
  commands/
    init/
      index.ts
      _args.ts
      _config.ts
      _run.ts
      _run.test.ts
  cli/
    index.ts
    _args.ts
    _command.ts
  index.ts
```

For library-style features, prefer this shape:

```txt
src/
  config/
    index.ts
    _load.ts
    _schema.ts
    _load.test.ts
  index.ts
```

Avoid broad dumping grounds unless the package is genuinely tiny or the files are truly global:

```txt
src/
  utils/
  types/
  constants/
  services/
```

Rules:

- `index.ts` is the public boundary for a vertical.
- `_*.ts` files are private to the vertical.
- `_*/` folders are private implementation folders.
- Do not import from another vertical's `_` files.
- Promote code to shared only after at least two real call sites need it.
- Shared code should have a clear name and ownership.
- Avoid vague names like `utils` when a domain-specific name is available.
- Keep tests near the code they verify.
- Keep types near the code that owns them unless they are part of the public API.
- Keep CLI command code separated by command when the package grows beyond one command.

## Worktree Convention

Use sibling worktree directories for parallel branch work.

Convention:

```txt
{repo}.worktrees/{slugified-branch}
```

Example:

```txt
vp-cli/
vp-cli.worktrees/docs-readme-updates
vp-cli.worktrees/fix-task-inputs
```

Rules:

- Keep the main checkout at the repo root.
- Keep branch worktrees in the sibling `.worktrees` directory.
- Slugify branch names by replacing `/` with `-`.
- Do not create nested worktrees inside the main checkout.
- Verify the active worktree before editing, committing, rebasing, or force-pushing.

## Commands

Use Vite+ and the existing package scripts. Do not switch package managers.

```sh
# Install dependencies
vp install

# Run the starter CLI
vpr dev

# Run the starter CLI with arguments
vpr dev -- --name Blaze

# Format files
vpr fmt

# Lint files
vpr lint

# Run format, lint, and type checks
vpr check

# Run tests
vpr test

# Package
vpr pack

# Run all readiness checks
vpr ready
```

Use `vp run task:ready` in GitHub Actions. Use `vpr ready` locally.

Run `vpr fmt` before `vpr ready` when finalizing changes.

## Working Rules

- Keep changes scoped to one concern.
- Prefer small commits over broad mixed commits.
- Preserve the template's minimal shape.
- Do not add product-specific behavior unless explicitly requested.
- Do not add framework-specific app code unless explicitly requested.
- Do not add a CLI framework unless explicitly requested.
- Do not add publishing, release, or changelog automation unless explicitly requested.
- Do not add runtime dependencies unless the task clearly needs them.
- Do not commit generated output unless the repository explicitly requires it.
- If a requested issue is already fixed or cannot be reproduced, report that and avoid unrelated edits.
- Prefer vertical folders grouped by behavior over horizontal folders grouped by file type.
- Check generated file ownership before editing generated files.
- Check package scripts before inventing commands.
- Do not revert user changes unless explicitly asked.

## Template Boundaries

This is a starter template, not an example product.

Allowed in the base template:

- minimal CLI entrypoint fixture
- Node built-in `parseArgs`
- `tsx` for local CLI execution
- package-local `#/` imports
- Vite+ task orchestration
- Vitest test fixture
- tiny public package boundary fixture

Do not add these unless explicitly requested:

- command parser framework
- interactive prompt framework
- logging framework
- configuration file format
- runtime schema validation dependency
- release workflow
- Changesets setup
- npm publishing configuration
- package `exports`
- package `bin`
- declaration generation
- styled terminal output
- shell completion support
- install scripts
- telemetry
- auth or token handling

The starter should stay package-shape agnostic until a real project chooses whether it is a library, a CLI, or both.

## Package Boundary Rules

The initial package boundary is:

```txt
src/index.ts
```

The initial CLI entrypoint is:

```txt
src/cli/index.ts
```

When turning this template into a real package, update `package.json` intentionally:

- Use `exports` for library entrypoints.
- Use `bin` for CLI entrypoints.
- Use `files` for publishable files.
- Use `types` only when declaration output is generated.
- Add publishing metadata only when publishing is part of the project.
- Keep package names, descriptions, keywords, repository links, and license values accurate.

Do not add package boundary fields speculatively.

## TypeScript Rules

Follow the handbook TypeScript standard.

Repository-specific defaults:

- strict TypeScript
- no `any`
- no broad type assertions to bypass errors
- prefer `interface` for object shapes unless a type alias is needed
- validate or narrow values at boundaries
- keep aliases package-local
- use type-only imports and exports for type-only dependencies
- keep public API types named, readable, and stable
- prefer explicit return types for exported functions
- use `satisfies` for config objects and lookup maps
- preserve `verbatimModuleSyntax`

The root TypeScript config intentionally uses:

- `target: "ES2022"`
- `lib: ["ES2022"]`
- `module: "ESNext"`
- `moduleResolution: "bundler"`
- `isolatedModules`
- `moduleDetection: "force"`
- `verbatimModuleSyntax`
- `strict`
- `exactOptionalPropertyTypes`
- `noUncheckedIndexedAccess`
- `noImplicitOverride`
- `noPropertyAccessFromIndexSignature`
- `noUnusedLocals`
- `noUnusedParameters`
- `noEmit`

Raise `target` or `lib` only when the package intentionally targets newer runtimes or provides the needed polyfills.

## CLI Rules

The starter CLI is intentionally small.

Use Node built-ins for the starter fixture:

- `node:util` `parseArgs`
- `process.argv`
- `console.log`

Keep the starter CLI behavior replaceable.

Do not add a command router until a generated project needs more than one real command.

Do not add runtime validation, config loading, logging, or terminal styling to the template by default. Add those in generated projects when the project boundary requires them.

## Tooling Rules

Vite+ owns formatting, linting, checking, testing, packaging, and task orchestration.

Shared task input patterns live in:

```txt
tooling/patterns.ts
```

Task orchestration lives in:

```txt
tooling/tasks.ts
```

When adding generated files, outputs, or cache directories, update tooling patterns and task outputs as needed.

Generated output directories must be excluded from task inputs at both the directory and contents level so restored package output does not invalidate earlier task cache entries.

## Formatting Rules

Formatting config lives in:

```txt
tooling/format.ts
```

Import sorting includes a project alias group for imports that start with:

```txt
#/
```

Keep generated files, output directories, and local tool directories excluded through `tooling/patterns.ts`.

Keep package scripts sorted.

## Linting Rules

Lint config lives in:

```txt
tooling/lint.ts
```

The default lint plugins are:

- `eslint`
- `typescript`
- `unicorn`
- `oxc`

The default lint environment is Node-oriented for CLI/package code.

Test files add Vitest-specific rules and globals.

Lint categories are configured as:

- `correctness`: error
- `suspicious`: error
- `perf`: warn

Type-aware linting is enabled. Do not bypass lint or type failures with casts.

## Testing Rules

Vitest config lives in:

```txt
tooling/test.ts
```

Tests are matched with:

```txt
src/**/*.test.ts
```

Use the smallest reliable test for the behavior being changed.

Prefer behavior-focused tests over implementation-coupled tests unless the implementation is the important contract.

Keep tests near the code they verify.

## CI Rules

`ready.yml` should prove the repository is healthy.

CI runs:

```sh
vp run task:ready
```

The Ready workflow restores:

```txt
node_modules/.vite
node_modules/.vite-temp
dist
.output
```

Package output is restored with the task cache because generated output directories are excluded from task inputs.

Do not split CI into separate check/test/pack steps unless workflow-level behavior requires it.

## Testing And Checks

Follow the handbook tooling standard.

Use the smallest reliable check for the change:

```sh
# Most changes
vpr fmt
vpr ready

# Source behavior
vpr test
vpr ready

# Type or lint config
vpr ready

# Package task config
vpr ready

# CI changes
vpr ready

# Documentation-only changes
vpr fmt
```

If a check is not run, say so and explain why.

If tests do not exist for the touched area, say that clearly and explain what was verified instead.

Report the commands run in the final response or PR notes.

## Dependencies

Before adding a dependency:

- Check whether the repo already has an equivalent utility.
- Prefer small, well-maintained dependencies.
- Avoid adding dependencies for trivial logic.
- Explain why the dependency is needed.
- Update lockfiles consistently.

Use Vite+ dependency commands when adding packages. Do not switch package managers.

Template default dependencies should stay minimal. Add product-specific dependencies in generated projects, not in this template, unless the dependency is part of the template's core workflow.

## Generated Files

Do not manually edit generated files unless explicitly required.

Generated or output files include:

- `dist`
- `.output`
- `coverage`
- `.vite`
- `.vite-temp`

If generated files need updating, use the repository's normal dev, test, or package workflow.

## Pull Requests

Follow the handbook pull request standard.

A good PR summary should include:

- what changed
- why it changed
- how it was verified
- risks, tradeoffs, or follow-up work

For CLI output changes, include sample command output when useful.

## Commit Guidance

Follow the handbook commit standards unless this repository explicitly overrides them.

- Commit standards: https://github.com/blazeshomida/handbook/tree/main/standards/workflow
- Templates: https://github.com/blazeshomida/handbook/tree/main/templates

Keep commits scoped to one concern. Prefer documentation commits after implementation commits unless the documentation is needed to guide the implementation.

Before suggesting a commit message:

- Identify the primary change.
- Use the smallest useful scope.
- Use one primary intent.
- Avoid mixing unrelated changes.
- Mention breaking changes only when behavior or API compatibility actually breaks.

Do not create commits unless explicitly asked.

When giving commit commands, use this order:

```sh
# edit files first

vpr ready

git status --short
git add <files>
git commit -m "<message>"
```

Add extra verification before `git status --short` when the change needs it, such as `vpr test` for source behavior changes.

## Safety And Secrets

- Do not print secrets, tokens, private keys, or credentials.
- Do not commit `.env` files unless the repo intentionally tracks an example file.
- Prefer `.env.example` for documented environment variables.
- Redact sensitive values in logs and responses.

## Final Response

When work is complete, include:

- What changed.
- What was verified.
- Anything not run or not completed.
- Any follow-up that is required before merge or release.

Keep the response concise and specific to the completed work.

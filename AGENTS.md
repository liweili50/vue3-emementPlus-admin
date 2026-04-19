# AGENTS.md

## Purpose

- Repository-specific guidance for coding agents working in `v3-admin-vite`.
- Follow existing project patterns over generic Vue/Vite defaults.
- Keep changes small, local, and easy to review.

## Project Snapshot

- Stack: Vue 3.5+, Vite 7, TypeScript, Vue Router 4, Pinia, Element Plus, Axios, UnoCSS, SCSS.
- Package manager: `npm`.
- Test runner: `vitest` with `happy-dom`.
- Lint/format tool: `eslint`; Prettier is intentionally disabled.
- Aliases:
  - `@` -> `src`
  - `@@` -> `src/common`

## Rule Files

- Cursor rules exist in `.cursor/rules/`.
- No Copilot instruction file exists at `.github/copilot-instructions.md`.

## Cursor Rules To Mirror

- From `.cursor/rules/index.mdc`:
  - Reply concisely.
  - Reply in Simplified Chinese unless overridden by higher-priority instructions.
- From `.cursor/rules/project.mdc`:
  - Behave like a frontend specialist.
  - Use existing dependencies before adding new ones.
  - Keep business logic and related assets inside the owning feature folder.
  - Use ESLint for formatting; do not add Prettier.
- From `.cursor/rules/ts.mdc`:
  - Prefer `interface` for object shapes.
  - Prefer `type` for unions, intersections, and mapped types.
  - Avoid `any`; prefer `unknown` when necessary.
  - Prefer explicit return types for shared/public functions.
- From `.cursor/rules/vue.mdc`:
  - Prefer SFCs with `<script setup lang="ts">`.
  - Prefer `ref` over `reactive` for simple state.
  - Use typed props and reactive props destructuring for defaults.
  - Prefer scoped styles.
- From `.cursor/rules/git.mdc`:
  - Do not auto-commit unless explicitly asked.
  - Commit format is `type: message`.

## Repository Layout

- `src/common/`: shared APIs, assets, components, composables, constants, utils.
- `src/pages/`: feature/page modules; keep page-private APIs/components/composables here.
- `src/pinia/`: setup-style Pinia stores.
- `src/router/`: route definitions, config, guards, helpers.
- `src/plugins/`: global components, directives, plugin registration.
- `tests/`: Vitest test files.
- `types/`: global and generated typings; generated files live in `types/auto/`.

## Setup And Dev

- Install dependencies: `npm i`
- Start dev server: `npm run dev`
- Preview built app: `npm run preview`
- Vite dev server runs on port `3333` by default and opens the browser.
- Keep `package-lock.json` as the source-of-truth lockfile; do not reintroduce `pnpm-lock.yaml`.

## Build Commands

- Production build: `npm run build`
- Staging build: `npm run build:staging`
- Both scripts run `vue-tsc` before `vite build`.
- If you change props, stores, routes, or API types, expect build failures to surface type issues.

## Lint And Formatting Commands

- Lint and auto-fix: `npm run lint`
- This runs `eslint . --fix`.
- There is no separate Prettier command.
- `lint-staged` remains available for manual staged-file checks and runs `eslint --fix` on staged files.

## Test Commands

- Start Vitest watch mode: `npm run test`
- Run all tests once: `npm run test -- run`
- Run one file once: `npm run test -- run tests/utils/validate.test.ts`
- Run one Vue test file once: `npm run test -- run tests/components/Notify.test.ts`
- Run tests by name: `npm run test -- run -t "isArray"`
- Run one named test in one file: `npm run test -- run tests/utils/validate.test.ts -t "string"`
- Test file pattern: `tests/**/*.test.{ts,js}`
- Test environment: `happy-dom`

## Pre-Commit And Manual Checks

- Husky is not used in this repository.
- `lint-staged` is kept for optional manual use.
- Run `npx lint-staged` manually if you want to lint only staged files.
- Before handoff, prefer running `npm run lint` and relevant tests; for larger changes run `npm run build`.

## Runtime Requirements

- Current Vite/tooling requires Node `20.19+` or `22.12+`.
- `npm i` is supported, but Node 18 will install with warnings and can still fail at build time.

## Formatting Rules

- Indentation: 2 spaces.
- Encoding: UTF-8.
- Line endings: LF.
- Insert final newline for most files.
- Markdown is exempt from final-newline and trailing-whitespace trimming in `.editorconfig`.
- Use double quotes.
- Omit semicolons.
- Avoid trailing commas.
- Use `1tbs` brace style.

## Import Rules

- Prefer `@` and `@@` aliases over deep relative paths.
- Use `import type` for type-only imports.
- Keep imports grouped in a readable way.
- Do not assume organize-imports is desired; VS Code explicitly disables it on save.
- Preserve intentional import grouping comments where they exist, such as in `src/main.ts`.
- Feature-local imports often use relative paths within the same page/module.

## TypeScript Guidelines

- The repo uses `strict: true`; keep code fully type-safe.
- Prefer `interface` for props, store state, and request payloads.
- Prefer `type` for aliases like `ApiResponseData<T>` wrappers, unions, and intersections.
- Avoid `any`; use `unknown` plus narrowing.
- Avoid unnecessary assertions.
- Keep shared declarations in `types/`.
- Keep local types near usage unless reused broadly.
- Use generics when they improve reuse, not for cleverness.
- Shared/public utilities should expose clear signatures.

## Vue Guidelines

- Default to `<script setup lang="ts">`.
- Vue block order is `script`, then `template`, then `style`.
- Prefer Composition API patterns already used in the repo.
- Use `ref` for scalar state and `reactive` for grouped object state.
- Type props explicitly.
- For prop defaults, prefer reactive destructuring, e.g. `const { isActive = false } = defineProps<Props>()`.
- Component names use PascalCase.
- Page directories and most TS/JS filenames use kebab-case.
- In templates, prop names should be kebab-case.
- Prefer `<style scoped lang="scss">`.
- Avoid direct DOM manipulation when a Vue-first approach exists.
- Always provide stable `key` values for `v-for`.
- Do not use `v-if` and `v-for` on the same element.

## Naming Rules

- Variables and functions: `camelCase`.
- Components, interfaces, enums, and type-like symbols: `PascalCase`.
- Constants: `UPPER_CASE` when truly constant.
- Composables: `useXxx`.
- Stores: `useXxxStore`.
- Prefer descriptive booleans like `isLoading`, `hasError`, `opened`.
- Route `name` values must be unique.

## Error Handling

- Handle failures explicitly; do not silently swallow them.
- Follow existing Axios conventions in `src/http/axios.ts`:
  - inspect backend `code`
  - show `ElMessage.error(...)` for user-facing failures
  - reject with `Error` or enriched original errors
- Keep loading state cleanup in `finally` branches.
- Auth failures may reset state and reload the page; preserve that behavior when touching auth flows.

## State, Routing, And API Patterns

- Use setup-style Pinia stores like `src/pinia/stores/user.ts`.
- Router records use `RouteRecordRaw`.
- Dynamic routes must keep unique `name` values because reset logic depends on them.
- API responses commonly follow `ApiResponseData<T>`.
- Reuse the existing request helper instead of creating ad hoc fetch wrappers.

## Testing Style

- Use `describe`, `it`, and `expect` from `vitest`.
- Vue tests use `@vue/test-utils`, commonly `shallowMount`.
- Keep tests focused on utilities, rendering branches, and composable behavior.
- Test names can follow existing mixed Chinese/English style, but should stay clear.

## Commit Guidance

- Only commit when explicitly asked.
- Preferred commit types: `feat`, `fix`, `perf`, `refactor`, `docs`, `types`, `test`, `ci`, `revert`, `chore`.
- Commit format: `type: message`
- Before committing, ensure lint, type-check, and relevant tests pass.

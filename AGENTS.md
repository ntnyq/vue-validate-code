# Repository Guidelines

## Project Structure & Module Organization

`vue-validate-code` is a Vue 3 TypeScript library with canvas and SVG renderers.

- `src/index.ts` exposes the public API; `src/components/` contains `ValidateCode.vue`.
- `src/composables/` manages component behavior; `src/renderers/` implements drawing; `src/helpers/` and `src/types/` hold configuration, utilities, and contracts.
- `types/volar.d.ts` provides global component declarations.
- `tests/` contains unit and browser tests.
- `docs/` contains English and Chinese VitePress documentation; `docs/.vitepress/` holds playground components, theme styles, and configuration.
- `dist/` is generated build output. Change source files instead.

## Build, Test, and Development Commands

Use Node.js LTS and the pnpm version pinned in `package.json`.

- `pnpm install --frozen-lockfile`: install workspace dependencies reproducibly.
- `pnpm build`: bundle the library and generate declarations with tsdown.
- `pnpm docs:dev`: start the documentation playground; build the library first because docs consume the workspace package.
- `pnpm docs:build`: build the documentation site.
- `pnpm test`: run the Vitest unit suite once.
- `pnpm test:browser`: launch Chromium browser tests with the Vitest UI; install Playwright Chromium if needed.
- `pnpm lint` and `pnpm typecheck`: check lint rules and TypeScript types.
- `pnpm format` / `pnpm format:check`: apply / verify Oxfmt formatting.

## Coding Style & Naming Conventions

Use two-space indentation, LF endings, single quotes, no semicolons, and trailing commas. Oxfmt uses an 80-column print width; ESLint extends `@ntnyq/eslint-config`. Husky runs nano-staged formatting and lint fixes before commits.

Use strict TypeScript, type-only imports, and Vue Composition API with `<script lang="ts" setup>`. Name components in PascalCase, composables as `useXxx`, and functions and variables in camelCase. Follow existing barrel exports.

## Testing Guidelines

Name unit tests `tests/*.test.ts`; they use Vitest, jsdom, Vue Test Utils, and canvas mocks. Name browser tests `tests/*.browser.ts`; they use Playwright Chromium and `vitest-browser-vue`. No coverage threshold is configured. Add regression tests for behavior changes, including renderer differences where relevant. Run lint, typecheck, build, and unit tests before submitting; CI runs these checks.

## Commit & Pull Request Guidelines

Follow existing Conventional Commit subjects, such as `fix: handle renderer cleanup`, `feat: add renderer option`, or `chore(deps): update dependencies`. Keep changes focused. Describe the problem, resulting behavior, and validation in PRs; link relevant issues and include screenshots for visual changes. Update both documentation languages when changing documented APIs.

## Security Boundary

Codes are generated and validated in the browser. Preserve the README warning: this component is a visual interaction aid, not CAPTCHA, authentication, or abuse prevention.

# AI Coding Agent Instructions for vue-validate-code

These guidelines capture project-specific patterns and workflows so an AI agent can be immediately productive.

## Big Picture

- Library for Vue 3 that renders and validates a canvas-based verification code.
- Exposes both a Vue `plugin` (registers `ValidateCode` + provides global config) and the `ValidateCode` component.
- Core logic lives in the composable `useValidateCode()` which draws background, lines, dots, and randomized characters onto a `<canvas>` and validates user input.
- Global defaults in `DEFAULT_CONFIG` are merged with per-instance `props` and optional global config (via injection) to produce a computed `config`.

## Key Files & Data Flow

- Entry & exports: `src/index.ts` (exports `plugin`, `ValidateCode`, and all `helpers`).
- Component: `src/components/ValidateCode.vue` wires the canvas to `useValidateCode()`, exposes methods (`render`, `update`, `validate`, `resize`, `destroy`) and emits lifecycle + validation events (`ready`, `validate`, `success`, `fail`).
- Composable: `src/composables/useValidateCode.ts` maintains `validateCode`, canvas refs/context/size, computes `config`, and draws segments; validates input respecting `caseSensitive`.
- Helpers: `src/helpers/config.ts` (defaults + injection), `src/helpers/types.ts` (`Props`, `Emits`), `src/helpers/utils.ts` (`loop`), `src/helpers/index.ts` re-exports.
- Tests: `tests/index.test.ts` assert plugin/component render and basic canvas existence.

## Developer Workflow

- Build: `pnpm build` (tsdown). Output to `dist/` with ESM exports and `.d.ts` types.
- Test: `pnpm test` (Vitest + jsdom + `@vitejs/plugin-vue`; setup via `vitest.setup.ts` includes `vitest-canvas-mock`).
- Lint: `pnpm lint` (ESLint via `@ntnyq/eslint-config`; SVGO and UnoCSS rules enabled). Format via Prettier (`@ntnyq/prettier-config`).
- Typecheck: `pnpm typecheck` (TS `--noEmit`).
- Docs dev: `pnpm docs:dev` (runs Vite dev for docs in `docs/`). Build docs: `pnpm docs:build`.
- Release: `pnpm release` (`release:check` runs lint + typecheck + test, then `bumpp` version).

## Coding Conventions & Patterns

- ESM-first; TypeScript everywhere; Vue 3 Composition API.
- Config resolution: start from `DEFAULT_CONFIG`, merge global injected config (plugin `install()` uses `injectGlobalConfig`), then instance `props` via `cleanObject(toValue(options))`.
- Redraw triggers:
  - `updateOnClick`: component handles canvas click to `update()`.
  - `updateOnChange`: `watch(config, ...)` calls `update()` when props/global config change.
- Canvas sizing: `render()` sizes the canvas to the parent element's bounding rect; ensure parent container has meaningful dimensions.
- Events: after `validate(input)`, component emits `validate` with boolean; also `success`/`fail` accordingly; emits `ready` on mount after first render.
- Exposed methods: parent components can call `validate()`, `update()`, `resize()`, `render()`, `destroy()` via template ref.
- Utilities: prefer `@ntnyq/utils` helpers (`randomHexColor`, `randomNumber`, `cleanObject`) and `helpers/utils.loop()` for deterministic iteration.

## Extending the Library

- Adding new props: declare in `src/helpers/types.ts` (`Props`) and provide sensible defaults in `DEFAULT_CONFIG`.
- Respect global config: keep resolution order (defaults → global injection → instance props) consistent.
- Redraw behavior: if a new prop should trigger a redraw, rely on the existing `watch(config, ...)` + `updateOnChange`.
- Validation: preserve `caseSensitive` semantics; if adding alternative validation, gate behind explicit props.
- Tests: extend `tests/index.test.ts` minimally to cover new behavior without breaking existing API expectations (component renders, canvas exists).

## Usage Example (Pattern)

- Typical integration: register the plugin, use a template ref to call `validate()` and optionally `update()` on failure.
- Events: listen to `validate`, `success`, `fail` for UI feedback; use `ready` to react after initial render.

## Tooling Notes

- ESLint/Prettier configs are provided by `@ntnyq/*` packages; do not replace them—extend only if needed.
- Vitest uses jsdom; tests that interact with the canvas rely on `vitest-canvas-mock` (already set up in `vitest.setup.ts`).

Questions or gaps? If any sections feel unclear or miss project-specific nuances, call them out and propose updates; we’ll refine this file iteratively.

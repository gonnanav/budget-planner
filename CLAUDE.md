# Budget Planner

## Project Commands

Before running any development tasks (type checking, testing, linting, building, etc.), read `package.json` to find the available npm scripts and use those instead of running tools directly.

For example, use `npm run typecheck` instead of `npx tsc --noEmit`.

## Verification After Changes

After making changes, always run the appropriate verification command:

- **Type-related changes** (types, interfaces, signatures) → type check
- **Logic changes** (functions, components, business logic) → unit tests
- **Style/lint changes** → lint
- **Any significant change** → run all relevant checks to confirm nothing is broken

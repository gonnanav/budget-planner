# Even

## Project Commands

Before running any development tasks (type checking, testing, linting, building, etc.), read `package.json` to find the available npm scripts and use those instead of running tools directly.

For example, use `npm run typecheck` instead of `npx tsc --noEmit`.

## Verification After Changes

After making changes, always run the appropriate verification command:

- **Type-related changes** (types, interfaces, signatures) → type check
- **Logic changes** (functions, components, business logic) → unit tests
- **Style/lint changes** → lint
- **Any significant change** → run all relevant checks to confirm nothing is broken

## TypeScript

Always use `type` instead of `interface`.

## CSS Modules

- Import as `classes`, not `styles`
- Short, action/purpose-based names without type suffixes — `.delete` not `.deleteButton`
- Flat structure by default — only nest selectors that target the same element: pseudo-classes (`&:hover`, `&:active`), pseudo-elements (`&::before`), and attribute selectors (`&[data-x="y"]`)
- Mobile-first: base styles target mobile, use `@media screen and (min-width: 768px)` to override for larger viewports

### Property Groups

Properties within a rule are grouped by category with a comment header. The four categories, in order:

1. **Layout** — how the element participates in and establishes layout: `display`, flex/grid properties, `align-*`, `justify-*`, `gap`, `container-type`, etc.
2. **Box model** — the element's own box: `width`, `height`, `min-*`, `max-*`, `padding`, `margin`, `border`, `border-radius`, `overflow`, etc.
3. **Visual** — appearance: `background`, `color`, `font-*`, `opacity`, `text-*`, etc.
4. **Interaction** — behavior in response to user input or time: `cursor`, `transition`, `animation`, etc.

Omit a group entirely if the rule has no properties for it.

## Code Style

- Always add a blank line before `return` when preceded by other statements
- Never write inline logic inside JSX attributes — always extract to a named handler

## Testing

Unit tests for domain logic + Playwright e2e only. No component tests.

## External Boundaries

Always maintain a strict type boundary at any point where data crosses outside the app (DB, APIs, external services). Never assume raw external data matches internal domain types — always explicitly normalize at the boundary.

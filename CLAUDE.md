# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run tsc:check    # TypeScript type checking
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
npm run storybook    # Start Storybook (localhost:6006)
npm run format       # Format with Prettier
```

Run a single test file:

```bash
npx vitest run path/to/file.test.ts
```

## Architecture

This is a client-side React budget planning app with offline-first local storage.

### Directory Structure

- `src/app/` - Application entry point (page.tsx)
- `src/components/` - React components with barrel exports
- `src/core/` - Business logic, domain types, pure utility functions
- `src/db/` - Dexie database layer (IndexedDB wrapper)
- `src/lib/` - Utilities (backup/restore, formatting)
- `src/fixtures/` - Test data

### Data Flow

```
Dexie DB → useLiveQuery hooks → createCategorySummary → BudgetState → BudgetScreen
```

- **Data state**: Reactive queries via Dexie's `useLiveQuery` (auto re-render on DB changes)
- **UI state**: Local React hooks (`useActiveSection`, `useActiveEntity`, `useEntityEdit`)
- **Loadable pattern**: `{ data: T; isLoading: boolean }` wraps all data slices

### Key Patterns

- `Item` and `Category` are domain objects; `ItemRecord` and `CategoryRecord` are DB shapes (no computed fields)
- `createItem()` calculates `normalizedAmount` when converting from `ItemRecord` to `Item`
- `ItemDraft`/`CategoryDraft` manage in-flight edits before save
- Section-based routing ("income"/"expenses") handled at db layer via unified items/categories modules

## Coding Conventions

- Named exports only, no default exports
- Prefer interfaces over types
- Direct imports (`import { useState } from 'react'`)
- Don't export unused code or add to barrel files unnecessarily
- Avoid comments unless truly warranted

## UI/Styling

- Mobile-first design with HeroUI components
- Lucide for icons
- Tailwind with theme-based approach (avoid hardcoded values)

## Testing

- Vitest for unit tests
- Focus on behavior, not implementation details
- Factual test names from user's perspective: "budget is negative when expenses are higher than incomes"
- Avoid `describe` blocks unless they genuinely organize related tests

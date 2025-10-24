# Agent Guidelines

This file contains conventions and preferences for AI agents working on this project.

## Project Overview

Budget planner web application for tracking incomes, expenses, and categories.

**Tech Stack:**

- Next.js 15 (App Router) + TypeScript (strict mode)
- HeroUI component library (https://www.heroui.com/docs/components/)
- Dexie (IndexedDB wrapper) with live queries
- Vitest + Storybook for testing
- lucide-react for icons

## Working with the Oracle

Use the oracle tool for:

- Planning complex features or refactors
- UX/design decisions
- Architecture reviews
- Debugging multi-file issues
- Understanding trade-offs before implementation

The oracle provides structured planning and deeper analysis - use it before diving into implementation for non-trivial tasks.

## Commit Message Format

Commit messages should be:

- **User-perspective**: Focus on what changed for the user, not implementation details
- **No fluff**: Avoid words like "improved", "enhanced", "better" without specifics
- **Format**: `type: brief summary` followed by optional detailed description

### Structure

```
type: brief one-line summary (50-72 chars)

Optional detailed paragraph explaining what changed from the user's perspective.
Include technical details like validation, error handling, UI elements added.
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring without behavior change
- `docs:` - Documentation changes
- `test:` - Test additions or changes

### Examples

**Good:**

- `feat: add confirmation modals to backup and restore operations`
- `feat: replace import/export with backup/restore that replaces all data`
- `refactor: replace old "budget entry" name with "budget item"`

**Bad:**

- `feat: improve backup UX` (vague, "improve" is fluff)
- `feat: add cool new modals` (subjective, not descriptive)
- `refactor: make code better` (meaningless)

## Build & Development

- `npm run build` - Build for production (always run before committing)
- `npm test` - Run tests (always run before committing)
- `npm run format` - Format code with Prettier (always run before committing)
- `npm run dev` - Start development server
- `npm run lint` - Run linter

## Code Style

- **No comments** unless code is complex or requires context
- **Follow existing patterns** - look at similar components first
- **TypeScript strict mode** - no `any`, handle all cases
- **No code explanation summaries** unless user requests
- **Never assume libraries are available** - check package.json first

## Key Patterns

- **Database**: Use `useLiveQuery()` for reactive updates; always use transactions for multi-table ops (see `src/lib/db.ts`)
- **Components**: Modals go in `src/components/modals/`; follow existing HeroUI patterns in codebase
- **Testing**: Tests next to implementation (`Button.tsx` → `Button.test.tsx`)
- **Context/Providers**: Pattern in `src/contexts/` and `src/providers/` - follow existing structure

## Important Notes

- **Destructive operations** need strong safeguards (modals, confirmations, warnings)
- **Backup data format** is backward compatible - don't break it
- **Always use absolute paths** with tools (not relative)
- **Check existing components** before creating new ones

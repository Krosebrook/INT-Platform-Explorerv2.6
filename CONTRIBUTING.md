# Contributing to INT Platform Explorer

Thank you for your interest in contributing to INT Platform Explorer!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Make your changes
5. Submit a pull request

## Code Standards

### TypeScript
- Use strict TypeScript with explicit types
- Prefer interfaces over type aliases for object shapes
- Use Zod schemas for runtime validation

### React Components
- Use functional components with hooks
- Include `data-testid` attributes for testable elements
- Wrap risky components with ErrorBoundary

### Styling
- Use Tailwind CSS utility classes
- Follow the design guidelines in `design_guidelines.md`
- Ensure dark mode compatibility

### Accessibility
- Include ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers

## Commit Messages

Use conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Formatting changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Request review from maintainers

## Reporting Issues

Please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

## Adding New Features (FSD Architecture)

The frontend uses **Feature-Sliced Design**. Before writing code, identify which layer your change belongs to.

### FSD Layer Rules

| If you are building... | Put it in... |
|------------------------|-------------|
| A new route/page | `pages/` |
| A reusable UI block shared across pages | `widgets/` |
| Business logic for one user action | `features/` |
| A domain model, type, or data hook | `entities/` |
| A generic utility or UI primitive | `shared/` |

**Import rule:** You may only import from layers **below** your own. Never import across slices within the same layer.

```
app → pages → widgets → features → entities → shared
```

### Template: Creating a New Page

```bash
# 1. Create the page directory
mkdir -p client/src/pages/my-page

# 2. Add files
touch client/src/pages/my-page/index.ts
touch client/src/pages/my-page/ui.tsx
```

**`ui.tsx`** -- page component:
```tsx
export function MyPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Page</h1>
      {/* Compose widgets and features here */}
    </div>
  );
}
```

**`index.ts`** -- barrel export:
```ts
export { MyPage } from "./ui";
```

Then:
- Register the route in `app/routes/index.tsx` (add a `<Route>` in the `<Switch>`)
- Add a sidebar nav item in `widgets/sidebar-nav/model.ts` (add to the appropriate `NAV_GROUPS` entry)
- If the page needs `selectedPlatforms` state, thread it through `AppRoutesProps`

### Template: Creating a New Feature Module

```bash
# 1. Create the feature directory
mkdir -p client/src/features/my-feature

# 2. Add files
touch client/src/features/my-feature/index.ts
touch client/src/features/my-feature/model.ts
touch client/src/features/my-feature/ui.tsx   # optional
```

**`model.ts`** -- business logic and hooks:
```ts
import { useState } from "react";

export function useMyFeature() {
  const [value, setValue] = useState("");
  // ... business logic
  return { value, setValue };
}
```

**`index.ts`** -- public API only:
```ts
export { useMyFeature } from "./model";
export { MyFeaturePanel } from "./ui";  // if ui.tsx exists
```

### Checklist for All Contributions

- [ ] Code lives in the correct FSD layer
- [ ] No imports from the same layer or above
- [ ] Slice internals are only accessed through `index.ts`
- [ ] New pages are registered in `app/routes/` and `widgets/sidebar-nav/`
- [ ] Shared components have no business logic

## Questions?

Open a discussion or reach out to the maintainers.

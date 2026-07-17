# Responsive and Interaction

## Purpose

This document defines cross-domain principles for responsive behavior and interaction design.

Responsive design is treated as preservation of task continuity across available space, not as simple visual compression.

---

## Task Continuity Principle

A user should be able to begin a task in one layout and continue understanding the same task when the interface adapts.

Important context may include:

- current domain;
- selected entity;
- search query;
- active filters;
- loaded directory position;
- scroll position;
- origin focus;
- unsent content when preservation is appropriate.

---

## Breakpoints Are Implementation Tools

Product documentation should describe behavior changes, not assume that a named breakpoint itself explains the product.

Document:

- what remains visible;
- what changes position;
- what becomes a focused view;
- how the user returns;
- what context must be restored;
- which actions remain available.

---

## Master-Detail Pattern

For domains where selection context matters, desktop may show:

```text
Directory | Inspector
```

Smaller layouts may transform this into:

```text
Directory
    ↓ select
Focused Inspector
    ↓ back
Directory with context restored
```

The product behavior should preserve:

- selection relationship;
- query and filters;
- loaded position;
- return path;
- focus origin when possible.

The mobile inspector is not a separate product flow.

---

## Navigation Context

Navigation should distinguish:

- moving to another domain;
- opening related entity context;
- opening a modal action;
- switching focused views within the same domain.

The browser history model and in-app Back behavior should not contradict each other.

Deep links should open meaningful context even when the visual composition differs by device.

---

## Search Interaction

Search behavior should define:

- local or server source;
- minimum useful query length when relevant;
- debounce behavior as implementation detail only when it affects perceived state;
- loading/refresh feedback;
- no-results behavior;
- preservation during selection and return.

Search should not clear selection or context unnecessarily.

---

## Filter Interaction

Filters should:

- show active state;
- produce predictable result changes;
- remain understandable after navigation into detail;
- provide a clear reset path;
- distinguish zero real data from zero under current filter.

Summary cards may act as filters only when the relationship is explicit and consistent.

---

## Action Feedback

Every consequential action should define:

- idle state;
- pending state;
- prevention of duplicate action when needed;
- success feedback;
- error feedback;
- recovery path;
- effect on surrounding data.

Do not rely on a generic toast when the local state itself must change visibly.

---

## Optimistic vs Confirmed Change

Use optimistic interaction only when:

- failure is uncommon;
- rollback is understandable;
- consequence is low;
- the user does not need confirmed external state before continuing.

Prefer confirmed updates for:

- access revocation;
- irreversible cancellation;
- actions with external communication consequence;
- operations where duplicate action is costly.

---

## Confirmation Pattern

Confirmation should be proportional to consequence.

Prefer inline confirmation when:

- the action is contextual;
- the effect can be explained briefly;
- leaving the current context would be disruptive.

Use a modal when:

- the action affects a wider scope;
- the consequence requires dedicated explanation;
- additional confirmation input is justified.

---

## Loading Behavior

### Initial loading

Preserve page orientation and expected structure.

### Refreshing

Keep existing useful content when safe instead of replacing the entire view with a blank loading screen.

### Loading more

Append without losing reading position.

### Detail loading

Preserve list context while making the selected-detail state clear.

---

## Error Recovery

Recoverable errors should preserve user work and context.

The interface should define:

- retry action;
- whether previous data remains visible;
- whether stale data can still be used;
- whether the user must change input;
- whether a different actor is responsible.

---

## Touch, Pointer and Keyboard

Primary actions must not depend on hover.

Interactive targets should have clear affordance across touch and pointer input.

Keyboard users must be able to:

- navigate controls;
- activate actions;
- understand focus;
- enter and exit dialogs;
- return from focused detail views;
- use fallback loading actions where automatic loading is not reliable.

---

## Motion

Motion should communicate:

- relationship;
- state change;
- navigation direction;
- opening/closing context.

Avoid motion that:

- delays frequent work;
- hides state changes;
- causes layout instability;
- creates decorative distraction in long-session operational use.

Respect reduced-motion preferences in implementation.

---

## Responsive Review Questions

For every important surface, ask:

1. What is the primary task?
2. What context is required to complete it?
3. Which content can move without losing meaning?
4. Which content can be progressively disclosed?
5. What becomes a focused view on smaller layouts?
6. How does the user return?
7. What state must be restored?
8. Are all essential actions still available?
9. Does semantic reading order still make sense?
10. Has the layout been validated with long localized content?

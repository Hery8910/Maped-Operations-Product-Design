# Accessibility and Semantics

## Purpose

This document defines accessibility and semantic requirements that apply across the product.

Accessibility is treated as part of product behavior, not as a final compliance pass.

---

## Core Principle

Every user must be able to understand:

- where they are;
- what can be acted on;
- what is selected;
- what changed;
- what failed;
- how to recover;
- what requires confirmation.

The method must not depend on color, pointer precision or visual layout alone.

---

## Semantic Structure

### Landmarks and page regions

Application pages should expose meaningful structure for:

- primary navigation;
- page title and context;
- main content;
- secondary context or inspector region when present;
- global feedback when appropriate.

### Headings

Heading levels should represent content hierarchy, not typography.

A selected item title inside an inspector should not become a page-level heading solely because it is visually large.

### Buttons and links

Use a button for an action that changes interface or data state.

Use a link for navigation to another destination or addressable context.

Do not rely on visual styling to communicate semantics.

---

## Keyboard Interaction

All product actions must be reachable and operable with keyboard interaction where the platform supports it.

Required considerations include:

- logical tab order;
- visible focus;
- no keyboard traps;
- predictable activation;
- focus movement for modal and focused-view transitions;
- focus restoration after close or back actions;
- equivalent access to contextual actions.

Complex composite widgets should only use specialized keyboard behavior when the interaction model is clear and tested.

---

## Focus Management

### Dialogs

When a modal dialog opens:

- focus moves into the dialog;
- background interaction is unavailable while modal;
- Escape behavior is defined when safe;
- closing returns focus to the triggering control when it still exists.

### Master-detail and focused mobile views

Selection should not cause arbitrary focus loss.

When mobile transforms a list-detail surface into a focused detail view:

- the destination context should be announced by structure and focus placement;
- Back should restore the prior list context when possible;
- focus should return near the item that opened the detail.

### Errors

After failed submission, focus should move only when necessary to help recovery.

Avoid forcing focus to global alerts when field-level correction is the actual next action.

---

## Selection and Current Context

Selected state must be communicated through more than visual color.

Depending on semantics, use meaningful current/selected state behavior and accessible naming.

For directory items, the user should be able to determine:

- which item is selected;
- whether an item represents a user or invitation;
- important status;
- attention state when relevant.

---

## Status Communication

Status must not depend on color alone.

Use a combination of:

- text label;
- icon when useful;
- semantic grouping;
- visual treatment.

Technical codes should be translated into understandable product language.

A condition such as account locked, expired invitation or stale verification should explain what it means and what action is available.

---

## Loading, Empty and Error States

### Loading

Loading state should preserve enough layout and context that the user understands what is being loaded.

Do not announce repetitive low-value progress changes.

### Empty

Distinguish:

- true empty data;
- no search results;
- no results under current filters;
- unavailable data;
- loading failure.

These states require different messages and actions.

### Error

An error message should answer:

- what failed;
- whether user input was preserved;
- whether retry is safe;
- what action can be taken next.

---

## Forms

Forms should provide:

- persistent labels;
- clear required/optional meaning;
- validation connected to the relevant field;
- understandable error language;
- preservation of entered data after recoverable errors;
- visible pending state during submission;
- prevention of accidental duplicate action where consequence matters.

Multi-step flows should communicate:

- current step;
- completed progress when useful;
- validation boundary;
- ability to go back without unnecessary data loss.

---

## Search and Filters

Search and filter controls should expose:

- current query;
- active filters;
- clear reset behavior;
- result state;
- loading/refresh state when remote data changes.

A filter summary count should not imply precision while its source is still loading or failed.

---

## Incremental Loading

When infinite or cursor-based loading is used:

- loading must be understandable;
- end of results must be distinguishable;
- automatic loading should not be the only mechanism when a fallback action is necessary;
- focus and reading position should not jump unexpectedly when new items append.

---

## Responsive Accessibility

Responsive design must preserve access to:

- the same critical information;
- the same essential actions;
- equivalent status meaning;
- a clear way back to previous context.

Reordering content visually must not create a contradictory semantic order.

Controls hidden for responsive reasons must have an equivalent reachable path.

---

## Theme Accessibility

Light and dark themes must be validated independently.

Both themes must preserve:

- text readability;
- visible focus;
- selected state;
- disabled state;
- border/surface hierarchy;
- status distinction;
- error and warning meaning.

Dark mode is not a color inversion operation.

---

## Prototype Requirements

The prototype should demonstrate accessibility-relevant behavior for the question being tested.

At minimum for the Customers reference domain, prototype behavior should show:

- semantic directory/list structure;
- keyboard-reachable items and actions;
- visible focus;
- selected state;
- detail context;
- modal focus behavior;
- loading, empty and error representations;
- mobile back/context restoration concept.

---

## Handoff Checklist

For each implemented surface, verify:

1. The page and regions have meaningful structure.
2. Actions use appropriate semantics.
3. Keyboard access is complete.
4. Focus behavior is defined for context changes.
5. Selection is understandable without color.
6. Status is expressed in text.
7. Loading, empty, no-results and error states are distinct.
8. Form errors are associated with the correct input.
9. Responsive adaptation preserves task access.
10. Both themes preserve hierarchy and focus visibility.

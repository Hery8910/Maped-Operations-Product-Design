# Data and Content Principles

## Purpose

This document defines how data earns visibility and how product content communicates operational meaning.

The objective is to prevent interfaces from becoming projections of database models or collections of technically accurate but operationally useless fields.

---

## Data Purpose Rule

Every visible data point should answer at least one product question.

Examples:

- Who is this person?
- Can they currently access the product?
- Is there a condition requiring attention?
- What service did they request?
- Where will work occur?
- What is the current operational responsibility?
- What should the operator do next?

If no meaningful question is answered, the data should not be visible by default.

---

## Data Documentation Template

For important fields or groups, define:

### Purpose

Why the user needs this information.

### Source

Which product concept owns the value.

### Freshness

Whether the value is stable, eventually updated or time-sensitive.

### Visibility

Who should see it and in what context.

### Editability

Who may change it and where.

### Fallback

What the interface shows when the value is absent.

### Sensitivity

Whether exposure should be restricted.

### Decision enabled

What action or judgment the information supports.

---

## Source Data vs Derived Data

The interface should distinguish conceptually between:

- source data entered or maintained by an actor;
- system state;
- derived summary;
- attention reason;
- historical event.

A derived summary should not be presented as an editable source field.

A technical condition should not be exposed as a raw code when a product explanation is required.

---

## Summary Data

Summary metrics must have a defined source and scope.

Do not derive operational counts from the currently loaded page of a paginated directory unless that is explicitly the intended scope.

A summary should define:

- population counted;
- filters included;
- refresh behavior;
- loading behavior;
- error behavior;
- whether clicking the summary changes the current filter.

---

## Missing Data

Absence has multiple meanings.

Distinguish:

- not provided;
- not applicable;
- unavailable;
- private or restricted;
- failed to load;
- not yet supported.

Do not use the same fallback for all cases.

---

## Sensitive Data

Sensitive data should be shown only when the task requires it.

Consider:

- identity data;
- contact information;
- work addresses;
- internal notes;
- access/security state;
- billing information;
- operational history.

The product definition should document why the data is visible to a given actor.

---

## Content Voice

Operational content should be:

- direct;
- calm;
- specific;
- action-oriented;
- non-accusatory;
- understandable without technical knowledge.

Avoid:

- raw backend terminology;
- vague success messages;
- alarming language for recoverable conditions;
- generic labels such as `Error` when the product knows what happened;
- unnecessary marketing tone inside recurring operational work.

---

## Status Labels

A status label should explain the business meaning.

Prefer a short status plus contextual explanation where needed.

Example pattern:

```text
Locked
Access is currently blocked. Review account status before contacting the customer about login.
```

Do not expose internal enum names as user-facing copy.

---

## Attention Reasons

An attention reason should answer:

- what condition exists;
- why it matters;
- whether action is required;
- what action is available.

Attention is not a visual decoration. It should represent a condition with operational consequence.

---

## Empty-State Content

Empty-state copy should reflect the actual cause.

### True empty

Explain what will appear here and the next legitimate action.

### No search results

Reference the query or search condition and provide a way to adjust it.

### Filtered empty

Explain that current filters produced no results and make reset easy.

### Unavailable

Explain the failure and recovery path.

Do not use celebratory empty-state copy when absence may represent a configuration or operational problem.

---

## Action Labels

Action labels should describe the result.

Prefer:

- `Invite customer`
- `Resend invitation`
- `Revoke invitation`
- `Add internal note`

Avoid ambiguous verbs such as:

- `Submit`
- `Process`
- `Manage`

when a more precise label is possible.

---

## Dates and Time

Date and time presentation should be based on the product decision being supported.

The product must define whether the user needs:

- exact timestamp;
- local date;
- relative recency;
- scheduled range;
- timezone context.

Relative text such as `3 days ago` should not replace an exact date when precise operational coordination matters.

---

## Localization

Translated content must preserve product meaning, not only literal wording.

Design should account for:

- longer labels;
- compound words;
- status text expansion;
- button width changes;
- date and number formatting;
- localized error explanations.

Critical product copy should not be distributed across inconsistent hardcoded sources when it belongs to a shared content contract.

---

## Content Ownership

For every important message, define whether it belongs to:

- core product copy;
- tenant configuration;
- tenant-specific content;
- system-generated contextual content.

Notification templates should be configurable only where variation is legitimate and controlled. Configuration should not allow the tenant to break product-critical meaning.

---

## Data Visibility Review

Before adding a visible field, ask:

1. What product question does it answer?
2. Who needs that answer?
3. At what moment?
4. Does it enable a decision or action?
5. Is it already visible elsewhere in a better context?
6. Is the data trustworthy enough for the decision?
7. What happens when it is missing?
8. Is it sensitive?
9. Does it belong in overview, detail or progressive disclosure?

# Product Principles

## Purpose

This document defines the stable principles used to evaluate product decisions across Maped Solutions operational products.

These principles are not UI rules. They are decision rules that should survive changes in framework, architecture, visual style and tenant implementation.

---

## 1. Solve the operational problem before designing the interface

Every capability begins with a real job, decision, coordination problem or risk.

A page, component, field or workflow is not justified by familiarity, convention or availability in the data model.

Before designing a solution, define:

- the actor;
- the situation;
- the problem;
- the desired outcome;
- the decision or action enabled by the solution.

---

## 2. Existing implementation is evidence, not authority

Production code, routes, endpoints and components are valuable evidence.

They may reveal:

- proven flows;
- technical constraints;
- real states;
- useful interaction patterns;
- historical shortcuts;
- duplicated concepts;
- unresolved ambiguity.

They do not automatically define the future product.

Observed behavior should be classified before adoption:

- preserve;
- simplify;
- redesign;
- replace;
- remove;
- investigate.

---

## 3. Separate core product, configuration and specific extension

Every tenant difference should be classified deliberately.

### Core product

A recurring capability that solves a sufficiently general problem across service businesses.

### Tenant configuration

A legitimate implementation difference expected across tenants without changing the underlying product concept.

### Specific extension

A valuable tenant-specific requirement that should not silently become global product behavior.

The classification may change as evidence grows. The important rule is that the distinction remains explicit.

---

## 4. Prefer the smallest coherent product over the largest configurable system

Configurability has a cost:

- more states;
- more testing paths;
- more explanation;
- more migration risk;
- more support burden;
- more opportunities for contradictory behavior.

A variation should become configurable only when real product evidence justifies it.

Do not create configuration merely to avoid making a product decision.

---

## 5. Preserve task continuity

Users should not lose meaningful context when they:

- inspect an item;
- open related information;
- change device size;
- move between list and detail;
- encounter a recoverable error;
- return from a secondary action.

Context may include:

- selected item;
- search query;
- filters;
- loaded position;
- scroll position;
- focus origin;
- unsent input when appropriate.

Responsive adaptation must preserve the task, not merely the content.

---

## 6. Operational clarity is more important than decorative similarity

The public client surface and the operational dashboard belong to the same product ecosystem but perform different jobs.

The dashboard should prioritize:

- orientation;
- repeated use;
- predictable placement;
- actionable hierarchy;
- readable density;
- visible state;
- low-friction transitions.

Brand identity should be expressed without forcing marketing-page behavior into operational tools.

---

## 7. Every visible data point must earn its place

A field should be visible because it helps the user:

- understand context;
- make a decision;
- perform an action;
- detect risk;
- verify identity;
- coordinate work.

The existence of a backend field is not sufficient justification.

For important data, documentation should define:

- purpose;
- source;
- freshness expectations;
- editability;
- fallback;
- sensitivity;
- downstream decisions.

---

## 8. State is part of the product

A feature is not defined only by its success state.

Relevant states may include:

- initial;
- loading;
- refreshing;
- empty;
- no results;
- partial data;
- error;
- success;
- pending action;
- destructive confirmation;
- disabled;
- selected;
- stale or unavailable context.

The product definition should distinguish these states when they change user understanding or action.

---

## 9. Accessibility is architecture

Accessibility decisions must be made while defining:

- information hierarchy;
- navigation;
- selection;
- dialogs;
- feedback;
- keyboard behavior;
- focus restoration;
- loading announcements;
- responsive transformations.

Automated checks are evidence. They are not a substitute for semantic and interaction design.

---

## 10. Use progressive disclosure

Show the information and actions required for the current decision.

Secondary detail should remain available without competing with the primary task.

This is particularly important in operational surfaces with dense relationships such as:

- person → requests;
- request → schedule;
- request → worker;
- customer → communication;
- entity → internal notes.

Progressive disclosure should reduce cognitive load without hiding critical risk or state.

---

## 11. Destructive and irreversible actions require proportional friction

The confirmation burden should match the consequence.

Examples:

- a reversible filter change needs no confirmation;
- an external message may need review when consequence is meaningful;
- revoking access should clearly state its effect;
- deletion or irreversible cancellation requires explicit confirmation and recovery policy when possible.

Do not use the same friction for every action.

---

## 12. Decisions must remain recoverable

For non-obvious product decisions, preserve:

- context;
- evidence;
- decision;
- rationale;
- trade-offs;
- revisit condition.

The documentation should explain why the product behaves as it does without requiring access to old conversations.

---

## 13. Prototype to answer questions, not to reproduce production

A prototype should answer product questions about:

- hierarchy;
- task order;
- state communication;
- navigation context;
- responsive transformation;
- interaction model;
- visual direction.

A prototype should not become an alternative implementation of:

- authentication;
- API architecture;
- production routing;
- database behavior;
- infrastructure.

---

## 14. Extract patterns after real validation

Do not force all domains into a theoretical component system.

Use this sequence:

```text
real problem
→ domain solution
→ validation
→ reusable behavior identified
→ pattern extracted
→ pattern documented
→ intentional reuse
```

A pattern should be shared because its behavior is reusable, not because two screenshots look similar.

---

## 15. Uncertainty must remain visible

Documentation should distinguish:

- accepted decision;
- working hypothesis;
- observed behavior;
- inferred relationship;
- unresolved question.

False certainty is more expensive than a visible open question.

---

## Product Decision Check

Before accepting a meaningful product change, verify:

1. The problem is explicit.
2. The actor is explicit.
3. The expected action or decision is explicit.
4. The relevant product layer is explicit.
5. Important states are defined.
6. Responsive continuity is considered.
7. Accessibility consequences are considered.
8. Data purpose is clear.
9. Complexity is justified.
10. The reason can be recovered later.

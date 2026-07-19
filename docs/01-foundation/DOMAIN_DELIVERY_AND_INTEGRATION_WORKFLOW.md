# Domain Delivery and Integration Workflow

## Purpose

This document defines the operational sequence for moving one product domain from analysis to validated production.

The project develops the platform incrementally by vertical domain slices.

The default sequence is:

```text
Define
  ↓
Prototype
  ↓
Visual and flow validation
  ↓
Integration Contract + Handoff
  ↓
IMPLEMENTATION_READY
  ↓
Frontend implementation + Backend convergence
  ↓
Integration
  ↓
Integrated product validation
  ↓
Pattern extraction and product learning
```

This workflow exists to keep product design, frontend, and backend aligned without forcing the whole platform into a single large implementation phase.

---

## 1. Why Vertical Domain Slices

The platform should not be designed completely in theory before implementation.

It also should not be built page by page without product continuity.

A vertical domain slice allows the project to solve a real product area deeply enough to validate:

- domain concepts;
- business rules;
- information architecture;
- data requirements;
- interaction behavior;
- responsive behavior;
- accessibility needs;
- production contracts;
- reusable patterns.

The slice is complete only when the integrated product behavior is validated.

A prototype alone is not completion.

A frontend page alone is not completion.

An endpoint alone is not completion.

---

## 2. Phase 1 — Define

### Goal

Establish what the domain means before deciding how it looks.

### Required Inputs

Use relevant evidence from:

- business needs;
- user tasks;
- tenant requirements;
- frontend audit;
- backend audit;
- existing production flows;
- known constraints;
- support or operational observations.

Evidence may inform the decision.

It does not automatically become the decision.

### Required Product Artifacts

At minimum:

```text
DOMAIN.md
FLOWS.md
STATES_AND_ACTIONS.md
PRODUCT_NOTES.md
```

### Questions to Resolve

- What problem does the domain solve?
- Who uses it?
- What are the canonical concepts?
- What belongs inside and outside the domain?
- What are the main tasks?
- Which states are product-visible?
- Which actions are allowed from each state?
- Which permissions matter?
- Which relationships to other domains are real?
- Which current behaviors are evidence only?
- Which questions remain unresolved?

### Exit Gate

The domain may move to PROTOTYPED when the intended behavior is coherent enough to represent visually without relying on placeholder product logic.

---

## 3. Phase 2 — Prototype

### Goal

Make product decisions reviewable through a simple interactive representation.

### The Prototype May Simulate

- navigation;
- selection;
- loading;
- empty states;
- success;
- warning;
- error;
- confirmation;
- dialogs;
- responsive changes;
- state transitions;
- theme behavior.

### The Prototype Must Not Become

- a second frontend application;
- an alternative router architecture;
- a fake production backend;
- a real auth system;
- a database-backed application;
- a framework exercise.

### Prototype Review Focus

Review the product, not the code.

Ask:

- Is the task understandable?
- Is the hierarchy correct?
- Is the right information visible at the right time?
- Does the flow preserve context?
- Are important states represented?
- Does mobile behavior preserve the task rather than simply compress the desktop UI?
- Are destructive actions clear?
- Are errors actionable?
- Is accessibility behavior designed, not added later?
- Do light and dark themes preserve hierarchy and status meaning?

### Exit Gate

A domain remains PROTOTYPED until the relevant visual and flow decisions have been reviewed.

---

## 4. Phase 3 — Visual and Flow Validation

### Goal

Confirm that the prototype represents the current product decision well enough to become an implementation baseline.

### Validate

- information hierarchy;
- terminology;
- action priority;
- state visibility;
- feedback behavior;
- responsive transitions;
- navigation context;
- dialog behavior;
- destructive action confirmation;
- keyboard and focus expectations;
- loading and failure behavior;
- theme consistency;
- MVP boundaries;
- intentionally postponed behavior.

### Validation Output

Validation may produce:

- prototype revisions;
- domain rule revisions;
- state model corrections;
- copy changes;
- data requirement changes;
- removal of unnecessary information;
- new unresolved questions.

The prototype must not be frozen while the product documents remain contradictory.

### Exit Gate

The domain becomes VALIDATED when the current scope is accepted as the product direction.

---

## 5. Phase 4 — Integration Contract

### Goal

Translate the validated product into a system capability boundary shared by frontend and backend.

### Contract Structure

Use the following sections when relevant.

#### 1. Scope

- domain;
- implementation scope;
- out of scope;
- tenant configuration;
- specific extensions.

#### 2. Canonical Concepts

For each concept:

- product name;
- meaning;
- ownership;
- stable identifier needs;
- relationships;
- whether it is source data or derived data.

#### 3. Read Requirements

For each view or task:

- required data;
- projection/read model expectations;
- filtering;
- sorting;
- search;
- pagination;
- freshness;
- fallback behavior;
- sensitive fields.

#### 4. Write Requirements

For each action:

- actor;
- command/action;
- required input;
- validation;
- guard conditions;
- resulting state;
- side effects;
- retry/idempotency expectations when relevant.

#### 5. State Machine

Define:

- product-visible states;
- allowed transitions;
- forbidden transitions;
- actor permissions;
- internal-only states that must not leak into UI.

#### 6. Error Semantics

Define stable product-level outcomes.

Examples:

```text
TENANT_ACCESS_EXISTS
PENDING_INVITATION_EXISTS
INVITATION_EXPIRED
VALIDATION_ERROR
DELIVERY_FAILED
TEMPORARY_SERVICE_FAILURE
```

Names are examples unless confirmed by the domain contract.

The important requirement is semantic stability.

#### 7. Authorization

Define:

- who may read;
- who may act;
- tenant boundaries;
- ownership boundaries;
- role restrictions;
- sensitive data restrictions.

#### 8. Side Effects and Guarantees

Distinguish:

- transactionally guaranteed effects;
- best-effort effects;
- eventually consistent projections;
- retryable delivery;
- user-visible warning conditions.

The UI must not promise a guarantee the system does not provide.

#### 9. Existing Capability Mapping

Map each requirement to:

- already supported;
- supported with adaptation;
- missing;
- conflicting;
- deprecated;
- unknown.

This is where backend and frontend evidence meet the approved product.

#### 10. Open Blockers

Only blockers that prevent implementation readiness belong here.

Do not keep vague future ideas in the contract.

### Exit Gate

The contract is ready when frontend and backend can independently understand the same domain behavior and identify their implementation work without inventing new product rules.

---

## 6. Phase 5 — Implementation Handoff

### Goal

Protect the validated product behavior during production implementation.

### Handoff Structure

#### Experience Goal

What user job must the implementation support?

#### Entry Conditions

How does the user arrive?

What context must already exist?

#### View States

Document relevant states such as:

- initial loading;
- refreshing;
- populated;
- empty;
- recoverable error;
- fatal error;
- submitting;
- success;
- warning;
- permission denied;
- stale data;
- selected item;
- focused mobile detail.

#### Behavior

For each action:

- trigger;
- immediate feedback;
- pending behavior;
- success behavior;
- failure behavior;
- context preservation.

#### Responsive Requirements

Document behavior changes, not only breakpoints.

For example:

```text
Desktop:
directory and inspector remain visible together.

Mobile:
detail becomes a focused view of the same task context.
Back restores directory state, filters, scroll position, and focus target.
```

#### Accessibility Requirements

Include, when relevant:

- semantic structure;
- labels;
- announcements;
- focus movement;
- focus restoration;
- keyboard navigation;
- dialog semantics;
- destructive action confirmation;
- status communication;
- disabled vs. unavailable meaning.

#### Data Display Rules

Explain:

- why a field is shown;
- when it is shown;
- fallback;
- sensitivity;
- editability;
- whether it is source or derived data.

#### Acceptance Criteria

Write observable criteria.

Avoid implementation-only criteria unless a technical constraint affects product behavior.

### Exit Gate

The handoff is complete when a production implementation can be reviewed against it objectively.

---

## 7. Phase 6 — IMPLEMENTATION_READY Review

A domain may be marked IMPLEMENTATION_READY only when all of the following are true.

### Product Definition

- Domain purpose and boundaries are coherent.
- Actors are identified.
- Core concepts are defined.
- Relevant flows are documented.
- Product-visible states and actions are defined.
- MVP scope and deliberate exclusions are clear.

### Prototype and Validation

- The relevant experience is prototyped.
- Visual hierarchy has been reviewed.
- Flow behavior has been reviewed.
- Important loading, empty, error, warning, and success states are represented.
- Responsive behavior has been reviewed.
- Accessibility-critical interaction is defined.
- Theme behavior has been checked when the surface supports both themes.

### Integration Preparation

- Integration Contract exists.
- Handoff exists.
- Known frontend/backend conflicts are explicit.
- Required API or read-model gaps are identified.
- Product-level error semantics are defined.
- Authorization boundaries are defined.
- Cross-domain dependencies are known.
- No unresolved question remains that would force implementers to invent product behavior.

Only then:

```text
Status: IMPLEMENTATION_READY
```

---

## 8. Phase 7 — Parallel Production Work

### Frontend Track

Frontend should:

1. Read the domain baseline.
2. Read the handoff.
3. Read the relevant contract sections.
4. Audit the closest existing production architecture.
5. Reuse compatible production components and patterns.
6. Implement real async states.
7. Integrate accessibility behavior with production routing and state.
8. Surface contract gaps instead of hiding them.
9. Add or update tests for acceptance-critical behavior.
10. Record production-specific technical decisions locally.

### Backend Track

Backend should:

1. Read the domain baseline.
2. Read the Integration Contract.
3. Map current entities and services to canonical product concepts.
4. Preserve valid existing invariants.
5. Identify naming or lifecycle mismatches.
6. Add or adapt read models.
7. Add or adapt commands/actions.
8. enforce transitions and permissions.
9. return stable product-level outcomes.
10. document guarantees, best-effort effects, and eventual consistency.
11. add or update tests for contract-critical behavior.

### Rule

Neither track should wait for the other to finish completely.

Both should converge against the same baseline.

---

## 9. Phase 8 — Contract Verification

Before full integration, verify the seams.

### Verify

- identifiers;
- query parameters;
- filters;
- sort semantics;
- pagination model;
- search behavior;
- state values;
- transition guards;
- error codes/outcomes;
- permission failures;
- side-effect warnings;
- null/fallback semantics;
- data freshness;
- derived projection behavior.

This phase catches false alignment where frontend and backend both look complete but implement different meanings.

---

## 10. Phase 9 — Integration

### Goal

Connect the real production surfaces.

### Test Real Behavior

- first load;
- refresh;
- deep link;
- navigation back/forward;
- slow request;
- partial failure;
- empty dataset;
- stale or changed item;
- permission change;
- repeated submit prevention;
- retry behavior;
- mobile navigation;
- focus restoration;
- translated content density;
- light/dark theme;
- network failure;
- backend warning without transaction rollback.

The prototype is a behavior reference.

It is not proof that integration works.

---

## 11. Phase 10 — Integrated Product Validation

### Goal

Validate the implemented domain as a real product experience.

Review:

- usefulness;
- clarity;
- operational speed;
- context preservation;
- error recovery;
- misleading guarantees;
- unnecessary data;
- missing data;
- permission clarity;
- accessibility;
- mobile task completion;
- tenant variation;
- consistency with adjacent domains.

Possible outcomes:

```text
PRODUCT_VALIDATED
```

or:

```text
RETURN TO PRODUCT REVISION
```

A return is not a failure of the workflow.

It is the mechanism that prevents technical completion from being confused with product quality.

---

## 12. Pattern Extraction

Reusable patterns are extracted after solving and validating real domain problems.

Default process:

```text
Solve real domain problem
        ↓
Validate product behavior
        ↓
Implement and integrate
        ↓
Observe what is genuinely reusable
        ↓
Extract pattern
        ↓
Document pattern
        ↓
Reuse intentionally
```

Do not create a large theoretical design system first.

For the Customers reference domain, likely candidates for later pattern extraction include:

- application shell;
- summary and action region;
- directory;
- search and filters;
- selectable items;
- master-detail behavior;
- inspector shell;
- feedback layer;
- modal layer;
- responsive context preservation.

A candidate becomes a shared pattern only after validation.

---

## 13. Domain Delivery Package

When a domain reaches IMPLEMENTATION_READY, the delivery package should be easy to identify.

Recommended canonical package:

```text
docs/02-domains/<domain>/
├── DOMAIN.md
├── FLOWS.md
├── STATES_AND_ACTIONS.md
├── PRODUCT_NOTES.md
├── INTEGRATION_CONTRACT.md
└── HANDOFF.md
```

The prototype remains in the Product Design repository.

Production repositories should receive a compact local reference, not copied ownership of the product documents.

Recommended local anchor:

```text
docs/product-context/<domain>.md
```

That anchor may contain:

- domain;
- status;
- Product Design baseline reference;
- implementation scope;
- local technical notes;
- known deviations;
- integration verification status.

It should not duplicate the full product definition.

---

## 14. Current Customers Sequence

**Current status:** Customers is DEFINED. Corrected slices are PLANNED;
Customers is not PROTOTYPED or IMPLEMENTATION_READY.

Current delivery sequence:

```text
Customers definition DEFINED
        ↓
Cross-repository capability verification
        ↓
Verify selected slice contract, handoff and dependencies
        ↓
Selected slice IMPLEMENTATION_READY
        ↓
Frontend implementation + backend convergence for that slice
        ↓
Contract verification
        ↓
Slice integration
        ↓
Integrated slice validation
        ↓
PRODUCT_VALIDATED
        or
RETURN_TO_PRODUCT_REVISION
        ↓
Proceed to the next slice
        ↓
After all corrected slices and end-to-end validation:
Customers PRODUCT_VALIDATED
```

The prototype and audits remain evidence, not authority. Each slice must still
be reviewed against:

- Customers domain definition;
- flows;
- states and actions;
- product notes;
- foundation principles;
- frontend evidence;
- backend evidence.

No slice enters implementation until it is IMPLEMENTATION_READY and has no
blocker that would force rule invention. IMPLEMENTATION_READY is a
pre-implementation gate, never a post-integration Customers status. Product
definition does not make every slice ready.

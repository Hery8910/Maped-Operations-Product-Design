# Maped Solutions Product Design

## Purpose

This repository is the product definition, design, interaction and implementation-reference workspace for the operational platform developed by Maped Solutions.

Its purpose is not to reproduce the production application or to serve as an alternative frontend implementation.

It exists to define:

- what problems the product solves;
- who uses it;
- what tasks each actor needs to perform;
- what information is necessary to perform those tasks;
- how business domains relate to each other;
- how interfaces should behave;
- how information should be presented semantically;
- how accessibility requirements affect interaction design;
- how responsive behavior should preserve task continuity;
- which visual patterns and tokens form the product system;
- what implementation teams must preserve when integrating the product into the real applications;
- why non-obvious product decisions were made and when they should be reconsidered.

The repository should allow product decisions to be understood independently from the production codebase and recovered without reconstructing old conversations, code archaeology or historical guesswork.

## Prototype workbench

The reviewable visual prototype lives in [`prototype/`](prototype/README.md).
It uses Astro as a static composition tool only; it is not a production frontend
or integration implementation. See the prototype README for setup, commands,
and component ownership.

---

## Product Context

Havenova is the first real tenant and validation environment for the Maped Solutions product.

However:

> Existing Havenova implementation is evidence, not product authority.

The existing frontend and backend can reveal:

- real user needs;
- useful implementation experience;
- technical constraints;
- completed flows;
- business rules;
- inconsistencies;
- design problems;
- successful interaction patterns.

They do not automatically define the future product.

Every existing behavior may be:

- maintained;
- simplified;
- redesigned;
- replaced;
- removed;

when product analysis provides a clear reason.

The platform must follow the product definition created here.

The product definition must not be constrained unnecessarily by historical implementation decisions.

---

## Product Strategy

The long-term objective is to create a reusable operational product for service businesses.

The intended model is:

```text
Maped Core Product
        +
Tenant Configuration
        +
Optional Specific Extensions
        =
Tenant Product
```

For example:

```text
Maped Core Product
        +
Havenova configuration
        +
Havenova-specific requirements
        =
Havenova Platform
```

and:

```text
Maped Core Product
        +
Perfect Service configuration
        +
Perfect Service-specific requirements
        =
Perfect Service Platform
```

A new tenant should not require redesigning the product from the beginning.

The process should instead identify:

- which needs are already solved by the core product;
- which differences can be represented through configuration;
- which requirements are legitimate reusable improvements;
- which requirements are truly tenant-specific;
- which requests should not be implemented because they add complexity without sufficient product value.

---

## Product Layers

### 1. Core Product

Capabilities that solve recurring problems across service businesses.

Examples may include:

- Identity and Access;
- Customer Management;
- Service Requests;
- Scheduling;
- Workforce Management;
- Communication;
- Company Operations;
- Notifications.

A capability is not considered part of the core merely because one tenant requested it.

It must solve a sufficiently general product problem.

### 2. Tenant Configuration

Differences that are expected between legitimate implementations of the same product.

Examples may include:

- brand identity;
- enabled services;
- languages;
- working hours;
- operational roles;
- contact information;
- notification templates;
- service-specific request forms;
- workflow configuration, when product analysis confirms configurability is appropriate.

Configuration must not become a substitute for clear product decisions.

Not every possible variation should become configurable.

### 3. Specific Extensions

Requirements that provide real value to one tenant but do not belong to the reusable core.

Specific extensions must remain clearly identified so that tenant-specific logic does not silently become global product behavior.

---

## Working Principle

The product development process follows this direction:

```text
Business Problem
        ↓
Product Analysis
        ↓
Business Rules
        ↓
Information Architecture
        ↓
Interaction Design
        ↓
Semantic and Accessibility Requirements
        ↓
Visual Prototype
        ↓
Implementation Handoff
        ↓
Frontend / Backend Implementation
        ↓
Testing and Validation
        ↓
Product Review
```

Implementation is not the starting point for product definition.

Production code may inform decisions, but implementation convenience alone must not silently change product behavior.

---

## Repository Role

This repository serves five purposes.

### 1. Product Definition

Document the product's purpose, domains, actors, workflows, states, rules and priorities.

### 2. Design Reference

Provide visual and interactive prototypes that communicate structure, hierarchy, states, responsive behavior and visual direction.

### 3. Implementation Handoff

Explain the behavior, semantics, accessibility requirements, states and acceptance criteria that frontend and backend implementations must preserve.

### 4. Reusable Product Knowledge

Preserve decisions and patterns that can be reused when implementing future Maped Solutions tenants.

### 5. Product Communication

Provide understandable representations of the product for internal review, client discussion and validation before expensive implementation work.

---

## Decision Recoverability

A product decision is not fully documented when only the final result is recorded.

For any non-obvious or consequential decision, the repository should preserve:

- the problem that triggered the decision;
- the evidence or constraints available at the time;
- the alternatives considered when relevant;
- the decision itself;
- the reason it was preferred;
- the consequences and trade-offs accepted;
- the conditions that would justify revisiting it.

The goal is not to record every conversation.

The goal is to preserve enough reasoning that a future contributor can understand why the product behaves as it does without rediscovering the same problem.

Important decisions belong in `docs/01-foundation/DECISIONS_LOG.md` or, when strongly domain-specific, in the corresponding domain documentation with a reference from the log when appropriate.

---

## Sources of Truth

The repository uses the following hierarchy:

```text
1. Product Principles
        ↓
2. Product Map and Domain Definitions
        ↓
3. Flows, States and Business Rules
        ↓
4. Product Notes
        ↓
5. Prototypes
        ↓
6. Handoff Requirements
        ↓
7. Production Implementation
```

Audits do not belong to this authority chain.

They are evidence sources:

```text
Frontend / Backend Audits
        ↓
Observed Evidence
        ↓
Product Analysis
        ↓
Explicit Decision
```

An existing field, route, endpoint, component or behavior does not automatically become a product requirement.

When production implementation and product documentation diverge, the difference must be resolved explicitly. The team should either:

- correct the implementation to match the accepted product decision; or
- revise the product decision and record why it changed.

Silent divergence is not an acceptable long-term state.

---

## Repository Structure

```text
.
├── README.md
│
├── docs/
│   ├── 00-audits/
│   │   ├── FRONTEND_PRODUCT_AUDIT.md
│   │   └── BACKEND_PRODUCT_AUDIT.md
│   │
│   ├── 01-foundation/
│   │   ├── ACCESSIBILITY_AND_SEMANTICS.md
│   │   ├── DATA_AND_CONTENT_PRINCIPLES.md
│   │   ├── DECISIONS_LOG.md
│   │   ├── PRODUCT_MAP.md
│   │   ├── PRODUCT_PRINCIPLES.md
│   │   ├── RESPONSIVE_AND_INTERACTION.md
│   │   ├── VISUAL_FOUNDATION.md
│   │   └── WORKFLOW_AND_ROLES.md
│   │
│   └── 02-domains/
│       └── users/
│           ├── DOMAIN.md
│           ├── FLOWS.md
│           ├── STATES_AND_ACTIONS.md
│           ├── PRODUCT_NOTES.md
│           └── HANDOFF.md
│
└── prototype/
    ├── index.html
    │
    ├── scripts/
    │   ├── demo.js
    │   └── theme.js
    │
    └── styles/
        ├── base.css
        ├── components.css
        ├── shell.css
        ├── tokens.css
        └── users.css
```

The structure should grow only when a real product need requires it.

Empty architectural complexity should be avoided.

---

## Documentation Responsibilities

### Audits

Audits describe the state of an existing implementation.

They distinguish:

- implemented;
- partially implemented;
- placeholder;
- prepared;
- inferred;
- unknown.

Audits are observational documents.

They must not silently redefine the product.

### Foundation Documents

Foundation documents define principles that apply across product domains.

They cover:

- product direction;
- product boundaries;
- roles and responsibilities;
- accessibility;
- semantics;
- data purpose;
- content;
- responsive behavior;
- interaction;
- visual foundation;
- important decisions.

Foundation documents should remain relatively stable.

They should not contain unnecessary domain-specific implementation details.

### Domain Documents

Each product domain should define its own:

- purpose;
- actors;
- concepts;
- boundaries;
- flows;
- states;
- actions;
- business rules;
- relationships;
- unresolved questions.

Domain definitions should explain the product independently of UI implementation.

### Product Notes

Product Notes explain:

- why a view exists;
- what job it supports;
- which information matters;
- why specific information is shown;
- what should not be shown;
- what belongs to the MVP;
- what is deliberately postponed;
- important UX reasoning;
- decisions and unresolved questions.

### Prototype

The prototype is a visual and interactive representation of product decisions.

It may simulate:

- navigation;
- selection;
- state changes;
- loading;
- success;
- error;
- warning;
- information feedback;
- modal interactions;
- confirmation dialogs;
- theme changes;
- responsive behavior.

It must remain simple.

The prototype must not become a second production application.

It should not implement:

- real authentication;
- database access;
- production APIs;
- application routing infrastructure;
- unnecessary framework architecture.

### Handoff

The handoff document defines what implementation must preserve.

It should include, when relevant:

- behavior;
- states;
- transitions;
- responsive requirements;
- navigation context;
- loading behavior;
- error behavior;
- semantics;
- accessibility requirements;
- data requirements;
- acceptance criteria;
- implementation constraints that affect product behavior.

The handoff explains requirements.

It should not unnecessarily prescribe internal implementation architecture.

---

## Dashboard Design Principle

The public client experience and the operational dashboard belong to the same product ecosystem but solve different problems.

Visual consistency does not require identical interface behavior.

The public client experience may prioritize:

- brand expression;
- trust;
- emotional communication;
- service discovery;
- conversion;
- guidance.

The operational dashboard may prioritize:

- clarity;
- predictability;
- reduced cognitive load;
- operational context;
- efficient repeated use;
- readable information density;
- keyboard and pointer interaction;
- long-session comfort;
- clear state communication.

The dashboard must not imitate the public client interface merely for visual consistency.

Both surfaces should share an intentional product identity while adapting their visual and interaction systems to their actual jobs.

---

## Theme Principle

Light and dark themes are first-class product requirements.

Dark mode must not be implemented as a final color inversion step.

Components and surfaces should be designed using semantic tokens and validated in both themes from the beginning.

Theme decisions must preserve:

- hierarchy;
- contrast;
- focus visibility;
- status differentiation;
- disabled states;
- selected states;
- readability during prolonged use.

---

## Accessibility Principle

Accessibility is part of product architecture.

It must be considered during:

- information architecture;
- component semantics;
- interaction design;
- keyboard behavior;
- focus management;
- status communication;
- loading behavior;
- modal design;
- navigation;
- responsive changes.

Accessibility must not be treated only as a final automated audit.

Automated testing is necessary, but it does not replace semantic and interaction decisions.

---

## Data Principle

A field should not be shown simply because it exists.

Every visible data point should answer a product question.

For important information, product definition should be able to explain:

- why the user needs it;
- when it is useful;
- where it should appear;
- whether it is editable;
- what its fallback is;
- whether it is sensitive;
- what decisions it enables.

The interface should prioritize useful operational context over technical completeness.

---

## Pattern Development

Reusable patterns should be extracted from validated solutions.

The project should not create a large theoretical design system before solving real product problems.

The process is:

```text
Solve a real domain problem
        ↓
Validate the solution
        ↓
Identify reusable behavior
        ↓
Extract the pattern
        ↓
Document the pattern
        ↓
Reuse intentionally
```

Users is the first reference domain for this process.

Its purpose is not to force every future domain into the same structure.

It is the first opportunity to define and validate reusable patterns such as:

- application shell;
- summary and action region;
- directory;
- search and filters;
- selectable items;
- master-detail interaction;
- inspector shell;
- feedback layer;
- modal layer;
- responsive context preservation.

Patterns will be promoted to shared product patterns only after validation.

---

## Current Working Sequence

The initial work sequence is:

```text
Foundation Minimum
        ↓
Users Domain
        ↓
Application Shell
        ↓
Users Directory
        ↓
User Inspector Shell
        ↓
User Overview
        ↓
Contextual Requests
        ↓
Communication MVP
        ↓
Internal Notes
        ↓
Full Users Domain Review
        ↓
Pattern Extraction
```

The product scope will be refined progressively.

The objective is to avoid both extremes:

- designing the entire future product before sufficient evidence exists;
- implementing each page independently without a global product direction.

---

## Decision Rule

Before adding a feature, field, component, configuration option or workflow, ask:

1. What problem does this solve?
2. Who has this problem?
3. How frequently does it occur?
4. What decision or action does this enable?
5. Is the solution part of the core product?
6. Is it tenant configuration?
7. Is it a specific extension?
8. Is the complexity justified by the value?
9. Can the problem be solved more simply?
10. How will we validate that the solution works?

The absence of a clear answer is a reason to continue analysis before implementation.
# Maped-Operations-Product-Design

# AI and Repository Context Protocol

## Purpose

This document defines how AI agents, coding assistants, and future project chats should use context across the Product Design, frontend, and backend repositories.

The goal is not to give every agent every file.

The goal is to give each task the minimum authoritative context needed to work correctly without losing product coherence.

---

## 1. Core Rule

Before acting, determine the type of work.

```text
Product question?
    → Product Design authority

Current implementation question?
    → Production repository evidence

Integration question?
    → Product Design baseline
      + Integration Contract
      + Handoff
      + affected production repository evidence

Technical implementation question?
    → Production repository architecture
      constrained by approved product baseline

Visual prototype question?
    → Product Design domain docs
      + foundation docs
      + prototype
      + relevant evidence audits
```

Do not mix authority layers.

---

## 2. Context Precedence

When sources disagree, use this order.

### For intended product behavior

```text
1. Product Principles
2. Product Map / Domain Definition
3. Flows / States / Business Rules
4. Product Notes
5. Validated Prototype
6. Integration Contract
7. Handoff
8. Production Implementation
9. Audits and historical evidence
```

A lower layer may reveal a contradiction.

It does not silently override a higher layer.

### For implemented technical reality

Use:

```text
1. Current production code
2. Current automated tests
3. Current deployment/runtime behavior
4. Repository technical documentation
5. Audits
6. Product prototype
```

The prototype does not prove that a production capability exists.

---

## 3. Required Context by Task Type

### A. Product Definition Task

Load:

- relevant foundation principles;
- PRODUCT_MAP.md;
- domain DOMAIN.md;
- domain FLOWS.md;
- STATES_AND_ACTIONS.md;
- PRODUCT_NOTES.md;
- relevant audit evidence.

Do not start from production code alone.

### B. Prototype Task

Load:

- domain definition;
- flows;
- states/actions;
- product notes;
- responsive and interaction principles;
- accessibility and semantics principles;
- visual foundation;
- relevant decision-log entries.

Use audits only as evidence.

Do not copy production UI simply because it exists.

### C. Visual Review Task

Load:

- prototype;
- domain documents;
- relevant foundation documents;
- previous validation notes;
- relevant frontend/backend audit findings.

Review the prototype against intended behavior.

Do not evaluate only visual polish.

### D. Integration Contract Task

Load:

- validated domain documents;
- validated prototype behavior;
- frontend audit;
- backend audit;
- relevant current production code evidence;
- current permissions/state models/read models.

The output should define required capability and identify gaps.

It should not become a backend architecture redesign document.

For Customers read work, also load the Customer ↔ Profile, relationship lifecycle
and read-projection authorization contracts. Treat primary tenant authorization
as the boundary before field/source analysis; audits cannot justify a global
identity lookup or partial response after denial.

For Customers summary work, also load `SUMMARY_CONTRACT.md`. Do not infer a
tenant-wide population from cursor rows or use a zero to conceal an unknown,
restricted or unavailable authoritative source.

### E. Frontend Implementation Task

Load:

- domain status;
- Handoff;
- relevant Integration Contract sections;
- local frontend architecture;
- existing reusable components;
- local tests;
- local product-context anchor.

Do not use the prototype as source code.

### F. Backend Convergence Task

Load:

- domain status;
- Integration Contract;
- canonical domain concepts;
- state/permission rules;
- existing backend models/services/routes/tests;
- local product-context anchor.

Do not assume the existing schema naming is the product vocabulary.

### G. Integration Debugging Task

Load:

- Integration Contract;
- Handoff;
- frontend implementation;
- backend implementation;
- failing test or observed behavior.

Classify the problem before changing code:

```text
contract mismatch
product ambiguity
frontend defect
backend defect
integration defect
environment defect
```

Do not solve every mismatch by changing the easiest repository.

---

## 4. Chat and Agent Start Protocol

At the start of substantial work, an agent should establish:

### 1. Task Surface

Example:

```text
Surface: Product Design / Frontend / Backend / Cross-repository Integration
```

### 2. Domain

Example:

```text
Domain: Customers
```

### 3. Current Status

Example:

```text
Status: PROTOTYPED
```

or:

```text
Status: IMPLEMENTATION_READY
```

### 4. Authority Set

List the authoritative documents for the task.

### 5. Evidence Set

List the implementation/audit sources used for reality checks.

### 6. Intended Output

Examples:

- product correction;
- prototype revision;
- visual validation report;
- Integration Contract;
- frontend implementation plan;
- backend gap plan;
- integration verification;
- product validation report.

This small orientation step prevents context drift during long work sessions.

---

## 5. Do Not Rediscover Settled Decisions

An agent should not reopen a decision merely because:

- it would code the feature differently;
- a current endpoint has another name;
- a component already exists with different behavior;
- the prototype architecture is simpler than production architecture;
- another tenant may hypothetically want infinite configurability.

Reopen a product decision only when there is:

- contradictory evidence;
- a newly discovered technical constraint that affects product behavior;
- a real usability problem;
- a security or privacy issue;
- a new validated business requirement;
- a cross-domain inconsistency.

When reopening a decision, record the reason.

---

## 6. Avoid Context Dumping

Do not attach the full Product Design repository to every coding task.

Use targeted context.

### Product Design Project Context

Keep the stable project-level documents available:

- Product Design README;
- Product Context and Integration Model;
- Domain Delivery and Integration Workflow;
- AI and Repository Context Protocol;
- current high-level product map;
- relevant audits when active.

### Domain Work Context

Add only the active domain documents and prototype references.

### Frontend Task Context

Add:

- domain handoff;
- relevant contract sections;
- frontend local product-context anchor;
- affected code.

### Backend Task Context

Add:

- domain Integration Contract;
- backend local product-context anchor;
- affected models/services/routes/tests.

The objective is high signal, not maximum token volume.

---

## 7. Production Repository Context Anchors

Each production repository may contain a small domain anchor.

Recommended path:

```text
docs/product-context/<domain>.md
```

Recommended template:

```markdown
# <Domain> Product Context

Status: IMPLEMENTATION_READY | IMPLEMENTING | INTEGRATED | PRODUCT_VALIDATED

## Product Baseline

Product Design reference:
- repository:
- domain path:
- baseline tag/commit:
- contract version/date:
- handoff version/date:

## Scope Implemented Here

- ...

## Repository Responsibility

- ...

## Known Gaps

- ...

## Approved Deviations

- ...

## Integration Status

- contract mapped:
- implementation complete:
- integration verified:
- product validated:

## Local Technical Decisions

- ...
```

This file is an anchor.

It is not a second source of product truth.

---

## 8. Baseline and Versioning Rule

When a domain becomes IMPLEMENTATION_READY, identify the exact Product Design baseline used for implementation.

Preferred reference:

- Git tag;
- release tag;
- commit hash;
- or another immutable repository baseline.

Avoid references such as:

```text
latest version
current docs
the prototype we discussed
```

These references become ambiguous over time.

The baseline should allow a future agent to answer:

- Which contract was implemented?
- Which handoff was implemented?
- Did Product Design change later?
- Is a production discrepancy a defect or an unpropagated product evolution?

---

## 9. Change Delta Protocol

When Product Design changes after implementation begins, do not resend the whole context as if nothing existed.

Create a delta.

A useful delta should state:

```text
Domain:
Previous baseline:
New baseline:

Changed product decision:
Why it changed:
Affected flows:
Affected states:
Affected contract sections:
Affected handoff sections:
Frontend impact:
Backend impact:
Migration/data impact:
Test impact:
```

Agents should implement the delta against the known baseline.

This is safer than asking each repository to reinterpret the complete domain repeatedly.

---

## 10. Conflict Protocol

When product and production conflict:

### Step 1 — Describe the Conflict

Example:

```text
Product requires X.
Backend currently supports Y.
Frontend currently assumes Z.
```

### Step 2 — Classify It

One of:

- historical implementation mismatch;
- missing capability;
- naming mismatch;
- lifecycle mismatch;
- permission mismatch;
- data ownership mismatch;
- performance constraint;
- security constraint;
- product ambiguity.

### Step 3 — Determine Authority

Ask whether the conflict affects intended behavior or only technical realization.

### Step 4 — Resolve Explicitly

Possible outcomes:

- production converges to product;
- product decision is revised;
- specific tenant extension is created;
- technical adapter is introduced;
- feature is postponed;
- contract is clarified.

### Step 5 — Record the Resolution

Update the appropriate source:

- Product Design decision log;
- Integration Contract;
- Handoff;
- production local anchor;
- tests.

Do not leave important resolution only in chat history.

---

## 11. Questions Agents Must Ask Themselves

Before adding or changing a feature:

- Is this a product decision or an implementation decision?
- Which document is authoritative?
- Is this domain IMPLEMENTATION_READY?
- Am I using production code as evidence or accidentally as authority?
- Does this change alter visible behavior?
- Does it alter a state transition?
- Does it alter permissions?
- Does it alter data meaning?
- Does it alter error semantics?
- Does it alter responsive behavior?
- Does it alter accessibility behavior?
- Does it create a tenant configuration or a tenant-specific exception?
- Where must this decision be recorded?

The agent does not need to ask the user these questions every time.

It should use them internally to avoid drift and only surface real ambiguities or conflicts.

---

## 12. Customers Reference Context

For current Customers work, assume:

```text
Domain: Customers
Current stage: DEFINED
Next gate: Customers prototype and visual/flow validation
Not yet: IMPLEMENTATION_READY
```

Therefore, current work may:

- inspect the prototype;
- compare it with product definition;
- identify visual and behavioral gaps;
- correct domain reasoning;
- revise prototype behavior;
- validate responsive and accessibility-critical interaction.

Current work should not yet:

- treat the prototype as the final frontend contract;
- force backend changes from unvalidated UI;
- create production implementation tasks as if scope were frozen;
- extract all prototype components into a global design system.

After validation, create:

```text
INTEGRATION_CONTRACT.md
HANDOFF.md
```

Then perform the IMPLEMENTATION_READY review.

---

## 13. Long-Term Objective

The context system should support work across:

- different ChatGPT project chats;
- coding agents;
- frontend repository sessions;
- backend repository sessions;
- Product Design sessions;
- future developers;
- future tenant implementations.

A future contributor should be able to understand:

```text
What is the product decision?
Why was it made?
What stage is it in?
Which baseline is implemented?
What does each repository own?
What changed later?
Where should a new decision be recorded?
```

The protocol succeeds when context remains recoverable without turning every task into a full historical reconstruction.

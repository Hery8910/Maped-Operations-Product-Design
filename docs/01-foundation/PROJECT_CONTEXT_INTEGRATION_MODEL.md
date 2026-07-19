# Havenova / Maped Solutions — Product Context and Integration Model

## Purpose

This document defines how product context moves from product definition into production implementation.

It exists so that work can continue across different chats, repositories, tools, and AI agents without rediscovering why a product decision exists or allowing an implementation detail to silently redefine the product.

This document does not replace the Product Design repository.

The Product Design repository remains the authority for product definition, domain behavior, flows, states, UX reasoning, prototypes, handoff requirements, and future integration contracts.

Production repositories remain the authority for their own implemented code, technical architecture, runtime constraints, tests, and deployment behavior.

The purpose of this integration model is to define how those responsibilities meet.

---

## 1. Repository Roles

### Product Design Repository

The Product Design repository answers:

- What problem are we solving?
- Who has the problem?
- What is the intended product behavior?
- What are the actors, concepts, states, actions, and rules?
- What information must be visible, editable, or hidden?
- How should the experience behave across devices?
- What accessibility and semantic behavior must be preserved?
- What has been deliberately postponed?
- What must frontend and backend preserve during implementation?

It is the source of product authority.

### Frontend Production Repository

The frontend repository answers:

- How is the approved product behavior implemented in the real application?
- How does it fit the existing application architecture?
- Which components, routes, state management, services, and shared packages are used?
- How are responsive, accessibility, loading, error, feedback, and navigation requirements realized?
- Which production constraints or technical risks affect implementation?

The frontend may expose constraints or missing information.

It must not silently change approved product behavior to fit the current code.

### Backend Production Repository

The backend repository answers:

- How are approved business rules and data requirements represented?
- Which existing models, services, projections, permissions, events, or endpoints already support the domain?
- Which parts must converge toward the product contract?
- What invariants, security boundaries, ownership rules, lifecycle transitions, and side effects must be preserved?
- Which API changes are needed to support the approved frontend behavior?

The backend may expose constraints, risks, or contradictions.

It must not silently redefine product behavior because an older schema or endpoint already exists.

---

## 2. Authority and Evidence

The authority chain is:

```text
Product principles
        ↓
Product map and domain definition
        ↓
Flows, states, actions, and business rules
        ↓
Product notes and UX reasoning
        ↓
Validated prototype
        ↓
Integration contract
        ↓
Implementation handoff
        ↓
Production implementation
        ↓
Integrated product validation
```

Production code is evidence before implementation and realization after implementation.

Audits are evidence.

Existing routes, components, models, endpoints, enums, and database fields may reveal:

- real capabilities;
- useful technical experience;
- product constraints;
- inconsistencies;
- gaps;
- risks;
- business rules that deserve confirmation.

They do not automatically become future product requirements.

When evidence and product definition conflict, the conflict must be made explicit and resolved. It must not be hidden inside an implementation decision.

---

## 3. The Integration Point

A domain does not enter production implementation merely because:

- a prototype exists;
- a route exists;
- an endpoint exists;
- a previous implementation exists;
- the UI looks visually complete;
- a technical agent can already start coding.

The formal integration point is reached only after the domain has passed visual and flow validation and the product definition is stable enough to create two implementation artifacts:

1. **Integration Contract**
2. **Implementation Handoff**

The domain then receives the status:

```text
IMPLEMENTATION_READY
```

This is the gate between product design and coordinated production work.

Before this gate, production repositories are evidence sources and feasibility inputs.

After this gate, frontend and backend work against the same approved product definition.

---

## 4. Integration Contract vs. Handoff

These artifacts solve different problems.

### Integration Contract

The Integration Contract defines the boundary between product needs and production capabilities.

It describes, when relevant:

- required product capabilities;
- canonical domain concepts;
- data ownership;
- identity and entity relationships;
- required read models;
- required write operations;
- state transitions and guards;
- permissions and actor boundaries;
- error semantics;
- side effects and delivery guarantees;
- consistency expectations;
- pagination, filtering, sorting, and search behavior;
- navigation-relevant identifiers;
- data freshness expectations;
- tenant configuration boundaries;
- extension points;
- confirmed gaps between current production state and approved product behavior.

The contract should define what the product needs from the system.

It should not unnecessarily prescribe internal code organization.

### Implementation Handoff

The Handoff defines what the implementation must preserve in the experience.

It describes, when relevant:

- task flow;
- view composition;
- behavior;
- states and transitions;
- loading behavior;
- empty states;
- error and warning behavior;
- success feedback;
- responsive behavior;
- navigation context preservation;
- accessibility requirements;
- semantic requirements;
- keyboard and focus behavior;
- data display rules;
- fallbacks;
- acceptance criteria;
- deliberate exclusions from the current scope.

The contract aligns system capability.

The handoff protects product behavior.

Both are required for IMPLEMENTATION_READY.

---

## 5. Parallel Convergence Model

After IMPLEMENTATION_READY, frontend and backend should proceed in parallel, not in a strict waterfall.

```text
Validated Product Domain
        ↓
Integration Contract + Handoff
        ↓
IMPLEMENTATION_READY
        ↓
┌──────────────────────┬──────────────────────┐
│ Frontend implementation│ Backend convergence │
│ against handoff        │ against contract    │
└──────────────────────┴──────────────────────┘
        ↓
Contract verification
        ↓
Frontend/backend integration
        ↓
Integrated product validation
        ↓
PRODUCT_VALIDATED
```

### Frontend Work

Frontend implementation should:

- preserve approved behavior;
- reuse existing production architecture where appropriate;
- reuse validated shared patterns intentionally;
- avoid copying prototype architecture literally;
- connect real application states to approved UX states;
- report contract gaps instead of inventing local workarounds that alter product behavior.

### Backend Work

Backend convergence should:

- preserve valid existing invariants;
- reuse implemented capabilities where they satisfy the contract;
- adapt or extend APIs when approved product behavior requires it;
- resolve naming or entity mismatches explicitly;
- distinguish true domain state from internal technical state;
- avoid exposing internal implementation details as UI concepts unless the product requires them.

### Integration Work

Integration verifies:

- the frontend is consuming the intended contract;
- backend behavior matches required state transitions and error semantics;
- identifiers and relationships are stable;
- loading and error states are real, not prototype-only;
- authorization matches actor boundaries;
- responsive context survives real navigation and data refresh;
- accessibility behavior remains correct with real async interaction;
- no historical implementation behavior has silently overridden the approved product.

---

## 6. Domain Status Model

Use the following lifecycle as the default project language.

### DEFINED

The domain purpose, boundaries, actors, concepts, flows, rules, and open questions are documented sufficiently for design work.

### PROTOTYPED

The domain has an interactive representation of the intended product behavior.

A prototype is not production-ready evidence.

### VALIDATED

The relevant visual structure, flow, information hierarchy, interaction, responsive behavior, and product reasoning have been reviewed and accepted for the current scope.

Validation may still produce revisions to domain documents.

### CONTRACTED

The Integration Contract and Handoff are complete enough for implementation review.

Technical feasibility questions that affect product behavior have been resolved.

### IMPLEMENTATION_READY

The contract and handoff are accepted as the implementation baseline.

Frontend and backend may now converge against them.

### IMPLEMENTING

At least one production repository is actively implementing or converging toward the approved baseline.

### INTEGRATED

The frontend and backend behavior are connected and the required acceptance criteria pass in the integrated environment.

### PRODUCT_VALIDATED

The integrated domain has been reviewed as a real product experience, including real data, permissions, failures, responsive behavior, and accessibility-critical interaction.

A domain can return to an earlier stage when validation reveals a genuine product problem.

Status progression is a quality gate, not a one-way administrative ceremony.

---

## 7. Current Reference Domain: Customers

Customers is the current reference domain for this operating model.

Its current baseline is:

```text
Status: PROTOTYPED
```

The former Users prototype and audits remain historical evidence. The corrected
Customers definition currently has:

- corrected separation of tenant–customer relationship, global Identity/Auth,
  Profile, Invitations and Internal Notes;
- approved directory/detail/form composition and narrow focused-detail model;
- documented cross-domain read boundaries for Requests and Work Orders;
- explicit backend/frontend verification gates.

Customers is not yet PROTOTYPED or IMPLEMENTATION_READY. The previous Users
prototype must be revised in a separate prototype task; it is not authority for
the new Customers scope.

The next product gate is Customers prototype and visual/flow validation, followed
by contract verification for each implementation slice.

---

## 8. Context Propagation Rule

Production repositories should not receive a copied version of the entire Product Design repository.

They should receive only the context necessary to implement the approved domain correctly.

For each implementation-ready domain, the production context should contain:

- domain name;
- product-design baseline reference;
- status;
- scope;
- out-of-scope decisions;
- Integration Contract;
- Implementation Handoff;
- relevant cross-domain dependencies;
- unresolved implementation blockers, if any;
- acceptance criteria;
- implementation notes that are specific to that production repository.

The canonical product documents remain in Product Design.

Production repositories may keep small local context anchors that point to the approved baseline and record implementation-specific decisions.

This prevents:

- duplicate product authorities;
- stale copies of product reasoning;
- accidental divergence;
- large context dumps into every repository;
- re-analysis of already-settled product decisions.

---

## 9. Change Propagation

### Change before IMPLEMENTATION_READY

Update Product Design documents and prototype first.

No production convergence is required unless the change is being tested for feasibility.

### Change during IMPLEMENTING

Classify the change.

#### Product correction

Update the Product Design authority first.

Then update the Integration Contract and/or Handoff.

Finally, propagate the delta to affected production repositories.

#### Technical realization decision

Record it in the relevant production repository.

Update Product Design only when the technical decision changes a product-visible constraint or creates a reusable product rule.

#### Newly discovered constraint

Do not bury it in code.

Return it to product analysis when it affects:

- behavior;
- states;
- permissions;
- user-visible latency;
- error semantics;
- data freshness;
- navigation;
- accessibility;
- tenant configuration;
- scope.

### Change after INTEGRATED

Validate whether it is:

- a defect against the approved product;
- a product evolution;
- a technical refactor.

Treat each differently.

A refactor should not require a new product decision when behavior is unchanged.

A product evolution should re-enter the product workflow.

---

## 10. Core Anti-Drift Rules

1. Product Design defines intended behavior.
2. Production repositories define implemented reality.
3. Audits observe; they do not authorize.
4. Prototypes communicate behavior; they are not production architecture.
5. Existing code is reusable evidence, not automatic authority.
6. No domain enters coordinated implementation without the IMPLEMENTATION_READY gate.
7. Frontend and backend converge against the same approved domain baseline.
8. Product conflicts must be resolved explicitly, not hidden in local implementation choices.
9. Production context should be minimal and versioned by domain baseline, not copied wholesale.
10. Integrated behavior must be validated as a product, not only as passing code.

---

## 11. Intended Outcome

The system should make it possible to resume work months later and answer:

- Why does this behavior exist?
- Which problem does it solve?
- Which document is authoritative?
- What stage is the domain in?
- Is production allowed to implement it yet?
- What does frontend need to preserve?
- What does backend need to support?
- What changed after implementation began?
- Is a discrepancy a product decision, a defect, or technical debt?

The objective is not maximum documentation.

The objective is recoverable reasoning, controlled integration, and product coherence across time, repositories, and implementation agents.

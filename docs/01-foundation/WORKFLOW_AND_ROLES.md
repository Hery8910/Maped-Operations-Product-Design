# Workflow and Roles

## Purpose

This document defines cross-domain rules for actors, responsibilities, workflow ownership and permission reasoning.

It does not define implementation role names or authorization middleware.

---

## Actor Model

### External actors

#### Visitor

Can discover services and begin public interactions allowed without authentication.

#### Customer

Can maintain the relationship and perform customer-facing actions made available by the tenant product.

A customer can exist as a business relationship concept even when access state is incomplete, invited or unavailable. Product design must not collapse relationship state into authentication state without an explicit domain decision.

### Internal tenant actors

#### Operator

Performs recurring operational work.

Typical job classes may include:

- reviewing incoming requests;
- finding customers;
- coordinating schedule context;
- communicating about work;
- updating operational states.

#### Administrator

Performs broader tenant-level tasks such as:

- managing internal access;
- configuring company operations;
- maintaining catalog or operational policy;
- reviewing exceptions and system configuration.

#### Worker

Executes service delivery and needs only the operational context required for assigned work.

### Platform actor

#### Maped Platform Operator

Operates the multi-tenant product itself.

Platform responsibilities must not be mixed with tenant operational permissions.

---

## Role Design Principles

### Product roles are responsibility groups

A role should be introduced because it represents a meaningful difference in responsibility, visibility or action—not because a new navigation section exists.

### UI visibility is not authorization

Hiding an action in the interface is not a permission model.

Product handoff should define who may perform an action. Implementation must enforce that rule independently of presentation.

### Least necessary access

Actors should see and change the information required for their jobs.

This applies especially to:

- personal contact data;
- internal notes;
- operational history;
- security state;
- company settings;
- billing information.

### Tenant and account settings are different

Tenant company settings affect the organization.

Account settings affect one authenticated internal user's preferences or security context.

These concepts should remain separate in information architecture and permissions.

---

## Workflow Principles

### 1. Every workflow needs an owner

For each important state, define:

- who can observe it;
- who is responsible for action;
- who can change it;
- what evidence is required;
- what happens next.

### 2. Status is not progress decoration

A status should represent meaningful business state.

Do not add states merely to make a timeline appear detailed.

A valid status should change at least one of:

- available actions;
- responsibility;
- customer expectation;
- operational priority;
- scheduling behavior;
- reporting meaning.

### 3. Transitions should be explicit

For consequential workflows, document:

```text
Current state
    → allowed action
    → permission / responsible actor
    → validation or condition
    → next state
    → side effects
```

### 4. Side effects are part of product behavior

A transition may trigger:

- customer communication;
- internal notification;
- scheduling changes;
- assignment changes;
- audit history;
- cancellation consequence.

These effects should not be accidental implementation details.

### 5. Exceptions need visible ownership

Conditions that require attention should answer:

- what happened;
- why it matters;
- who should act;
- what action is available;
- what happens if nobody acts.

---

## Service Request Workflow Baseline

Observed product evidence supports a structured request entering the system with:

- service context;
- service-specific detail;
- preferred availability;
- work address;
- customer identity relationship at submission.

The complete operational lifecycle is not yet defined here as a final global state machine.

The product should define it through the Requests domain rather than infer it from route names or placeholder UI.

Until that domain is defined, avoid treating labels such as board, calendar or detail route names as workflow authority.

---

## Invitation and Access Workflow Baseline

The Customers and Invitations definitions demonstrate that invitation and tenant
customer relationship are related but distinct entities/states.

Important product rules:

- a pending invitation should not be presented as an active account;
- a global identity is not, by itself, a tenant-access conflict;
- expiration should enable a clear recovery action when product policy allows it;
- resend and revoke are actions on invitation state, not generic person actions;
- destructive access changes require clear confirmation and effect explanation;
- attention reasons should be understandable in product language, not raw technical codes.

Audits can show models, enums, placeholder routes or prepared API contracts.
None establishes an available product capability without explicit product
analysis and functional implementation evidence.

---

## Cross-Domain Workflow Documentation Template

For each workflow, document:

### Goal

What outcome the workflow produces.

### Actors

Who participates and why.

### Entry conditions

What must already be true.

### Main flow

The shortest successful path.

### Alternative flows

Legitimate variations.

### Failure and recovery

Recoverable errors, blocked states and ownership.

### States and transitions

The business state model.

### Side effects

Notifications, communications, scheduling or other consequences.

### Authorization

Who may see and perform each consequential action.

### Open questions

Any unresolved business rule that prevents implementation authority.

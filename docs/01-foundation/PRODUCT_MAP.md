# Product Map

## Purpose

This document defines the current conceptual map of the Maped Solutions operational product.

It is a product map, not a route map and not a database schema.

The map should evolve only when product analysis confirms a meaningful domain boundary or relationship.

---

## Product Surfaces

### Public Client Experience

Primary jobs:

- discover services;
- understand the provider;
- configure a service need;
- submit structured requests;
- contact the company;
- create and verify an identity;
- maintain personal account information;
- later, follow the relationship with submitted work where the product defines that experience.

### Operational Dashboard

Primary jobs:

- understand incoming work;
- manage people and access relationships;
- organize service operations;
- coordinate scheduling and workforce;
- communicate with customers and internal actors;
- configure company operations;
- review operational state and exceptions.

### Worker Experience

Current product status: separate surface concept exists, but the operational domain is not yet sufficiently defined to treat existing placeholder structure as product authority.

Expected analysis areas include:

- assigned work;
- schedule;
- task context;
- status updates;
- issue reporting;
- profile and availability.

These areas remain subject to domain definition before implementation authority is established.

---

## Conceptual Actors

These are product actors, not guaranteed database role names.

### Visitor

A person evaluating services or beginning a request without an established authenticated relationship.

### Customer

A person or organization receiving or requesting services.

A customer may have an application identity, but customer relationship and authentication identity should not be treated as automatically identical concepts until the domain contract is explicit.

### Tenant Operator

An internal user who performs day-to-day operational work in the dashboard.

### Tenant Administrator

An internal user with broader company, access or configuration responsibilities.

### Worker

A person who executes or supports service delivery.

### Maped Platform Operator

A platform-level actor responsible for product operation across tenants. This role should remain separate from tenant operational roles.

---

## Domain Map

### 1. Identity and Access

Purpose:

- authentication;
- verification;
- invitation lifecycle;
- recovery;
- access state;
- role and permission boundaries.

Relationship:

```text
Person / Actor
      ↕
Identity and Access
      ↕
Tenant Membership or Customer Access Relationship
```

Important rule: access state is not the same as commercial relationship state.

Product reasoning must also distinguish the global platform identity from the
tenant relationship. A person may already have a platform identity and still
legitimately need access to a different tenant. That is not an account-exists
conflict for the operator.

### 2. Customers

Current reference domain for tenant–customer operations.

Purpose:

- find a tenant customer or customer invitation;
- understand relationship, confirmed Profile and invitation context;
- inspect read-only Requests and Work Orders context;
- maintain approved internal Notes;
- preserve navigation context between directory and detail.

Customers is not a global identity directory. Identity/Auth and the reusable
Invitations lifecycle remain separate capabilities.

Customer relationship lifecycle, tenant access grant, global Identity/Auth
safety and tenant lifecycle availability are distinct. A tenant becoming
unavailable must not silently archive or remove its Customer relationships.

### 3. Invitations

Purpose:

- create and manage tenant-scoped invitation lifecycle;
- support customer, worker and admin access kinds without duplicating lifecycle
  rules in each relationship domain;
- preserve opaque credential, delivery, expiry, resend, renewal, revoke,
  acceptance, cooldown and audit boundaries.

### 4. Service Requests

Purpose:

- capture structured service need;
- preserve service-specific detail;
- connect the request to identity, location and preferred availability;
- support later qualification and operational processing.

Observed evidence supports structured requests rather than a single generic free-text lead.

The full post-submission lifecycle remains a product definition task.

### 5. Properties and Work Locations

Purpose:

- represent where service work occurs;
- preserve location context across requests and operations;
- avoid duplicating location knowledge when the business relationship requires reuse.

Current maturity: conceptually important, but operational UI authority is not established by placeholder routes alone.

### 6. Scheduling

Purpose:

- represent availability constraints;
- connect service demand with operational capacity;
- plan appointments or work windows;
- communicate schedule changes clearly.

Scheduling must not be reduced to a calendar view. Calendar, board and timeline are representations of scheduling problems, not the domain itself.

### 7. Workforce Management

Purpose:

- represent workers and operational roles;
- support availability, assignments and capacity;
- preserve responsibility and work context.

Current maturity: product candidate with strong strategic relevance, but detailed workflows require domain analysis.

### 8. Communication

Purpose:

- support customer-facing operational communication;
- preserve communication context near the entity that caused it;
- distinguish external communication from internal collaboration.

Communication should not become a disconnected inbox if operational context is required to understand the conversation.

### 9. Internal Notes

Purpose:

- retain internal operational annotations associated with customer, worker or
  admin contexts;
- keep these notes distinct from Profile data and customer-facing communication.

### 10. Notifications and Attention

Purpose:

- surface events or conditions that require awareness or action;
- distinguish passive information from actionable exceptions;
- reduce the need to manually inspect every domain.

A notification is not automatically a product requirement just because an event exists.

Events and RSVP share platform infrastructure in current backend evidence, but
have no demonstrated relationship to the Home Services operational product.
They are not part of the current operational navigation baseline.

### 11. Company Operations

Purpose:

- tenant-level settings and operational policy;
- company identity and contact information;
- working parameters;
- enabled capabilities and integrations where appropriate.

Company settings must remain distinct from a specific admin's personal account preferences.

### 12. Catalog and Service Definition

Purpose:

- define what the tenant offers;
- support service-specific request information;
- connect public service selection with operational understanding.

Not every service difference should become a generic form builder. Product analysis should determine which variation is configuration and which requires a defined domain extension.

---

## Cross-Domain Relationships

Current high-value relationships to define progressively:

```text
Customer / Person
    ├── Identity and access
    ├── Service requests
    ├── Work locations / properties
    ├── Communications
    └── Internal notes

Service Request
    ├── Customer / person context
    ├── Service definition
    ├── Work location
    ├── Preferred availability
    ├── Operational status
    ├── Scheduling
    ├── Assignment
    └── Communication history

Tenant
    ├── Internal users
    ├── Workers
    ├── Service catalog
    ├── Operational policy
    ├── Company settings
    └── Tenant configuration
```

---

## Current Product Definition Priorities

### Active reference domain

Customers.

### Immediate connections after the Customers foundation

- customer → Requests read projection;
- customer → Work Orders read projection;
- customer → Internal Notes;
- customer → reusable Invitations lifecycle.

### Important unresolved product connections

- submitted request → customer follow-up experience;
- submitted request → internal operational intake;
- user identity → customer/client commercial relationship;
- request → schedule → assignment lifecycle;
- worker application → real operational workflow.

---

## Product Map Rule

A new navigation route does not create a new product domain.

A new database model does not create a new product domain.

A product domain exists when there is a coherent problem space with:

- actors;
- concepts;
- rules;
- states;
- workflows;
- relationships;
- independent product reasoning.

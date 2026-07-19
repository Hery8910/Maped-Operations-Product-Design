# Customers — Tenant Customer Operations

**Status:** DEFINED — product correction awaiting prototype and contract verification.
**Scope:** Tenant–customer relationship directory, contextual review, invitations
and internal notes.
**Authority:** Owns the Customers purpose, boundary and relationship to other
domains.
**Last reviewed:** 2026-07-19
**Related:** `FLOWS.md`, `STATES_AND_ACTIONS.md`, `PRODUCT_NOTES.md`,
`INTEGRATION_CONTRACT.md`, `BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md`,
`IMPLEMENTATION_PLAN.md`, `VALIDATION_CHECKLIST.md`; `../invitations/DOMAIN.md`
and `../internal-notes/DOMAIN.md`.

## Purpose

Customers is the tenant-scoped operational relationship with a customer. It is
not a directory of every platform identity and it is not a CRM or a generic
access-administration surface.

An authorized tenant administrator can find and select a customer or customer
invitation; understand the relationship, confirmed Profile and addresses; read
related Requests and Work Orders; maintain Internal Notes; and create or manage
customer invitations. A global identity alone never establishes this tenant
relationship.

The canonical future frontend route is `/people/customers`. `/people/users` is
a future migration redirect only; it is not a second product surface.

## Product necessity boundary

Every visible field, summary, filter, tab and action must state its operational
job, source, freshness, fallback, authorization and responsive/error behavior.
Existing models, routes or prototype controls are evidence only.

Customers owns the directory composition and customer relationship context. It
does not own Profile, Identity/Auth, Invitations, Service Requests, Work Orders
or Internal Notes. It integrates their approved read/action contracts.

## Actors and authorization

- **Tenant admin:** primary actor; may perform approved tenant-scoped reads and
  customer invitation/note actions.
- **Tenant super admin:** may perform the same actions where platform policy
  grants it; no different experience is designed.
- **Customer:** accepts an invitation and reviews/corrects/saves Profile through
  customer-facing ownership flows, not through the tenant Customers page.
- **Other actors:** require an explicit domain job and permission definition.

Tenant isolation applies to every list, detail, counter, related-entity query
and write. A permission denial must not leak partial tenant data.

## Canonical concepts and ownership

| Concept | Owner | Customers use |
| --- | --- | --- |
| Global identity and authentication | Identity/Auth | Resolve acceptance identity; never treat identity alone as customer membership |
| Tenant–customer relationship | Customers | Directory row and selected customer context |
| Confirmed Profile and addresses | Profile | Read identity, Profile completeness and all confirmed addresses; tenant admin cannot edit confirmed data here |
| Invitation lifecycle and delivery | Invitations | Show customer invitation rows and invoke approved lifecycle actions |
| Requests | Service Requests | Tenant-scoped, paginated, read-only customer projection and navigation to owner page |
| Work Orders | Work Orders | Tenant-scoped, paginated, read-only customer projection and navigation to owner page |
| Internal Notes | Internal Notes | Customer-scoped note list and permitted note maintenance |

## Customers surface

The approved wide pattern is master-detail:

```text
Directory column                    Detail column
page context + summary              selected Customer | Invitation | Invite customer form
search + filters + Invite customer  starts at the top edge
directory
```

`Invite customer` belongs in the left-column header. It opens the invite form
in the right panel; it is not a modal. On narrow screens selection or invite
opens a focused detail/form view. Back restores query, filter, selection origin,
loaded list position and useful focus context where feasible.

### Directory, summary and filters

Search accepts name, email or telephone. Baseline filters are **Customers**,
**Invitations**, and **Action required**. The summary is tenant-wide rather than
derived from the loaded cursor page:

| Summary | Population |
| --- | --- |
| Customers | tenant–customer relationships |
| Profiles complete | customers whose Profile completeness result is complete |
| Pending invitations | customer invitations in `pending` |
| Action required | only `delivery_failed` and `expired` invitations |

`Action required` deliberately excludes pending invitations, incomplete
Profiles, missing phone/address and absence of Requests or Work Orders: none is
currently an administrator action in this surface.

### Customer detail

Customer detail has exactly these sections: **Overview**, **Requests**, **Work
orders**, and **Notes**. Activity is excluded.

- **Overview:** identity, Profile, all confirmed Profile addresses, and an
  informational Profile-completeness state. The tenant admin cannot edit
  confirmed Profile data here.
- **Requests / Work orders:** only shown when the respective tenant module is
  enabled; total plus paginated read-only summary; opening an entity navigates
  to its owning domain. No inline operational mutations or copied detail page.
- **Notes:** integrates the Internal Notes capability. Notes are internal and
  never visible to the customer.

### Invitation detail

An invitation is a distinct selected entry. Customers presents its lifecycle
meaning and the legitimate action supplied by Invitations. Accepted invitations
reconcile to the relationship; revoked invitations leave the normal directory.

## Customer invitation boundary

Customer invitation creation requires proposed name, email and language. Phone
and addresses are not requested from the tenant admin. The name is a proposal;
the customer reviews/corrects it and completes their data. No confirmed existing
Profile value is silently overwritten. The common Invitations capability owns
delivery, token, expiry, resend, renew-and-resend, cooldown, revoke, acceptance
and audit lifecycle.

## Explicit exclusions

- Tenant-specific layouts or semantic status colors.
- Administrative editing of confirmed Profiles or addresses.
- Activity, Communication, CRM pipeline, generic active/inactive management,
  accepted-customer access administration and unrelated identity management.
- Requests/Work Orders editing, state transitions, assignment, cancellation,
  rescheduling or duplicated owner pages.
- Customer-visible notes, attachments, mentions or rich-text notes.
- A universal People/Users page. The legacy route is a migration concern only.

## Open product and contract gates

- Profile completeness definition, source and freshness must be verified with
  the Profile owner; it is informational, not Action required.
- Requests and Work Orders must define their tenant-scoped customer projections,
  pagination, summary fields and destination routes.
- Identity/Auth must verify new/existing identity acceptance and safe resume.
- Invitation, note and relationship models/endpoints are contract gates; no
  existing implementation name establishes a final name.

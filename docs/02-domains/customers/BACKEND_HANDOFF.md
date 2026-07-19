# Customers Backend Handoff

**Status:** PLANNED — backend contract verification required.  
**Authority:** Backend obligations; no endpoint/model naming is final here.

## Ownership and conceptual model

Provide a tenant-scoped Customer relationship projection that can join stable
references to Profile, customer invitation, Requests, Work Orders and Internal
Notes. Keep global identity/auth, Profile, Invitation lifecycle, Requests, Work
Orders and Notes as separately owned concepts. Do not collapse them into a
single `user` record or a `profileComplete` access status.

## Required capabilities

- Authorized cursor directory query with name/email/telephone search and the
  three approved filters.
- Tenant-wide summary query with defined population/freshness for all four
  counters.
- Stable detail queries for customer, invitation, Profile/addresses and enabled
  related read projections.
- Delegation to Invitations commands/outcomes and Notes commands/outcomes.
- Tenant-scoped paginated Request and Work Order read queries by `customerId`,
  supplied by their owner domains.

## Guarantees to verify

Authorization is enforced server-side for tenant admins/super admins and no
cross-tenant ID inference, count, detail or command side effect is possible.
Cursor ordering and invalid-cursor behavior are stable. Outcome codes are
semantic/stable rather than transport-message parsing. Audit records cover
invitation lifecycle and note mutations. Eventual consistency/staleness and
reconciliation behavior are explicit.

## Contract gates

Audit the existing backend for actual model ownership, query shape, cursor,
permission middleware, summary source, Profile address source, module
configuration, invitation delivery/lifecycle/cooldown, notes capability and
owner-domain related projections. Record verified facts in the production
repository; do not promote observed names to product authority without mapping.

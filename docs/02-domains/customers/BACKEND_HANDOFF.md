# Customers Backend Handoff

**Status:** PLANNED — backend contract verification required.  
**Authority:** Backend obligations; no endpoint/model naming is final here.

## Ownership and conceptual model

Provide a tenant-scoped Customer relationship projection that can join stable
references to Profile, customer invitation, Requests, Work Orders and Internal
Notes. Keep global identity/auth, Profile, Invitation lifecycle, Requests, Work
Orders and Notes as separately owned concepts. Do not collapse them into a
single `user` record or a `profileComplete` access status.

The product policy is fixed in `PROFILE_CONTRACT.md`: global email/credentials
remain Identity/Auth; Profile owns confirmed name, locale, optional telephone
and addresses; relationship/access are separate; and Profile completeness is a
three-result derivation. Backend work must map those concepts without choosing
product-invented endpoint or schema names.

The relationship policy is fixed in `RELATIONSHIP_LIFECYCLE_CONTRACT.md`:
operational/archived/removed/unknown lifecycle, relationship grant, global
Identity/Auth safety and tenant availability are independent projections. Normal
directory rows/counts/search include operational relationships only.

## Required capabilities

- Authorized cursor directory query with name/email/telephone search and the
  three approved filters.
- Relationship lifecycle/access projection with stable relationship identity,
  lifecycle result, independent grant/global/tenant availability outcome and
  safe unknown/stale behavior.
- Tenant-wide summary query with defined population/freshness for all four
  counters.
- Stable detail queries for customer, invitation, Profile/addresses and enabled
  related read projections.
- A least-necessary tenant-admin Profile read projection: current approved email,
  Profile context, all approved addresses and complete/incomplete/unknown result
  plus deterministic missing-confirmation reasons.
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
permission middleware, summary source, Profile confirmation/address source,
module configuration, invitation delivery/lifecycle/cooldown, notes capability
and owner-domain related projections. Current evidence that invitation acceptance
creates/updates Profile and that Profile is holder-private is an incompatibility
to map, not permission to silently overwrite or grant broad Profile CRUD.
Current `UserClient.inactive` has no approved mapping: verify whether it is an
access-grant fact or other legacy evidence, but do not turn it into archive,
removal, tenant suspension, invitation or Profile status.

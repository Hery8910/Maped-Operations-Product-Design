# Customers Backend Handoff

**Status:** PLANNED — backend contract verification required.  
**Authority:** Backend obligations; no endpoint/model naming is final here.

## Ownership and conceptual model

Provide a tenant-scoped Customer relationship projection that can join stable
references to Profile, customer invitation, Requests, Work Orders and Internal
Notes. Keep global identity/auth, Profile, Invitation lifecycle, Requests, Work
Orders and Notes as separately owned concepts. Do not collapse them into a
single `user` record or a `profileComplete` access status.

The product policy is fixed in `PROFILE_CONTRACT.md` and
`CUSTOMER_PROFILE_CONFIRMATION_CONTRACT.md`: global email/credentials remain
Identity/Auth; Profile owns customer name and locale; customer review/save
evidence is revision-scoped; relationship/access are separate; and Profile
completeness is a three-result derivation. Backend work must map those concepts
without choosing product-invented endpoint or schema names.

The relationship policy is fixed in `RELATIONSHIP_LIFECYCLE_CONTRACT.md`:
operational/archived/removed/unknown lifecycle, relationship grant, global
Identity/Auth safety and tenant availability are independent projections. Normal
directory rows/counts/search include operational relationships only.
The next backend unit must implement the dedicated relationship authority and
gates in `CUSTOMER_RELATIONSHIP_DOMAIN_CHANGE_GATE.md`; it must not treat
`UserClient.status` as lifecycle/grant, nor absorb query, summaries or UI scope.

The read-projection policy is fixed in
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md`: authorize actor/tenant/module
before resolving any source; return minimized separate Customer/Invitation rows;
allow partial only after a current authorized relationship envelope; and make
cross-tenant/not-authorized responses non-disclosing.

The summary policy is fixed in `SUMMARY_CONTRACT.md`: evaluate the four whole
tenant populations only after primary authorization, distinguish authoritative
zero from unknown/unavailable, and provide a coherent review point or safe
degradation for cross-counter invariants. Do not derive a summary from cursor
rows or expose it after primary denial.

The query policy is fixed in `DIRECTORY_QUERY_CONTRACT.md`: execute only scoped
filter/query/order cursor chains; protect cursor mismatch/expiry; guarantee no
duplicate/omitted entry within coherent review; preserve prior pages on load-more
failure; and never treat a mismatch as empty.

Customer-access Invitation and Action required policy is fixed in
`../invitations/CUSTOMER_ACCESS_LIFECYCLE_CONTRACT.md`: map lifecycle separately
from delivery outcome, persist delivery failure, expose only current recovery
eligibility and reconcile acceptance without duplicate normal rows.

## Required capabilities

- Authorized cursor directory query with name/email/telephone search and the
  three approved filters.
- Stable normalized-label order, scoped opaque cursor/query/filter binding and
  authoritative direct detail selection/reconciliation behavior.
- Relationship lifecycle/access projection with stable relationship identity,
  lifecycle result, independent grant/global/tenant availability outcome and
  safe unknown/stale behavior.
- Field-level projection/redaction for email, telephone, locale, addresses,
  Profile completeness and minimum access/security/tenant meaning, with sources
  independently fresh only where policy allows.
- Tenant-wide summary query with defined population/freshness for all four
  counters.
- Independent counter result/freshness/invalidation semantics and a safe way to
  detect/degrade impossible population combinations.
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
Verify whether existing `protectClient`, super-admin bypass, derived directory
projection and source reads meet opaque denial, least-data and freshness rules;
existing behavior is evidence, not an approved contract mapping.
Audit current summary source, operational/inactive mapping, Profile-complete
aggregation, invitation state/action population, cross-tenant denial and
projection consistency. Do not convert legacy attention or active/inactive
counts into approved Customers summaries.
Audit existing all/active/inactive/attention filters, two-character/debounce,
page-size/cursor binding/order, cache/dedup, invalid-cursor response and
selection restoration against this product contract; observed values are not
approved implementation constants.

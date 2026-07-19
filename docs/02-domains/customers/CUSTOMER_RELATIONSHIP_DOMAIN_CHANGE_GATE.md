# Customer Relationship Domain Change Gate

**Classification:** APPROVED_WITH_GATES
**Status:** Product and architecture decision closed; runtime, migration and
read-projection evidence remain open.
**Authority:** Persisted tenant–Customer relationship model, its ownership,
legacy boundary and the next backend implementation unit.
**Last reviewed:** 2026-07-19
**Evidence baseline:** backend lifecycle-authority audit `2a08a12298c8b63bc3a12d8b5f055f6d7d358a6e`
on `audit/customer-relationship-lifecycle-authority` (local audited SHA; remote
publication was not asserted after DNS resolution failure).
**Related:** `RELATIONSHIP_LIFECYCLE_CONTRACT.md`,
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md`, `PROFILE_CONTRACT.md`,
`CUSTOMER_PROFILE_CONFIRMATION_CONTRACT.md`,
`INTEGRATION_CONTRACT.md`, `BACKEND_HANDOFF.md` and
`CUSTOMERS_V1_CONVERGENCE_PLAN.md`.

## Decision

Adopt a dedicated, tenant-scoped **CustomerRelationship** persisted entity.
It is the sole future authority for Customer relationship identity, lifecycle,
relationship grant, origin and invitation reconciliation. It is not an Auth
account, a Profile, an Invitation, a `UserClient` record, an email address or a
derived Directory row.

`UserClient` remains infrastructure evidence for identity/onboarding/technical
access. Its current `status`, including `active`, has no Customer lifecycle or
grant mapping. Until a new relationship record is authoritatively created or
reconciled, lifecycle, grant and effective access remain `unknown` in the
Customers projection. This decision deliberately does not reinterpret legacy
data retroactively.

## Alternatives evaluated

| Alternative | Decision | Reason |
| --- | --- | --- |
| A. Add Customer fields to `UserClient` | Rejected | `UserClient` is shared by customers, admins and workers and mixes onboarding/Auth infrastructure with the new relationship semantics. It would re-couple lifecycle and access, obscure customers without digital access, and make legacy status migration look authoritative when it is not. |
| B. Dedicated `CustomerRelationship` | Chosen | Gives a stable tenant-scoped reference, separately owned lifecycle and grant, explicit provenance/reconciliation, auditable transitions, one-relationship uniqueness and coexistence with `UserClient`. |
| C. Generic relationship/membership with subtypes | Rejected for now | Customer, worker and admin lifecycle/ownership needs are not proven equivalent. Generalizing from shared `UserClient` would create an unvalidated cross-domain abstraction and a larger migration/security boundary. |
| D. Derived projection without persisted entity | Rejected | Current sources cannot authoritatively guarantee stable identity, archive/remove, reconciliation, duplicate prevention, auditability, recovery or safe legacy classification. |

## Conceptual model and ownership

The following are conceptual fields, not schema/property names:

| Conceptual field | Source of truth / rule |
| --- | --- |
| Stable opaque relationship identifier | CustomerRelationship; the only Customer selection/reference ID exposed through a tenant-authorized projection. |
| Tenant reference | CustomerRelationship; immutable scope for the relationship. |
| Global identity reference | Optional CustomerRelationship reference once identity is reconciled; never email. A relationship may exist before digital access. |
| Lifecycle | CustomerRelationship source value: `operational`, `archived`, `removed`. `unknown` is a read result, not a persisted lifecycle. |
| Relationship grant | CustomerRelationship source value: `granted` or `not_granted`; `unknown` is a read result. It is distinct from technical `UserClient` access. |
| Origin | CustomerRelationship source metadata: direct registration, first Request, accepted Invitation, future authorized import, or migration decision. |
| Invitation reconciliation reference/outcome | CustomerRelationship/Invitations boundary; records the accepted Invitation correlation and whether it created or reconciled a relationship. It never stores credentials. |
| Revision and audit metadata | CustomerRelationship; creation/update timestamps, lifecycle/grant revision, authorized actor/system actor and transition reason. |
| Archive/remove metadata | CustomerRelationship only when relevant; authorized cause/time and retention/privacy reference, not copied owner-domain history. |

Auth owns credentials, verification, global email and safety. Profile owns name,
locale and confirmation evidence. Invitations owns proposal/credential/lifecycle
delivery. Customers owns the relationship record. `effectiveAccess` is derived
from lifecycle + relationship grant + Auth safety + tenant availability; it is
not a source field or a replacement for its inputs.

## Identity, creation and reconciliation

- A relationship identifier is stable and opaque within authorized tenant scope.
  Email is never a relationship key or fallback reconciliation key.
- One global identity may have independent CustomerRelationships in many tenants.
- A Customer without a digital identity is allowed: identity reference is absent,
  lifecycle may still be `operational`, and grant is `not_granted` until a
  future authorized access path grants it.
- A pending Invitation is never a CustomerRelationship and never counts as a
  Customer.
- A relationship is created by an authorized direct-registration/first-Request
  owner flow, accepted Invitation reconciliation, future authorized import, or
  an explicitly approved migration. Profile creation does not create one.

Acceptance resolves an identity only through the secure Invitation/Identity
flow. Under tenant-scoped uniqueness control it creates one relationship if none
exists, or reconciles the same one if an operational relationship already
exists. An archived relationship is a reconciliation conflict: it must not
create a second relationship or silently restore it. A removed relationship is
handled only by its privacy/lifecycle policy; a new relationship is permitted
only after that policy authoritatively permits it. Concurrent acceptance/retry
returns the persisted reconciliation outcome, never a duplicate. The result
must make accepted Invitation replacement in Customers deterministic without
revealing global identity details.

## Lifecycle, grant and derived access

| Source state / transition | Rule |
| --- | --- |
| Create → `operational` | A newly authorized relationship begins operational. This does not imply digital access, Profile, Invitation delivery or Profile confirmation. |
| `operational` → `archived` | Future authorized lifecycle policy only; preserve relationship/history context and set grant `not_granted`. |
| `archived` → `operational` | Future explicit restore policy only; requires authorization/audit and a new grant decision. Not a Customers MVP action. |
| → `removed` | Privacy/retention outcome only; set grant `not_granted`. It is not a routine delete or current MVP action. |
| `unknown` | Read/projection outcome when no source record or mapping can safely establish a result; never persisted merely to hide a failure. |

An accepted customer-access Invitation grants tenant access only through its
authorized reconciliation policy: the resulting relationship is operational and
grant may become `granted` as that policy records. Auth restriction and tenant
unavailability do not modify lifecycle or grant; they only make derived access
restricted/unknown. Archive/remove changes grant by this contract but never
changes global Auth safety. `UserClient` technical state must not overwrite any
of these facts.

## Verifiable invariants

1. At most one non-removed CustomerRelationship exists for a tenant and
   reconciled global identity; archived relationships still prevent a duplicate.
2. The same global identity may have relationships in multiple tenants.
3. A pending Invitation is not a Customer and contributes to no Customer count.
4. Acceptance creates or reconciles exactly one relationship and records its
   result idempotently.
5. Profile existence, deletion, confirmation and completeness do not create or
   transition lifecycle/grant.
6. Auth safety and tenant availability never transition lifecycle/grant.
7. Archive/remove set grant `not_granted` but do not alter global Auth.
8. A no-digital-access Customer may be operational with grant `not_granted`.
9. No email lookup/fallback may create, reconcile or prove a relationship.
10. Every source read/write and uniqueness/reconciliation operation is scoped to
    the tenant; an external ID cannot disclose cross-tenant existence.

## Legacy, migration and cutover

Current `UserClient.active`, `inactive`, `invited` and `blocked`, existing
Profile, Invitation history, Service Request references and global Identity
membership do not constitute the evidence required to create a relationship or
grant. They remain legacy evidence only. In particular, `active` does not become
`operational`/`granted`, and Profile confirmation evidence does not create a
relationship.

The approved strategy is **conservative cutover with no automatic legacy
backfill**. New authorized lifecycle flows write CustomerRelationship records.
Existing legacy contexts remain `unknown` in future Customer projections until
an explicitly approved migration can demonstrate a deterministic origin and
tenant-scoped identity/reconciliation key without false relationships. A later
migration may choose one of: verified deterministic backfill; quarantined/manual
review; or environment-owner-authorized reset/recreation where production data
is demonstrably non-relevant. It may not infer from `UserClient.status`, email,
login, Profile or Invitation acceptance alone.

Before any migration/cutover executes, backend must inventory every legacy class
named above, define Request reference treatment and owner-domain history
retention, quantify unmatched/ambiguous records, prove tenant uniqueness, and
obtain an explicit environment/data-retention decision. Rollback preserves both
legacy records and new relationship audit history; it disables use of the new
projection/write path rather than deleting/reinterpreting created records.

## Security, observability and risks

Authorization precedes tenant lookup/projection. Constraint violations,
reconciliation conflicts, migration ambiguity and cross-tenant attempts must be
audited internally with opaque external outcomes. Operational telemetry must
cover create/reconcile/idempotent-replay/conflict, lifecycle/grant changes,
unknown legacy classification, migration decision counts and projection
degradation; it must not log credentials or unnecessary Profile/Auth data.

Main risks are false legacy relationships, duplicate reconciliation, leaked
cross-tenant existence, accidental `UserClient` fallback, grant/lifecycle
recoupling and owner-domain history loss. The gates below mitigate them.

## Remaining gates and impact

This is **APPROVED_WITH_GATES**, not `APPROVED`, because stable identity,
reconciliation and migration are semantically decided but require backend
implementation and evidence before Customers can rely on them.

- **Backend:** next unit creates the dedicated persisted model and constraints,
  authorized creation/reconciliation, lifecycle/grant transitions, audit and
  conservative legacy behavior. It must not implement Directory, Overview,
  summaries, query/cursor or lifecycle UI actions.
- **Frontend:** no implementation is authorized. Future Clients consume only
  the authorized semantic projection and preserve unknown/restricted outcomes.
- **Cross-domain:** Invitations must record/replay reconciliation; Requests need
  a separately approved relationship-reference migration; Profile remains
  independent.
- **Blocking evidence:** migration inventory/cutover decision, tenant-scoped
  uniqueness proof, concurrent acceptance/reconciliation tests, opaque denial,
  archive/remove retention policy and Request historical-reference policy.

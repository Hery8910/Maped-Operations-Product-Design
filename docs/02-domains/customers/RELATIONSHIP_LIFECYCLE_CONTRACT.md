# Customer Relationship Lifecycle, Access and Directory Contract

**Status:** CURRENT — product and architecture gate closed; implementation mapping remains open.
**Authority:** Customer relationship lifecycle, tenant access separation and
directory-inclusion semantics.
**Last reviewed:** 2026-07-19
**Related:** `DOMAIN.md`, `PROFILE_CONTRACT.md`, `STATES_AND_ACTIONS.md`,
`FLOWS.md`, `INTEGRATION_CONTRACT.md`, `BACKEND_HANDOFF.md`,
`FRONTEND_HANDOFF.md`, `IMPLEMENTATION_PLAN.md`, `VALIDATION_CHECKLIST.md`.

## Decision

A Customer relationship is a tenant-scoped operational record. Its existence
and lifecycle, tenant-access grant, global Identity/Auth safety, and tenant
lifecycle are different facts with different owners. None may be inferred by
renaming another fact's status.

```text
Customer relationship lifecycle ── owns directory inclusion/history context
Tenant access grant              ── owns whether this Customer may use this tenant
Identity/Auth safety             ── owns global security restriction
Tenant lifecycle                 ── owns whether the tenant can currently serve
```

Read authorization, minimal access/global/tenant meaning and stale behavior are
defined in `READ_PROJECTION_AUTHORIZATION_CONTRACT.md`; a relationship lifecycle
or access result must not be exposed when its primary tenant scope is forbidden.
`SUMMARY_CONTRACT.md` counts only authoritative `operational` relationships and
degrades instead of undercounting when lifecycle classification is unsafe.

## Relationship lifecycle

Only these lifecycle results are necessary for the Customers MVP:

| Result | Meaning | Normal-directory rule |
| --- | --- | --- |
| **operational** | Current tenant–Customer relationship is available for normal operations. | Included. |
| **archived** | Relationship is intentionally retained outside normal operations and history must remain referenceable by its owners. | Excluded. |
| **removed** | Relationship is no longer retained as a Customer relationship under an authorized lifecycle/privacy outcome. | Excluded; this is not an ordinary Customer UI state or MVP action. |
| **unknown** | Authoritative source cannot determine lifecycle safely. | Do not substitute a normal row or zero; show unavailable/restricted detail when selected context exists. |

There is no separate Customer lifecycle state named `inactive`. A relationship
that remains operational while its person cannot currently access the tenant is
still `operational`; access is a separate result below.

## Access, global safety and tenant lifecycle

### Tenant access grant

The relationship owner exposes `granted`, `not_granted`, or `unknown`. A grant
is tenant-scoped. Archive/remove explicitly leave the relationship without a
grant as a lifecycle side effect; they never change global Identity/Auth.

### Global Identity/Auth safety

Identity/Auth independently exposes `allowed`, `restricted`, or `unknown` for
global security. A global restriction can prevent use of every tenant but does
not archive/remove a Customer relationship or alter its history.

### Tenant lifecycle availability

The tenant owner maps raw tenant states such as active, trial, suspended,
inactive and archived to `serving`, `unavailable`, or `unknown`. Active/trial
may be serving only when the tenant owner permits it. A suspended, inactive or
archived tenant may make the dashboard/access unavailable, but never destroys,
archives or reinterprets Customer relationships.

### Effective tenant access

`tenantAccess` is `permitted` only when the relationship is operational, grant
is `granted`, Identity/Auth is `allowed`, and tenant availability is `serving`.
It is `not_permitted` when an explicit relationship grant is absent or the
relationship is archived/removed; it is `restricted` when global security or
tenant availability prevents use despite a relationship/grant; otherwise it is
`unknown`. These results are explanatory access outcomes, not relationship
lifecycle states.

## Deterministic directory inclusion matrix

“Historical data retained” means owner-domain records remain governed by their
own retention/anonymization policy; Customers neither deletes nor restores them.
“New invitation” is only the relationship-duplication decision, not delivery or
invitation-lifecycle policy.

| Relationship / access condition | Normal directory, Customers count, search | Detail | Historical Requests / Work Orders / Notes | New invitation | Tenant access | Action required | Customers lifecycle action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Operational + permitted | Yes / yes / yes | Yes, authorized projection | Retained by owners | No: reconcile to existing relationship | Permitted | No | None; normal read/note actions only |
| Operational + temporarily unavailable or globally restricted | Yes / yes / yes | Yes, relationship context; access/status is informative or restricted | Retained by owners | No: relationship already exists | Restricted | No | None in Customers |
| Operational + access unknown | Yes / yes / yes when relationship projection is known | Yes when safe; otherwise stale/unavailable | Retained by owners when known | No: do not risk duplicate relationship | Unknown | No | None in Customers |
| Archived | No / no / no | Not in normal Customers; historical access belongs to a future authorized history policy | Retained by owners | No: restore/reactivate the same relationship through its future owner policy first | Not permitted | No | Archive/reactivate are outside MVP Customers |
| Removed | No / no / no | No normal detail | Owner retention/anonymization decides; no restoration claim | Yes only after authoritative removal confirms no relationship remains and invitation conflict rules allow it | Not permitted | No | None; removal is outside MVP Customers |
| Relationship lifecycle unknown | No new/assumed row or count; search/result is unavailable rather than false zero | Existing selection becomes unavailable/restricted | Unknown until owner query succeeds | No: safe conflict, no duplicate | Unknown | No | None |

An invitation remains a separate row before acceptance. On accepted invitation,
reconciliation produces exactly one operational Customer relationship: create it
when none exists; otherwise reconcile to the existing operational relationship
and remove the accepted invitation from normal operational rows. An archived
relationship is a reconciliation conflict requiring its lifecycle owner's future
restore/reactivation policy; acceptance must not create a second relationship.
Reinvitation is allowed only after authoritative evidence shows no operational
or archived relationship for the target in the tenant and no invitation conflict
under the Invitations contract. Global identity existence alone never blocks a
valid relationship invitation.

## Archive, remove and reactivation boundary

Archive and remove are distinct concepts, but neither is an approved Customers
MVP action.

- **Archive** preserves a relationship and its owner-domain history, removes it
  from normal operations, removes its tenant grant, and is reversible only by a
  future explicitly authorized relationship-owner policy.
- **Remove** is a privacy/lifecycle outcome that ends relationship retention;
  it is not a routine admin deletion, has no Customers restore action, and does
  not promise deletion of Requests/Work Orders/Notes whose owners may retain or
  anonymize them by their own rules.
- No tenant admin action in Customers may archive, remove, reactivate, grant or
  revoke tenant access merely because a current backend field exists. Such
  action requires a future demonstrated job, authorization and flow.

## `UserClient.inactive` evidence resolution

Current backend evidence has `UserClient.inactive` but its guard does not
clearly deny access and no approved product job defines it. It has **no direct
product mapping**. Until a verified owner contract maps it, its access effect is
`unknown`; it does not mean archived/removed relationship, pending invitation,
Profile incomplete, tenant lifecycle state, global restriction or Action
required. This is an implementation incompatibility, not a migration request.

## Open implementation mapping gates

- Verify relationship identity/lifecycle and a safe mapping for archive/remove
  without adopting current model names as product names.
- Verify relationship grant, global safety, tenant lifecycle availability and
  their authorization/projection freshness independently.
- Verify reconciled acceptance identity and duplicate/conflict behavior against
  Invitations, without closing its delivery/lifecycle gate.
- Verify owner-domain retention/anonymization behavior for Requests, Work Orders
  and Notes; their gates remain open.

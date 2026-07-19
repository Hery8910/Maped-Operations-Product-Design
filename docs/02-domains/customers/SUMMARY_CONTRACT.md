# Customers Summary Populations, Consistency and Freshness Contract

**Status:** CURRENT — product and architecture gate closed; implementation mapping remains open.
**Authority:** Tenant-wide Customers summary populations, exactness, consistency,
freshness and product states.
**Last reviewed:** 2026-07-19
**Related:** `DOMAIN.md`, `STATES_AND_ACTIONS.md`,
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md`,
`RELATIONSHIP_LIFECYCLE_CONTRACT.md`, `PROFILE_CONTRACT.md`,
`INTEGRATION_CONTRACT.md`, `BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md`.

## General rule

All four summaries belong to the authorized target tenant and are evaluated only
after the primary authorization envelope in
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md` succeeds. They are tenant-wide
populations, never calculations from the loaded directory cursor page. Search,
filters, selection, scroll and pagination never recalculate them.

Primary authorization denial is opaque: it returns no counter, zero, timestamp,
partial population or existence signal. A counter value of `0` is valid only
when its whole defined population was authoritatively evaluated as empty.

## Population matrix

| Summary | Exact tenant-wide population | Authoritative owner | Inclusion / exclusions | Exactness, freshness and invalidation |
| --- | --- | --- | --- | --- |
| **Customers** | Relationships in the authorized tenant with lifecycle `operational`. | Customers relationship lifecycle projection. | Includes operational relationships regardless of tenant access, global restriction, tenant availability, Profile completeness/absence, or related work. Excludes archived, removed, lifecycle unknown, Invitations and identities/relationships outside tenant. | Exact only when all candidate relationships have authoritative lifecycle classification. Lifecycle create/reconcile or transition, tenant scope/authorization change invalidate. Access, Profile and related-work changes do not. |
| **Profiles complete** | Operational Customers whose `profileOperationalCompleteness` is `complete`. | Profile completeness policy joined to Customers lifecycle. | Excludes incomplete, unknown, unavailable/restricted Profile classification, archived/removed/lifecycle unknown, Invitations; email/telephone/address/Profile existence alone are not inputs. | Exact only if every operational Customer is authoritatively classifiable. Profile creation/removal, name confirmation, supported-locale change, relationship lifecycle, source authorization/availability invalidate. Email/telephone/address do not. |
| **Pending invitations** | Customer-access Invitations in the authorized tenant with current semantic lifecycle `pending`, visible in normal Customers composition. | Invitations lifecycle projection. | Excludes delivery failed, expired, accepted, revoked, worker/admin invitations, non-persisted intents, non-persisted send failures and other tenants. Email sent is not itself pending. | Exact only from authoritative current Invitation lifecycle. Persist, transition into/out of pending, acceptance/reconciliation, tenant scope/authorization invalidate. |
| **Action required** | Customer-access Invitations in the authorized tenant with current `delivery_failed` or `expired` lifecycle and an approved tenant-admin recovery capability. | Invitations lifecycle/action-eligibility projection. | Excludes pending, Profile/access/tenant/global conditions, missing data, archived/removed Customers, related-work absence and technical failure without persisted Invitation. | Tenant-wide capability population, not an actor-by-actor command permission count: primary authorized Customers actors share its definition. Entry/exit of those states, recovery eligibility, resend/renew/revoke/accept/reconcile or authorization invalidate. |

`Action required` does not assume a final command contract. It counts only when
Invitations can authoritatively state that the semantic recovery is legitimate
for the authorized Customers-admin role; until that mapping exists, this counter
is `unknown` rather than an optimistic count. Individual command permission
verification remains an Invitations gate.

## Invariants and transition consistency

- `Profiles complete <= Customers`.
- Pending invitations and Action required are disjoint when Invitation lifecycle
  is mutually exclusive.
- An Invitation contributes to no Customer counter before accepted reconciliation.
  After reconciliation it leaves invitation populations and may enter Customers.
- Accepted and revoked Invitations contribute to no current summary.
- The four values are not a common total and must never be summed to infer
  directory size.
- Search and filters never change any population.

The implementation must attach a coherent authoritative review point—such as a
generation/as-of/reconciliation guarantee—sufficient to detect incompatible
independent reads. No distributed transaction, transport or technology is
prescribed. If the UI receives an impossible combination (for example Profiles
complete greater than Customers), it must not present all values as ready/current:
it refreshes/reviews the affected counters and degrades them to refreshing,
unknown or unavailable until a coherent result exists.

## Per-counter states and retained values

After primary authorization succeeds, each counter independently has:

| State | Meaning |
| --- | --- |
| **initial loading** | Population has not yet been authoritatively evaluated; never render zero. |
| **ready/value** | Exact authoritative value greater than zero. |
| **ready/zero** | Exact authoritative empty population. |
| **refreshing** | A new evaluation is in progress; retained value, if allowed below, is marked not current. |
| **unavailable/retry** | Authorized source failed to answer; retry is available without resetting cursor/selection. |
| **unknown** | Population cannot be safely classified, including unknown lifecycle/action or unsafe consistency. |
| **restricted** | Only a secondary authorized source is policy-restricted; no numeric undercount. |
| **forbidden** | Primary authorization boundary; no counters are rendered. |

A prior value may remain visible as **stale during refresh** only while primary
authorization/tenant scope remains current and no known invalidation affects its
population. It is never styled or announced as current. Counters affected by a
known relationship lifecycle change, Invitation lifecycle/action-eligibility
change, tenant scope/authorization change or source visibility change disappear
or degrade instead of retaining a number. `0` never substitutes loading, error,
forbidden, unavailable, restricted or unknown.

## Exactness and source incompleteness

Customers becomes `unknown` when lifecycle is unknown for any candidate whose
inclusion cannot safely be resolved; it becomes `unavailable` when authoritative
lifecycle source cannot be read. Profiles complete becomes `unknown` when any
operational Customer lacks a safe completeness classification and `restricted`
or `unavailable` when the authorized secondary Profile source is respectively
hidden or unavailable. Neither may return a lower number as exact.

Pending invitations and Action required similarly become `unknown` for unsafe
lifecycle/action mapping, `unavailable` for failed authoritative source and
`restricted` only when a permitted secondary capability source is hidden. A
persisted Invitation with delivery failure is not silently omitted merely to
avoid an error; its classification remains an Invitations contract gate.

## Frontend product behavior

Summaries are one visual region but not one all-or-nothing request. A counter
error does not destroy an otherwise authorized directory or other counter
states. Primary authorization failure removes the complete surface. Retry of one
counter does not reset cursor, selection or unrelated counter state. Search and
filter changes do not flicker, reset or recalculate summaries. Known error must
replace indefinite loading, and impossible combinations degrade before display.

## Evidence mapping

| Mapping | Classification | Evidence / gap |
| --- | --- | --- |
| Summary is independent of loaded directory rows | **verified** | Frontend audit identifies separate summary loading/error and backend-owned summary evidence. |
| Tenant-scoped directory/projection exists | **verified** | `protectClient` and derived DirectoryEntry evidence. |
| Current Customers operational population | **incompatible** | Existing active/inactive UserClient/status semantics do not map to approved relationship lifecycle. |
| Profiles complete population | **absent/unknown** | Current evidence requires Profile for Request but defines no approved completeness aggregation. |
| Pending invitations | **partial** | Persisted tenant-user Invitation has pending evidence, but current vocabulary/kind mapping is not the shared Customers contract. |
| Action required population | **incompatible** | Existing attention reasons and invitation expiry/delivery representations exceed or differ from approved `delivery_failed`/`expired` recovery rule. |
| Freshness/invalidation coherence | **partial** | Directory projection is manually/eventually refreshed; no verified coherent summary review point. |
| Cross-tenant non-inference and opaque counter denial | **partial** | Tenant guard evidence exists; equal non-disclosing counter/error behavior remains unverified. |

No runtime change, endpoint, aggregation, cache duration, event technology or
summary query design is authorized by this contract.

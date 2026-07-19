# Customers States and Actions

**Status:** DEFINED
**Authority:** Visible Customers state, action and composition authority.
**Related:** `DOMAIN.md`, `FLOWS.md`, `../invitations/DOMAIN.md`,
`../internal-notes/DOMAIN.md`, `PROFILE_CONTRACT.md`,
`RELATIONSHIP_LIFECYCLE_CONTRACT.md`,
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md`, `SUMMARY_CONTRACT.md`.

## Directory and summary states

Every directory/filter surface distinguishes: **initial loading**, **refreshing
with retained usable content**, **ready**, **true empty**, **no search results**,
**no filter results**, **error with retry**, **loading more**, and **end**.
Summary counters independently distinguish loading, ready, zero and error; zero
never stands in for unavailable data.

Each counter also independently distinguishes refreshing/stale retained value,
restricted and unknown. An impossible combination such as Profiles complete
greater than Customers is never ready; affected counters refresh or degrade.

The selected detail independently distinguishes loading, ready, error and stale
or unavailable selection without discarding the directory context. Search,
filter, cursor position and selected relationship are retained through a
focused mobile detail and Back where feasible.

## Visible entry and action states

| Entry | Visible meaning | Customers action |
| --- | --- | --- |
| Customer — operational | tenant–customer relationship is operational; access may be separately permitted, restricted or unknown | Read approved Overview, related modules and Notes as permitted; no lifecycle action |
| Customer — archived/removed | retained outside normal operations, or no longer retained, respectively | Not a normal directory row; no Customers lifecycle action |
| Customer — lifecycle unknown | source cannot safely determine relationship lifecycle | No invented row/count/action; existing selection is unavailable/restricted |
| Invitation — pending | customer has not completed acceptance | Resend or revoke through Invitations |
| Invitation — delivery failed | invitation persists but delivery failed | Resend through Invitations; no duplicate invite |
| Invitation — expired | acceptance credential needs renewal | Renew and resend, or revoke, through Invitations |
| Invitation — accepted | reconciliation evidence | Reconcile into Customer relationship; no duplicate operational row |
| Invitation — revoked | acceptance capability invalidated | Remove from normal directory |

`Action required` includes only delivery failed and expired because each has a
legitimate tenant-admin recovery action. `profileOperationalCompleteness` is
`complete`, `incomplete` or `unknown`; incomplete/unknown are informational and
never Action required. It is not a generic severity label.

Operational Customers with restricted/unknown access, archived/removed Customers,
tenant suspension and global Identity/Auth restriction are likewise not Action
required: no approved tenant-admin Customers action resolves them.

## Section availability

| Surface | Availability state |
| --- | --- |
| Overview | Profile data loading, ready, unavailable/retry, restricted or stale; display `complete`/`incomplete`/`unknown` informationally |
| Requests | Hidden when module disabled; otherwise loading, ready, true empty, error/retry, loading more/end |
| Work orders | Hidden when module disabled; otherwise loading, ready, true empty, error/retry, loading more/end |
| Notes | Loading, ready, true empty, error/retry; create/edit/archive each idle, pending, success or error |

## Action rule and authorization

Every consequential action is `idle → pending → success | error`; pending
prevents duplicate submission. Validation stays with the field/action that can
be corrected. Recoverable failures preserve form input and selection context.
Permission-denied states explain the unavailable capability without exposing
restricted data. `forbidden` has no partial data or resource-existence signal;
`restricted` may occur only after authorized relationship scope succeeds;
`unavailable`, `unknown`, `not found` and `stale` remain distinct. Module-disabled states explain that the section is not enabled
for this tenant and do not substitute a zero result.

## Allowed action matrix

| Action | Actor | Result boundary |
| --- | --- | --- |
| Read, search, filter, select | authorized tenant admin/super admin | tenant-scoped directory/detail only |
| Invite customer | authorized tenant admin/super admin | creates customer-access invitation through Invitations |
| Resend / renew / revoke | authorized tenant admin/super admin | invitation lifecycle only |
| Open Request / Work Order | authorized viewer | navigates to owning domain, subject to that domain authorization |
| Create, edit, archive internal note | authorized tenant admin/super admin | internal note capability only |
| Edit confirmed Profile | nobody in Customers | excluded; customer Profile flow owns it |
| Edit global email / credentials / tenant access | nobody in Customers | Identity/Auth or authorized tenant-access owner owns it |
| Archive / remove / reactivate Customer relationship | nobody in Customers | excluded until a separate authorized lifecycle job is defined |

# Customers States and Actions

**Status:** DEFINED
**Authority:** Visible Customers state, action and composition authority.
**Related:** `DOMAIN.md`, `FLOWS.md`, `../invitations/DOMAIN.md`,
`../internal-notes/DOMAIN.md`.

## Directory and summary states

Every directory/filter surface distinguishes: **initial loading**, **refreshing
with retained usable content**, **ready**, **true empty**, **no search results**,
**no filter results**, **error with retry**, **loading more**, and **end**.
Summary counters independently distinguish loading, ready, zero and error; zero
never stands in for unavailable data.

The selected detail independently distinguishes loading, ready, error and stale
or unavailable selection without discarding the directory context. Search,
filter, cursor position and selected relationship are retained through a
focused mobile detail and Back where feasible.

## Visible entry and action states

| Entry | Visible meaning | Customers action |
| --- | --- | --- |
| Customer | tenant–customer relationship exists | Read Overview, related modules and Notes as permitted |
| Invitation — pending | customer has not completed acceptance | Resend or revoke through Invitations |
| Invitation — delivery failed | invitation persists but delivery failed | Resend through Invitations; no duplicate invite |
| Invitation — expired | acceptance credential needs renewal | Renew and resend, or revoke, through Invitations |
| Invitation — accepted | reconciliation evidence | Reconcile into Customer relationship; no duplicate operational row |
| Invitation — revoked | acceptance capability invalidated | Remove from normal directory |

`Action required` includes only delivery failed and expired because each has a
legitimate tenant-admin recovery action. It is not a generic severity label.

## Section availability

| Surface | Availability state |
| --- | --- |
| Overview | Profile data loading, ready, unavailable/retry, or restricted; display completeness informationally |
| Requests | Hidden when module disabled; otherwise loading, ready, true empty, error/retry, loading more/end |
| Work orders | Hidden when module disabled; otherwise loading, ready, true empty, error/retry, loading more/end |
| Notes | Loading, ready, true empty, error/retry; create/edit/archive each idle, pending, success or error |

## Action rule and authorization

Every consequential action is `idle → pending → success | error`; pending
prevents duplicate submission. Validation stays with the field/action that can
be corrected. Recoverable failures preserve form input and selection context.
Permission-denied states explain the unavailable capability without exposing
restricted data. Module-disabled states explain that the section is not enabled
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

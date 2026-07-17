# Users v1 States and Actions

**Status:** CURRENT — product state/action authority  
**Scope:** Visible Users v1 states, transitions and permitted actions.  
**Authority:** Owns state meaning and actions; technical contracts are in `INTEGRATION_CONTRACT.md`.  
**Last reviewed:** 2026-07-12  
**Related:** `DOMAIN.md`, `FLOWS.md`, `HANDOFF.md`, `VALIDATION_CHECKLIST.md`.

## Entry kinds and visible lifecycle state

| Entry kind | Visible meaning | Legitimate Users v1 action |
| --- | --- | --- |
| Person with tenant access | Tenant relationship exists | Read Overview only; accepted-user access management is deferred |
| Invitation — pending/sent | Customer has not completed acceptance | Resend or revoke |
| Invitation — delivery failed | Invitation persisted but localized delivery failed | Resend; never blind duplicate Invite |
| Invitation — expired | Acceptance credential requires renewal | Renew and resend, or revoke |
| Invitation — accepted | Transition/reconciliation evidence only | Reconcile to person/access; no normal duplicate row |
| Invitation — revoked | Acceptance capability invalidated | Leave normal operational directory; no normal duplicate row |

`accepting` and other concurrency states are internal-only. Generic
active/inactive, `profileComplete`, generic attention and generalized access
state are not Users v1 visible states.

## Distinct concepts after acceptance

| Concept | Meaning | Representation rule |
| --- | --- | --- |
| Tenant access | Invitation accepted and tenant relationship exists | Does not imply confirmed profile/location or request readiness |
| Confirmed profile/contact/location data | Customer explicitly saved authoritative data | Proposals remain unconfirmed until this action |
| Service-request readiness | Current confirmed data satisfies Service Requests requirements | Derived capability result, e.g. `canCreateServiceRequest` and `missingRequirements`; not persisted Users status |

## Directory, summary and selection states

- **Initial/loading:** preserve orientation; do not show false zero.
- **Ready/refreshing:** retain safe existing content during refresh.
- **True empty:** no tenant entries exist.
- **No search / no filter:** distinguish query versus Invitations-filter result.
- **Loading more/end:** cursor loading appends without losing reading context.
- **Error:** explain retry and whether retained data is usable.
- **Selected detail loading/error/stale:** preserve directory context; stale entry
  explains unavailability and offers safe return.
- **Summary loading/ready/zero/error:** total people and pending invitations
  have authoritative population semantics and never substitute zero for error.

## Action state rule

Every consequential action is `idle → pending → success | error`. Pending
blocks duplicate submission. Errors preserve current context and explain whether
retry is safe. Permission denial reveals no partial tenant data.

## Permitted action matrix

| Action | Actor | Required result |
| --- | --- | --- |
| Read/search/select | Tenant admin, super admin | Tenant-scoped projection only |
| Create invitation | Tenant admin, super admin | Pending invitation/proposal or explicit outcome |
| Resend | Tenant admin, super admin | Existing invitation, token rotation, proposal retention, cooldown |
| Renew and resend | Tenant admin, super admin | Expiry recovery with renewal wording |
| Revoke | Tenant admin, super admin | Confirmed invalidation of acceptance capability |
| Review/save proposal | Invited customer | Explicitly confirmed data only |
| Resume incomplete confirmation | Customer with accepted tenant access | Non-blocking CTA; unrelated navigation available |

## Deferred states and actions — DEFERRED_AFTER_USERS_V1

Active/inactive administration, blocking/unblocking, accepted-user deletion,
worker permissions, attention management, Requests/Activity/Communication/Notes
and profile editing by administrators. Revisit only when each passes the Product
Necessity Gate in `DOMAIN.md`.


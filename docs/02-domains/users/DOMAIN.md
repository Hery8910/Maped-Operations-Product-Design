# Users v1 — Assisted Customer Onboarding

**Status:** CURRENT — product definition  
**Scope:** End-to-end capability; production delivery is divided into Slices A–E.  
**Future full Users domain:** READY_WITH_BLOCKERS / DEFERRED beyond Users v1.  
**Authority:** Owns purpose, concepts, capability boundary and exclusions.  
**Last reviewed:** 2026-07-12  
**Related:** `FLOWS.md`, `STATES_AND_ACTIONS.md`, `PRODUCT_NOTES.md`,
`HANDOFF.md`, `INTEGRATION_CONTRACT.md`, `IMPLEMENTATION_PLAN.md`,
`VALIDATION_CHECKLIST.md`, `../../01-foundation/DECISIONS_LOG.md`.

## Purpose

Users v1 lets a tenant administrator prepare personalized customer onboarding
from information already known through direct contact or an in-person visit.
The customer receives localized onboarding, establishes or authenticates
identity, accepts tenant access, reviews/corrects proposals and explicitly
saves authoritative information without repeating unnecessary work.

It is not a CRM, unrestricted administrative profile editing, generic access
management, attention management or a Requests management surface.

## Product Necessity Gate

Every visible field, status, counter, filter or action must document its current
operational problem, actor, enabled decision/action, omission cost and reliable
approved data rule. Technical availability, prototype behavior, existing code
or SaaS convention does not create scope. Items that fail the gate are
`DEFERRED_AFTER_USERS_V1` with a revisit trigger.

## Actors and authorization boundary

- **Tenant admin:** primary Users v1 actor.
- **Super admin:** may perform the same Users v1 operations as exceptional
  platform/support capability; no separate experience is designed.
- **Other roles:** `DEFERRED_AFTER_USERS_V1` until they have a defined job.

Users v1 operations are directory/Overview read, invitation create, resend,
renew-and-resend and revoke. Permission denial must expose no partial tenant
directory data. Exact enforcement and denial semantics belong to
`INTEGRATION_CONTRACT.md`.

## Canonical concepts

1. **Global identity** — platform identity; it does not by itself grant access
   to the current tenant.
2. **Tenant-scoped access** — accepted tenant relationship; distinct from
   profile confirmation and request readiness.
3. **Invitation** — tenant-scoped onboarding relationship and opaque credential
   lifecycle before acceptance.
4. **Administrator-proposed onboarding data** — name, email, language and
   optional phone/proposed service address stored in invitation/onboarding
   context and attributed to the administrator until customer confirmation.
5. **Customer-confirmed profile/contact data** — authoritative user-controlled
   data saved explicitly by the customer.
6. **Proposed and confirmed service location** — proposed address is not a
   global canonical address; final mapping is contract-defined.
7. **Service-request readiness** — derived capability from current confirmed
   authoritative data, not active/inactive or `profileComplete`. The future
   Service Requests contract owns exact requirements and hard gate.
8. **Directory projection** — tenant-scoped operational read model; it is not
   source data and may be temporarily stale.

## Capability boundary

### Directory and Overview

The directory provides tenant-scoped people with access and pending invitations,
search, All and Invitations filters, cursor-based incremental loading, total
people and pending invitations summaries, selection and context retention.
It distinguishes initial/loading/refresh/empty/no-search/no-filter/error and
stale selected-entry states.

Overview shows only identity, relevant contact information, entry kind,
invitation lifecycle state and legitimate invitation actions. Each displayed
field must have source, visibility, fallback and freshness defined in the
integration contract.

### Assisted invitation

Required administrator input: name, email and invitation language. Language
defaults to authoritative tenant locale, otherwise dashboard locale; the admin
may override it. Phone and proposed service address are optional onboarding
prefills. The invitation token is opaque and retrieves proposal data securely;
no personal data is embedded in URL or token.

### Acceptance, confirmation and readiness

The customer accepts tenant access according to the identity contract, reviews
and corrects proposals, then explicitly saves confirmed profile/contact and
location data. Existing confirmed global data stays authoritative until the
customer keeps, corrects or adopts a proposal; it is never silently overwritten.

Access may exist before confirmation completes. In that interruption state,
onboarding can resume, unrelated navigation remains available, a primary review
CTA follows acceptance and a persistent non-blocking dashboard CTA guides
completion. Service Requests alone hard-gates request creation when its actual
contract requirements are missing.

### Invitation lifecycle

Resend, renew-and-resend and revoke operate on existing invitation identity.
Resend preserves proposals, rotates/invalidates the old token, refreshes expiry
by contract policy, prevents duplicate entries and uses cooldown/rate limiting.
Expired invitations renew-and-resend with distinct wording. Revoke confirms and
invalidates acceptance capability; it neither deletes a user nor modifies
accepted-user access. Accepted invitations reconcile into the person/access
entry; revoked invitations leave the normal operational directory.

## Delivery slices

The end-to-end capability is complete only after all required slices deliver;
individual slices may be implemented and validated independently.

- **Slice A — Directory and Overview:** PLANNED.
- **Slice B — Assisted Invitation Creation:** PLANNED.
- **Slice C — Customer Acceptance and Profile Review:** PLANNED; requires the
  Service Requests dependency before fully complete.
- **Slice D — Invitation Lifecycle Recovery:** PLANNED.
- **Slice E — Service Request Readiness Integration:** PLANNED.

See `IMPLEMENTATION_PLAN.md` for boundaries and dependencies.

## Explicit exclusions — DEFERRED_AFTER_USERS_V1

- Generic active/inactive filters, counters, badges and administration.
- Generalized attention management.
- Blocking/unblocking accepted users; accepted-user deletion.
- Unrestricted administrative profile editing.
- Requests content in the Users inspector, Activity, Communication and Notes.
- CRM pipeline/segmentation, engagement scoring and worker/operator permissions.
- Sorting/page-size controls and shell account settings as Users requirements.

**Revisit trigger:** each requires a documented current problem that passes the
Product Necessity Gate. Users versus Clients remains unresolved and must not be
resolved by this capability.

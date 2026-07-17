# Users v1 Implementation Handoff

**Status:** CURRENT — supersedes the previous broad Users handoff  
**Scope:** Behavior implementation must preserve for Users v1 — Assisted Customer Onboarding.  
**Authority:** Owns implementation-preservation requirements, not internal architecture.  
**Last reviewed:** 2026-07-12  
**Related:** `DOMAIN.md`, `FLOWS.md`, `STATES_AND_ACTIONS.md`,
`INTEGRATION_CONTRACT.md`, `VALIDATION_CHECKLIST.md`.

## Experience goal

Let tenant admin/super-admin prepare localized onboarding; let customer accept
access, review/correct proposals and explicitly save authoritative information;
support safe invitation recovery without generic access administration.

## Preserve

- Tenant-scoped cursor directory, total people/pending invitations summary,
  All/Invitations, search, selection and context restoration.
- Minimal Overview: identity, relevant contact, entry kind, invitation lifecycle
  meaning and legitimate invitation action only.
- Invite name/email/language, authoritative default plus override, optional
  phone/proposed service address, field-local validation, pending and duplicate
  prevention.
- Opaque invitation credential; proposal data never appears in URL/token.
- Localized acceptance: identity path, access acceptance, secure proposal
  retrieval, review/correction, explicit save, conflict choice and no silent
  overwrite.
- Access-before-confirmation interruption/resume, post-acceptance review CTA,
  non-blocking dashboard guidance and unrelated navigation.
- Derived request-readiness result only; Service Requests owns requirements and
  hard gate.
- Resend, renew-and-resend, persisted-delivery recovery and confirmed revoke.

## Required outcomes

Distinguish validation, tenant access exists, pending invitation exists,
permission failure, pre-persistence failure, persisted delivery failure and
unknown failure. Persisted delivery failure identifies the invitation and directs
to Resend; it never permits blind duplicate Invite. Accepted/revoked invitations
do not remain normal duplicate directory rows.

## Responsive, accessibility and localization

Wide directory/Overview becomes focused narrow detail with Back restoring
context and focus. Controls are keyboard reachable, focus-visible and semantic;
dialogs move/restore focus; status is not color-only. Validate both themes and
long localized content. Do not make shell account settings a Users requirement.

## Excluded

Generic active/inactive/attention, accepted-user access management, Requests
content, Activity, Communication, Notes, CRM, worker permissions, sorting and
page-size controls are `DEFERRED_AFTER_USERS_V1`.

## Acceptance reference

Use `VALIDATION_CHECKLIST.md`; technical guarantees, identifiers, authorization,
data ownership and backend verification belong to `INTEGRATION_CONTRACT.md`.


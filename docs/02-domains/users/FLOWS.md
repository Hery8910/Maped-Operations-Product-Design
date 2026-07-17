# Users v1 Flows — Assisted Customer Onboarding

**Status:** CURRENT — product flow authority  
**Scope:** Users v1 end-to-end flows and recovery; Slices A–E are in `IMPLEMENTATION_PLAN.md`.  
**Authority:** Owns user/admin task sequences and recovery.  
**Last reviewed:** 2026-07-12  
**Related:** `DOMAIN.md`, `STATES_AND_ACTIONS.md`, `INTEGRATION_CONTRACT.md`,
`HANDOFF.md`. Deferred work is listed in `DOMAIN.md`.

## Flow 1 — Find and inspect a relationship

**Actor:** Tenant admin or super admin.

```text
Open Users → summary/search/filter → scan cursor-loaded directory
→ select person or invitation → minimal Overview → act only if legitimate
```

All and Invitations are the required filters. Query, filter, loaded context,
selection origin and useful scroll/focus context survive focused mobile detail
and return. A person with tenant access and an invitation remain distinct.

Directory states: initial loading, refresh retaining safe content, true empty,
no-search, no-filter, recoverable error, load-more/end and stale selected
entry. Summary zero never represents summary loading/error.

## Flow 2 — Create assisted invitation

**Actor:** Authorized tenant admin or super admin.

```text
Open Invite → enter name, email, language
→ optionally add phone/proposed service address
→ field validation → submit/pending → persist invitation proposal
→ send localized invitation → directory shows pending invitation
```

Language defaults to authoritative tenant locale, otherwise dashboard locale,
and is overrideable. Proposals remain invitation/onboarding data attributed to
the administrator; they are not authoritative profile/location data.

Outcomes:

- **Created:** pending invitation becomes visible; local confirmation reflects
  the changed directory.
- **Tenant access exists:** preserve input; explain this tenant already has the
  relationship; do not create another invitation.
- **Pending invitation exists:** preserve input; direct recovery to the existing
  invitation rather than duplicate creation.
- **Persisted delivery failure:** invitation exists and is identifiable; preserve
  input; Invite retry is unsafe and Resend is the recovery.
- **Pre-persistence/unavailable/unknown failure:** preserve input and expose
  only contract-supported retry guidance.
- **Permission failure:** do not expose partial tenant data.

## Flow 3 — Customer accepts and confirms onboarding

**Actor:** Invited customer.

```text
Open opaque invitation credential in intended language
→ authenticate existing identity or establish identity
→ accept tenant access
→ securely retrieve proposal → review/correct proposal
→ explicitly save confirmed data → recalculate request readiness
→ reconcile invitation to person/access directory representation
```

The customer may keep, correct or adopt proposals when they differ from
existing confirmed data. Existing confirmed values remain authoritative until
explicit customer action; no proposal is silently materialized.

### Interrupted acceptance

After access acceptance and before confirmation, tenant access remains valid.
Proposal data stays unconfirmed, onboarding can resume, unrelated navigation is
available, and the product shows a primary review CTA immediately after
acceptance plus a persistent non-blocking dashboard CTA. Service Requests—not
Users—hard-gates request creation only when current confirmed data lacks its
contract requirements.

## Flow 4 — Resend a pending or delivery-failed invitation

```text
Select invitation → choose Resend → pending/cooldown check
→ rotate and invalidate old token → preserve proposal → refresh expiry
→ localized delivery outcome → updated invitation remains one directory entry
```

Success/failure feedback is local to the invitation. The action targets stable
invitation identity, never creates a duplicate, and follows contract-defined
rate limiting/cooldown.

## Flow 5 — Renew and resend an expired invitation

```text
Select expired invitation → understand expiration → Renew and resend
→ pending → renewed invitation + localized delivery outcome
```

Renewal wording must distinguish it from the first send even if the backend uses
the same command. It preserves proposal data and follows the approved expiry
policy.

## Flow 6 — Revoke an invitation

```text
Select pending/delivery-failed/expired invitation → Revoke
→ confirmation explains invalidated acceptance link → pending → revoked
```

Revocation is a destructive invitation action: confirmation is required, errors
preserve context, acceptance capability is invalidated and the invitation leaves
the normal operational directory. It is not user deletion or accepted-user
access management.

## Flow 7 — Service-request readiness integration

**Cross-domain dependency; Slice E.**

After confirmed data save, Users requests a derived readiness result from
current authoritative data. Service Requests owns exact requirements,
`canCreateServiceRequest`/`missingRequirements` equivalent, hard-gate timing,
continuation and shared validation/form rules. Users does not define request
fields or show Requests content.

## Responsive and accessibility requirements

Wide layouts may show directory and Overview together. Narrow layouts use
focused detail and Back restores the directory task. Dialogs move focus in and
restore it on close; status meaning is textual as well as visual; primary
actions do not depend on hover.


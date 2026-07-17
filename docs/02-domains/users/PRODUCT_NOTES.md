# Users v1 Product Notes

**Status:** CURRENT — UX/product reasoning  
**Scope:** Reasoning for Assisted Customer Onboarding.  
**Authority:** Owns UX rationale, hierarchy and deferred rationale.  
**Last reviewed:** 2026-07-12  
**Related:** `DOMAIN.md`, `FLOWS.md`, `STATES_AND_ACTIONS.md`, `HANDOFF.md`.

## Why Users v1 exists

Users v1 is not a contact database. It supports the operational handoff from
administrator-known customer information to customer-confirmed onboarding. It
reduces repetition without allowing an administrator to silently take ownership
of a customer's profile or location data.

## Why directory and Overview belong together

Administrators repeatedly find, inspect and act on a relationship. Directory
and contextual Overview preserve that loop. The Overview earns only identity,
contact, entry kind, invitation lifecycle meaning and legitimate invitation
actions; it must not become a profile dump or a substitute Requests workspace.

## Why invitations belong beside people

Onboarding begins before access is accepted. Pending, delivery-failed and
expired invitations require real recovery work, while accepted/revoked entries
must not remain normal duplicate rows. All and Invitations filters support the
two current jobs; no filter is created for every technical state.

## Proposal is not confirmation

Administrator prefill is a suggestion in invitation context, attributed to its
author. Customer review is the authority boundary: existing confirmed data
remains authoritative, proposals can be kept/corrected/adopted, and only
explicitly saved data materializes. An opaque token retrieves the proposal; it
does not carry personal data.

## Access, confirmation and readiness

Acceptance grants tenant access. It does not imply profile confirmation or
service-request readiness. If confirmation is interrupted, navigation remains
available; the product gives a primary post-acceptance review CTA and a
persistent non-blocking dashboard CTA. Service Requests owns the actual gate
and requirements, using the same profile/contact/address validation rules.

## Feedback rationale

Field errors support correction; pending belongs in the triggering control and
local form; success is visible through the changed directory; persisted delivery
failure stays local and directs recovery to Resend. Revoke requires proportionate
confirmation because it invalidates a live acceptance link.

## Deferred — DEFERRED_AFTER_USERS_V1

Generic active/inactive or attention management, accepted-user access controls,
CRM, profile administration, Requests inspector content, Activity,
Communication, Notes and worker permissions. These have no approved current
Users v1 job; revisit through the Product Necessity Gate.


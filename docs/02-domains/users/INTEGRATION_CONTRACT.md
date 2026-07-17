# Users v1 Integration Contract

**Status:** PLANNED — requires backend/frontend verification  
**Scope:** Cross-repository obligations for Users v1 — Assisted Customer Onboarding.  
**Authority:** Owns data, commands, authorization, outcomes, consistency and ownership obligations.  
**Last reviewed:** 2026-07-12  
**Related:** `DOMAIN.md`, `FLOWS.md`, `STATES_AND_ACTIONS.md`, `HANDOFF.md`.

## Scope and canonical concepts

Contract global identity, tenant access, invitation, administrator proposal,
customer-confirmed profile/contact data, proposed/confirmed service location,
derived service-request readiness and directory projection. Do not collapse
them into `active`, `profileComplete` or a single entity.

## Read requirements

Provide tenant-scoped cursor directory projection, stable entry/invitation IDs,
All/Invitations and search, total-people/pending-invitations summary, freshness,
missing/unavailable and stale selection behavior. Define source, visibility,
fallback and freshness for every Overview field. Verify cursor semantics and
summary population against backend evidence; do not infer values.

## Authorization

Tenant admin and super admin may read, create, resend, renew-and-resend and
revoke only within tenant boundary. Permission denial reveals no partial tenant
directory data. Verify current middleware/role behavior; audits are evidence.

## Invitation command and outcomes

Input: name, email, language; optional phone and proposed service address.
Define locale precedence, validation, source attribution, idempotency and stable
outcomes for validation, tenant access exists, pending invitation exists,
permission failure, pre-persistence failure, persisted delivery failure and
unknown failure. Persisted delivery failure returns stable invitation identity
and semantic outcome. Token is opaque; no PII in URL/token.

## Acceptance and ownership transition

Define identity/auth path, access acceptance, secure proposal retrieval,
customer review/correction/save, existing-data conflict choice, and explicit
mapping of confirmed data to profile/contact/location models. Existing confirmed
data cannot be overwritten without customer action. Proposal remains invitation
context until save. Define resumable post-access/pre-confirmation state and
reconciliation to one directory relationship.

## Lifecycle and consistency

Define state transitions, expiry, resend cooldown/rate limit, token rotation and
invalidation, proposal retention, renew wording/effect, revoke confirmation and
accepted/revoked directory/history behavior. Accepted/revoked records are not
normal duplicate operational rows.

## Service Requests dependency

Before Slices C/E complete, Service Requests must define minimum confirmed data,
derived readiness result (`canCreateServiceRequest`/`missingRequirements`
equivalent), hard-gate timing, continuation and shared validation/form rules.
Users consumes/recalculates the result but does not define required request
fields.

## Existing capability verification

Backend/frontend audits indicate invitation V2, cursor directory, summary,
resend/revoke and locale fields may exist. Verify: actual role enforcement,
delivery outcome/identity, proposal persistence/source attribution, acceptance
merge behavior, location mapping, cooldown, expiry/history and readiness
contract. No observed implementation is accepted as a product rule until mapped.


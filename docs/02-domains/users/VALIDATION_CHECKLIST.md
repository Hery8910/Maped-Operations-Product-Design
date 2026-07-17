# Users v1 Validation Checklist

**Status:** PLANNED — acceptance evidence template  
**Scope:** Observable validation for Users v1 and Slices A–E.  
**Authority:** Owns validation evidence.  
**Last reviewed:** 2026-07-12  
**Related:** `DOMAIN.md`, `HANDOFF.md`, `INTEGRATION_CONTRACT.md`, `IMPLEMENTATION_PLAN.md`.

## Scope and authority

- [ ] Capability name is Users v1 — Assisted Customer Onboarding; A–E are distinct planned delivery slices.
- [ ] Every visible field/status/counter/filter/action passes the Product Necessity Gate; no generic active/attention baseline appears.
- [ ] Audits/prototype are treated as EVIDENCE_ONLY.

## Slice A

- [ ] Tenant-scoped cursor directory, summary, All/Invitations, search, selection and retained desktop/intermediate/mobile context work.
- [ ] Initial/refresh/empty/no-search/no-filter/load-more/end/error/stale states are distinguishable; summary zero is not loading/error.

## Slice B

- [ ] Name/email/language default/override validate locally; phone/address are optional proposals with attribution.
- [ ] Pending blocks duplicates; success, conflicts, permission, pre-persistence and persisted-delivery outcomes have correct feedback.
- [ ] Opaque token contains no PII.

## Slice C and E dependency

- [ ] Acceptance supports identity path, access acceptance, proposal review, correction, explicit save, existing-data keep/correct/adopt choice and no silent materialization.
- [ ] Interruption after access is resumable; CTA guidance is non-blocking; unrelated navigation remains available.
- [ ] Readiness is derived from confirmed data, not `profileComplete`; Service Requests contract verifies requirements, hard gate and shared validation.

## Slice D

- [ ] Resend rotates token, preserves proposals, refreshes expiry and respects cooldown.
- [ ] Expired renewal has distinct wording; delivery failure recovers through Resend; revoke confirms/invalidate link; no duplicate directory rows.

## Accessibility, localization and contract evidence

- [ ] Keyboard, focus, dialog restoration, selection semantics, text status and both themes pass review with long localized content.
- [ ] Authorization/tenant isolation, IDs, outcome semantics, data mapping, cursor semantics and unresolved backend facts are verified against integration.


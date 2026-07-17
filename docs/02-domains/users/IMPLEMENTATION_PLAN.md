# Users v1 Implementation Plan

**Status:** PLANNED  
**Scope:** Incremental delivery of Users v1 — Assisted Customer Onboarding.  
**Authority:** Owns delivery slices and dependencies, not product rules.  
**Last reviewed:** 2026-07-12  
**Related:** `DOMAIN.md`, `INTEGRATION_CONTRACT.md`, `HANDOFF.md`,
`VALIDATION_CHECKLIST.md`.

## Per-slice delivery lifecycle

```text
PLANNED
→ CONTRACT_VERIFIED
→ IMPLEMENTATION_READY
→ IN_IMPLEMENTATION
→ INTEGRATED
→ PRODUCT_VALIDATED
```

`RETURN_TO_PRODUCT_REVISION` is allowed when integrated validation reveals a
product problem. A slice cannot enter implementation while contract blockers
would force frontend or backend to invent product rules. Product definition
CURRENT does not make every slice ready.

| Slice | Product scope | Current status | Contract/dependency gate | Observable exit condition |
| --- | --- | --- | --- | --- |
| A — Directory and Overview | Tenant directory, cursor loading, summary, All/Invitations, search, selection, minimal Overview, view states, responsive and accessibility behavior | PLANNED | Verify read projection, cursor/summary semantics, tenant authorization and field source/fallback/freshness | Integrated directory supports documented states/context and validates against its contract |
| B — Assisted Invitation Creation | Name/email/language, optional phone/address proposals, attribution, localized delivery and outcomes | PLANNED | Verify command input, locale precedence, proposal persistence, permissions and stable delivery-failure identity/outcome | Integrated creation prevents duplicates and distinguishes every required outcome |
| C — Customer Acceptance and Profile Review | Identity path, access acceptance, opaque proposal retrieval, review/save, conflict choice and resume guidance | PLANNED | Verify identity/profile/location ownership, merge/conflict rules, confirmation mapping and resumable state | Customer can explicitly confirm without silent overwrite and resume after interruption |
| D — Invitation Lifecycle Recovery | Resend, renew-and-resend, delivery recovery and revoke | PLANNED | Verify expiry, token rotation/invalidation, cooldown, history/row behavior, confirmation and authorization | Integrated recovery preserves proposals, avoids duplicates and invalidates revoked acceptance |
| E — Service Request Readiness Integration | Derived readiness, CTA, shared validation and Service Requests hard-gate integration point | PLANNED | Verify Service Requests readiness contract, continuation, hard-gate timing and shared form rules | Readiness derives from confirmed data and only Service Requests applies the hard gate |

Slices A and B are the first candidates for cross-repository verification.
Slices may be validated independently. Users v1 is complete only after all
required slices and the end-to-end flow are `PRODUCT_VALIDATED`.

Do not bundle deferred active/attention, CRM, Requests inspector content,
accepted-user administration, sorting or page-size controls into any slice.


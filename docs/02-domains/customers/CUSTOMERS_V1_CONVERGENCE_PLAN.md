# Customers v1 Cross-repository Convergence Plan

**Status:** AUTHORITATIVE_PLAN — product semantics closed; no runtime unit is
implementation-ready until its stated evidence exists.
**Last reviewed:** 2026-07-19
**Product authority baseline:** `2c4357103086d31dfedd20409a039d449683ca92`
**Evidence baselines:** backend readiness audit
`2f496fe854c68f6ab016ccf0d7d6463eb5dfb2b1`; frontend readiness audit
`b2bdb67d88e924de251de68e2effdd0b648af105`.
**Related:** `DOMAIN.md`, `PROFILE_CONTRACT.md`,
`RELATIONSHIP_LIFECYCLE_CONTRACT.md`,
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md`, `SUMMARY_CONTRACT.md`,
`DIRECTORY_QUERY_CONTRACT.md`, `INTEGRATION_CONTRACT.md`,
`BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md` and
`../invitations/CUSTOMER_ACCESS_LIFECYCLE_CONTRACT.md`.

## Product closure and route decision

Customers is the tenant-scoped operational relationship, never a global User
directory, Auth account, Profile or Invitation. An operational relationship is
the only normal **Customers** row. Lifecycle, tenant grant/effective access,
global safety, tenant availability, Profile result and Invitation lifecycle are
separate facts with their own owners. Tenant admins see only minimized
operational meaning; raw security/global identity state, credentials, tokens and
source diagnostics are never exposed.

The canonical future product route is **`/people/customers`**. `/people/users`
is a temporary legacy redirect, not an alias or second evolving product surface.
Migration occurs in unit 8 after the Customer read foundation has an approved
route-state mapping. It preserves only authorized query, active filter and
stable tenant-scoped selection context; an unresolvable/unauthorized legacy
selection redirects to a safe directory state without existence disclosure.
Internal legacy names do not determine product route naming.

Canonical sources: Customer boundary/lifecycle in
`RELATIONSHIP_LIFECYCLE_CONTRACT.md`; field/read taxonomy in
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md`; Profile completeness in
`PROFILE_CONTRACT.md`; Profile provenance/confirmation and its Domain Change
Gate in `CUSTOMER_PROFILE_CONFIRMATION_CONTRACT.md` and
`CUSTOMER_PROFILE_CONFIRMATION_GATE.md`; query/cursor behavior in `DIRECTORY_QUERY_CONTRACT.md`;
summary populations in `SUMMARY_CONTRACT.md`; and customer-access Invitation
lifecycle/Action required in
`../invitations/CUSTOMER_ACCESS_LIFECYCLE_CONTRACT.md`. Handoffs link, rather
than duplicate or reinterpret, these definitions.

## Ordered units

| # | Unit / owner repository | Scope and explicit exclusion | Dependencies, risks and Domain Change Gate | Evidence / closure criterion | Unblocks |
| --- | --- | --- | --- | --- | --- |
| 1 | **Backend authorization and lifecycle separation** — backend | Small first runtime unit: primary Customers authorization envelope and derived relationship lifecycle, grant, global safety and tenant availability. **Out:** Directory, summaries, Invitation UI, query/cursor, Profile projection and routes. | Product contracts; risk of cross-tenant inference or silently mapping `inactive`. **Gate:** authorization, persisted-state semantics and compatibility assessment. | Role/super-admin scope, cross-tenant/direct-ID opaque denial, lifecycle permutations and stale-envelope tests. Close only when authorization precedes every source and legacy statuses have no implied product mapping. | 2, 3, 4, 5, 6 |
| 2 | **Backend authorized Customer/Profile projection** — backend | Authorized row/detail envelope: current email, Profile context, confirmation result and block outcomes. **Out:** admin Profile CRUD, query endpoint, summary calculation and owner-domain tabs. | Unit 1; Profile owner/read mapping. Risk: PII/data compatibility. **Gate:** Profile/read authorization and data evolution. | Customer/admin redaction and absent/unconfirmed/confirmed/unknown/restricted/unavailable/freshness tests. Close only when Profile creation never implies confirmation. | 3, 5, 6, 10 |
| 3 | **Customer Profile confirmation evidence and customer-owned save flow** — backend + Client/Profile frontend | Persist Profile revision/field provenance and explicit customer review/save evidence; customer-owned correction, no-change save, conflict and resume flow. **Out:** tenant-admin Profile editing, acceptance implementation, schema/property naming, legacy migration campaign and section confirmation. | Units 1–2; `CUSTOMER_PROFILE_CONFIRMATION_GATE.md`. Risk: false confirmation, privacy leakage and concurrent unseen writes. Invitations lifecycle may advance in parallel, but acceptance/materialization cannot claim confirmation. | Revision/provenance, explicit/no-change save, third-party invalidation, contract-version renewal, concurrent conflict, legacy unknown, anonymization and non-confirming Invitation tests. Close only when every current confirmed result has valid evidence. | 5, 6, 7, 10 |
| 4 | **Invitations lifecycle, delivery outcomes and recovery** — backend / Invitations | Customer-access lifecycle, persisted delivery failure, recovery eligibility, identity reconciliation and semantic outcomes. **Out:** provider, token/URL encoding, cooldown duration, audit storage and frontend form. | Unit 1; may run parallel to 2–3 except shared proposal/non-confirmation rules. Risk: credential/lifecycle concurrency. **Gate:** transition security, idempotency/concurrency and compatibility. | Create/pre-persistence failure/persisted delivery failure, expiry, resend/renew/revoke, concurrent acceptance and duplicate relationship tests. Close only when Action-required population is authoritative or safely non-ready. | 5, 6, 8, 10 |
| 5 | **Customers query, stable order and cursor** — backend | Three population views, deterministic search, normalized-label order, scoped opaque cursor/review and selection reconciliation. **Out:** page size, encoding, indexes, URL and frontend cache. | Units 1, 3 and 4. Risk: scope leakage or duplicate/omitted rows. **Gate:** read-query compatibility and tenant isolation. | Filter/query/mismatch/expiry/concurrent rename/lifecycle/no-duplicate tests. Close only when mismatch is explicit, never empty, and no cross-scope inference occurs. | 7, 9, 10 |
| 6 | **Independent summaries and Action required derivation** — backend | Four tenant-wide populations, independent source states and coherent degradation. **Out:** card visual design and cursor total. | Units 1–4 plus authoritative Profile confirmation classification. Risk: undercount/stale contradiction. **Gate:** cross-domain projection consistency/exactness. | Exact-zero, unknown/unavailable/restricted, invalidation, legacy unknown and cursor-independence tests. Close only when no unavailable source becomes zero. | 7, 10 |
| 7 | **Frontend Customer read foundation** — frontend | BFF/types/controller, read outcomes, minimized row/detail, three filters, informative summaries, selection/focus/responsive. **Out:** Invite mutation/form, route migration, owner tabs and global primitive promotion. | Backend 1–3, 5, 6. Risk: cache/URL exposing stale or unauthorized data. **Gate:** frontend BFF/URL/accessibility contract. | Verified-backend contract tests plus confirmation/legacy states, keyboard, refresh/load-more, desktop/tablet/mobile and three-locale tests. | 8, 9, 10 |
| 8 | **Frontend Invitations entry point and right-panel workflow** — frontend | Left Invite customer CTA, right-panel focused form/detail, field validation, pending, semantic outcomes, recovery and reconciliation. **Out:** public acceptance/Profile confirmation and global dialog/form system. | Backend 4 and frontend 7. Risk: duplicated command/incorrect proposal presentation. **Gate:** mutation/CSRF/outcome/accessibility. | Field errors, duplicate prevention, persisted-delivery-failure recovery, revoke confirmation, accepted replacement and mobile Back/focus tests. Close only when proposal is never confirmed. | 9, 10 |
| 9 | **Route migration and compatibility** — frontend / Product Design review | Canonical `/people/customers`, one `/people/users` redirect, authorized state preservation and navigation update. **Out:** dual long-lived surface and global-ID lookup. | Frontend 7. Risk: selection disclosure/broken context. **Gate:** route/URL compatibility and non-disclosure. | Direct, selected/query/filter, invalid/forbidden legacy link and focus/Back tests. Close only when one surface remains and redirect cannot reveal foreign data. | 10, 11 |
| 10 | **Full Customer Overview integration** — backend + frontend + owners | Approved Overview blocks and then enabled Requests/Work Orders/Notes projections. **Out:** owner mutations, generic management and Profile editing. | Units 2–8 and owner contracts. Risk: accidental copied owner data. **Gate:** cross-domain authorization/module/pagination/minimization. | Block partial/restricted/unavailable, confirmation/legacy meaning, module-disabled, owner-navigation and no-duplicated-mutation tests. | 11 |
| 11 | **Cross-repository validation and legacy-assumption removal** — all | Verify contracts/migration and retire only contradicted legacy assumptions. **Out:** unrelated cleanup/global primitive redesign/other domains. | Units 1–10. Risk: treating V2 green tests as product proof. **Gate:** compatibility/removal and deployment evidence. | Linked Product Design/backend/frontend evidence; tenant isolation, semantic outcomes, responsive/accessibility and migration checks. Close only when status can advance without UserClient/Tenant Users V2 semantics. | implementation-ready assessment |

## Sequencing rules

- Unit 1 is the **only first runtime unit authorized now**. It does not
  implement Directory, summaries, Invitations UI or final Customers query.
- A unit may prepare evidence/docs but may not absorb a later unit to make a
  screen appear complete.
- Backend/frontend audits remain evidence until closure tests prove the Product
  Design contract. A green V2 test does not close a Customers unit.
- Requests, Work Orders, Internal Notes, public Invitation acceptance, endpoint
  names, schemas, indexes, delivery provider, migration and cooldown policy
  remain separate gates. Unit 3 is the only authorized Profile confirmation
  runtime scope; its customer-owned save flow precedes query and summaries.

## Cross-repository acceptance conditions

Before Customers Directory and Overview can be implementation-ready, route and
redirect policy must be implemented; primary authorization must be opaque;
Customer/Profile/Invitation projections must be authorized and fresh enough;
Action required must be exact or safely unavailable; cursor and summaries must
obey independent contracts; frontend must not render false zero/false incomplete;
Invitation proposal must never imply confirmed Profile; and keyboard/responsive
context continuity must be verified.

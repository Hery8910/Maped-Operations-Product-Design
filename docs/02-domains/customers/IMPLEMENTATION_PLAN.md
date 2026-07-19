# Customers Implementation Plan

**Status:** PLANNED — no slice is implementation-ready.
**Authority:** Delivery order and gates, not product rules.

| Slice | Scope | Status | Gates before implementation-ready |
| --- | --- | --- | --- |
| Customers Directory and Overview | tenant relationship directory, summaries, search, filters, selection, Profile/address read view | PLANNED | **Product policy closed:** Profile and relationship lifecycle/access semantics. Still verify tenant projection/cursor, lifecycle/grant/global/tenant mapping, counter populations, Profile confirmation/source/freshness/read authorization |
| Shared Invitation Creation | customer invitation form in right panel; proposal/data ownership and outcomes | PLANNED | common Invitations command, locale, idempotency, conflict/delivery identity, permissions |
| Customer Acceptance and Profile Completion | new/existing identity acceptance, review/correct/save and interrupted resume | PLANNED | identity/auth, opaque credential, Profile merge/ownership, resume and reconciliation |
| Invitation Lifecycle Recovery | resend, renew-and-resend, cooldown, revoke and reconciliation | PLANNED | lifecycle transitions, token rotation, audit, cooldown, authorization |
| Requests read projection | enabled-module customer-related list and owner navigation | PLANNED | Service Requests tenant query/pagination/summary/destination contract |
| Work Orders read projection | enabled-module customer-related list and owner navigation | PLANNED | Work Orders tenant query/pagination/summary/destination contract |
| Internal Notes | customer note list/create/edit/archive | PLANNED | notes ownership, role policy, concurrency/archive/audit contract |
| Frontend Customers Integration | route, URL state, composition, responsive, accessibility and branded configuration | PLANNED | approved frontend handoff, backend projections/outcomes, migration/redirect plan |

Each slice follows `PLANNED → CONTRACT_VERIFIED → IMPLEMENTATION_READY →
IN_IMPLEMENTATION → INTEGRATED → PRODUCT_VALIDATED`; a product correction may
return it to definition. A slice cannot infer missing backend semantics or
frontend route/state decisions merely to advance status.

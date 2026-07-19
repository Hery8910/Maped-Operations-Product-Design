# Customers Directory Query, Search, Filters and Cursor Contract

**Status:** CURRENT — product and architecture gate closed; implementation mapping remains open.
**Authority:** Directory population views, search semantics, stable order, cursor,
selection and reconciliation behavior.
**Last reviewed:** 2026-07-19
**Related:** `PROFILE_CONTRACT.md`, `RELATIONSHIP_LIFECYCLE_CONTRACT.md`,
`READ_PROJECTION_AUTHORIZATION_CONTRACT.md`, `SUMMARY_CONTRACT.md`,
`INTEGRATION_CONTRACT.md`, `BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md`.

## Scope and default view

All query behavior begins after the primary tenant authorization envelope. It
operates only inside the authorized tenant, active population view and minimized
row projection; it must never use search to discover a global identity outside
an authorized Customer relationship or Invitation.

The only product filters are **Customers**, **Invitations** and **Action
required**. They are mutually exclusive population views, not backend status
values or cumulative toggles. The default is **Customers**. Changing a filter
fully replaces the query population and starts a new cursor chain. There is no
`All`, `Active`, `Inactive`, `Profiles complete` or equivalent legacy filter.
Summary cards are informative and do not activate filters; in particular,
Profiles complete never becomes a fourth filter.

## Filter matrix

| Filter | Population / entry kind | Searchable fields | Row fields | Empty meaning | Owner / freshness / invalidation | Summary relationship |
| --- | --- | --- | --- | --- | --- |
| **Customers** | Operational tenant–Customer relationships only. | Confirmed name, current approved email, authorized telephone. | Approved Customer row projection only. | True empty or no search results as defined below. | Customers lifecycle + read projection; relationship lifecycle/identity/email/name/access-authority changes invalidate. | Customers summary has same population but independent read state and is never cursor total. |
| **Invitations** | Customer-access Invitations in `pending`, `delivery_failed` or `expired`; separate Invitation entry kind. | Proposed name, authorized recipient email. Telephone never matches. | Minimal Invitation projection only. | No filter results or no search results. | Invitations lifecycle/read projection; persisted lifecycle/reconciliation/authorization changes invalidate. | Pending invitations plus Action required partitions this current Invitation view when states are authoritative. |
| **Action required** | Exact Invitations subset: `delivery_failed` or `expired` only when Invitations confirms legitimate Customers-admin recovery. | Proposed name, authorized recipient email. | Minimal Invitation projection/action-exists meaning. | No filter results, no search results, unknown or unavailable; never “No action required” after source failure. | Invitations lifecycle/action eligibility; any eligibility/lifecycle/reconciliation/authorization change invalidates. | Same semantic population as Action required summary, but list and summary have independent read states. |

Lifecycle/action eligibility that cannot safely classify an Invitations view
makes that view `unknown` or `unavailable`; it must not display a reduced set as
complete. Customers population does not depend on access, Profile completeness,
related work, global restriction or tenant availability.

## Deterministic search

Normalize every query before it is bound to a population/cursor:

1. trim leading/trailing whitespace and collapse repeated internal whitespace;
2. Unicode-normalize and case-fold; for names, compare a diacritic-insensitive
   normalized form while preserving original display content;
3. normalize email by trim and case-fold only—do not alter meaningful local-part
   characters;
4. normalize telephone to digits, retaining an initial international marker only
   for equivalence; formatting spaces, punctuation and grouping do not matter.

An empty normalized query restores the complete active-filter population. A
query needs at least **two significant normalized characters or digits**. A
shorter non-empty query is a local `query_too_short` explanation: it does not
send a query, does not claim an empty server result and may retain the unqueried
population with clear non-result context.

Name and email use deterministic partial containment on their normalized source
values. Telephone uses containment on normalized digits only when the query is
telephone-shaped. There is no fuzzy matching, spelling correction, global
identity lookup or opaque relevance scoring. Search results retain the same
stable ordering as unqueried results.

## Stable order

Every filter sorts ascending by normalized display label: confirmed Customer
name for Customers; proposed Invitation name, then authorized recipient email
fallback for Invitations. Confirmed/proposed labels sort before unconfirmed or
unavailable labels. A stable tenant-scoped opaque reference is the tie-breaker.
No global ID is visible or used as a cross-tenant sort key.

Name/email change or lifecycle transition may move an entry. The current cursor
chain never silently reorders retained pages and calls them current; it refreshes
or restarts from the first page when a coherent review point cannot preserve the
order. A server-side relevance order is excluded until a separate product need
can show it is deterministic and cursor-safe.

## Cursor contract

The cursor is opaque, contains no PII/global ID and is scoped to the authorized
actor/tenant, active filter, normalized query, order contract and a coherent
review/generation where needed. It is not reusable across those scopes.

| Situation | Required behavior |
| --- | --- |
| First page | Begin a new authorized chain for current filter/query/order. |
| Next page | `nextCursor`/equivalent exists only when more entries belong to the same coherent chain; `hasNextPage=false` means end. |
| Loading more | Append only authorized entries; preserve reading/selection context. |
| Load-more error | Retain prior authorized pages, show retry for next page only; do not reset summaries or selected detail. |
| Retry | Retry same next-page intent; it does not restart the chain unless cursor is invalid/expired. |
| Invalid/expired/mismatched cursor | Return an explicit invalid/expired query state, never authoritative empty; restart from first page on user/system refresh. |
| Filter/query change | Invalidates chain and begins first page. |
| Refresh | Re-evaluates from first page; may retain pages as stale only when authorization and review coherence remain safe. |

Within one coherent review, the owner guarantees no duplicate or omitted entry
while paging. Frontend deduplication may protect rendering but cannot replace
that guarantee. The directory has no need for a global total to paginate, and a
cursor never reveals a row from another tenant.

| Cursor concern | Bound context / invariant | Transition and recovery | Context preserved |
| --- | --- | --- | --- |
| Cursor chain | Authorized actor, tenant, filter, normalized query, order and coherent review. No PII or global ID. | First page creates a chain; filter/query/unsafe review change starts another. | Active filter/query; never prohibited rows. |
| Page progression | Each admitted entry appears once and no eligible entry is skipped in one coherent review. | `nextCursor` advances only that chain; end has no next page. | Prior authorized pages and normal selection. |
| Mismatch or expiry | A cursor cannot be reused for another actor, tenant, filter, query or order. | Explicit invalid/expired state; restart only from first page. | No false empty or cross-scope inference. |
| Next-page failure | Already admitted pages remain authorized context. | Retry the same next-page intent; restart only when its cursor is invalid/expired. | Pages, summary state and selected detail. |

## Empty, error and independent list states

| State | Meaning |
| --- | --- |
| **true empty** | Empty query and no operational Customer nor current customer Invitation in any approved filter population, authoritatively established. |
| **no filter results** | Empty query, active filter population authoritatively empty, while another approved population may exist. |
| **no search results** | Valid query returns no entry within a non-empty authorized active filter population. |
| **initial loading / refreshing / loading more / end** | Respect the cursor contract; refreshing may retain safe stale pages, end is distinct from empty. |
| **unavailable/retry** | Authorized population/source cannot be read; never empty/zero. |
| **unknown** | Population/query classification unsafe; never empty. |
| **restricted** | Authorized primary scope but secondary source/view policy-hidden; never empty. |
| **forbidden** | Primary authorization denied; remove whole directory surface with no partial rows. |

An initial-page error is not `0 customers`; later-page error retains valid pages.
Invitations unavailability never changes Customers filter into empty, and Action
required unavailability never means “No action required.”

## Selection, detail and reconciliation

Selection uses a stable tenant-scoped reference, never page position. Detail may
resolve that reference directly under current authorization; it need not load
intermediate pages. A selection remains normal only while it belongs to active
filter/query population. Changing filter clears an incompatible normal
selection; changing query preserves one only if it still matches, otherwise
clears it or exposes an explicit “outside this view” state without a false list
selection.

| Change | Selection/list behavior |
| --- | --- |
| Refresh/name or email move | Keep detail only if still authorized; list restarts/reconciles rather than silently reorders pages. |
| Customer becomes archived/removed/unknown | Remove normal row; detail becomes explicit unavailable/restricted state or clears. |
| Invitation accepted | Remove Invitation row; replace selection with authoritative resulting Customer reference when supplied, otherwise return focus/context to list. |
| Invitation revoked | Remove normal Invitation row; clear selection and return focus/context to list. |
| Invitation becomes delivery_failed/expired | Reconcile it between Invitations and Action required on refresh/restart; no duplicate rows. |
| Authorization/tenant changes | Discard prohibited rows and detail immediately; do not retain stale protected content. |

Creation, acceptance, revoke, lifecycle/name/email changes between pages may
require a chain refresh/restart. The UI must never show an accepted Invitation
and reconciled Customer as two normal entries, retain a row whose current
lifecycle/action eligibility cannot be verified, or preserve forbidden detail.

## Summary separation

Summaries remain tenant-wide and are neither recalculated by filter/query nor
used as cursor totals. A loaded row count is never compared to prove summary
accuracy. Action required filter and summary share population semantics but can
be independently ready, unavailable or refreshing; neither state converts the
other surface into empty.

## Evidence mapping

| Mapping | Classification | Evidence / limitation |
| --- | --- | --- |
| Cursor directory, has-next/load-more and preserved selection context | **verified** | Frontend audit documents cursor pagination, accessible fallback and mobile restoration. |
| Separate user/invitation entries | **verified** | Current directory has `kind=user|invitation`; product vocabulary is corrected here. |
| Minimum two characters and debounce | **partial** | Existing frontend uses two characters and debounce; only two significant characters is adopted, timing is not. |
| Filters all/active/inactive/invitations/attention | **incompatible** | Legacy filters/statuses do not define Customers populations. |
| Page size 25, cursor shape/binding, cache by query/filter, dedup and eight-page restoration | **partial** | Observed implementation detail, not product contract. |
| Current order and invalid-cursor response | **absent/unknown** | Audit does not establish approved stable ordering or safe mismatch behavior. |
| Tenant isolation during query/cursor | **partial** | Tenant guard evidence exists; actor/query/cursor non-inference mapping remains unverified. |
| Legacy attention/action reasons | **incompatible** | Existing reasons exceed approved persisted Invitation recovery population. |

No endpoint/DTO, cursor encoding, page size, debounce, index, cache technology,
URL shape, Invitation command or owner-domain query is authorized here.

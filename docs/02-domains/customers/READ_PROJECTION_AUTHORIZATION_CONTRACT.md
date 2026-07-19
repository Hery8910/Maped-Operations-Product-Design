# Customers Read Projection, Authorization and Freshness Contract

**Status:** CURRENT — product and architecture gate closed; implementation mapping remains open.
**Authority:** Authorized read projections, field minimization, freshness and non-disclosing read outcomes for Customers.
**Last reviewed:** 2026-07-19
**Related:** `DOMAIN.md`, `PROFILE_CONTRACT.md`, `RELATIONSHIP_LIFECYCLE_CONTRACT.md`, `INTEGRATION_CONTRACT.md`, `BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md`, `VALIDATION_CHECKLIST.md`.

## Scope and primary rule

Customers reads an authorized tenant-scoped projection; it never reads global Identity/Auth, Profile or Invitation source collections directly from the client. The authorization envelope—actor, target tenant, enabled capability and relationship scope—is evaluated before any source. If it fails, no partial row, detail, count, search result or source-specific error may be returned.

This fixes product semantics only. It does not define endpoints, DTOs, schemas, cursor, search implementation, cache technology, timings or summary transport.

## Actors and authorized surfaces

`Tenant admin` means an actor with the approved Customers job inside the requested tenant. Super admin is not implicitly that actor: cross-tenant reading requires an explicit, audited support/operational policy and returns the same scoped projection, never an unrestricted global list.

| Actor | Directory / summary / search | Customer detail and approved Profile context | Invitation detail | Access/global/tenant meaning | Failure result |
| --- | --- | --- | --- | --- | --- |
| Authorized tenant admin | Yes, target tenant only | Yes | Yes | Minimum semantic meaning only | Contract taxonomy below |
| Super admin with explicit audited target-tenant authority | Same as tenant admin | Same | Same | Same | Same |
| Super admin without that authority | No | No | No | No | Opaque denial |
| Other administrative/operator role | No by default; future policy must define a Customers job | No | No | No | Opaque denial |
| Customer holder | No Customers-dashboard access; own customer surface is separate | No | No | No | Opaque denial |
| Worker | No | No | No | No | Opaque denial |
| Authenticated actor without target-tenant relationship | No | No | No | No | Opaque denial |
| Unauthenticated actor | No | No | No | No | Opaque denial; public token flow is outside this contract |

For authorized tenant admins, email is allowed in row/detail/search for contact and disambiguation. Telephone is detail-only but may match an authorized search. Locale and all authorized addresses are detail-only. Relationship lifecycle, effective tenant access, minimum global-restriction meaning, tenant availability and Profile completeness/reasons are exposed only as operational meaning, never raw security source data.

## Customer row projection

A row is the smallest selectable representation of one **operational** relationship.

| Field/result | Rule and fallback |
| --- | --- |
| Tenant-scoped stable relationship and selection references | Opaque/stable within authorized tenant scope; never a global identity ID. |
| Entry kind | `customer`, distinct from Invitation. |
| Display label | Confirmed name; otherwise `Customer name not confirmed`. For restricted/unavailable/unknown source use `Customer name unavailable`; do not fall back to email as label. |
| Current approved email | Show only current/authorized value; otherwise distinct `restricted`, `unavailable`, `stale` or `unknown` field state. |
| Profile completeness | `complete`, `incomplete` with approved reasons, or `unknown`; never a row action. |
| Relationship lifecycle | `operational`; never infer it from access or Profile. |
| Effective tenant access | Minimum `permitted`, `not_permitted`, `restricted` or `unknown`; no global-security cause. |
| Read indicators | `stale`, `restricted`, `unavailable` or `unknown` only where they change interpretation. |

Telephone, locale, addresses, Requests, Work Orders, Notes, credentials, tokens, global IDs, raw Auth status, raw tenant state and security reasons are excluded. `not provided` is an authorized absent optional value (telephone only); `incomplete` is Profile policy; `restricted` is policy-hidden source; `unavailable` is failed source; `unknown` is unsafe mapping; `stale` is previously authorized but not current data.

## Customer Overview projection

Detail resolves a current authorization/relationship envelope first, then independently readable blocks:

| Block | Minimum content | Owner / failure boundary |
| --- | --- | --- |
| Relationship identity | tenant reference, label, operational lifecycle | Customers; failure makes detail unavailable/stale, never nonexistent Profile. |
| Contact and Profile | current email, confirmed name, locale, optional telephone, completeness/reasons | Identity/Auth + Profile authorized projection; may be partial after a current envelope succeeds. |
| Addresses | all authorized confirmed addresses | Profile; loads/fails independently, never row data. |
| Access context | effective access, minimum global-restriction meaning, tenant availability | relationship/Identity/Auth/Tenant; raw reasons excluded. |
| Source/freshness | current, stale, restricted, unavailable or unknown per block | projection boundary. |

Profile/address failure may produce a **partial** Overview only after a current authorized relationship envelope succeeds. A tenant-scope/primary authorization failure returns no resolved Profile, address or email. A known relationship is never reinterpreted as absent because Profile, access context or tenant availability fails.

## Invitation projection

Invitation remains a separate entry kind. Its minimal authorized projection has opaque tenant invitation/selection references, recipient-recognition label (proposed name or authorized email fallback), Invitations-provided semantic state, whether a legitimate action may exist, and a reconciliation reference/outcome. It excludes token, delivery/cooldown detail, raw outcome codes, telephone, addresses, global identity and Profile data. Invitation lifecycle and delivery remain open gates.

## Field-level authorization, purpose and freshness

| Field/result | Owner | Purpose / permitted surface | Sensitivity / redaction | Cache, freshness and fallback |
| --- | --- | --- | --- | --- |
| Relationship reference/lifecycle | Customers | selection; row/detail for authorized tenant admin | tenant-scoped; no global ID | Cache tenant-scoped only; lifecycle never stale for inclusion/authorization; unavailable/unknown makes no normal assertion |
| Display name | Profile | recognition; row/detail/search result | personal data; redact to unavailable label | Stale only under current envelope; unconfirmed/unavailable fallback |
| Current email | Identity/Auth | contact/disambiguation/search; row/detail/search | personal data; no global ID | Stale only under current envelope; never invent/substitute |
| Telephone | Profile | approved contact or search; detail/search-match only | optional personal data; absent = not provided | Detail-only; stale only under current envelope |
| Locale | Profile | localized customer context; detail | personal context | Stale only under current envelope; distinct source state |
| Addresses | Profile | operational location context; detail | high sensitivity; no row/search | Never stale after Profile/relationship authorization changes |
| Completeness/reasons | Profile policy | context; row/detail/summary population | not performance/security label | Derived from current authorized source; unknown is not incomplete |
| Effective access | relationship + Identity/Auth + Tenant | interpret usable access; row/detail | only minimum meaning | Never stale; current or unknown/restricted/unavailable |
| Global restriction meaning | Identity/Auth | explain effective access; detail | security-sensitive: no cause/history/raw state | Never stale; minimum meaning only |
| Tenant availability | Tenant | explain tenant usability; detail | tenant operational context | Never stale; current or unavailable/unknown |
| Invitation reference/state/action-exists | Invitations | recognize/select/reconcile; row/detail | token/diagnostics excluded | State/action eligibility never stale; label follows envelope rule |

## Tenant isolation and outcomes

- Every relationship, Invitation, Profile projection and address resolves within authorized target-tenant relationship scope.
- A global identity with several tenants produces independent projections; no cross-tenant list/search/count/detail joins.
- Search cannot establish that a global email, telephone or name exists without an authorized relationship in the target tenant.
- Cross-tenant identifier, unauthorized target tenant or actor without scope returns an externally indistinguishable opaque denial: no count, field, partial source data or resource-existence signal. Internal audit may retain the actual classification.
- **not found:** target-tenant authorization succeeded but resource is absent in that scope. **forbidden:** actor/tenant/module scope denied, with no resource signal. **restricted:** primary authorized relationship exists but a secondary field/block is policy-hidden. **unavailable:** authorized source cannot answer. Across an unauthorized boundary, not-found and forbidden are intentionally indistinguishable.

## Freshness and stable read taxonomy

No duration/cache technology is prescribed. Cache must be scoped by authorized tenant/actor and re-evaluated after relationship lifecycle/grant, Identity/Auth email or safety, tenant availability, Profile confirmation/contact/address, or Invitation reconciliation changes.

| Result | Meaning and permissible content |
| --- | --- |
| **ready/current** | Authorization and requested blocks are current. |
| **ready/stale** | Previously authorized non-security content stays visible during refresh only while authorization/lifecycle/access envelope is current. |
| **partial** | Current authorized relationship envelope plus independently unavailable/restricted Profile/address blocks. Never after primary authorization failure. |
| **restricted** | Authorized relationship, but field/block policy-hidden; no value leak. |
| **unavailable** | Authorized source/tenant/module cannot answer now; preserve safe context only. |
| **unknown** | Mapping/state cannot safely be determined; make no positive/negative claim. |
| **not found** | Authorized scope confirmed; resource absent there. |
| **forbidden** | Scope denied; no partial/resource-existence signal. |

Lifecycle, access grant/effective access, global restriction, tenant availability, authorization scope, addresses after authorization change, Invitation state/action eligibility, credentials and tokens must never be stale. Existing selected detail may retain previously authorized name/email/telephone/locale only while its primary envelope is current; address/Profile data disappears rather than stays stale when its own visibility changes.

## Evidence mapping and incompatibilities

Verified evidence: `protectClient` limits ordinary tenant access; Auth email is global; `UserClient(authId, clientId)` is tenant-unique; Profile contains name/telephone/language/addresses; DirectoryEntry is derived/materialized; admin dashboard has directory/summary/detail evidence; public capability is sanitized bootstrap/auth/invitation only.

Partial evidence: technical super-admin bypass exists without approved support-read policy; Profile is holder-private while this contract requires least-necessary admin projection; refresh is manually/eventually consistent; current directory includes request/activity/next-visit data outside this contract.

Incompatibilities/risks: `UserClient.inactive` is ambiguous; acceptance materializes Profile proposal; existing directory/attention can expose more than approved; evidence does not prove field-level opaque denial or equally non-disclosing cross-tenant not-found/forbidden behavior. No runtime change is authorized.

`SUMMARY_CONTRACT.md` defines tenant-wide counters separately. They share this
contract's primary authorization/opaque-denial boundary but are not row-derived
fields and cannot be inferred from a cursor page.

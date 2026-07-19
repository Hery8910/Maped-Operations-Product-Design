# Customer ↔ Profile Contract and Completeness Policy

**Status:** CURRENT — product and architecture gate closed; implementation mapping remains open.
**Authority:** Customer, Profile, identity and relationship ownership; derived
completeness definitions.
**Last reviewed:** 2026-07-19
**Related:** `DOMAIN.md`, `STATES_AND_ACTIONS.md`, `INTEGRATION_CONTRACT.md`,
`BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md`, `VALIDATION_CHECKLIST.md`.

## Decision

A **Customer** is the tenant-scoped operational relationship between a tenant
and a person receiving/requesting that tenant's services. It is not an Auth
account, an email address, a Profile record, or every identity on the platform.
One global identity may legitimately have Customer relationships in multiple
tenants. A customer relationship can be read by its tenant only; global identity
does not become tenant-owned information.

The directory represents either an eligible Customer relationship or a separate
customer invitation. An invitation is not a Customer row before its accepted
relationship is reconciled.

## Ownership and access matrix

| Data / derived value | Source owner | Customer | Tenant admin in Customers | System / projection rule |
| --- | --- | --- | --- | --- |
| Global identity ID, credentials, verification and global block | Identity/Auth | manages credentials through Identity/Auth flows | cannot read credentials or alter global identity state | resolves identity and enforces global safety; never copied into Customers |
| Global email | Identity/Auth | may change only through Identity/Auth's verified change flow | may read the tenant-scoped directory/detail projection for contact/search; cannot edit | projection may expose current approved email with freshness/staleness meaning |
| Confirmed customer name | Profile | creates/corrects/confirms | reads approved tenant-scoped Profile projection; cannot edit | source value, not a directory-owned copy |
| Preferred locale | Profile | creates/corrects/confirms | reads when useful to understand customer context; cannot edit | used by customer-facing communication only through owning contracts |
| Telephone | Profile | optional create/correct/remove | reads approved tenant-scoped Profile projection and may search it; cannot edit | absence is `not provided`, never incomplete by itself |
| Confirmed addresses | Profile | create/correct/remove | reads all approved tenant-scoped addresses; cannot edit | all addresses are shown with source/freshness; no address is required for Profile completeness |
| Profile operational completeness | Profile policy | sees explanation and completes own missing confirmation | reads informational result/reason; cannot change it | deterministic derived result below; unknown data is not incomplete |
| Customer relationship ID and tenant association | Customers | may read own relationship where customer experience later permits | reads selected/directory relationship | creates/reconciles through authorized lifecycle; stable tenant-scoped reference |
| Tenant access entitlement | tenant relationship / Identity/Auth | receives access through approved acceptance/access flows | may read only approved access meaning; no generic access management in Customers | derived from tenant grant plus global safety; not `Profile` state |
| Request / Work Order source data | owning domain | acts only through owner-domain permissions | reads/navigates only through owner-domain projection/permission | Customers never edits or derives their operational state |
| Directory label, searchable index, summaries and detail projection | Customers projection | no direct mutation | reads authorized tenant projection | derived/cacheable; references source records, carries freshness/stale semantics and is never a source of truth |

No source value is duplicated merely to make Customers convenient. Request
snapshots, where their owner intentionally needs historical fidelity, are an
owner-domain exception and do not make the snapshot a Profile or Customer source.

## Deterministic relationship and completeness levels

These are separate booleans/results. A result is `unknown`, not `false`, when
its required source is unavailable, stale beyond its contract, restricted, or
not yet supported.

| Level | Deterministic rule | Does not imply |
| --- | --- | --- |
| **Eligible to appear as Customer** | An authoritative tenant–customer relationship exists, is within the current tenant, and is not removed/archived by its owner contract. | Profile existence, Profile completeness, telephone/address, Request/Work Order, invitation row or tenant access entitlement. |
| **Invitation accepted** | The relevant customer invitation lifecycle is `accepted` and its reconciliation outcome is recorded. | Profile completion or continuing tenant access if later security policy prevents it. |
| **Tenant access permitted** | The relationship has an approved tenant access grant **and** Identity/Auth does not deny global access. | Invitation row visibility, Profile completeness or Request eligibility. |
| **Profile operationally complete** | A Profile exists; the customer has explicitly confirmed a non-empty customer name and a supported preferred locale. | Telephone, any address, tenant access or Request eligibility. |
| **Eligible to create a Request** | Only the Service Requests owner returns an authoritative eligibility result from its own contract. | Profile completeness, address count or customer directory presence. |

`Customer name` may be a single confirmed display/name value; this policy does
not require first/last-name decomposition. `Supported preferred locale` is a
locale accepted by the Profile/communication contract. Email is an
Identity/Auth value, not a Profile-completeness input. Telephone and addresses
remain optional because Customers has no demonstrated MVP job that requires
them universally.

## Profile incomplete and Action required

`profileOperationalCompleteness` is exactly one of:

- **complete:** every Profile operational completeness input above is present
  and customer-confirmed;
- **incomplete:** Profile is absent, or at least one required confirmation input
  is absent/unconfirmed;
- **unknown:** the source cannot safely determine complete/incomplete.

For an incomplete result, the reason list is the deterministic set of missing
`confirmed_customer_name` and/or `preferred_locale`; it never invents missing
telephone, address, email, Request or Work Order reasons.

Customers may show this only as informational Profile context and may count
**Profiles complete** where the result is `complete`. `incomplete` and `unknown`
are excluded from **Action required**. The current tenant admin has no approved
Customers action to correct confirmed Profile data; presenting it as an action
queue would be misleading. Delivery failure and expiry remain the only current
Action-required reasons.

## Information and modification boundary

Tenant admins receive a least-necessary, tenant-scoped read projection of the
current email and approved Profile context for finding and understanding a
Customer. They cannot edit Profile, email, global identity, credentials,
verification, tenant access entitlement or completeness in Customers. The
customer owns Profile confirmation and corrections; system-owned derivations
and lifecycle reconciliation have no manual override in this surface.

## Current evidence and incompatibilities

The audits are evidence, not authority. They show: global `Auth.email`,
`UserClient(authId, clientId)` membership, a Profile currently described as
private to its holder, invitation acceptance that creates/updates Profile from
proposal data, a directory projection derived from Auth/UserClient/Profile/
Invitation/ServiceRequest, and Request creation gated only on Profile existence.

Those observed behaviors do not yet meet this contract where they allow
invitation proposal materialization without customer confirmation, deny the
required tenant-admin read projection, collapse Request readiness to Profile
existence, or leave membership `inactive` semantics unresolved. No migration,
endpoint, model or runtime change is authorized by this document.

## Remaining implementation mapping gates

- Map the product's Customer relationship, tenant access grant and removed/
  archived semantics to verified backend concepts without adopting final names.
- Verify how Profile stores/proves customer confirmation, current name, locale,
  phone and all addresses; return `unknown` where a safe mapping is unavailable.
- Define least-necessary tenant-admin Profile read authorization and projection
  freshness without granting Profile write access.
- Service Requests must separately define Request eligibility and its relationship
  to Profile/address data. That gate is intentionally not closed here.

# Customers Integration Contract

**Status:** PLANNED — contract gates remain open; not implementation-ready.
**Authority:** Cross-repository requirements and unresolved verification.
**Related:** `BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md`, `DOMAIN.md`,
`../invitations/INTEGRATION_CONTRACT.md`, `../internal-notes/INTEGRATION_CONTRACT.md`.

## Contracted boundary

The implementation must provide a tenant-scoped Customers composition, not a
global user directory. It joins read contracts from Customer relationship,
Profile, Invitations, Requests, Work Orders and Internal Notes without taking
ownership of their source models or workflows.

Final endpoint, model and event names are contract gates; names in current
repositories/audits are evidence, not prescribed API design.

`RELATIONSHIP_LIFECYCLE_CONTRACT.md` fixes product semantics: lifecycle,
relationship grant, global Identity/Auth safety and tenant availability must be
mapped separately. Current backend `UserClient.inactive` is not a product status
mapping and must return an appropriate unknown access result until verified.

`READ_PROJECTION_AUTHORIZATION_CONTRACT.md` fixes the minimum authorized read
shape, field-level minimization, freshness and non-disclosing outcome taxonomy.
`SUMMARY_CONTRACT.md` fixes the four tenant-wide populations and their exactness,
consistency and per-counter states; it does not define transport or queries.
`DIRECTORY_QUERY_CONTRACT.md` fixes query populations, search semantics, order,
cursor, selection and reconciliation; it does not define endpoint or encoding.
`CUSTOMER_PROFILE_CONFIRMATION_CONTRACT.md` fixes customer-owned Profile
provenance, explicit confirmation evidence, invalidation and legacy outcomes;
`CUSTOMER_PROFILE_CONFIRMATION_GATE.md` authorizes the required persisted change
with conditions, but neither chooses its schema nor authorizes implementation.
`../invitations/CUSTOMER_ACCESS_LIFECYCLE_CONTRACT.md` fixes customer-access
Invitation lifecycle, delivery failure, recovery and Action required; it does
not define command or token transport.

## Required read contracts

| Need | Required semantics | Gate |
| --- | --- | --- |
| Directory | three mutually exclusive views, deterministic normalized search, stable label order, opaque scoped cursor and direct authorized selection | cursor/query/order/selection/reconciliation implementation and enforcement |
| Summary | four tenant-wide populations with independent counter states, no cursor-derived calculation and coherent invariant review | calculation/transport, authoritative lifecycle/profile/invitation mappings and freshness enforcement |
| Customer Overview | current email projection, Profile v1 confirmation result, and `complete`/`incomplete`/`unknown` result with deterministic reasons; source/fallback/freshness per field | authorized Profile read projection and confirmation/freshness mapping |
| Invitation detail | lifecycle state, delivery meaning and permitted action availability | Invitations lifecycle projection |
| Related Requests / Work Orders | per-customer tenant-scoped cursor query, compact read-only fields, total and owner-page destination | each owner domain's query, authorization and destination |
| Notes | customer-associated internal note projection and permitted edit/archive metadata | Internal Notes contract and least-access rule |

Selection must tolerate detail loading, unavailable/stale entries and changed
cursor data without presenting stale data as current. A denied read must not
reveal partial tenant data.

Overview loads relationship envelope, contact/Profile, addresses and access
context as separate blocks; only Profile/address blocks may be partial after a
current authorization envelope succeeds.
Summaries require primary authorization before any counter; no counter is
returned after a primary denial, and impossible independent combinations degrade
rather than render ready.
Cursor/list query state is independent of summaries: filter/query never changes
summary populations; invalid/expired cursor is not authoritative empty.

## Required command/outcome contracts

Customers invokes, but does not define, invitation and note commands. The
commands must return stable semantic outcomes sufficient to distinguish:

- validation failure;
- tenant relationship already exists;
- pending invitation already exists;
- pre-persistence failure;
- persisted delivery failure with stable invitation identity;
- permission failure; and
- unknown/unavailable failure.

Persisted delivery failure is not a failed create retry: the server must make
the persisted invitation identifiable so the UI can offer Resend. Notes require
stable outcomes for create/edit/archive, conflict/concurrency behavior and
whether archive is reversible; these remain gates until verified.

## Cross-domain consistency

- Invitation acceptance reconciles to exactly one tenant–customer relationship;
  accepted records do not remain duplicate normal rows and revoked records leave
  the normal operational directory.
- Profile confirmation belongs to the customer flow. Customer relationship,
  invitation acceptance and tenant access do not imply Profile completion or
  confirmation. `CUSTOMER_PROFILE_CONFIRMATION_CONTRACT.md` defines valid
  evidence and legacy outcomes; `PROFILE_CONTRACT.md` defines the informational
  completeness result. Requests owns request eligibility and may not be inferred
  from either.
- Tenant suspension/unavailability, global restriction and relationship lifecycle
  must not overwrite one another. Unavailability/restriction is not an implicit
  archive/remove or Action-required condition.
- Requests and Work Orders own all mutations and their detailed state. Customers
  only navigates with safe customer/entity context.
- Module visibility is tenant configuration. A disabled module hides its
  section; it is neither an authorization success nor an empty result.

## Verification gates

1. Verify identity/auth acceptance for new and existing identity, opaque-token
   security, interrupted onboarding and resume.
2. Verify tenant isolation and role enforcement for every projection/command.
3. **Product gate closed:** map the approved Profile data source, all-address
   visibility, customer confirmation, least-necessary admin read authorization,
   result/freshness and missing/restricted fallbacks. This is implementation
   verification, not a reason to redefine completeness.
4. Verify directory cursor/filter/search semantics and authoritative summary
   populations.
5. **Product gate closed:** map relationship lifecycle, grant, global security,
   tenant availability, accepted-invitation reconciliation and duplicate conflict
   behavior independently; current `inactive` semantics must not be guessed.
6. **Product gate closed:** map actor/tenant/module authorization, field-level
   redaction, independent Overview blocks, freshness/invalidation and opaque
   `not found`/`forbidden` behavior. This does not close cursor, search or
   summaries.
7. **Product gate closed:** map all four populations, exact/zero/unknown/
   unavailable behavior, invalidation and coherent review point. This does not
   close summaries transport, cursor, search or filters.
8. **Product gate closed:** map default/mutually exclusive filters, normalized
   search, order, scoped cursor, empty/error states and selection reconciliation.
   This does not close cursor transport, search/filter implementation or routes.
9. Verify Invitations lifecycle, cooldown, delivery outcome identity, audit and
   reconciliation.
10. Verify owner-domain read projections and pagination for Requests/Work Orders.
11. Verify Internal Notes authorization, retention/archive semantics, authorship
   and audit expectations.

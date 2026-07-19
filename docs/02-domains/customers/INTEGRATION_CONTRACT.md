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

## Required read contracts

| Need | Required semantics | Gate |
| --- | --- | --- |
| Directory | tenant-scoped cursor projection; stable customer/invitation identity; name/email/telephone search; Customers/Invitations/Action-required filters | cursor ordering, inclusion and auth verification |
| Summary | tenant-wide Customers, Profiles complete (`complete` only), pending invitations and action-required counts; independent freshness/loading/error | exact population and Profile result mapping/freshness |
| Customer Overview | current email projection, confirmed Profile, all confirmed addresses and `complete`/`incomplete`/`unknown` result with deterministic reasons; source/fallback/freshness per field | authorized Profile read projection and confirmation/freshness mapping |
| Invitation detail | lifecycle state, delivery meaning and permitted action availability | Invitations lifecycle projection |
| Related Requests / Work Orders | per-customer tenant-scoped cursor query, compact read-only fields, total and owner-page destination | each owner domain's query, authorization and destination |
| Notes | customer-associated internal note projection and permitted edit/archive metadata | Internal Notes contract and least-access rule |

Selection must tolerate detail loading, unavailable/stale entries and changed
cursor data without presenting stale data as current. A denied read must not
reveal partial tenant data.

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
  invitation acceptance and tenant access do not imply Profile completion.
  `PROFILE_CONTRACT.md` defines the informational result; Requests owns request
  eligibility and may not be inferred from it.
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
5. Verify Invitations lifecycle, cooldown, delivery outcome identity, audit and
   reconciliation.
6. Verify owner-domain read projections and pagination for Requests/Work Orders.
7. Verify Internal Notes authorization, retention/archive semantics, authorship
   and audit expectations.

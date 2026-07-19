# Customer-access Invitation Lifecycle, Delivery and Recovery Contract

**Status:** CURRENT — product and architecture gate closed; implementation
mapping remains open.
**Authority:** Customer-access Invitation lifecycle, proposal boundary, delivery
meaning, recovery and reconciliation with Customers.
**Last reviewed:** 2026-07-19
**Related:** `DOMAIN.md`, `FLOWS.md`, `INTEGRATION_CONTRACT.md`,
`../customers/DOMAIN.md`, `../customers/RELATIONSHIP_LIFECYCLE_CONTRACT.md`,
`../customers/READ_PROJECTION_AUTHORIZATION_CONTRACT.md`,
`../customers/SUMMARY_CONTRACT.md` and
`../customers/DIRECTORY_QUERY_CONTRACT.md`.

## Boundary

This contract applies only to tenant-scoped `customer_access` Invitations.
Invitations owns proposal, credential, lifecycle, delivery meaning, recovery
eligibility and reconciliation outcome. Customers owns the resulting
tenant–Customer relationship; Profile owns customer-confirmed Profile data;
Identity/Auth owns global identity and security. A technical `User`,
`UserClient`, `TenantUser`, `active`, `inactive` or `locked` value is not
Invitation product vocabulary.

An authorized tenant admin sees only the minimal authorized Invitation
projection: recipient-recognition label, semantic lifecycle and whether a
legitimate action exists. They never see a credential, raw provider diagnostic,
global identity, telephone, Profile, address or raw security state. A global
identity without an operational/archived relationship in this tenant is not an
Invitation conflict and is never exposed as one.

## Proposal, confirmation and directory boundary

Customer invitation creation asks the tenant admin only for proposed **name**,
recipient **email** and **language**. Telephone and addresses are not inputs.
These are proposal data: they help the recipient recognize the Invitation and
choose an initial language; they are never a confirmed Profile, nor may they
overwrite an existing confirmed Profile.

Acceptance authenticates or associates a global identity as needed, then
reconciles exactly one operational Customer relationship. That relationship can
appear in **Customers** immediately after authoritative reconciliation; it does
not wait for Profile creation or Profile confirmation. The customer must
review/correct/save the proposal in the customer-owned Profile flow before name
or locale becomes confirmed Profile data. If reconciliation cannot be safely
established, accepted Invitation and Customer are not shown as duplicate normal
rows; the context is `unknown`/`unavailable` until the owner resolves it.

## Canonical lifecycle and delivery outcome

Lifecycle is a current semantic state, not a transport log. Delivery outcome
explains the most recent attempted delivery; it is not a Customer lifecycle,
Profile result or generic attention flag.

| Lifecycle | Delivery meaning | Normal Customers composition | Legitimate Customers-admin recovery |
| --- | --- | --- | --- |
| **pending** | Persisted, current and awaiting acceptance; the latest delivery has no known failure. | Invitations view and Pending invitations summary. | Resend when eligible; revoke when eligible. It is not Action required. |
| **delivery_failed** | Persisted, but latest delivery attempt failed. It neither erases the Invitation nor claims receipt. | Invitations and Action required views; Action required summary. | Resend when eligible, or revoke when eligible. |
| **expired** | Acceptance credential expired before acceptance/revoke. | Invitations and Action required views; Action required summary. | Renew-and-resend when eligible, or revoke when eligible. |
| **accepted** | Acceptance completed and reconciliation outcome was recorded. | Never a normal Invitation row; resulting operational Customer replaces it when safe. | None in Customers. |
| **revoked** | Acceptance capability was intentionally cancelled and invalidated. | Never a normal Invitation row. | None in Customers. |

`accepting`, provider retries, queues and credential rotation may be internal
states, never visible lifecycle labels. A pre-persistence failure creates no
Invitation, row or Action required result. A persisted delivery failure retains
a stable tenant-scoped Invitation reference so recovery does not blindly create
a duplicate.

The technical representation of a credential and delivery-provider result
remain implementation work. Product requires only durable distinction between
delivery failure, pre-persistence failure and pending, plus current recovery
eligibility.

## Recovery, concurrency and replacement

`resend` recovers the same current Invitation. `renew and resend` recovers an
expired Invitation under the Invitations owner; it may replace or rotate
credential material but never creates another normal current Invitation.
`revoke` is the sole Customer-facing cancellation meaning. The operator cannot
mark delivered, accepted, Profile complete or Customer access granted.

| Situation | Required product outcome |
| --- | --- |
| Existing pending, delivery-failed or expired Invitation | Return existing stable Invitation/recovery outcome; do not create another current Invitation. |
| Accepted concurrently with resend, renewal or revoke | Acceptance wins only when its authoritative transition completed first; later command returns semantic non-success/reconciled outcome and never recreates a normal Invitation. |
| Existing operational Customer relationship | Do not create duplicate Invitation/relationship; return relationship-exists outcome without global identity details. |
| Existing archived relationship | Reconciliation conflict; do not create a second relationship or assume restoration. |
| Recovery eligibility unavailable or unsafe | Preserve row only when lifecycle stays current; action capability is unavailable/unknown, never optimistically enabled. |

Invitations must provide idempotency, legal transitions, cooldown/rate policy,
credential invalidation and audit evidence. This contract chooses none of their
timings, encoding, persistence or command names.

## Action required

**Action required** answers: “Which current customer Invitations have a
legitimate recovery a Customers admin should perform?” It is neither legacy
`attention`, a security alert nor a list of incomplete Profiles.

Its exact MVP population is `customer_access` Invitations whose lifecycle is
`delivery_failed` or `expired` **and** for which Invitations currently confirms
at least one legitimate recovery above. Lifecycle is exclusive, so each row has
exactly one Action-required reason: `delivery_failed` or `expired`. There is no
multi-reason priority; the Action required directory retains the stable label
order in `DIRECTORY_QUERY_CONTRACT.md`, not an invented severity order.

The reason is visible as lifecycle meaning in Invitation row/detail. Filter and
tenant-wide summary share that population but have independent read states.
Profile incomplete/unknown, missing telephone/address, account restriction,
global security, tenant availability, Requests, Work Orders, stale verification
and every legacy `attention` heuristic are excluded.

Unsafe lifecycle/recovery classification makes Action required `unknown`; failed
authorized source makes it `unavailable`; policy-hidden secondary capability
makes it `restricted`. None may render “No action required,” zero or a reduced
complete list. A pending Invitation is not Action required even if resend is
technically eligible: no recovery problem exists.

## Authorized actions and reconciliation invariants

Customers composes Invitations actions; Invitations owns legality/outcome. A
tenant admin initiates create in the left directory header and completes the
form in the right panel; narrow screens use the same focused form/detail with
Back restoring directory context. Field correction stays local, pending blocks
duplicates, persisted delivery failure preserves input/context and directs the
operator to the reconciled Invitation recovery. Revoke is proportionately
confirmed with focus restoration.

Create outcomes distinguish field validation, existing operational relationship,
already-current Invitation, pre-persistence failure, persisted delivery failure
with stable reference, opaque permission denial and unknown/unavailable. Exact
endpoint, response and message design remain integration work.

- Creation/delivery creates no Customer row; current lifecycle creates an
  Invitation row in the Invitations composition.
- Acceptance creates or reconciles exactly one operational Customer relationship
  but proves neither Profile completion, tenant access nor Request eligibility.
- Accepted/revoked Invitations leave normal Invitation and Action-required
  populations. Selected accepted Invitation becomes Customer only with an
  authoritative relationship reference; otherwise selection returns safely.
- Unknown/unavailable reconciliation is never two normal rows, accepted as
  pending, or a confirmed Profile.

## Implementation mapping remains open

Backend must map lifecycle, delivery, eligibility, tenant isolation, identity,
transition concurrency, cooldown, token invalidation and audit. Frontend must
map semantic outcomes, local validation, pending, recovery, focus and
reconciliation without parsing messages or persisting credentials. No endpoint,
model, schema, provider, token, retry timing, audit format or migration strategy
is authorized here.

# Customer Profile Provenance and Confirmation Contract

**Status:** CURRENT — product semantics and Domain Change Gate closed; runtime
mapping remains open.
**Authority:** Customer-owned Profile content, field provenance, confirmation
evidence, invalidation and legacy classification.
**Last reviewed:** 2026-07-19
**Related:** `PROFILE_CONTRACT.md`, `DOMAIN.md`, `STATES_AND_ACTIONS.md`,
`INTEGRATION_CONTRACT.md`, `BACKEND_HANDOFF.md`, `FRONTEND_HANDOFF.md`,
`CUSTOMER_PROFILE_CONFIRMATION_GATE.md`,
`CUSTOMERS_V1_CONVERGENCE_PLAN.md` and
`../invitations/CUSTOMER_ACCESS_LIFECYCLE_CONTRACT.md`.

## Decision

A Profile is customer-owned content. Its existence, a populated value, an
Invitation acceptance, a verified email, a prior login, an address, or a
technical materialization event do **not** prove that the customer reviewed or
confirmed it. Only a durable customer action that records the evidence defined
here may make Profile data `confirmed`.

Confirmation applies to a complete, versioned Profile revision, not to an
unversioned record and not to individual field badges in Customers v1. Field
provenance is retained so the system can explain and invalidate that revision.
There is no customer-visible `partially_confirmed` state in v1: it would imply
an operational use that Customers does not have. A future section-specific
Profile contract may add it without reinterpreting this contract.

## Ownership and modification boundary

| Actor / action | May do | Does not do |
| --- | --- | --- |
| Customer | Review shown Profile values, correct allowed Profile fields, and explicitly save/confirm the displayed revision. | Change global email except through Identity/Auth; confirm data not shown to them. |
| Tenant admin | Propose name, email and language through an authorized Invitation; read the minimized authorized projection. | Edit Profile, assert confirmation, backfill evidence, or turn incompleteness into Action required. |
| Invitation lifecycle | Persist and deliver proposals; reconcile accepted access with a Customer relationship. | Confirm Profile content or overwrite an already confirmed revision. |
| Identity/Auth | Own global email, verification and credentials. | Confirm Profile content. |
| Automated process / integration | Materialize, synchronize or propose values only where a future owner contract permits, with source recorded. | Create customer-confirmation evidence, even when it creates a Profile or fills every field. |

Administrative inspection, resend/revoke, Customer relationship reconciliation,
Invitation acceptance, customer authentication, email verification, login and
automatic migration are never confirmation actions.

## Profile v1 field provenance

The approved Profile v1 fields are **customer name** and **preferred locale**.
Current email is Identity/Auth data displayed in Customer context; it is not a
Profile field. Telephone and addresses are outside the Profile v1 confirmation
contract and must not be added through legacy compatibility.

| Value | Owner / possible source | May Invitation propose it? | May admin introduce it? | Customer review required for confirmed Profile? | Absence / `unknown` / `unavailable` | Persistence rule |
| --- | --- | --- | --- | --- | --- |
| Customer name | Profile; customer entry/correction, or an Invitation proposal pending review. | Yes. | Only as the proposal in Invitation creation. | Yes. | May be absent. `unknown` means its current value/provenance cannot safely be classified; `unavailable` means an authorized source failed. | Persist field-level provenance and current revision identity. |
| Preferred locale | Profile; customer selection/correction, or an Invitation language proposal pending review. | Yes. | Only as the proposal in Invitation creation. | Yes. | May be absent. `unknown` and `unavailable` have the same safe meanings above. | Persist field-level provenance and current revision identity. |
| Current email in Customer context | Identity/Auth; verified identity-email flow. | Invitation recipient email is a proposal/recipient address, not a Profile source. | Admin supplies recipient email only to create an Invitation. | No Profile review can confirm it; Identity/Auth owns its verification/change evidence. | May be unavailable, restricted or unknown under its own authorized projection. | Profile must retain no duplicate ownership/provenance solely for Customers convenience. |

For each Profile field, provenance minimally distinguishes `customer_entered`,
`customer_corrected`, `invitation_proposed`, `admin_proposed`, `integration_proposed`,
and `legacy_unknown` where applicable. These are source facts, not user-facing
status labels. A proposal stays a proposal after technical materialization until
the customer confirms the revision containing it.

## Confirmation evidence and revision rule

The valid event is **customer reviews the complete supported Profile v1 form and
explicitly saves it**. The command must bind the action to the revision shown
to the customer and complete only if the current revision still matches it.

- Correcting one or more fields and saving is valid confirmation of the resulting
  complete revision.
- Saving without value changes is valid confirmation only when the customer was
  shown the complete current Profile v1 revision and explicitly chose save.
- Mere display, blur, autosave, acceptance of an Invitation, and a Terms
  acceptance are not confirmation. Terms may be recorded separately when a
  future legal contract requires it.
- Confirmation does not require name or locale to be non-empty. Operational
  completeness remains the narrower derived result in `PROFILE_CONTRACT.md`.

Confirmation is revision-scoped. A change by any actor produces a new current
revision. A customer change followed by explicit save confirms that new
revision; a third-party or automatic change leaves the new revision
`unconfirmed`. A Profile contract change that changes the fields or meaning the
customer must review creates a new confirmation-contract version and requires
renewed review/save. This avoids claiming that an older confirmation covered
new obligations.

## Canonical Profile confirmation result

This result describes evidence for the current authorized Profile revision; it
is independent of relationship lifecycle, tenant access, global email, and
Profile operational completeness.

| Result | Entry condition and required evidence | Allowed transition / actor | Directory row | Customer Overview | Summary behavior |
| --- | --- | --- | --- | --- | --- |
| `absent` | No Profile current revision exists. | Customer saves a new shown revision → `confirmed`; proposal/materialization → `unconfirmed`. | No confirmation badge; recognition uses authorized non-Profile fallback. | “Profile not yet provided” where the block is authorized. | Excluded from Profiles complete. |
| `unconfirmed` | Current revision exists, but has no valid confirmation record for its revision and contract version. Includes new proposals/materialization. | Customer explicit review/save → `confirmed`; change/rebuild may remain `unconfirmed`. | No row status in v1. | Informational “not yet confirmed”; no admin correction CTA. | Excluded from Profiles complete. |
| `confirmed` | Current revision matches durable customer review/save evidence and the confirmation-contract version. | Any new revision or contract-version change → `unconfirmed`; customer saves current revision → remains `confirmed`. | No row status in v1. | May say “confirmed by customer” only when evidence is current; field provenance is not exposed by default. | It may contribute to Profiles complete only if name and locale also meet `PROFILE_CONTRACT.md`. |
| `unknown` | A current revision/evidence relationship cannot be safely classified, including incomplete legacy proof, stale reconciliation or unresolved concurrent result. | Authoritative repair/re-read may resolve to another result. | No inferred label. | “Confirmation status cannot be determined”; do not call it unconfirmed. | Makes Profiles complete unknown, not lower. |
| `unavailable` | Authorized Profile/evidence source failed temporarily. | Retry/reload only. | No inferred label. | Local unavailable/retry state. | Makes Profiles complete unavailable, not lower. |
| `restricted` | The actor has a Customer envelope but policy does not permit this Profile/evidence block. | Authorization change/re-read only. | No inferred label. | Restricted block without source details. | Makes Profiles complete restricted, not lower. |

`unknown`, `unavailable` and `restricted` are read outcomes, not stored Profile
lifecycle values. No user-facing status is required in a Directory row because
the tenant admin has no authorized corrective action; Overview provides the
explanation where the Profile block is authorized.

## Minimum conceptual persistence

The following is required for Customers v1; this intentionally chooses no
database property names or storage technology:

- immutable identity of each Profile revision and its current/replaced relation;
- per-field current provenance/source actor class, source reference where safe,
  and revision in which the value was introduced or changed;
- confirmation actor identity (the customer identity), completion timestamp,
  reviewed Profile revision identity and confirmation-contract version;
- proof that the action was an explicit customer review/save, not an automatic
  materialization; and
- invalidation/replacement cause and the actor class that created the current
  post-confirmation revision.

An audit correlation/reference and field-review list may be retained when
available, but a field-level “reviewed” bit, legal-consent record, full historic
value snapshots and UI telemetry are deferred. They are not needed to determine
whether the current Profile v1 revision is safely confirmed.

## Invalidation and concurrency

| Change | Confirmation result for resulting current revision |
| --- | --- |
| Customer edits and explicitly saves | `confirmed` for the newly saved revision. |
| Customer edits but abandons/does not save | Existing confirmed revision remains current; unsaved client input creates no server state. |
| Tenant admin makes an Invitation proposal | Existing confirmed Profile remains confirmed; the proposal is separate. If it is later materialized as a replacement revision, that revision is `unconfirmed`. |
| Integration or automated process changes/rebuilds Profile | New revision is `unconfirmed`; if provenance/evidence cannot be reconciled safely, `unknown`. |
| Global email changes | Does not invalidate Profile confirmation; email is Identity/Auth-owned. |
| Confirmation-contract version changes | Current revision becomes `unconfirmed` until renewed review/save. |
| Concurrent customer save and another write | Compare against the displayed revision. A conflict must not record confirmation for unseen data; return a recoverable conflict and retain customer context. |
| Deletion/anonymization | Remove or redact evidence according to the owning privacy policy; a remaining projection must never preserve a false confirmed claim. If classification cannot be proved, return `unknown` or unavailable/restricted as appropriate. |

## Legacy policy

Legacy Profiles with no demonstrable current-revision confirmation evidence are
classified as `unknown`, not `confirmed` and not heuristically `unconfirmed`.
The system does not know whether the customer ever reviewed the values, nor
whether the legacy values still represent the same revision. This preserves a
meaningful distinction between a newly created known-unconfirmed proposal and
historically unverifiable data.

There is no initial migration or administrative backfill. A technical backfill
is permitted only if historical evidence can prove the same required actor,
explicit review/save action, reviewed revision and contract scope; otherwise it
must leave the result `unknown`. A future customer review campaign or
next-access prompt may create fresh evidence, but is not authorized here.

## Invitations and Customers integration

Invitation name, recipient email and language are proposals. Technical
materialization after acceptance is allowed only as an unconfirmed Profile
revision with provenance retained. Acceptance reconciles access/relationship;
it does not confirm Profile. The customer may correct proposals in the
customer-owned Profile flow; abandonment after acceptance leaves the relationship
operational and Profile `unconfirmed` or legacy `unknown`, never a false
confirmed result.

Customers treats `absent`, `unconfirmed`, `confirmed`, `unknown`, `unavailable`
and `restricted` only as Profile-context meaning. It never adds them to Action
required. The only approved admin actions remain Invitation lifecycle recovery
where authorized; no Profile confirmation action belongs in Customers.

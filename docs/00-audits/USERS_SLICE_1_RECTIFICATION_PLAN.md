# Users Slice 1 — Documentation Rectification Plan

**Status:** DRAFT — planning artifact, not product authority  
**Date:** 2026-07-12  
**Scope:** Havenova / Maped Solutions Users domain; first production vertical slice only.

## 1. Executive summary

Users Slice 1 is an **assisted customer-onboarding capability**, not a simple
email/access invitation. A tenant administrator who already knows a customer
after direct contact or an in-person visit can prepare a personalized,
localized invitation with known onboarding information. The customer then opens
the invitation in the intended language, reviews and corrects proposed data,
accepts tenant access, and enters the platform with a sufficiently prepared
account.

This is deliberately not CRM or unrestricted administrative profile editing.
Before acceptance, the information is proposed onboarding data owned by the
invitation context and attributed to the tenant administrator. The customer
must confirm or correct it before it becomes profile/contact or appropriate
tenant-scoped location data. Existing global identity/profile data must never
be silently overwritten.

Tenant access, confirmed profile data and service-request readiness are three
separate concepts. Acceptance grants tenant access; it does not prove that the
customer has reviewed/saved authoritative profile data, nor that the current
confirmed profile/location data satisfies a future Service Requests contract.
Readiness must be derived from current authoritative data through a
capability-oriented result (for example, `canCreateServiceRequest` and
`missingRequirements`), never generic active/inactive status or one persisted
`profileComplete` boolean.

The revised slice includes the complete invitation lifecycle needed to make
assisted onboarding reliable: create, persist proposed data, localized send,
directory representation, localized acceptance, identity establishment or
authentication, review/correction, access acceptance, materialization of
confirmed data, reconciliation of the directory entry, resend, expired
invitation recovery, persisted-delivery recovery and revocation. It still
excludes generic active/inactive administration, generalized attention
management, cross-domain inspector content and CRM functionality.

## 2. Current documentation authority map

| Authority level | Current source(s) | Slice 1 ownership | Condition |
| --- | --- | --- | --- |
| 1 | `docs/01-foundation/PRODUCT_PRINCIPLES.md` | Small coherent product, visible-data purpose, state, accessibility and uncertainty | CURRENT authority |
| 2 | `docs/01-foundation/PRODUCT_MAP.md`; `docs/02-domains/users/DOMAIN.md` | Users purpose, boundaries, tenant access and invitation distinction | CURRENT, but needs assisted-onboarding scope rectification |
| 3 | Users `FLOWS.md`; `STATES_AND_ACTIONS.md`; foundation workflow/accessibility rules | Find/select/invitation lifecycle behavior | CURRENT in principle; lifecycle/data ownership must be made explicit |
| 4 | `docs/02-domains/users/PRODUCT_NOTES.md` | Directory/inspector rationale and information hierarchy | CURRENT reasoning; must distinguish proposed from confirmed data |
| 5 | `prototype/` | Visual/interaction evidence | EVIDENCE_ONLY until approved behavior is represented and reviewed |
| 6 | `docs/02-domains/users/HANDOFF.md` | Requirements implementation must preserve | DRAFT/full-domain; must be superseded by Slice 1 handoff |
| 7 | Existing Havenova frontend/backend | Technical capability, constraints and risks | EVIDENCE_ONLY |
| Evidence | `docs/00-audits/*.md` | Observed implementation state | EVIDENCE_ONLY |
| Decision record | `docs/01-foundation/DECISIONS_LOG.md` | Accepted/provisional decisions | CURRENT only where the status says so |

The authority hierarchy remains unchanged. The clarified assisted-onboarding
purpose is the new requested product direction for this plan; technical fields,
routes and prototype controls continue to require product justification before
becoming visible behavior.

## 3. Product Necessity Gate

Before a field, status, counter, filter or action enters Slice 1, the owning
authority document must answer:

1. What concrete operational problem does it solve?
2. Which Slice 1 actor needs it now?
3. What decision or action does it enable?
4. What would be lost if it were omitted?
5. Is there a reliable data source and approved rule behind it?

If any answer is absent, the item is **DEFERRED**. It may remain technical
evidence or a future hypothesis, but it cannot become baseline visible product
behavior, an acceptance criterion or a required API field.

### Gate results for the assisted-onboarding scope

| Candidate | Operational justification | Slice 1 result |
| --- | --- | --- |
| Directory and selection | Administrator must find an existing person/invitation and inspect its onboarding relationship | INCLUDE |
| Search | Supports locating a known person or invitation in repeated directory work | INCLUDE |
| Person with tenant access versus pending invitation distinction | Determines whether onboarding is complete, pending or available for invitation-lifecycle recovery | INCLUDE |
| Total people summary | Gives compact scope/orientation for the tenant relationship directory; requires authoritative population definition | INCLUDE, with source/loading/error contract |
| Pending invitations summary | Reveals unfinished assisted onboarding that may need resend, renewal, delivery recovery or revocation | INCLUDE, with source/loading/error contract |
| All filter | Restores the complete directory after invitation-focused work | INCLUDE |
| Invitations filter | Gives administrators a focused set for lifecycle work without searching every person | INCLUDE |
| Invitation-specific state: pending/sent | Shows an onboarding link is awaiting customer acceptance; enables resend/revoke decision | INCLUDE |
| Invitation-specific state: delivery failed | Identifies a persisted invitation whose legitimate recovery is resend, not duplicate Invite | INCLUDE |
| Invitation-specific state: expired | Identifies a pending invitation that requires renew-and-resend | INCLUDE |
| Invitation-specific state: accepted | Explains completion/reconciliation during lifecycle transition; retained history/visibility must be contracted | INCLUDE only as necessary lifecycle representation |
| Invitation-specific state: revoked | Explains a deliberately invalidated link and prevents misleading recovery actions; history/visibility must be contracted | INCLUDE only as necessary lifecycle representation |
| Name, email and invitation language | Required to identify recipient and deliver understandable onboarding in the intended language | INCLUDE |
| Phone prefill | May save the customer repetition when administrator already knows it, but needs validation/visibility/ownership rules | OPTIONAL PREFILL, pending contract |
| Proposed service address prefill | May save repeated onboarding detail, but cannot become a global canonical address before customer confirmation | OPTIONAL PREFILL, pending contract |
| Service-request readiness result | Helps customer understand whether current confirmed data can support a request; exact requirements belong to Service Requests | INCLUDE as a cross-domain capability dependency, not as a Users status or field checklist |
| Active/inactive filter, counter or badge | No current onboarding decision/action is established by the technical state | DEFER |
| Generic access-state badge | Entry kind plus invitation lifecycle state is sufficient for current onboarding work | DEFER |
| Generalized requires-attention management | No approved general taxonomy, ownership or cross-domain recovery model | DEFER |
| Individual attention explanation | Only eligible if it is an invitation-specific lifecycle state with an approved action; otherwise no current decision exists | DEFER outside named invitation states |
| Per-state directory filters | State alone does not justify a filter; All and Invitations cover the established jobs | DEFER |
| Worker/operator permission model | No Slice 1 worker task is defined | DEFER |

## 4. Revised end-to-end Users Slice 1 scope

### Product job

A tenant administrator or super admin prepares and sends a personalized,
localized customer invitation; the customer reviews/corrects proposed
information and accepts tenant access; the product reconciles the invitation to
the confirmed person/access relationship. The administrator can also find
invitations and safely recover or cancel the onboarding relationship.

### Included product behavior

1. **Users directory**
   - tenant-scoped people and pending invitations, with a clear distinction
     between a person with tenant access and an invitation;
   - total-people and pending-invitations contextual summary from an
     authoritative source, with loading, zero and error distinct from each
     other;
   - search, **All** and **Invitations** filters, selection and retained
     directory context;
   - initial loading, refresh retaining safe content, true empty, no-search
     result, no-filter result and recoverable load error.

2. **Minimal Overview**
   - identity/contact information needed to recognize the selected entry;
   - whether it represents tenant access, a pending/sent invitation, delivery
     failure, expired invitation, accepted invitation or revoked invitation;
   - invitation-specific next legitimate action and explanation when the state
     requires one;
   - explicit distinction between proposed invitation data and confirmed data.

   It excludes generic active/inactive administration, engagement status,
   Requests, Activity, Communication, Notes, profile administration and any
   generic access-management control.

3. **Create assisted invitation**
   - required inputs: name, email and invitation language;
   - language defaults from an authoritative tenant locale or current dashboard
     locale, but the administrator can override it for this invitation;
   - optional prefill: phone and proposed service address;
   - clear statement that optional prefill is proposed onboarding information,
     not authoritative profile/location data;
   - field-local validation, local pending feedback and duplicate prevention;
   - persistence of invitation plus proposed onboarding data and sender
     attribution; localized email dispatch; visible pending invitation after
     confirmed creation;
   - distinct tenant-access-exists and pending-invitation conflicts;
   - persisted-delivery failure where the invitation exists and Resend is the
     legitimate recovery; and pre-persistence/unavailable failure that preserves
     entered work and exposes only contract-supported retry guidance.

4. **Customer acceptance**
   - opening the invitation in its intended language;
   - authenticating an existing global identity or establishing one where the
     approved identity flow requires it;
   - review and correction of proposed name, contact information and optional
     service-location information before confirmation;
   - tenant access acceptance according to the identity contract;
   - review and explicit save of authoritative profile/contact and optional
     location data; only saved/confirmed values may be materialized;
   - recalculation of service-request readiness from current authoritative data
     via a capability result, with exact requirements owned by the Service
     Requests contract;
   - an interruption-safe state after tenant access but before profile
     confirmation: access remains valid, invitation proposals are not silently
     materialized, onboarding can resume, and unrelated navigation stays
     available;
   - primary review CTA immediately after acceptance and persistent but
     non-blocking profile/request-readiness guidance in the customer dashboard;
     service-request creation is gated only when its actual requirements are
     missing;
   - shared profile/contact/address validation and form rules between onboarding
     review and the Service Requests data step;
   - materialization of confirmed profile/contact data and the appropriate
     tenant-scoped location entity or profile address according to the
     integration contract;
   - replacement/reconciliation of the pending invitation directory entry with
     the person/access entry;
   - no silent overwrite of existing global identity/profile data.

5. **Required invitation lifecycle recovery**
   - **Resend:** targets the existing invitation, rotates/invalidates the prior
     token, preserves proposed onboarding data, refreshes expiry according to
     contract, avoids duplicate directory entries, gives success/failure
     feedback and applies cooldown/rate-limit protection.
   - **Expired invitation:** exposes a legitimate renew-and-resend path. Copy
     must distinguish renewal from an original send even when the backend uses
     one command.
   - **Persisted delivery failure:** keeps the invitation identifiable in the
     directory, prohibits blind Invite retry and makes Resend the recovery.
   - **Revoke:** securely invalidates still-valid acceptance capability for an
     incorrect recipient or cancelled relationship; it is not user deletion or
     generic access management. Directory representation/history is contract
   defined.

6. **Secure invitation proposal retrieval**
   - the invitation token is an opaque credential used to retrieve invitation
     proposal data securely;
   - phone, proposed service address and other personal data are never embedded
     in the URL or token.

7. **Responsive, accessibility and localized content**
   - desktop directory/Overview, intermediate adaptation and narrow focused
     detail; return preserves useful search/filter/list/focus context;
   - keyboard-reachable actions, semantic regions/headings, visible focus,
     selected-state meaning, dialog focus/restore and status meaning beyond
     color;
   - localized directory, invitation, lifecycle and acceptance content, tested
     with longer localized labels. Shell language/account settings are not Users
     workflow blockers.

### Initial authorization boundary

Slice 1 plans for **tenant admin** and **super admin**. The contract must
define their read/create/resend/renew/revoke authority and tenant isolation.
Worker, operator and other role models remain deferred.

## 5. Data ownership and confirmation transition

The implementation contract must preserve product ownership without inventing
the final backend schema.

| Lifecycle point | Product ownership and rule | Required contract guarantee |
| --- | --- | --- |
| Administrator prepares invitation | Name, email, chosen language and optional phone/proposed service address belong to the invitation/onboarding context; record that the tenant administrator provided them | Stable invitation identity, source attribution and clear proposed-data representation |
| Invitation pending / resent / expired / delivery failed | Proposed values remain invitation context; resend/renew preserve them; no duplicate invitation entry | Lifecycle commands operate on invitation identity and retain proposal data |
| Customer acceptance review | Customer sees proposed values, can correct them and understands what will be confirmed | Review data is editable by the customer at the confirmation boundary; no silent acceptance of unreviewed prefill |
| Tenant access accepted; confirmation interrupted | Tenant access is valid, but proposals remain unconfirmed invitation data and unrelated navigation remains available | Resumable onboarding state, primary post-acceptance review CTA, persistent non-blocking dashboard guidance and no silent materialization |
| Confirmed profile/location save | Confirmed contact/profile data becomes user-controlled under approved domain rules; confirmed location becomes the appropriate tenant-scoped location entity or profile address | Mapping is explicit; source/confirmation attribution and conflict behavior are defined |
| Service-request readiness recalculation | Readiness is derived from current confirmed authoritative profile/location data, not access acceptance or a persisted completeness flag | Capability-oriented result such as `canCreateServiceRequest` plus `missingRequirements`; exact requirements are owned by Service Requests |
| Existing global identity/profile | Existing values are not overwritten merely because invitation proposal differs | The contract requires explicit merge/choice/review behavior before any change |
| Directory reconciliation | Pending invitation changes to/reconciles with person/access representation | One stable relationship; no duplicate entries; accepted/revoked visibility/history rule is explicit |

The product does not prescribe whether the confirmed location becomes a
tenant-scoped service-location entity, a profile address or both. That mapping
is a contract decision constrained by this ownership transition. The invitation
token is an opaque credential for secure proposal retrieval; no phone, address
or other personal data belongs in a URL or token.

## 6. Explicitly deferred functionality and hypotheses

The following remains outside Slice 1 even if a model, endpoint, audit or
prototype mentions it:

- generic active/inactive administration, filters, counters and badges;
- blocking/unblocking accepted users;
- generalized attention management and generic attention filters/counters;
- unrestricted administrative profile editing after acceptance;
- Requests inspector content, Activity timeline, Communication and Internal
  Notes;
- CRM pipeline, segmentation, engagement scoring and commercial relationship
  management;
- worker/operator permission design;
- general customer/user deletion;
- shell account and language-preference workflows;
- state-specific filters beyond All and Invitations;
- pagination, sorting and further metrics unless a later need passes the gate.

These are deferred hypotheses, not partial commitments. They require a named
operational problem, actor, decision/action, omission cost and approved data
rule before re-entering scope.

## 7. Safe decisions to preserve

- Existing implementation/audits are evidence, not product authority (D-001).
- Users is the first reference domain; it does not automatically create shared
  patterns or future scope (D-003).
- Prototype behavior remains intentionally simpler than production (D-004).
- Both themes and accessibility are first-class (D-005).
- Directory context survives selection and narrow-layout return (D-007).
- Invitation and person with tenant access are distinct entry kinds (D-008).
- A global identity alone is not a tenant-access Invite conflict (D-010).
- Prepared/partial capability does not establish product behavior (D-011).
- The accepted shell is context for Users but does not create Users scope
  (D-012 to D-015).
- `inactive` has no approved visible access meaning.

## 8. Contradictions and misleading statements to rectify

| Sources | Problem | Required rectification |
| --- | --- | --- |
| Current plan vs clarified product direction | Invite was constrained to name/email and treated as simple access/email action | Define assisted onboarding, customer acceptance and ownership transition as Slice 1 boundary |
| `DOMAIN.md`, `FLOWS.md`, `STATES_AND_ACTIONS.md`, `HANDOFF.md` | Full Users work and invitation lifecycle do not consistently distinguish proposed onboarding data from confirmed customer-owned data | Add lifecycle/ownership rules and a bounded Slice 1 section |
| Existing backend profile/invitation evidence | Existing models can tempt an implementation to overwrite global profile/location fields from admin input | Require customer review/confirmation and explicit merge/mapping contract; do not invent schema |
| Current plan/prototype vs lifecycle need | Resend/renew/revoke were deferred despite clear onboarding recovery needs | Make them required invitation-lifecycle behavior while retaining their unresolved policy details as contract blockers |
| Existing filter/status evidence | Active/attention controls can be mistaken for baseline functionality | Keep deferred; only named invitation states are visible because each changes a legitimate action |
| Existing invitation language field vs old plan | Tenant default was treated as sufficient even when administrator knows recipient language | Require language input with a default and per-invitation override |
| Prototype language toggle vs localized acceptance | Shell locale control does not prove localized onboarding/acceptance behavior | Specify localized invitation and acceptance content; defer shell preference workflow |
| Audits calling V2 lifecycle features implemented | Technical lifecycle implementation could be adopted without product rules | Map it as evidence and converge it against the new contract |
| Existing role evidence | Technical roles could broaden Slice 1 permissions | Restrict to tenant admin and super admin |

## 9. Actual remaining product-owner decisions

The end-to-end flow is required; these decisions define it rather than reduce
it:

1. **Authorization:** exact tenant-admin versus super-admin authority for
   directory read, create, resend, renew and revoke; required denied behavior.
2. **Required Invite data:** confirm name, email and invitation language;
   define language default precedence (tenant locale versus dashboard locale)
   and permitted override values.
3. **Optional phone prefill:** whether to include it now; validation, display,
   privacy and customer-confirmation behavior if included.
4. **Optional proposed service address:** whether to include it now; minimum
   fields, privacy, confirmation UX and its destination after acceptance.
5. **Identity/profile conflict resolution:** what the customer sees when an
   existing global identity/profile conflicts with invitation proposals; whether
   acceptance may continue without changing existing data.
6. **Location materialization:** whether confirmed proposed location maps to a
   tenant-scoped service location, profile address or both; ownership and
   duplicate rules.
7. **Lifecycle policy:** expiry duration, resend cooldown/rate limits, renewal
   semantics, token invalidation, revoke confirmation/cancellation effect, and
   accepted/revoked directory history/visibility.
8. **Delivery outcome:** stable semantic outcome and identity when persistence
   succeeds but email delivery fails; exact safe retry wording.
9. **Summary/filter semantics:** authoritative definition of total people and
   pending invitations, and exact All/Invitations behavior.

## 10. Documents to update or create

### Update

- `docs/02-domains/users/DOMAIN.md`
- `docs/02-domains/users/FLOWS.md`
- `docs/02-domains/users/STATES_AND_ACTIONS.md`
- `docs/02-domains/users/PRODUCT_NOTES.md`
- `docs/02-domains/users/HANDOFF.md`
- `docs/01-foundation/DECISIONS_LOG.md`
- `docs/01-foundation/DOMAIN_DELIVERY_AND_INTEGRATION_WORKFLOW.md` only if its
  Users status must name this bounded assisted-onboarding slice.

### Create

- `docs/02-domains/users/INTEGRATION_CONTRACT.md`
- `docs/02-domains/users/IMPLEMENTATION_PLAN.md`
- `docs/02-domains/users/VALIDATION_CHECKLIST.md`

Foundation principles, product map, data, responsive and accessibility
documents remain cross-domain authority and should not be rewritten. Prototype
changes are a later, separate task after the product documents are reconciled.

## 11. Required document status markings

| Path / section | Marking | Reason |
| --- | --- | --- |
| This report | DRAFT | Proposed rectification pending owner decisions |
| Audits | EVIDENCE_ONLY | Technical/observational evidence |
| Slice 1 assisted-onboarding boundary | CURRENT after approval | Current product authority |
| Invitation lifecycle and ownership transition | CURRENT after approval | Required Slice 1 behavior |
| Phone/service-address prefills | DRAFT until product decision | Optional scope with data ownership implications |
| Active/attention/general access administration | DRAFT / DEFERRED_AFTER_SLICE_1 | No current onboarding justification |
| Requests, Activity, Communication, Notes and CRM work | DRAFT / DEFERRED_AFTER_SLICE_1 | Future-domain hypotheses |
| Existing broad `HANDOFF.md` | SUPERSEDED after Slice 1 handoff approval | It bundles unready/full-domain work |
| Prototype deferred controls | EVIDENCE_ONLY / DEFERRED preview | Simulation is not product authority |
| D-001–D-008, D-010–D-015 | CURRENT where Accepted | Preserve accepted decisions |
| D-009 | CURRENT but PROVISIONAL | Users/Clients boundary remains open |

## 12. Per-file rectification plan

| File path | Current problem | Exact change required | Dependencies |
| --- | --- | --- | --- |
| `docs/02-domains/users/DOMAIN.md` | Scope treats invite/access context without assisted onboarding ownership transition | Add Slice 1 assisted-onboarding purpose, invitation proposal/confirmation model, lifecycle boundary, admin/super-admin scope and exclusions | Decisions 1–9 in section 9 |
| `docs/02-domains/users/FLOWS.md` | Invite and recovery flows do not fully cover localized acceptance, proposal review or reconciliation | Expand Invite into end-to-end assisted flow; make resend/renew/revoke required lifecycle flows; defer unrelated flows 7–9 | Identity/location/lifecycle decisions |
| `docs/02-domains/users/STATES_AND_ACTIONS.md` | Technical statuses and broad actions overstate visible behavior; invitation state transitions are incomplete for slice | Define invitation-specific visible states and lifecycle actions; defer active/inactive/attention/general access actions | Lifecycle policy and delivery outcome |
| `docs/02-domains/users/PRODUCT_NOTES.md` | Overview hierarchy does not explicitly distinguish administrator-proposed from customer-confirmed data | Add ownership/confirmation rationale and minimal Overview guidance; retain cross-domain sections as deferred | Optional-prefill decisions |
| `docs/02-domains/users/HANDOFF.md` | Full Users domain is presented as implementation scope | Supersede with assisted-onboarding Slice 1 behavior, acceptance, lifecycle, feedback and exclusions | Approved contract and domain changes |
| `docs/02-domains/users/INTEGRATION_CONTRACT.md` | Missing | Create the contract outlined in section 13 | Decisions 1–9 |
| `docs/02-domains/users/IMPLEMENTATION_PLAN.md` | Missing | Create staged delivery for directory, invite, acceptance and lifecycle without unapproved cross-domain expansion | Integration contract |
| `docs/02-domains/users/VALIDATION_CHECKLIST.md` | Missing | Create end-to-end acceptance, ownership, recovery, localization, responsive and accessibility checks | Handoff + contract |
| `docs/01-foundation/DECISIONS_LOG.md` | No record of assisted onboarding, ownership transition or lifecycle scope | Add decisions in section 14 after owner approval | Decisions 1–9 |
| `docs/01-foundation/DOMAIN_DELIVERY_AND_INTEGRATION_WORKFLOW.md` | Users sequence can be read as full-domain rather than bounded first slice | Add short status note only if required | Slice approved |
| `prototype/README.md`, `prototype/scripts/demo.js`, Users `.astro` files | Existing simulation lacks customer acceptance and may show deferred controls as complete | Later: align review states with approved onboarding lifecycle and remove/label deferred controls | Separate prototype task; do not change now |

## 13. Revised proposed contents of new documents

### `INTEGRATION_CONTRACT.md`

1. **Status and scope** — assisted onboarding Slice 1, full exclusions and the
   Product Necessity Gate.
2. **Canonical concepts** — person with tenant access, invitation, proposed
   onboarding data, confirmed profile/contact data, proposed/confirmed service
   location, directory entry and stable identifiers. Distinguish source data,
   derived directory state and internal-only technical state.
3. **Authorization and isolation** — tenant admin/super-admin read/create/
   resend/renew/revoke permissions, tenant boundaries and denial behavior.
4. **Read contracts** — total-people and pending-invitation summary, directory,
   All/Invitations filter, search, minimum Overview fields, freshness and
   missing/unavailable behavior.
5. **Create invitation command** — name/email/language; tenant/dashboard locale
   default precedence; optional phone/address structure; source attribution,
   validation, duplicate guards and creation outcomes.
6. **Localized delivery and acceptance** — localized email and acceptance
   content; identity authentication/creation boundary; customer review/correct
   interaction; opaque-token proposal retrieval; no silent existing-profile
   overwrite.
7. **Ownership/materialization transition** — proposed invitation data to
   customer-confirmed profile/contact/location data; target mapping, conflict,
   privacy, user control and reconciliation requirements without prescribing
   schema; explicit interruption after access acceptance; resumable review CTA
   and non-blocking dashboard readiness guidance.
8. **Service-request readiness dependency** — derive a capability-oriented
   result from current confirmed authoritative data (for example,
   `canCreateServiceRequest` and `missingRequirements`); exact requirements,
   hard request gate and shared form validation are owned by the Service
   Requests contract, not Users.
9. **Invitation state machine** — pending/sent, delivery failed, expired,
   accepted and revoked; internal-only acceptance/concurrency states; permitted
   transitions and directory representation/history.
10. **Lifecycle commands** — resend, renew-and-resend and revoke, with token
   rotation/invalidation, expiry, preservation, cooldown/rate limit,
   confirmation, idempotency and side effects.
11. **Error semantics** — validation, tenant access exists, pending invitation
    exists, persisted delivery failure with stable invitation identity,
    temporary/unavailable failure, permission failure, expiry and revoke
    conflicts. Promise only system-supported guarantees.
12. **Capability mapping and blockers** — supported/adaptation/missing/
    conflicting/unknown against audit evidence; no adoption by convenience.

### `IMPLEMENTATION_PLAN.md`

1. Confirm product-owner decisions and product baseline.
2. Converge backend contract for invitation proposal persistence, ownership,
   localized delivery, acceptance/materialization and lifecycle state machine.
3. Implement admin directory, summary, All/Invitations filter, search,
   selection and minimal Overview states.
4. Implement create assisted invitation, localized language control, optional
   prefill only if approved, and outcome feedback.
5. Implement customer localized acceptance, identity boundary, review/correct,
   tenant-access acceptance, interruption/resume, confirmed-data persistence,
   readiness recalculation and directory reconciliation.
6. Implement resend, expired renew-and-resend, delivery-failure recovery and
   revoke with safe pending/confirmation/recovery behavior.
7. Validate responsive, accessibility, localization and contract behavior.
8. Integrate the Service Requests contract for readiness calculation and shared
   profile/contact/address validation; do not implement Request content here.
9. Keep active/inactive, generalized attention, CRM and cross-domain content in
   separate future increments.

### `VALIDATION_CHECKLIST.md`

- Scope gate: every visible field/status/control has a passed Necessity Gate;
  no generic active/attention/access management appears.
- Directory: summary source/loading/zero/error; All/Invitations filter; search;
  selection; person versus invitation distinction; refresh/empty/error states.
- Create invitation: name/email/language validation and default/override;
  optional phone/address only if approved; source attribution; pending/duplicate
  prevention; success and both conflict outcomes.
- Customer acceptance: localized entry, identity path, review/correction,
  tenant access, interruption/resume, explicit confirmation, existing-profile
  conflict behavior, location materialization, readiness recalculation and
  directory reconciliation without duplicate entry.
- Readiness guidance: primary post-acceptance review CTA, persistent
  non-blocking dashboard CTA, actual service-request hard gate and no blocking
  of unrelated navigation; shared validation rules are verified with the
  Service Requests contract.
- Lifecycle: resend token invalidation/data preservation/cooldown; expiry
  renewal wording and outcome; persisted delivery failure recovery; revoke
  confirmation/effect/history; error/retry behavior.
- Responsive/accessibility: desktop/intermediate/narrow continuity, return
  focus, keyboard, dialog semantics, visible focus and non-color state meaning.
- Localization/themes: invitation/acceptance language, long localized content,
  both themes and translated error/status meaning.
- Contract evidence: authorization, tenant isolation, error outcomes and
  materialization mapping verified against real integration.

## 14. Decisions to add to `DECISIONS_LOG.md`

### D-016 — Deliver Users Slice 1 as assisted customer onboarding

- **Proposed status:** Accepted after product review.
- **Decision:** Slice 1 includes personalized invitation creation, localized
  customer acceptance/review and the required invitation recovery lifecycle;
  it is not a simple access email or CRM profile-management surface.
- **Revisit when:** A later domain changes onboarding ownership or need.

### D-017 — Keep proposal data separate from customer-confirmed data

- **Proposed status:** Accepted after product review.
- **Decision:** Administrator-provided onboarding data belongs to invitation
  context until customer review/confirmation. Existing global profile data is
  never silently overwritten; final storage mapping is contract-defined.
- **Revisit when:** Identity/profile/location domain contracts change.

### D-018 — Use invitation language default plus administrator override

- **Proposed status:** Accepted after product review.
- **Decision:** Name, email and language are required invitation inputs. A
  default comes from approved locale precedence; the administrator can override
  it for the recipient.
- **Revisit when:** Tenant localization policy changes.

### D-019 — Treat resend, renewal and revocation as assisted-onboarding lifecycle

- **Proposed status:** Accepted after product review.
- **Decision:** These actions target an existing invitation, preserve proposal
  data and follow explicit expiry/token/delivery/visibility/authorization rules.
  They are not generic user access management.
- **Revisit when:** Invitation lifecycle policy changes.

### D-020 — Limit visible status to invitation lifecycle states that enable action

- **Proposed status:** Accepted after product review.
- **Decision:** Pending/sent, delivery failed, expired, accepted and revoked
  may be visible where they explain lifecycle meaning/action. Generic
  active/inactive and generalized attention remain deferred.
- **Revisit when:** A named future operational use passes the Necessity Gate.

### D-021 — Separate access, confirmed profile and service-request readiness

- **Proposed status:** Accepted after product review.
- **Decision:** Tenant access, explicitly confirmed profile/location data and
  service-request readiness are independent. Readiness is derived from current
  authoritative data through a capability result; it is not active/inactive or
  a persisted `profileComplete` status. Exact readiness requirements belong to
  the Service Requests contract.
- **Revisit when:** The Service Requests contract changes its minimum data.

## 15. Acceptance criteria: Users Slice 1 = IMPLEMENTATION_READY

Slice 1—not full Users—may be marked `IMPLEMENTATION_READY` only when:

1. The DRAFT scope is rectified as CURRENT and its exclusions are explicit.
2. Every visible field/status/filter/counter/action has a recorded Necessity
   Gate result; generic active/attention/access controls are absent.
3. The directory supports admin/super-admin find, selection, All/Invitations,
   total-people/pending-invitation summary and clear person/invitation meaning.
4. Summary/list loading, zero, empty, refresh, no-search/no-filter and error
   states are distinct and based on defined authoritative data sources.
5. Minimal Overview distinguishes proposed invitation data from confirmed data,
   exposes only identity/lifecycle/action information required for onboarding,
   and excludes cross-domain content.
6. Create invitation validates name/email/language, supports default plus
   override, records source attribution, handles optional prefill only if
   approved, prevents duplicates and returns meaningful outcomes.
7. Localized customer acceptance supports identity establishment/authentication,
   tenant-access acceptance, review/correction, explicit confirmation,
   interruption/resume after access, non-destructive existing-data conflict
   handling, contract-defined location materialization and directory
   reconciliation.
8. Service-request readiness is recalculated from confirmed authoritative data
   through a capability result and missing-requirements explanation; it is not
   derived from tenant access or a persisted completeness boolean. The customer
   receives post-acceptance and dashboard guidance without unrelated navigation
   being blocked; Service Requests applies the actual hard gate.
9. Resend, renew-and-resend, persisted delivery failure and revoke are
   contract-defined, authorization-protected, idempotent/cooldown-safe where
   needed and visibly recoverable without duplicate invitations.
10. The contract defines tenant isolation, state machine, opaque-token handling,
   data ownership,
   delivery guarantees, error semantics, lifecycle history and existing
   capability gaps without treating audits as rules.
11. Desktop/intermediate/mobile behavior, keyboard/focus/dialog semantics,
    localized content and both themes have been reviewed against the slice.
12. No remaining open decision would force frontend/backend implementation to
    invent an end-to-end onboarding rule.

## 16. Remaining blockers, ordered by severity

1. **Blocking — authorization:** exact tenant admin/super-admin permissions for
   read, create, resend, renew and revoke, including denial behavior.
2. **Blocking — language:** locale default precedence, permitted overrides and
   localized email/acceptance content policy.
3. **Blocking — optional prefill:** include/defer phone; include/defer proposed
   service address and, if included, its minimum structure/privacy rules.
4. **Blocking — ownership conflict:** customer experience when existing global
   identity/profile data differs from proposal; no-silent-overwrite rule and
   allowed acceptance path.
5. **Blocking — location materialization:** destination/ownership/duplicate
   rule for customer-confirmed service location.
6. **Blocking — lifecycle policy:** expiry, resend cooldown/rate limits,
   renewal behavior, revoke confirmation/effect and accepted/revoked history.
7. **Blocking — delivery outcome:** stable semantic result plus invitation
   identity for persisted delivery failure, and safe retry guidance.
8. **Blocking — summary/filter semantics:** population/source/freshness and
   exact All/Invitations behavior.
9. **Cross-domain dependency — Service Requests:** exact current confirmed
   profile/location requirements, capability-result contract, hard-gate timing
   and shared validation/form rules.

## Revised end-to-end Slice 1

A tenant admin or super admin uses a tenant-scoped Users directory to find a
person or invitation, see total people and pending invitations, filter All or
Invitations, and select a minimal Overview. They create a personalized
invitation with name, email and an overridable invitation language, optionally
prefilling approved phone and proposed service-location information. The system
persists administrator-attributed proposal data, sends localized onboarding
content and represents the invitation in the directory. The customer opens the
localized invitation, authenticates or establishes identity as required,
reviews/corrects proposed data, accepts tenant access and confirms the data that
becomes user-controlled profile/contact and contract-defined location data. The
flow can pause after access acceptance without silently materializing proposals;
the customer is guided to resume review and sees readiness based on confirmed
data, while only actual missing Service Requests requirements block request
creation. The pending directory entry reconciles to the person/access relationship. The
administrator can resend, renew an expired invitation, recover a persisted
delivery failure and revoke a link safely, without creating duplicates or
silently changing accepted-user access data.

## Required fields

- Name
- Email
- Invitation language, with authoritative default plus administrator override

## Optional prefill fields

- Phone — include only after validation/privacy/customer-confirmation rules are
  approved.
- Proposed service address — include only after minimum structure, privacy,
  confirmation and tenant-scoped materialization rules are approved. It is not
  automatically a global canonical user address.

## Ownership transition

Before acceptance, administrator-provided values are attributed proposal data
in the invitation/onboarding context. During acceptance, the customer reviews
and may correct them. After confirmation, contact/profile data becomes
user-controlled and proposed location becomes the appropriate tenant-scoped
location entity or profile address according to the integration contract.
Existing global identity/profile data is never silently overwritten. The pending
invitation then reconciles to the person/access directory relationship.

Tenant access, confirmed profile data and service-request readiness are not one
status. Readiness is derived from current authoritative data and exposed through
a capability-oriented result; Service Requests owns the exact requirements.

## Required invitation lifecycle

- Create and persist proposed onboarding data.
- Send localized invitation and show pending entry.
- Customer localized review/correction and acceptance.
- Resend using existing invitation identity, token rotation, proposal retention,
  refreshed expiry and cooldown/rate-limit protection.
- Renew-and-resend expired invitation with distinct wording.
- Recover persisted delivery failure through Resend, never duplicate Invite.
- Revoke securely, invalidate acceptance capability and represent/history the
  result according to contract.

## Remaining blockers

Authorization; locale/default/override policy; optional phone/address scope;
existing-profile conflict behavior; location materialization; lifecycle expiry,
cooldown and history policy; delivery-failure outcome/identity; and
summary/filter semantics. The exact service-request readiness requirements,
capability result, hard gate and shared validation are a future cross-domain
dependency on the Service Requests contract.

## Recommended next action

Run a product-owner decision workshop on the blockers in section 16,
starting with ownership/conflict and lifecycle policy. Then rectify the Users
authority documents, record D-016 through D-021, and create the integration
contract, implementation plan and validation checklist. Only after that package
is consistent should the prototype be aligned and production implementation
begin.

## Sections changed

- Executive summary and Product Necessity Gate: explicit separation of tenant
  access, confirmed profile data and request readiness.
- Revised end-to-end scope: opaque-token retrieval, post-access interruption,
  resume guidance and capability-based readiness.
- Data ownership transition: proposed data remains in invitation context until
  explicit confirmation; no URL/token PII; no persisted completeness status.
- Integration contract, implementation plan and validation checklist: Service
  Requests dependency, shared validation and hard-gate ownership.
- Decision log proposals, readiness criteria and blockers: D-021 and the
  cross-domain Service Requests dependency.

## New Service Requests dependency

The Service Requests contract must define the exact minimum confirmed
profile/contact/location requirements, `canCreateServiceRequest` /
`missingRequirements` equivalent, hard-gate timing and shared validation/form
rules. Users only initiates/recalculates the derived capability and provides
non-blocking guidance; it does not define request-readiness fields or implement
Requests content.

## Remaining genuine product decisions

The blockers in section 16 remain: authorization; locale policy; optional
phone/address prefill; existing-profile conflicts; location materialization;
lifecycle policy; persisted-delivery outcome; summary/filter semantics; and the
Service Requests readiness contract.

## Files to modify in the following Codex task

- `docs/02-domains/users/DOMAIN.md`
- `docs/02-domains/users/FLOWS.md`
- `docs/02-domains/users/STATES_AND_ACTIONS.md`
- `docs/02-domains/users/PRODUCT_NOTES.md`
- `docs/02-domains/users/HANDOFF.md`
- `docs/02-domains/users/INTEGRATION_CONTRACT.md` (create)
- `docs/02-domains/users/IMPLEMENTATION_PLAN.md` (create)
- `docs/02-domains/users/VALIDATION_CHECKLIST.md` (create)
- `docs/01-foundation/DECISIONS_LOG.md`
- `docs/01-foundation/DOMAIN_DELIVERY_AND_INTEGRATION_WORKFLOW.md` only if its
  Users sequence needs the bounded-slice reference.

## Files that must remain untouched

- `docs/01-foundation/PRODUCT_PRINCIPLES.md`
- `docs/01-foundation/PRODUCT_MAP.md`
- `docs/01-foundation/ACCESSIBILITY_AND_SEMANTICS.md`
- `docs/01-foundation/RESPONSIVE_AND_INTERACTION.md`
- `docs/01-foundation/DATA_AND_CONTENT_PRINCIPLES.md`
- `docs/01-foundation/WORKFLOW_AND_ROLES.md`
- `docs/00-audits/BACKEND_PRODUCT_AUDIT.md`
- `docs/00-audits/FRONTEND_PRODUCT_AUDIT.md`
- all `prototype/` files
- existing production frontend/backend repositories and their code

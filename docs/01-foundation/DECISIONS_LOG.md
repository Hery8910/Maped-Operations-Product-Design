# Decisions Log

## Purpose

This log preserves consequential product decisions so their reasoning can be recovered later.

It is not a changelog and not a record of every discussion.

Each entry should contain enough context to explain why the decision exists, what trade-off was accepted and when it should be reconsidered.

---

## Status Values

- **Accepted** — current product decision.
- **Provisional** — active working decision that still requires validation.
- **Superseded** — replaced by a later decision; keep history and link the replacement.
- **Rejected** — considered and intentionally not adopted.

---

## Decision Template

### D-XXX — Decision title

- **Status:**
- **Documented:** YYYY-MM-DD
- **Scope:**

**Context**

What problem or ambiguity required a decision?

**Evidence / constraints**

What was known at the time?

**Decision**

What will the product do?

**Rationale**

Why is this preferred?

**Consequences and trade-offs**

What complexity, limitation or future work is accepted?

**Revisit when**

What new evidence would justify reopening the decision?

---

## D-001 — Existing implementation is evidence, not product authority

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Repository-wide

**Context**

Havenova is the first real validation environment and already contains working flows, placeholders, technical constraints and historical decisions. Treating all existing behavior as product authority would copy both strengths and accidental complexity into the reusable product.

**Evidence / constraints**

The current product includes a mixture of mature flows and placeholder domains. The Users Directory is comparatively developed, while much of the dashboard navigation represents intention rather than completed operation.

**Decision**

Production code and audits are evidence sources. Product authority is created through explicit product analysis and documentation.

**Rationale**

This allows the product to learn from real implementation without becoming trapped by historical structure.

**Consequences and trade-offs**

Some implemented behavior may be redesigned or removed. Product work requires explicit analysis before reuse.

**Revisit when**

Do not revisit the principle itself. Revisit individual behaviors when new evidence changes their product value.

---

## D-002 — Use Core Product + Tenant Configuration + Specific Extensions

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Product architecture

**Context**

Maped Solutions needs to reuse the operational product across Havenova, Perfect Service and future service businesses without rebuilding each tenant from zero or turning every difference into configuration.

**Decision**

Classify product behavior into:

1. reusable core product;
2. legitimate tenant configuration;
3. clearly isolated specific extension.

**Rationale**

The model preserves reuse while avoiding unlimited configurability and tenant logic leaking into the global product.

**Consequences and trade-offs**

Classification requires judgment and may evolve with evidence. Some requests will be rejected when complexity is not justified.

**Revisit when**

Revisit classifications, not the model, when multiple tenants demonstrate a previously specific requirement is genuinely reusable.

---

## D-003 — Users is the first reference domain for pattern validation

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Current product sequence

**Context**

The product needs reusable dashboard patterns, but designing a complete theoretical design system before solving real operational domains would create unvalidated abstraction.

**Evidence / constraints**

The existing Users Directory has the strongest observed dashboard behavior: summary, filters, server-side search, cursor loading, user/invitation distinction, attention states, selection, detail, responsive context preservation and invitation actions.

**Decision**

Use Users as the first domain to define and validate candidate patterns. Do not force later domains into the same structure automatically.

**Rationale**

It provides a real product problem with enough state complexity to validate useful patterns while keeping abstraction grounded.

**Consequences and trade-offs**

Patterns remain candidates until later domains confirm reuse. Some Users-specific behavior will remain local.

**Revisit when**

Revisit pattern promotion after at least one additional domain tests the same behavioral relationship.

---

## D-004 — Prototype remains intentionally simpler than production

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Prototype

**Context**

The repository needs visual and interactive validation without creating a second application that duplicates routing, authentication, APIs and infrastructure.

**Decision**

The prototype may simulate product states and interactions but must not reproduce production architecture.

**Rationale**

The prototype exists to answer product questions quickly and clearly.

**Consequences and trade-offs**

Prototype behavior may use simulated data and local interaction state. Implementation details require separate handoff.

**Revisit when**

Revisit only if a specific product question cannot be validated without a higher-fidelity technical prototype.

---

## D-005 — Light and dark themes are first-class requirements

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Visual system and component design

**Context**

Adding dark mode after component completion risks broken hierarchy, weak status distinction and inconsistent focus behavior.

**Decision**

Design components with semantic tokens and validate both themes from the start.

**Rationale**

Theme behavior affects hierarchy and accessibility, not only preference.

**Consequences and trade-offs**

Every shared component requires theme validation during development.

**Revisit when**

Revisit token implementation, not the requirement, when the visual system evolves.

---

## D-006 — Public client and dashboard share identity, not identical behavior

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Cross-surface design

**Context**

The public experience and dashboard belong to one ecosystem but solve different problems.

**Decision**

Share intentional product identity while allowing different density, hierarchy and interaction patterns.

**Rationale**

Marketing and conversion priorities should not determine repeated operational work behavior.

**Consequences and trade-offs**

Some visual elements will differ across surfaces. Consistency must be evaluated semantically rather than by screenshot similarity.

**Revisit when**

Revisit individual shared patterns when evidence shows a cross-surface behavior truly benefits both contexts.

---

## D-007 — Preserve context across directory and detail transitions

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Users domain and candidate shared master-detail pattern

**Context**

Operators repeatedly search, filter and inspect people. Losing query, filter, loaded position or return context makes repeated work slower, especially when mobile changes list-detail composition.

**Decision**

Selecting a user or invitation must preserve directory context. Responsive transformation may use a focused detail view, but return behavior should restore the directory task state.

**Rationale**

The detail view is a continuation of the same task, not an unrelated destination.

**Consequences and trade-offs**

Implementation must preserve route/query or equivalent state, scroll context and focus restoration behavior where possible.

**Revisit when**

Revisit for domains where selection is not part of a repeated directory task.

---

## D-008 — Invitation is distinct from active user identity

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Users domain

**Context**

The directory needs to manage the access relationship before account activation as well as after activation.

**Decision**

Represent invitation and user as related but distinct entry kinds with distinct states and actions.

**Rationale**

Resend, expiration and revoke apply to invitation lifecycle and should not be misrepresented as generic user actions.

**Consequences and trade-offs**

Directory and inspector need clear entry-kind semantics. Actions must target the correct entity identity.

**Revisit when**

Revisit only if the access model changes so invitation no longer exists as a meaningful product entity.

---

## D-009 — Do not resolve Users vs Clients ambiguity by assumption

- **Status:** Provisional
- **Documented:** 2026-07-10
- **Scope:** Product map and Users domain

**Context**

The observed dashboard contains a real Users Directory and a separate placeholder Clients area. Existing implementation does not provide enough product evidence to prove whether these are the same entity, different views of one entity, or distinct business concepts.

**Decision**

Users documentation will define identity/access and contextual relationships without claiming that it is the complete commercial customer domain. The broader customer/client contract remains an explicit open question.

**Rationale**

Prematurely merging or separating the concepts would create product authority from incomplete navigation evidence.

**Consequences and trade-offs**

Some future relationships remain intentionally unresolved.

**Revisit when**

Revisit before building a full Clients domain or when Requests/Properties analysis requires a definitive commercial relationship model.

---

## D-010 — Model identity and tenant access as distinct product concepts

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Identity and Access; Users

**Context**

Backend evidence distinguishes a global platform identity from tenant-scoped
membership, personal profile and a separate invitation lifecycle. Treating a
known global email as an existing tenant account creates the wrong operator
meaning.

**Decision**

The product distinguishes global identity, tenant access relationship,
user-facing profile, pending tenant invitation and derived directory projection.
An Invite conflict means access already exists in this company workspace, not
merely that a global identity exists.

**Rationale**

This preserves multi-tenant access as a legitimate workflow without exposing
technical entity names to the operator.

**Consequences and trade-offs**

Invitation feedback must describe tenant scope precisely. The directory remains
a useful operational read model, never the business source of truth.

**Revisit when**

Revisit only if the platform identity or tenant-membership model changes.

---

## D-011 — Prepared backend structures do not establish product capability

- **Status:** Accepted
- **Documented:** 2026-07-10
- **Scope:** Product definition and prototype navigation

**Context**

Audits show prepared models and enums for operational concepts without an
implemented workflow.

**Decision**

Prepared or partial backend capability is evidence for analysis, not authority
to expose a complete product destination or flow.

**Rationale**

This prevents the prototype from promising scheduling, work-order or company
operations that cannot yet be reasoned about or performed.

**Consequences and trade-offs**

The current shell intentionally limits navigation to defined product context.

**Revisit when**

Revisit a capability when its domain definition and functional evidence exist.

---

## D-012 — Use a framed operational workspace as the dashboard shell baseline

- **Status:** Accepted
- **Documented:** 2026-07-11
- **Scope:** Operational dashboard shell and prototype baseline

**Context**

The initial Users prototype used a conventional sidebar, header and centred
content arrangement. Shell comparison showed that a restrained application
frame with a persistent navigation region and a continuous workspace plane
better communicates a dedicated operational tool without relying on decorative
effects or unfamiliar interaction.

**Decision**

Dashboard domains render inside an `AppShell` with persistent navigation and a
workspace that contains both the fixed contextual header and the scrolling task
region. The workspace fills the remaining viewport beside navigation. The task
region is an operational canvas rather than a raised, bordered or rounded shell
surface.

**Rationale**

The composition creates a recognizable shell, preserves a strong shared content
origin and leaves future domains free to use the internal grid according to
their task. Navigation remains calm and stable while the workspace represents
the active operational context.

**Consequences and trade-offs**

Further shell variants are not active prototype routes. Future work should
refine the baseline in order: shell, navigation, header, then domain children.
The frame must not accumulate oversized insets, heavy shadows, glass effects or
decorative borders. Document scrolling belongs to the task region; navigation
and contextual header remain stable.

**Revisit when**

Revisit if a future operational domain demonstrates that its task cannot retain
the permanent navigation-plus-workspace relationship, or if responsive evidence
requires a different structural transformation.

---

## D-013 — Organize dashboard navigation by responsibility, not legacy routes

- **Status:** Accepted
- **Documented:** 2026-07-11
- **Scope:** Operational dashboard navigation baseline

**Context**

The first shell exposed a few flat, broad items that did not express the product
map and risked treating ambiguous historical navigation as product authority.
The dashboard needs a compact way to reveal its intended responsibility areas
without pretending that unprototyped domains already have usable pages.

**Decision**

The primary navigation uses one direct Overview item and progressive-disclosure
groups for Operations, People, Catalog, Communication and Company. Users is the
only current destination and appears inside People. Clients is not added.
Planned destinations remain visible as non-link rows; only an implemented
destination receives an href and can be marked current.

**Rationale**

This communicates future product structure while preserving the distinction
between real capability and planned product work. It keeps People focused on
tenant-scoped identity/access and avoids duplicating personal account settings
in the main navigation.

**Consequences and trade-offs**

The sidebar represents a responsibility map, not a route inventory. Native
disclosure keeps the interaction keyboard-accessible without adding prototype
state infrastructure. Navigation data remains a single small source of truth.

**Revisit when**

Revisit an item when its domain definition and prototype destination are ready
to establish a real navigation target, or when the Users versus broader customer
relationship is explicitly resolved.

---

## D-014 — Make tenant identity primary and reserve the topbar for global controls

- **Status:** Accepted
- **Documented:** 2026-07-11
- **Scope:** Operational shell identity and context ownership

**Context**

The initial prototype visually prioritized Maped Solutions and repeated route
context in both the topbar and page header. This weakened tenant ownership and
gave two regions competing responsibility for page identity.

**Decision**

Havenova Operations is the primary visible shell identity; Maped Solutions is
retained only as subtle provider attribution. The page header owns domain
context, title and description. The topbar is reserved for global controls:
language preference, theme and operator account access.

**Rationale**

The tenant operator should understand the dashboard as Havenova's operational
application while the reusable platform remains intentionally secondary. This
also gives each region one clear job and leaves the topbar quiet during repeated
work.

**Consequences and trade-offs**

Language selection and account destinations are prototype-only popovers: they
demonstrate placement and interaction without adding localization, account
routes or authentication. Future nested breadcrumbs belong in the page header,
not the topbar.

**Revisit when**

Revisit provider attribution if a multi-tenant deployment requires a different
tenant-branding contract, or when a real localization/account capability is
ready for implementation.

---

## D-015 — Make the Users directory-inspector workspace the dominant page surface

- **Status:** Accepted
- **Documented:** 2026-07-11
- **Scope:** Users reference-domain composition

**Context**

The initial Users prototype separated page metrics into a large KPI-card band
before showing a near-even directory-inspector surface. That hierarchy resembled
an analytics dashboard more than the operator's repeated find, inspect and act
workflow.

**Decision**

Users keeps a compact page header, then combines directory counts, search and
filters into one operational control region. The master-detail workspace is the
dominant surface, with the inspector receiving more desktop space than the
directory. Inspector sections remain contextual and simulated; they do not
become separate production routes or complete Requests/Activity/Notes domains.

**Rationale**

Counts are useful when they help narrow the directory, not as independent
dashboard metrics. The wider inspector supports the person/access context that
operators need after selection while the directory remains dense enough for
repeated scanning.

**Consequences and trade-offs**

The overview presents only current prototype information and explains attention
locally. Invitation and user contexts remain distinct. Secondary invitation
actions are not represented as active controls until their confirmation and
recovery behavior can be reviewed completely.

**Revisit when**

Revisit the inspector section model after Requests, Activity and Notes have
their own approved product data contracts and workflows.

---

## D-016 — Define Users v1 as Assisted Customer Onboarding

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1

**Context**

The broad Users reference mixed an initial implementation cut with later
people, communication and access-management ideas.

**Evidence / constraints**

Product analysis supports administrator-known customer information and customer
confirmation; audits/prototype remain evidence, not authority.

**Decision**

Users v1 is end-to-end assisted customer onboarding, delivered in incremental
Slices A–E. It is not CRM, generic access management or a Requests surface.

**Rationale**

Administrators may already know customer information and can reduce repetition
while the customer retains confirmation authority.

**Consequences and trade-offs**

Delivery is divided into A–E; Users v1 is complete only when the end-to-end
capability validates, while unrelated Users work remains deferred.

**Revisit when**

The onboarding problem or its cross-domain ownership changes.

---

## D-017 — Keep administrator proposals separate from customer-confirmed data

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1 data ownership

**Context**

Administrator-known information can reduce onboarding repetition but must not
silently replace customer-controlled data.

**Evidence / constraints**

Identity, profile and location persistence are technically separate and final
schema mapping still requires integration verification.

**Decision**

Proposals remain in invitation/onboarding context until explicit customer save.
Existing confirmed data is never silently overwritten.

**Rationale**

Customer review preserves authority over personal/contact and location data.

**Consequences and trade-offs**

Acceptance supports keep/correct/adopt choices and a resumable confirmation
state; implementation must carry proposal attribution and conflict behavior.

**Revisit when**

Identity, profile or location contracts change.

---

## D-018 — Use invitation language default plus administrator override

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1 invitation creation

**Context**

Administrators may know the recipient's language while tenant/dashboard locale
provides a useful default.

**Evidence / constraints**

Locale fields exist as technical evidence; no new tenant-language configuration
is in Users v1 scope.

**Decision**

Name, email and language are required; authoritative tenant locale defaults,
otherwise dashboard locale, and the administrator may override it.

**Rationale**

Localized onboarding is more understandable without removing administrator
control for a known recipient.

**Consequences and trade-offs**

The contract must define default precedence and allowed override values.

**Revisit when**

Tenant localization policy changes.

---

## D-019 — Include phone and proposed service address as optional prefills

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1 onboarding proposal

**Context**

Known phone/location may reduce customer repetition during onboarding.

**Evidence / constraints**

Address ownership is unresolved across profile and tenant service-location
models; proposal data cannot establish a canonical global address.

**Decision**

Phone and proposed service address are optional administrator inputs. Address is
not automatically a global canonical user address.

**Rationale**

Optional prefills preserve assistance without assuming all administrators know
or should authoritatively maintain these values.

**Consequences and trade-offs**

Validation, privacy, confirmation and final mapping require contract
verification before implementation.

**Revisit when**

Validation, privacy or location-model contract requires change.

---

## D-020 — Make resend, renewal and revoke invitation lifecycle actions

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1 invitation lifecycle

**Context**

Delivery can fail, credentials expire and an invitation may be sent to an
incorrect recipient or become unnecessary.

**Evidence / constraints**

Existing implementation indicates lifecycle capabilities, but expiry, token,
delivery and authorization rules require explicit product contract.

**Decision**

Resend, renew-and-resend and revoke target an existing invitation and preserve
proposals. They are not accepted-user access management.

**Rationale**

Recovery must operate on one known invitation rather than creating duplicates
or changing accepted-user access.

**Consequences and trade-offs**

Resend rotates tokens and preserves proposals; renewal/revoke require explicit
feedback, cooldown, confirmation and directory-representation behavior.

**Revisit when**

Expiry, token, delivery or authorization policy changes.

---

## D-021 — Limit visible status to actionable invitation lifecycle meaning

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1 state representation

**Context**

The directory needs lifecycle meaning that tells an administrator whether an
invitation can be resent, renewed or revoked without becoming generic attention
management.

**Evidence / constraints**

Invitation technical states exist, but generic active/inactive and attention
have no approved Users v1 job.

**Decision**

Operational invitation rows may communicate pending/sent, delivery failed and
expired. Accepted and revoked may be communicated temporarily as lifecycle
outcomes, but they do not remain normal operational rows. Generic
active/inactive and attention remain deferred.

**Rationale**

These meanings explain concrete lifecycle action without promoting broad status
management.

**Consequences and trade-offs**

Directory row reconciliation/removal is owned by D-023; Users v1 does not add a
historical invitation archive.

**Revisit when**

A named operational use passes the Product Necessity Gate.

---

## D-022 — Separate access, confirmation and service-request readiness

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1 / Service Requests dependency

**Context**

Access acceptance can occur before customer confirmation, and request readiness
depends on current confirmed data rather than invitation completion alone.

**Evidence / constraints**

Service Requests exact required fields and hard-gate policy are not defined in
Users authority.

**Decision**

Tenant access, confirmed profile/location data and request readiness are
independent. Readiness is derived from current authoritative data through a
capability result; Service Requests owns exact requirements and hard gate.

**Rationale**

This prevents active/inactive or `profileComplete` from misrepresenting a
capability derived from authoritative data.

**Consequences and trade-offs**

Users provides resume/readiness guidance; Service Requests must supply the
capability result, shared validation and actual request gate.

**Revisit when**

The Service Requests contract changes.

---

## D-023 — Accepted and revoked invitations do not remain normal directory rows

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users v1 directory projection

**Context**

Lifecycle outcomes must not make the operational directory look like a
historical invitation archive or show duplicate relationships.

**Evidence / constraints**

The invitation and directory projection are distinct concepts; technical audit
history may exist outside normal operational rows.

**Decision**

Accepted invitations reconcile to the person/tenant-access entry; revoked
invitations leave the normal operational directory. Temporary feedback may
communicate either outcome and technical audit/history may retain the event.

**Rationale**

One current relationship row is clearer than duplicate invitation/person rows.

**Consequences and trade-offs**

This complements D-021's communication meaning; it does not create a Users v1
historical invitation archive.

**Revisit when**

A validated operational history job is defined.

---

## D-024 — Use the Product Necessity Gate to control future Users scope

- **Status:** Accepted
- **Documented:** 2026-07-12
- **Scope:** Users domain

**Context**

Technical capability and prototype controls can make future scope appear
implemented before a current operational need is approved.

**Evidence / constraints**

Foundation principles require visible data/action to earn its place; audits are
evidence only.

**Decision**

Visible functionality requires a current operational problem, actor, action,
omission cost and reliable approved data rule. Technical evidence is insufficient.

**Rationale**

The gate preserves a small coherent product and makes uncertainty visible.

**Consequences and trade-offs**

Deferred capabilities require an explicit revisit trigger rather than partial
UI/API design inside Users v1.

**Revisit when**

New product evidence supports a named capability.

---

## D-025 — Replace Users v1 with Customers and separate shared capabilities

- **Status:** Accepted
- **Documented:** 2026-07-19
- **Scope:** Customers, Invitations, Internal Notes and product map

**Context**

The former Users v1 definition mixed the tenant–customer relationship with
global identity/access language and treated invitations and notes as local
features. The revised operational job needs related Requests and Work Orders
without taking ownership of those domains.

**Decision**

The operational page/domain is Customers, with canonical future route
`/people/customers`; `/people/users` is legacy migration handling. Customers
owns the tenant–customer relationship composition. Invitations is a reusable
customer/worker/admin access capability and Internal Notes is a reusable
customer/worker/admin internal annotation capability. Profile, Identity/Auth,
Requests and Work Orders remain explicit dependencies.

**Rationale**

This names the actual operational relationship, prevents generic identity/admin
scope from leaking into Customers and creates reusable boundaries without
inventing future Worker/Admin experiences.

**Consequences and trade-offs**

The former Users documents/prototype remain evidence, not authority. Decisions
D-003 and D-016 through D-024 are superseded wherever they define the former
Users v1 scope; their durable principles apply through the new documents.

**Revisit when**

Validated evidence shows that the customer relationship boundary or a shared
capability boundary no longer supports the operational jobs.

---

## D-026 — Keep tenant customization within shared operational patterns

- **Status:** Accepted
- **Documented:** 2026-07-19
- **Scope:** Multi-tenant visual and interaction policy

**Decision**

All tenants share shell, layout, components, responsive behavior and interaction
patterns. MVP customization is name, logo, approved brand colors, visible
modules and authorized vocabulary/configuration. Tenant-specific layouts are
not permitted; semantic error, warning and success colors remain product-owned.

**Rationale**

Reusable operational behavior and accessible status meaning must not fragment
by tenant branding.

**Revisit when**

A validated cross-tenant requirement demonstrates a new shared pattern rather
than a tenant-specific layout exception.

---

## D-027 — Separate Customer relationship, access, Profile completeness and Request eligibility

- **Status:** Accepted
- **Documented:** 2026-07-19
- **Scope:** Customers ↔ Profile product and architecture gate

**Context**

The product needs a Profiles complete summary and an informational Profile state
without turning ordinary missing data into admin attention or treating a global
identity/Profile record as the tenant Customer. Existing evidence conflates some
of these concepts: invitation acceptance currently creates/updates Profile and
Request creation checks Profile existence.

**Decision**

Customer is the tenant-scoped operational relationship. Global Identity/Auth,
tenant access, invitation acceptance, Profile operational completeness and
Request eligibility are independent results. Profile is operationally complete
only when a Profile exists with a customer-confirmed name and supported preferred
locale. Telephone, address and global email are not inputs. Incomplete and
unknown Profile results are informational, never Action required. Request
eligibility belongs exclusively to Service Requests.

**Rationale**

The rule supports a useful, calculable customer context without inventing
universal contact/address requirements or giving a tenant admin a task they
cannot perform. It retains customer authority over confirmed personal data.

**Consequences and trade-offs**

Backend/frontend must expose a least-necessary read projection and map
confirmation/freshness safely. The policy does not authorize Profile writes,
endpoint/schema names, migration design or Requests readiness behavior. The
Customers Directory and Overview slice remains PLANNED.

**Revisit when**

Validated evidence establishes a necessary operational use for an additional
Profile field, or the Profile/communication contract changes supported locale
semantics.

---

## D-028 — Keep Customer relationship lifecycle separate from access and tenant state

- **Status:** Accepted
- **Documented:** 2026-07-19
- **Scope:** Customers relationship lifecycle and directory inclusion

**Context**

Current evidence exposes `UserClient` statuses including `inactive`, global Auth
status and tenant platform states, but does not give `inactive` a stable product
meaning. Reusing it as relationship archive, access denial, invitation state or
Profile status would make the directory inconsistent and unsafe.

**Decision**

Customers recognizes only operational, archived, removed and unknown lifecycle
results. The normal directory/count/search includes operational relationships
only. Tenant access grant, global Identity/Auth safety and tenant availability
are separate results. `UserClient.inactive` has no direct product mapping and
remains unknown access evidence until verified. Archive/remove/reactivate are
not Customers MVP actions. Accepted invitations reconcile to one relationship;
reinvitation cannot create a duplicate current or archived relationship.

**Rationale**

The separation preserves historical context without turning security, tenant
operations or incomplete implementation evidence into misleading Customer
states or actionable queues.

**Consequences and trade-offs**

Backend/frontend must provide independent, fresh enough projections. Tenant
suspension may restrict availability, but does not mutate relationship history.
The decision closes product architecture only; it does not approve lifecycle
commands, delivery behavior, technical cursor work or owner-domain retention.

**Revisit when**

A demonstrated tenant-admin lifecycle job establishes a safe, authorized reason
to archive, remove or reactivate a Customer relationship.

---

## D-029 — Use a minimized authorized Customers read projection

- **Status:** Accepted
- **Documented:** 2026-07-19
- **Scope:** Customers directory/detail read architecture and authorization

**Context**

Customers needs contact and Profile context for an authorized tenant admin, but
the underlying identity is global, Profile evidence is currently holder-private
and existing directory evidence carries more request/activity context than the
approved MVP requires.

**Decision**

Customers reads a tenant-scoped, field-minimized projection only after actor,
tenant, module and relationship authorization succeeds. Rows contain selection
reference, label/fallback, current approved email, completeness, lifecycle,
effective access and necessary read indicators; telephone, locale and addresses
stay out of rows. Overview loads relationship, Profile/contact, addresses and
access context as independent blocks. Primary denial is opaque; partial is only
allowed after a current authorized relationship envelope succeeds.

**Rationale**

This provides the operational recognition/context job while preventing global
identity inference, unnecessary PII exposure and misleading partial states.

**Consequences and trade-offs**

Implementation must map field-level authorization, freshness, redaction and
non-disclosing errors. Super-admin technical bypass does not itself authorize
global reading. No endpoint, cursor, summary, cache technology or invitation
lifecycle decision is created.

**Revisit when**

Another validated actor has a distinct Customers operational job, or a field
proves necessary for the row rather than authorized detail context.
